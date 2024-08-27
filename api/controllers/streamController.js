const { StreamChat } = require('stream-chat');

const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

exports.authenticateUser = async (req, res) => {
    try {
        const { id, name } = req.params;
        const userResponse = await serverClient.queryUsers({ id });

        if (userResponse.users.length === 0) {
            await serverClient.upsertUser({
                id,
                name: name ? name : "New user",
                role: "user",
            });
        }
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

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await serverClient.queryUsers({ id: { $in: [id] } });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getChannelByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const channels = await serverClient.queryChannels({
            members: { $in: [id] },
        });

        const sanitizedChannels = channels.map(channel => ({
            id: channel.id,
            name: channel.data.name,
            members: channel.state.members,
            created_at: channel.data.created_at,
            updated_at: channel.data.updated_at,
            created_by: channel.data.created_by,
        }));

        res.status(200).json({ channels: sanitizedChannels });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}