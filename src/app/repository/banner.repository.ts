import { Banner } from "../models/banner";

export class BannerRepository {
  private banners: Banner[];

  constructor() {
      this.banners = new Array<Banner>(
          {
            id: 1,
            message: 'Join us at TechSummit 2025 in New York from September 14 - 16. Discover the future of technology!',
            createdAt: new Date(),
            button: 'Register Now',
            isActive: true
          },
          {
            id: 2,
            message: 'The Digital Marketing Conference 2025 is happening in Los Angeles on October 2-4. Don’t miss out!',
            createdAt: new Date(),
            button: 'Sign Up Today',
            isActive: false
          },
          {
            id: 3,
            message: 'CyberSecurity Expo 2025 – Meet experts and innovators at the global cybersecurity event in San Francisco, November 3-5.',
            createdAt: new Date(),
            button: 'Learn More',
            isActive: false
          },
          {
            id: 4,
            message: 'Artificial Intelligence and Machine Learning Summit 2025. Join the leaders of AI in Chicago, December 10-12.',
            createdAt: new Date(),
            button: 'Get Tickets',
            isActive: false
          },
          {
            id: 5,
            message: 'Global Sustainability Forum 2025 will be held in London on November 20-22. Join us in shaping the future!',
            createdAt: new Date(),
            button: 'Register Here',
            isActive: false
          },
      );
  }

  getBanners(): Banner[] {
    return this.banners;
  }
}
