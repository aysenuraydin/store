import { About, Contact, Faqs, Info, SocialMedia } from "../models/informations";

export class InformationsRepository {
  private about: About;
  private info: Info;
  private socialMedia: SocialMedia;
  private faqs: Faqs[];

  getFaqs(): Faqs[] {
    return this.faqs;
  }
  getSocialMedia(): SocialMedia{
    return this.socialMedia;
  }
  getInfo(): Info{
    return this.info;
  }
  getAbout(): About {
    return this.about;
  }
  constructor() {
    this.about = {
      id: 1,
      message: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis. &#10 Judith Black &#10 CEO of Workcation &#10 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis. &#10 Judith Black &#10 CEO of Workcation &#10 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.',
    };
    this.info = {
      id: 1,
      email: 'ays@ayd.com',
      phoneNumber: '5556667890',
      adress: 'Bursa/Orhangazi',
    };
    this.socialMedia = {
      id: 1,
      instagram: 'aysenuraydin1',
      facebook: 'aysenuraydin2',
      twitter: 'aysenuraydin3',
      githup: 'aysenuraydin4',
    };

    this.faqs = new Array<Faqs>(
      {
        id: 1,
        question: 'How long we deliver your first blog post?',
        answer: 'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .',
      },

      {
        id: 2,
        question: 'How long we deliver your first blog post?',
        answer: 'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .',
      },
      {
        id: 3,
        question: 'How long we deliver your first blog post?',
        answer: 'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .',
      },
      {
        id: 4,
        question: 'How long we deliver your first blog post?',
        answer: 'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .',
      },
      {
        id: 5,
        question: 'How long we deliver your first blog post?',
        answer: 'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .'
      }
    );

  }
}

