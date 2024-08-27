const profile = require("../models/profileModel");
const Chat = require("../models/chatModel");

const streamController = require("./streamController");

const checkMembersExist = async (members) => {
  const profiles = await profile.find({ _id: { $in: members } });
  return profiles.length === members.length;
};

//TODO Seria interessante checar se os membros passados no corpo da requisição realmente existem.
const createChat = async (req, res) => {  
  try {
    const { members, createdBy } = req.body;

    const allMembersExist = await checkMembersExist(members);
    if (!allMembersExist) {
      return res.status(400).json({ message: "One or more members do not exist." });
    }

    const isPrivate = members.length === 2;

    const chatExists = await Chat.countDocuments({
      members: { $all: members },
      $expr: { $eq: [{ $size: "$members" }, members.length] }
    });
    
    if (isPrivate && chatExists > 0) {
      return res.status(400).json({ message: "Chat already exists." });
    }
      
    const chat = await new Chat(req.body);
    await chat.save();

    if(createdBy) {

      const streamReq = {
        body: {
          channelId: chat._id.toString(), // Usando o ID do chat como channelId
          userId: createdBy, // ou qualquer ID de usuário apropriado
          members: members,
        },
      };
    
      const streamRes = {
        status: (statusCode) => ({
          json: (data) => console.log(`Stream response: ${statusCode}, ${JSON.stringify(data)}`)
        }),
        json: (data) => console.log(`Stream response: ${JSON.stringify(data)}`)
      };

      for(let member of members) {
        const chatStream = await streamController.authenticateUser({ params: { id: member} }, streamRes);
      }

      const chatStream = await streamController.createChannel(streamReq, streamRes);
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: `Error occurred while creating a user: ${error.message}` });
  }
};

const defineChatName = async (chats, userId) => {
  const updatedChats = [];

  for (let chat of chats) {
    if (chat.members.length === 2) { // Apenas para chats privados

      const otherMemberId = chat.members.filter((member) => member !== userId);
      const otherMember = await profile.findById(otherMemberId);

      if (otherMember) {
        chat.nameChat = otherMember.profileName; // Ajuste conforme o campo de nome no modelo de perfil
      }
    }
    updatedChats.push(chat); // Adiciona o chat atualizado à lista
  }

  return updatedChats; // Retorna a lista de chats com os nomes atualizados
};


const findAllChatsByProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let chats = await Chat.find({ members: userId });

    // Definir o nome do chat baseado no nome do outro membro
    const updatedChats = await defineChatName(chats, userId);

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: `Error occurred while finding chats of a user: ${error.message}` });
  }
};

const deleteChatById = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: `Error occurred while deleting chat of a user: ${error.message}` });
  }
};

//TODO Seria interessante checar se os membros passados no corpo da requisição realmente existem.
const updateChatById = async (req, res) => { 
  try {
    const { id } = req.params;
    if (members) {
      const allMembersExist = await checkMembersExist(members);
      if (!allMembersExist) {
        return res.status(400).json({ message: "One or more members do not exist." });
      }
    }
    await Chat.findByIdAndUpdate(id, req.body);
    return res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: `Error occurred while change proprieties chat: ${error.message}` });
  }
};

module.exports = {
  createChat,
  updateChatById,
  findAllChatsByProfile,
  deleteChatById,
};
