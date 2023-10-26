import { messagesModel } from "../models/messages.model.js";

class MessagesManager {
    async findAll() {
      const result = await messagesModel.find().lean();
      return result;
    }

    async createOne(email, message) {
        const result = await messagesModel.create(email, message);
        return result;
    }  
  }
  
  export const messagesManager = new MessagesManager()