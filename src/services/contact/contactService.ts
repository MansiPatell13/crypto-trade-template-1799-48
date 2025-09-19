import { ContactData, ContactResponse } from '@/types/common';

class ContactService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async send(data: ContactData): Promise<ContactResponse> {
    await this.delay(500);
    
    // Validation
    if (!data.name?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
      return {
        ok: false,
        error: 'All fields are required'
      };
    }
    
    if (!this.validateEmail(data.email)) {
      return {
        ok: false,
        error: 'Invalid email address'
      };
    }
    
    // Mock success response
    console.log('Contact form submitted:', data);
    
    return { ok: true };
  }
}

export const contactService = new ContactService();