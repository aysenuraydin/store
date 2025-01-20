import { About, Contact, Faqs, Info, SocialMedia } from "../models/informations";

export class InformationsRepository {

  private about: About[];
  private info: Info[];
  private socialMedia: SocialMedia[];
  private faqs: Faqs[];

  getFaqs(): Faqs[] {
    return this.faqs;
  }

  getSocialMedia(): SocialMedia[] {
    return this.socialMedia;
  }

  getInfo(): Info[] {
    return this.info;
  }

  getAbout(): About[] {
    return this.about;
  }

  constructor() {
      this.about = new Array<About>(
        {
          id: 1,
          message: `At TechSolutions, we are committed to providing the best tech solutions to help your business grow and thrive in the digital world. Our team of experienced professionals works tirelessly to create innovative and customized solutions to meet your specific needs. Whether you're looking for software development, cloud solutions, or IT support, we've got you covered. Our founder, John Doe, has over 20 years of experience in the industry, ensuring that you get the most reliable and cutting-edge services.`
        }
      );

      this.info = new Array<Info>(
        {
          id: 1,
          email: 'contact@techsolutions.com',
          phoneNumber: '+1 (555) 123-4567',
          adress: '123 Tech St, Silicon Valley, CA, USA',
        }
      );

      this.socialMedia = new Array<SocialMedia>(
        {
          id: 1,
          instagram: '@techsolutions',
          facebook: 'TechSolutionsOfficial',
          twitter: '@TechSolutionsHQ',
          github: 'techsolutions',
        }
      );

      this.faqs = new Array<Faqs>(
        {
          id: 1,
          question: 'How long does it take to develop a custom software solution?',
          answer: 'It typically takes 8-12 weeks to develop a custom software solution, depending on the complexity and specific requirements of the project. We focus on delivering high-quality, scalable solutions tailored to your business needs.',
        },

        {
          id: 2,
          question: 'Do you offer ongoing maintenance and support for your solutions?',
          answer: 'Yes, we offer ongoing maintenance and support services to ensure that your software runs smoothly and remains up-to-date with the latest features and security patches. Our support team is available 24/7 to assist you.',
        },

        {
          id: 3,
          question: 'Can I integrate your solutions with my existing systems?',
          answer: 'Absolutely! Our solutions are designed to be flexible and compatible with a wide range of existing systems. Our team will work closely with you to ensure a seamless integration process.',
        },

        {
          id: 4,
          question: 'What industries do you specialize in?',
          answer: 'We specialize in a variety of industries, including healthcare, finance, retail, and education. Our solutions are customizable to fit the unique needs of each industry, ensuring optimal performance and efficiency.',
        },

        {
          id: 5,
          question: 'How much does a custom software solution cost?',
          answer: 'The cost of a custom software solution varies depending on the scope of the project, the technologies involved, and the timeline. We provide a detailed estimate after discussing your requirements and project goals.',
        }
      );
  }
}
