import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Create a new contact
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Create the contact
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all contacts
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a contact by ID
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }

    await contact.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
