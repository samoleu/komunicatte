const { StreamChat } = require('stream-chat');

const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

exports.authenticateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const token = serverClient.createToken(id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createChannel = async (req, res) => {
  const { channelId, userId, members } = req.body;

  try {
      const channel = serverClient.channel('messaging', channelId, {
          created_by_id: userId,
          members: members,
      });

      await channel.create();

      // Return only essential properties
      res.status(200).json({
          id: channel.id,
          type: channel.type,
          created_by_id: channel.data.created_by_id,
          members: channel.data.members,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
    const { channelId, userId, text } = req.body;

    try {
        const channel = serverClient.channel('messaging', channelId);
        const message = await channel.sendMessage({ text, user_id: userId });

        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
