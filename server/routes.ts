// API routes for Fusion Mining Limited platform
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin, isSeller } from "./localAuth";
import { ZodError } from "zod";
import {
  insertUserProfileSchema,
  updateUserProfileSchema,
  insertProjectSchema,
  insertExpressInterestSchema,
  insertMarketplaceListingSchema,
  insertBuyerRequestSchema,
  insertMessageSchema,
  insertMessageTemplateSchema,
  insertBlogPostSchema,
  insertContactSubmissionSchema,
  insertActivityLogSchema,
  insertNotificationSchema,
  insertVideoSchema,
  updateVideoSchema,
} from "@shared/schema";
// import { getSession } from "./replitAuth";

// Helper function to format Zod errors
function formatZodError(error: ZodError): string {
  return error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ========================================================================
  // Auth Setup (Local Development)
  // ========================================================================
  await setupAuth(app);

    // ========================================================================
    // Username/Password Login (DEVELOPMENT ONLY)
    // ========================================================================
    if (process.env.NODE_ENV === 'development') {
      app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        // Simple hardcoded users for testing (NO SECURITY)
        const users = {
          admin: { id: 'test-admin-123', username: 'admin', password: 'admin123', role: 'admin', email: 'admin@fusionmining.com', firstName: 'Admin', lastName: 'User' },
          henry: { id: 'test-buyer-789', username: 'henry', password: 'henry123', role: 'buyer', email: 'henry@fusionmining.com', firstName: 'Henry', lastName: 'Pass' },
          ray: { id: 'test-seller-456', username: 'ray', password: 'ray123', role: 'seller', email: 'ray@fusionmining.com', firstName: 'Ray', lastName: 'Pass' },
        };
        const user = Object.values(users).find(u => u.username === username && u.password === password);
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Use passport login to set session
        req.login(user, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Login failed' });
          }
          res.json({ success: true, user });
        });
      });
    }
  // ========================================================================
  // Development Test Login (DEVELOPMENT ONLY)
  // ========================================================================
  if (process.env.NODE_ENV === 'development') {
    app.post('/api/test-login', async (req: any, res) => {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      try {
        let user = await storage.getUser(userId);
        
        // Auto-create test users if they don't exist
        if (!user) {
          const testUsers: { [key: string]: { email: string; firstName: string; lastName: string; role: string } } = {
            'test-admin-123': { email: 'admin@fusionmining.com', firstName: 'Admin', lastName: 'User', role: 'admin' },
            'test-seller-456': { email: 'ray@fusionmining.com', firstName: 'Ray', lastName: 'Pass', role: 'seller' },
            'test-buyer-789': { email: 'henry@fusionmining.com', firstName: 'Henry', lastName: 'Pass', role: 'buyer' },
          };

          const testUserData = testUsers[userId];
          if (testUserData) {
            user = await storage.upsertUser({
              id: userId,
              email: testUserData.email,
              firstName: testUserData.firstName,
              lastName: testUserData.lastName,
            });
            await storage.updateUserRole(userId, testUserData.role);
            user = await storage.getUser(userId);
          }
        }

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Use passport login
        req.login(user, (err: any) => {
          if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Failed to login" });
          }
          res.json({ 
            message: "Test login successful", 
            user 
          });
        });
      } catch (error) {
        console.error("Error during test login:", error);
        res.status(500).json({ message: "Failed to login" });
      }
    });

      app.post('/api/messages/mark-read', isAuthenticated, async (req: any, res) => {
        try {
          const userId = req.user.claims?.sub || req.user.id;
          const { messageIds } = req.body;
      
          if (!Array.isArray(messageIds)) {
            return res.status(400).json({ message: "messageIds must be an array" });
          }

          // Only mark messages as read if the user is the receiver
          for (const messageId of messageIds) {
            const message = await storage.getMessageById(messageId);
            if (message && message.receiverId === userId) {
              await storage.markMessageAsRead(messageId);
            }
          }

          res.json({ success: true });
        } catch (error) {
          console.error("Error marking messages as read:", error);
          res.status(500).json({ message: "Failed to mark messages as read" });
        }
      });
    // Logout endpoint
    app.post('/api/logout', (req, res) => {
      req.logout(() => {
        res.json({ message: "Logout successful" });
      });
    });

    app.post('/api/test-logout', (req, res) => {
      req.logout(() => {
        res.json({ message: "Test logout successful" });
      });
    });

    // Get current user endpoint
    app.get('/api/auth/user', async (req: any, res) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      try {
        // For hardcoded test users, return them directly
        if (req.user && req.user.id && req.user.id.startsWith('test-')) {
          return res.json(req.user);
        }
        
        // For database users, fetch from storage
        const user = await storage.getUser(req.user.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
      }
    });

    app.get('/api/test-accounts', async (req, res) => {
      try {
        const testAccounts = [
          { id: 'test-admin-123', email: 'admin@fusionmining.com', role: 'admin', name: 'Admin User' },
          { id: 'test-seller-456', email: 'ray@fusionmining.com', role: 'seller', name: 'Ray Pass' },
          { id: 'test-buyer-789', email: 'henry@fusionmining.com', role: 'buyer', name: 'Henry Pass' },
        ];
        res.json(testAccounts);
      } catch (error) {
        console.error("Error fetching test accounts:", error);
        res.status(500).json({ message: "Failed to fetch test accounts" });
      }
    });

    // Contact settings endpoint
    app.get('/api/contact-settings', async (req, res) => {
      try {
        const settings = await storage.getContactSettings();
        if (!settings) {
          return res.status(404).json({ message: 'Contact settings not found' });
        }
        res.json(settings);
      } catch (error) {
        console.error('Error fetching contact settings:', error);
        res.status(500).json({ message: 'Failed to fetch contact settings' });
      }
    });

    // Public endpoint to fetch a lightweight admin contact (id, name, email)
    // This allows the client to address in-app messages to the admin without
    // exposing the admin-only user listing endpoints.
    app.get('/api/admin/contact-user', async (req, res) => {
      try {
        const adminUser = await storage.getAdminUser();
        if (!adminUser) {
          return res.status(404).json({ message: 'Admin user not found' });
        }
        res.json({
          id: adminUser.id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          name: `${adminUser.firstName || ''} ${adminUser.lastName || ''}`.trim(),
        });
      } catch (error) {
        console.error('Error fetching admin contact user:', error);
        res.status(500).json({ message: 'Failed to fetch admin contact' });
      }
    });

    // Development-only: update contact settings quickly
    if (process.env.NODE_ENV === 'development') {
      app.post('/api/contact-settings', async (req, res) => {
        try {
          const payload = req.body || {};
          // Allow partial updates
          const updated = await storage.updateContactSettings(payload);
          res.json(updated);
        } catch (error) {
          console.error('Error updating contact settings:', error);
          res.status(500).json({ message: 'Failed to update contact settings' });
        }
      });
    }

    app.post('/api/seed-data', async (req, res) => {
      try {
        // Create test users first to avoid foreign key constraints
        const testUsers = [
          {
            id: 'test-admin-123',
            email: 'admin@fusionmining.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
          },
          {
            id: 'test-seller-456',
            email: 'ray@fusionmining.com',
            firstName: 'Ray',
            lastName: 'Pass',
            role: 'seller'
          },
          {
            id: 'test-buyer-789',
            email: 'henry@fusionmining.com',
            firstName: 'Henry',
            lastName: 'Pass',
            role: 'buyer'
          },
        ];

        for (const userData of testUsers) {
          try {
            let user = await storage.getUser(userData.id);
            if (!user) {
              user = await storage.upsertUser({
                id: userData.id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
              });
              await storage.updateUserRole(userData.id, userData.role);
            }
          } catch (error) {
            console.error(`Error creating user ${userData.id}:`, error);
          }
        }

        // Seed projects using storage interface
        const projectsData = [
          {
            name: "Konkola Copper Mine",
            description: "Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.",
            licenseType: "mining",
            minerals: ["Copper", "Cobalt"],
            location: "Copperbelt",
            latitude: "-12.4178",
            longitude: "27.4178",
            status: "active",
            area: "1,200 hectares",
            estimatedValue: "$500M - $1B",
          },
          {
            name: "Kagem Emerald Mine",
            description: "World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.",
            licenseType: "mining",
            minerals: ["Emerald"],
            location: "Copperbelt",
            latitude: "-13.0000",
            longitude: "28.0000",
            status: "active",
            area: "41 square kilometers",
            estimatedValue: "$100M - $300M",
          },
          {
            name: "Mwinilunga Gold Exploration",
            description: "New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.",
            licenseType: "exploration",
            minerals: ["Gold"],
            location: "Northern Province",
            latitude: "-11.7358",
            longitude: "24.4289",
            status: "active",
            area: "500 hectares",
            estimatedValue: "$50M - $150M",
          },
          {
            name: "Luapula Cobalt Processing",
            description: "Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.",
            licenseType: "processing",
            minerals: ["Cobalt"],
            location: "Luapula Province",
            latitude: "-11.6667",
            longitude: "28.7167",
            status: "active",
            area: "200 hectares",
            estimatedValue: "$200M - $400M",
          },
          {
            name: "Central Province Gold Fields",
            description: "Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.",
            licenseType: "exploration",
            minerals: ["Gold", "Silver"],
            location: "Central Province",
            latitude: "-14.4333",
            longitude: "28.2833",
            status: "pending",
            area: "800 hectares",
            estimatedValue: "$75M - $200M",
          },
          {
            name: "Kabwe Lead and Zinc Mine",
            description: "Historic mining site with significant lead and zinc deposits. Environmental remediation completed, ready for modern extraction methods.",
            licenseType: "mining",
            minerals: ["Lead", "Zinc", "Silver"],
            location: "Central Province",
            latitude: "-14.4469",
            longitude: "28.4469",
            status: "active",
            area: "950 hectares",
            estimatedValue: "$120M - $250M",
          },
          {
            name: "Mufulira Copper Expansion",
            description: "Expansion opportunity for established copper mining operations. Includes access to processing facilities and skilled workforce.",
            licenseType: "mining",
            minerals: ["Copper"],
            location: "Copperbelt",
            latitude: "-12.5500",
            longitude: "28.2667",
            status: "active",
            area: "1,500 hectares",
            estimatedValue: "$400M - $800M",
          },
          {
            name: "Solwezi Copper-Gold Project",
            description: "Combined copper and gold mining project in Northwestern Province. High-grade ore bodies with excellent exploration potential.",
            licenseType: "exploration",
            minerals: ["Copper", "Gold"],
            location: "Northwestern Province",
            latitude: "-12.1833",
            longitude: "26.3833",
            status: "active",
            area: "2,000 hectares",
            estimatedValue: "$300M - $600M",
          },
          {
            name: "Copperbelt Manganese Processing",
            description: "Modern manganese processing facility with export capabilities. Strategic location near major transport routes.",
            licenseType: "processing",
            minerals: ["Manganese"],
            location: "Copperbelt",
            latitude: "-12.8000",
            longitude: "28.2000",
            status: "active",
            area: "150 hectares",
            estimatedValue: "$80M - $150M",
          },
          {
            name: "Kafue Amethyst Mine",
            description: "High-quality amethyst deposits suitable for jewelry and collectors market. Eco-friendly mining practices in place.",
            licenseType: "mining",
            minerals: ["Amethyst", "Quartz"],
            location: "Southern Province",
            latitude: "-15.7667",
            longitude: "28.1833",
            status: "active",
            area: "300 hectares",
            estimatedValue: "$25M - $60M",
          },
        ];

        for (const project of projectsData) {
          try {
            await storage.createProject(project as any);
          } catch (error) {
            // Ignore duplicates
          }
        }

        // Seed marketplace listings
        const listingsData = [
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "High-Grade Copper Ore - 5000 Tonnes",
            description: "Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.",
            mineralType: "Copper",
            grade: "25% Cu content",
            location: "Kitwe, Copperbelt",
            quantity: "5,000 tonnes",
            price: "$4,500/tonne",
            status: "approved",
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Premium Zambian Emeralds - Investment Grade",
            description: "Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.",
            mineralType: "Emerald",
            grade: "AAA Grade",
            location: "Ndola, Copperbelt",
            quantity: "500 carats",
            price: "$8,000/carat",
            status: "approved",
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Battery-Grade Cobalt Hydroxide",
            description: "High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.",
            mineralType: "Cobalt",
            grade: "20% Co min",
            location: "Copperbelt",
            quantity: "2,000 tonnes",
            price: "$35,000/tonne",
            status: "approved",
          },
          {
            sellerId: "test-seller-456",
            type: "mineral",
            title: "Gold Ore Concentrate",
            description: "Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.",
            mineralType: "Gold",
            grade: "45 g/t Au",
            location: "Northern Province",
            quantity: "100 tonnes",
            price: "$1,200/tonne",
            status: "pending",
          },
          {
            sellerId: "test-seller-456",
            type: "partnership",
            title: "Joint Venture - Copper Mine Expansion",
            description: "Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.",
            location: "Copperbelt",
            status: "approved",
          },
          {
            sellerId: "test-seller-456",
            type: "partnership",
            title: "Emerald Processing Facility Partnership",
            description: "Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.",
            location: "Lusaka",
            status: "approved",
          },
        ];

        for (const listing of listingsData) {
          try {
            await storage.createMarketplaceListing(listing as any);
          } catch (error) {
            // Ignore duplicates
          }
        }

        // Seed buyer requests
        const requestsData = [
          {
            buyerId: "test-buyer-789",
            title: "Seeking Regular Copper Ore Supply",
            description: "International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.",
            mineralType: "Copper",
            quantity: "10,000 tonnes/month",
            budget: "$40-45M annually",
            location: "Any major mining region",
            status: "active",
          },
          {
            buyerId: "test-buyer-789",
            title: "High-Quality Emerald Procurement",
            description: "Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.",
            mineralType: "Emerald",
            quantity: "1,000+ carats quarterly",
            budget: "$5-10M per quarter",
            location: "Copperbelt preferred",
            status: "active",
          },
          {
            buyerId: "test-buyer-789",
            title: "Cobalt for Battery Manufacturing",
            description: "Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.",
            mineralType: "Cobalt",
            quantity: "5,000 tonnes annually",
            budget: "$150-200M annually",
            location: "Any region with export capability",
            status: "active",
          },
        ];

        for (const request of requestsData) {
          try {
            await storage.createBuyerRequest(request as any);
          } catch (error) {
            // Ignore duplicates
          }
        }

        // Seed blog posts
        const blogPostsData = [
          {
            authorId: "test-admin-123",
            title: "Zambia's Mining Sector: A Bright Future Ahead",
            slug: "zambia-mining-sector-bright-future",
            excerpt: "Exploring the opportunities and growth potential in Zambia's thriving mining industry.",
            content: `<p>Zambia's mining sector continues to show remarkable growth, driven by increasing global demand for copper, cobalt, and precious stones. The country's strategic location and stable political environment make it an attractive destination for mining investments.</p>
            
            <h2>Key Growth Drivers</h2>
            <p>Several factors are contributing to the sector's expansion:</p>
            <ul>
              <li>Growing demand for battery minerals, particularly cobalt</li>
              <li>Infrastructure improvements in mining regions</li>
              <li>Government support for sustainable mining practices</li>
              <li>Increased international investment partnerships</li>
            </ul>
            
            <h2>Investment Opportunities</h2>
            <p>For investors looking to enter the Zambian mining market, there are numerous opportunities across exploration, mining, and processing operations. The Fusion Mining Limited platform connects investors with verified projects and partnerships.</p>`,
            imageUrl: "",
            category: "Industry News",
            published: true,
          },
          {
            authorId: "test-admin-123",
            title: "Sustainable Mining Practices in Zambia",
            slug: "sustainable-mining-practices-zambia",
            excerpt: "How Zambian mining companies are embracing environmental responsibility and community development.",
            content: `<p>Environmental sustainability has become a cornerstone of modern mining operations in Zambia. Companies are increasingly adopting practices that minimize environmental impact while maximizing community benefits.</p>
            
            <h2>Environmental Initiatives</h2>
            <p>Leading mining operations in Zambia are implementing:</p>
            <ul>
              <li>Water recycling and conservation programs</li>
              <li>Renewable energy integration in mining operations</li>
              <li>Land rehabilitation and reforestation projects</li>
              <li>Wildlife corridor preservation</li>
            </ul>
            
            <h2>Community Development</h2>
            <p>Mining companies are partnering with local communities to provide education, healthcare, and economic opportunities, creating shared value for all stakeholders.</p>`,
            imageUrl: "",
            category: "Sustainability",
            published: true,
          },
          {
            authorId: "test-admin-123",
            title: "Copper Market Outlook 2025",
            slug: "copper-market-outlook-2025",
            excerpt: "Analysis of global copper demand trends and implications for Zambian producers.",
            content: `<p>The global copper market is experiencing a significant transformation, driven by the green energy transition and electric vehicle revolution. Zambia, as Africa's second-largest copper producer, is well-positioned to benefit from these trends.</p>
            
            <h2>Market Dynamics</h2>
            <p>Key trends shaping the copper market include:</p>
            <ul>
              <li>Surging demand from EV manufacturing sector</li>
              <li>Renewable energy infrastructure expansion</li>
              <li>Supply constraints in major producing regions</li>
              <li>Rising copper prices benefiting producers</li>
            </ul>
            
            <h2>Zambia's Advantage</h2>
            <p>With established infrastructure, skilled workforce, and abundant reserves, Zambian copper producers are capitalizing on favorable market conditions.</p>`,
            imageUrl: "",
            category: "Market Analysis",
            published: true,
          },
          {
            authorId: "test-admin-123",
            title: "Emerald Mining: Zambia's Hidden Gem",
            slug: "emerald-mining-zambia-hidden-gem",
            excerpt: "Discover why Zambian emeralds are among the finest in the world and the opportunities in this sector.",
            content: `<p>Zambia produces some of the world's finest emeralds, with the Kagem Mine being the largest single emerald mine globally. These precious stones are prized for their exceptional clarity and rich green color.</p>
            
            <h2>Quality and Value</h2>
            <p>Zambian emeralds are distinguished by:</p>
            <ul>
              <li>Superior clarity and color saturation</li>
              <li>Excellent size and quality consistency</li>
              <li>Ethical sourcing and full traceability</li>
              <li>Growing market recognition and premium pricing</li>
            </ul>
            
            <h2>Investment Potential</h2>
            <p>The emerald sector offers unique opportunities for investors, from mining operations to processing and jewelry manufacturing partnerships.</p>`,
            imageUrl: "",
            category: "Industry News",
            published: true,
          },
          {
            authorId: "test-admin-123",
            title: "Technology Revolution in African Mining",
            slug: "technology-revolution-african-mining",
            excerpt: "How digital transformation and innovation are reshaping mining operations across the continent.",
            content: `<p>African mining operations are embracing cutting-edge technologies to improve efficiency, safety, and sustainability. From autonomous vehicles to AI-powered exploration, the industry is undergoing a digital transformation.</p>
            
            <h2>Key Technologies</h2>
            <p>Innovations being adopted include:</p>
            <ul>
              <li>Drone surveying and mapping technologies</li>
              <li>IoT sensors for real-time monitoring</li>
              <li>AI and machine learning for resource optimization</li>
              <li>Blockchain for supply chain transparency</li>
            </ul>
            
            <h2>Benefits for Zambia</h2>
            <p>These technological advances are helping Zambian miners increase productivity while reducing environmental footprint and improving worker safety.</p>`,
            imageUrl: "",
            category: "Mining Tips",
            published: true,
          },
          {
            authorId: "test-admin-123",
            title: "Understanding Mining Licenses in Zambia",
            slug: "understanding-mining-licenses-zambia",
            excerpt: "A comprehensive guide to navigating the mining licensing process in Zambia.",
            content: `<p>Understanding the licensing framework is crucial for anyone looking to invest in Zambian mining. This guide covers the different types of licenses and the application process.</p>
            
            <h2>License Types</h2>
            <p>Zambia offers several mining license categories:</p>
            <ul>
              <li><strong>Exploration License:</strong> For initial prospecting and exploration activities</li>
              <li><strong>Mining License:</strong> For commercial mining operations</li>
              <li><strong>Processing License:</strong> For mineral processing facilities</li>
            </ul>
            
            <h2>Application Process</h2>
            <p>The licensing process involves geological surveys, environmental impact assessments, and community consultations. Working with experienced local partners can streamline the application process.</p>`,
            imageUrl: "",
            category: "Mining Tips",
            published: true,
          },
        ];

        for (const post of blogPostsData) {
          try {
            await storage.createBlogPost(post as any);
          } catch (error) {
            // Ignore duplicates
          }
        }

        res.json({ 
          message: "Sample data seeded successfully",
          details: {
            projects: projectsData.length,
            marketplaceListings: listingsData.length,
            buyerRequests: requestsData.length,
            blogPosts: blogPostsData.length,
          }
        });
      } catch (error) {
        console.error("Error seeding data:", error);
        res.status(500).json({ message: "Failed to seed data" });
      }
    });

    app.post('/api/seed-message-templates', async (req, res) => {
      try {
        const templates = [
          {
            name: 'Buyer Interest Confirmation',
            type: 'buyer_interest_to_buyer',
            subject: 'Thank you for your interest in {project_name}',
            content: 'Hello {buyer_name},\n\nThank you for expressing interest in {project_name}. Our admin team has been notified and will review your request shortly. We will get back to you with more information soon.\n\nBest regards,\nFusion Mining Limited',
            active: true,
          },
          {
            name: 'Admin Interest Notification',
            type: 'buyer_interest_to_admin',
            subject: 'New buyer interest in {project_name}',
            content: 'A new buyer ({buyer_name}) has expressed interest in {project_name}. Please review and respond accordingly.\n\nYou can view the details in your admin panel.',
            active: true,
          },
          {
            name: 'Seller Interest Notification',
            type: 'buyer_interest_to_seller',
            subject: 'New buyer interest in {listing_title}',
            content: 'Good news! A buyer ({buyer_name}) has expressed interest in your listing: {listing_title}.\n\nThe admin team will coordinate with them and keep you informed about the next steps.\n\nBest regards,\nFusion Mining Limited',
            active: true,
          },
        ];

        for (const template of templates) {
          await storage.createMessageTemplate(template as any);
        }

        res.json({ 
          message: "Message templates seeded successfully",
          count: templates.length
        });
      } catch (error) {
        console.error("Error seeding templates:", error);
        res.status(500).json({ message: "Failed to seed message templates" });
      }
    });
  }

  // ========================================================================
  // Auth Routes
  // ========================================================================
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ========================================================================
  // User Profile Routes
  // ========================================================================
  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = insertUserProfileSchema.parse({
        ...req.body,
        userId,
      });
      const profile = await storage.createUserProfile(validatedData);
      res.json(profile);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.patch('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const validatedData = updateUserProfileSchema.parse({
        ...req.body,
        userId,
      });
      const profile = await storage.updateUserProfile(validatedData);
      res.json(profile);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating profile:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // ========================================================================
  // Project Routes
  // ========================================================================
  app.get('/api/projects', async (req: any, res) => {
    try {
      const projects = await storage.getProjects();
      const isAdmin = req.user && req.user.role === 'admin';
      
      const filteredProjects = isAdmin 
        ? projects 
        : projects.filter(p => p.status === 'active');
      
      res.json(filteredProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const project = await storage.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch('/api/projects/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      res.json(project);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating project:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  app.patch('/api/projects/:id/close', isAuthenticated, async (req, res) => {
    try {
      const project = await storage.closeProject(req.params.id);
      res.json(project);
    } catch (error) {
      console.error("Error closing project:", error);
      res.status(500).json({ message: "Failed to close project" });
    }
  });

  app.post('/api/projects/interest', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId } = req.body;

      if (projectId) {
        const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
        if (hasInterest) {
          return res.status(400).json({ message: "You have already expressed interest in this project" });
        }
      }

      const validatedData = insertExpressInterestSchema.parse({
        ...req.body,
        userId,
      });
      const interest = await storage.expressProjectInterest(validatedData);

      const buyer = await storage.getUserById(userId);
      const adminUser = await storage.getAdminUser();
      
      if (projectId) {
        const project = await storage.getProjectById(projectId);
        
        if (adminUser && project && buyer) {
          const thread = await storage.createMessageThread({
            title: `Inquiry about: ${project.name}`,
            projectId,
            buyerId: userId,
            sellerId: adminUser.id,
            context: 'project_interest',
            status: 'open',
          });

          await storage.createNotification({
            userId: adminUser.id,
            type: 'interest_received',
            title: 'New Interest in Project',
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${project.name}`,
            link: `/admin/projects/${projectId}`,
          });

          const buyerTemplate = await storage.getMessageTemplateByType('buyer_interest_to_buyer');
          const adminTemplate = await storage.getMessageTemplateByType('buyer_interest_to_admin');

          if (buyerTemplate && adminUser) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: adminUser.id,
              receiverId: userId,
              subject: buyerTemplate.subject.replace('{project_name}', project.name),
              content: buyerTemplate.content.replace('{project_name}', project.name).replace('{buyer_name}', buyer.firstName || 'there'),
              context: 'project_interest',
              relatedProjectId: projectId,
              isAutoRelay: true,
            });
          }

          if (adminTemplate) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: userId,
              receiverId: adminUser.id,
              subject: adminTemplate.subject.replace('{project_name}', project.name),
              content: adminTemplate.content.replace('{project_name}', project.name).replace('{buyer_name}', `${buyer.firstName} ${buyer.lastName}`),
              context: 'project_interest',
              relatedProjectId: projectId,
              isAutoRelay: true,
            });
          }
        }
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        const seller = listing ? await storage.getUserById(listing.sellerId) : null;
        
        if (adminUser && listing && buyer) {
          const thread = await storage.createMessageThread({
            title: `Inquiry about: ${listing.title}`,
            listingId,
            buyerId: userId,
            sellerId: adminUser.id,
            context: 'marketplace',
            status: 'open',
          });

          await storage.createNotification({
            userId: adminUser.id,
            type: 'interest_received',
            title: 'New Interest in Listing',
            message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
            link: `/admin/marketplace/${listingId}`,
          });

          if (seller) {
            await storage.createNotification({
              userId: seller.id,
              type: 'interest_received',
              title: 'New Interest in Your Listing',
              message: `${buyer.firstName} ${buyer.lastName} expressed interest in ${listing.title}`,
              link: `/marketplace/${listingId}`,
            });
          }

          const buyerTemplate = await storage.getMessageTemplateByType('buyer_interest_to_buyer');
          const adminTemplate = await storage.getMessageTemplateByType('buyer_interest_to_admin');

          if (buyerTemplate && adminUser) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: adminUser.id,
              receiverId: userId,
              subject: buyerTemplate.subject.replace('{project_name}', listing.title),
              content: buyerTemplate.content.replace('{project_name}', listing.title).replace('{buyer_name}', buyer.firstName || 'there'),
              context: 'marketplace',
              relatedListingId: listingId,
              isAutoRelay: true,
            });
          }

          if (adminTemplate) {
            await storage.createMessage({
              threadId: thread.id,
              senderId: userId,
              receiverId: adminUser.id,
              subject: adminTemplate.subject.replace('{project_name}', listing.title),
              content: adminTemplate.content.replace('{project_name}', listing.title).replace('{buyer_name}', `${buyer.firstName} ${buyer.lastName}`),
              context: 'marketplace',
              relatedListingId: listingId,
              isAutoRelay: true,
            });
          }

          // Send automatic message to seller
          const sellerTemplate = await storage.getMessageTemplateByType('buyer_interest_to_seller');
          if (sellerTemplate && seller) {
            // Create a separate thread for admin-seller communication
            const adminSellerThread = await storage.createMessageThread({
              title: `Interest in your listing: ${listing.title}`,
              listingId,
              buyerId: adminUser.id,
              sellerId: seller.id,
              context: 'marketplace',
              status: 'open',
            });

            await storage.createMessage({
              threadId: adminSellerThread.id,
              senderId: adminUser.id,
              receiverId: seller.id,
              subject: sellerTemplate.subject.replace('{listing_title}', listing.title),
              content: sellerTemplate.content.replace('{listing_title}', listing.title).replace('{buyer_name}', `${buyer.firstName} ${buyer.lastName}`),
              context: 'marketplace',
              relatedListingId: listingId,
              isAutoRelay: true,
            });
          }
        }
      }

      // Create activity log
      await storage.createActivityLog({
        userId,
        activityType: 'interest_expressed',
        description: projectId ? `User expressed interest in project ${projectId}` : `User expressed interest in listing ${listingId}`,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      // Notify all admin users (use 'interest_received' notification type)
      const adminUsers = await storage.getUsersByRole('admin');
      // Resolve a short title for the target (project or listing)
      let titleText = '';
      if (projectId) {
        const proj = await storage.getProjectById(projectId);
        titleText = proj?.name || projectId;
      } else if (listingId) {
        const list = await storage.getMarketplaceListingById(listingId);
        titleText = list?.title || listingId;
      }

      for (const admin of adminUsers) {
        await storage.createNotification({
          userId: admin.id,
          type: 'interest_received',
          title: 'New Interest Expression',
          message: `${buyer?.firstName || ''} ${buyer?.lastName || ''} expressed interest in ${projectId ? 'project' : 'listing'}: ${titleText}`,
          link: projectId ? `/projects/${projectId}` : `/marketplace/${listingId}`,
        });
      }

      res.json(interest);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error expressing interest:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error expressing interest:", error);
      res.status(500).json({ message: "Failed to express interest" });
    }
  });

  app.get('/api/projects/:id/has-interest', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const projectId = req.params.id;
      const hasInterest = await storage.checkUserHasExpressedInterest(userId, projectId);
      res.json({ hasInterest });
    } catch (error) {
      console.error("Error checking interest:", error);
      res.status(500).json({ message: "Failed to check interest" });
    }
  });

  app.get('/api/admin/projects-interest', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const interests = await storage.getAllExpressedInterests();
      res.json(interests);
    } catch (error) {
      console.error("Error fetching expressed interests:", error);
      res.status(500).json({ message: "Failed to fetch expressed interests" });
    }
  });

  // ========================================================================
  // Marketplace Routes
  // ========================================================================
  app.get('/api/marketplace/listings', async (req: any, res) => {
    try {
      const { type, status } = req.query;
      const isAdmin = req.user && req.user.role === 'admin';
      const listings = await storage.getMarketplaceListings({
        type: type as string,
        status: status as string,
      });
      
      const filteredListings = isAdmin 
        ? listings 
        : listings.filter(l => l.status === 'approved');
      
      res.json(filteredListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });

  // Return a single listing including basic seller info (used by client when messages
  // don't include the listing payload).
  app.get('/api/marketplace/listings/:id', async (req, res) => {
    try {
      const listingId = req.params.id;
      const listing = await storage.getMarketplaceListingById(listingId);
      if (!listing) return res.status(404).json({ message: 'Listing not found' });
      const seller = listing.sellerId ? await storage.getUserById(listing.sellerId) : null;
      res.json({
        ...listing,
        sellerName: seller ? `${seller.firstName || ''} ${seller.lastName || ''}`.trim() : undefined,
      });
    } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).json({ message: 'Failed to fetch listing' });
    }
  });

  app.post('/api/marketplace/listings', isAuthenticated, isSeller, async (req: any, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertMarketplaceListingSchema.parse({
        ...req.body,
        sellerId,
      });
      const listing = await storage.createMarketplaceListing(validatedData);
      res.json(listing);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  });

  app.get('/api/marketplace/buyer-requests', async (req, res) => {
    try {
      const requests = await storage.getBuyerRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching buyer requests:", error);
      res.status(500).json({ message: "Failed to fetch buyer requests" });
    }
  });

  app.post('/api/marketplace/buyer-requests', isAuthenticated, async (req: any, res) => {
    try {
      const buyerId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBuyerRequestSchema.parse({
        ...req.body,
        buyerId,
      });
      const request = await storage.createBuyerRequest(validatedData);
      res.json(request);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating buyer request:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating buyer request:", error);
      res.status(500).json({ message: "Failed to create request" });
    }
  });

  app.get('/api/dashboard/listings', isAuthenticated, async (req: any, res) => {
    try {
      const sellerId = req.user.claims?.sub || req.user.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      res.status(500).json({ message: "Failed to fetch listings" });
    }
  });

  app.patch('/api/marketplace/listings/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertMarketplaceListingSchema.partial().parse(req.body);
      const listing = await storage.updateMarketplaceListing(req.params.id, validatedData);
      res.json(listing);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating listing:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Failed to update listing" });
    }
  });

  app.delete('/api/marketplace/listings/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteMarketplaceListing(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
    }
  });

  app.patch('/api/marketplace/listings/:id/close', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const user = await storage.getUserById(userId);
      const listing = await storage.getMarketplaceListingById(req.params.id);
      
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      
      if (user?.role !== 'admin' && listing.sellerId !== userId) {
        return res.status(403).json({ message: "Only the seller or admin can close this listing" });
      }
      
      const closedListing = await storage.closeMarketplaceListing(req.params.id);
      res.json(closedListing);
    } catch (error) {
      console.error("Error closing listing:", error);
      res.status(500).json({ message: "Failed to close listing" });
    }
  });

  // ========================================================================
  // Message Thread Routes
  // ========================================================================
  app.post('/api/threads', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId, title } = req.body;

      if (!projectId && !listingId) {
        return res.status(400).json({ message: "Either projectId or listingId is required" });
      }

      let sellerId = null;
      let threadTitle = title;

      if (projectId) {
        const project = await storage.getProjectById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        const adminUser = await storage.getAdminUser();
        sellerId = adminUser?.id || null;
        threadTitle = threadTitle || `Inquiry about: ${project.name}`;
      } else if (listingId) {
        const listing = await storage.getMarketplaceListingById(listingId);
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }
        // Always set admin as the seller for buyer inquiries
        const adminUser = await storage.getAdminUser();
        sellerId = adminUser?.id || null;
        threadTitle = threadTitle || `Inquiry about: ${listing.title}`;
      }

      const thread = await storage.createMessageThread({
        title: threadTitle,
        projectId,
        listingId,
        buyerId: userId,
        sellerId,
        status: 'open',
      });

      res.json(thread);
    } catch (error: any) {
      console.error("Error creating thread:", error);
      res.status(500).json({ message: "Failed to create thread" });
    }
  });

  app.get('/api/threads', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const threads = await storage.getThreadsByUserId(userId);
      res.json(threads);
    } catch (error) {
      console.error("Error fetching threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });

  // Admin endpoint to get all threads
  app.get('/api/threads/all', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const threads = await storage.getAllMessageThreads();
      res.json(threads);
    } catch (error) {
      console.error("Error fetching all threads:", error);
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });

  app.get('/api/threads/:id', isAuthenticated, async (req: any, res) => {
    try {
      const thread = await storage.getThreadById(req.params.id);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      res.json(thread);
    } catch (error) {
      console.error("Error fetching thread:", error);
      res.status(500).json({ message: "Failed to fetch thread" });
    }
  });

  // Return thread and participant (buyer/seller) details for UI header
  app.get('/api/threads/:id/details', isAuthenticated, async (req: any, res) => {
    try {
      const threadId = req.params.id;
      const details = await storage.getThreadWithParticipants(threadId);
      if (!details) return res.status(404).json({ message: 'Thread not found' });
      res.json(details);
    } catch (error) {
      console.error('Error fetching thread details:', error);
      res.status(500).json({ message: 'Failed to fetch thread details' });
    }
  });

  app.get('/api/threads/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const messages = await storage.getMessagesByThreadId(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching thread messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/threads/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const senderId = req.user.claims?.sub || req.user.id;
      const threadId = req.params.id;

      const thread = await storage.getThreadById(threadId);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }

      const sender = await storage.getUserById(senderId);
      if (!sender) {
        return res.status(404).json({ message: "User not found" });
      }

      const receiverId = senderId === thread.buyerId ? thread.sellerId : thread.buyerId;

      const validatedData = insertMessageSchema.parse({
        threadId,
        senderId,
        receiverId,
        subject: req.body.subject || thread.title,
        content: req.body.content,
        relatedProjectId: thread.projectId,
        relatedListingId: thread.listingId,
      });

      const message = await storage.createMessage(validatedData);
      await storage.updateThreadLastMessage(threadId);

      res.json(message);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.patch('/api/threads/:id/close', isAuthenticated, async (req: any, res) => {
    try {
      const thread = await storage.closeThread(req.params.id);
      res.json(thread);
    } catch (error) {
      console.error("Error closing thread:", error);
      res.status(500).json({ message: "Failed to close thread" });
    }
  });

  // ========================================================================
  // Message Routes
  // ========================================================================
  app.get('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const messages = await storage.getMessagesByUserId(userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const senderId = req.user.claims?.sub || req.user.id;
      const receiverId = req.body.receiverId;
      
      const sender = await storage.getUserById(senderId);
      const receiver = await storage.getUserById(receiverId);
      
      if (!sender || !receiver) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const adminUser = await storage.getAdminUser();
      const adminId = adminUser?.id;

      // Allow cases:
      // - admin can send to anyone
      // - messages to admin are allowed
      // - buyers/sellers can message admin
      // Additionally allow buyer -> listing.seller when the message references a listing
      let isAllowed =
        sender.role === 'admin' ||
        receiver.role === 'admin' ||
        (sender.role === 'buyer' && receiverId === adminId) ||
        (sender.role === 'seller' && receiverId === adminId);

      // If this message is intended to contact a listing seller, allow buyer -> seller
      const relatedListingId = req.body?.relatedListingId;
      if (!isAllowed && relatedListingId) {
        try {
          const listing = await storage.getMarketplaceListingById(relatedListingId);
          if (listing && listing.sellerId === receiverId) {
            // Allow buyer to message the listing's seller
            isAllowed = true;
          }
        } catch (err) {
          // don't block on listing lookup errors here; validation will catch missing fields
          console.warn('Failed to lookup listing for message authorization', err);
        }
      }

      if (!isAllowed) {
        return res.status(403).json({ 
          message: "You are not authorized to send this message. For inquiries about listings or projects, contact the listing seller or admin." 
        });
      }
      
      const validatedData = insertMessageSchema.parse({
        ...req.body,
        senderId,
      });
      const idempotencyKey = req.header('Idempotency-Key') || req.header('idempotency-key') || null;
      const message = await storage.createMessageWithIdempotency(idempotencyKey, validatedData);
      res.json(message);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating message:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get('/api/conversations/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.claims?.sub || req.user.id;
      const otherUserId = req.params.userId;
      const messages = await storage.getConversation(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });

  app.get('/api/messages/:id/details', isAuthenticated, async (req, res) => {
    try {
  const messageId = req.params.id;
  const currentUserId = (req as any).user?.claims?.sub || (req as any).user?.id;
  console.log(`Fetching message details for id=${messageId} (user=${currentUserId})`);
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) {
        console.warn(`Message not found: id=${messageId}`);
        return res.status(404).json({ message: "Message not found" });
      }

      // Mark message as read for the current user if it's addressed to them
      try {
        if (messageDetails.message && messageDetails.message.receiverId === currentUserId) {
          await storage.markMessageAsRead(messageId);
        }
      } catch (err) {
        console.error(`Failed to mark message read for id=${messageId}:`, err);
      }

      // Log minimal details for debugging and return the payload the client expects
      console.log(`Returning message details for id=${messageId}: sender=${messageDetails.sender?.id}`);
      res.json(messageDetails);
    } catch (error) {
      console.error("Error fetching message details:", error);
      res.status(500).json({ message: "Failed to fetch message details" });
    }
  });

  // Close a conversation (mark all messages between the two participants as closed)
  app.patch('/api/messages/:id/close', isAuthenticated, async (req: any, res) => {
    try {
      const messageId = req.params.id;
      const currentUserId = req.user.claims?.sub || req.user.id;

      // Load message details to ensure user is participant or admin
      const messageDetails = await storage.getMessageWithSenderDetails(messageId);
      if (!messageDetails) return res.status(404).json({ message: 'Message not found' });

      const main = messageDetails.message;
      const isParticipant = [main.senderId, main.receiverId].includes(currentUserId);
      const user = await storage.getUser(currentUserId);
      const isAdminUser = user?.role === 'admin';

      if (!isParticipant && !isAdminUser) {
        return res.status(403).json({ message: 'Not authorized to close this conversation' });
      }

      await storage.closeConversationByMessageId(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error closing conversation:', error);
      res.status(500).json({ message: 'Failed to close conversation' });
    }
  });

  app.get('/api/messages/check-contact', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const { projectId, listingId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      if (projectId) {
        const hasContacted = await storage.checkUserHasContactedAboutProject(userId, projectId as string);
        return res.json({ hasContacted });
      }

      if (listingId) {
        const hasContacted = await storage.checkUserHasContactedAboutListing(userId, listingId as string);
        return res.json({ hasContacted });
      }
      
      return res.status(400).json({ error: 'Either projectId or listingId is required' });
    } catch (error) {
      console.error("Error checking contact status:", error);
      return res.status(500).json({ error: 'Internal server error while checking contact status' });
      res.status(500).json({ message: "Failed to check contact status" });
    }
  });

  // Return a user's public details (admins can view any user; users can view themselves)
  app.get('/api/users/:id', isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user?.claims?.sub || req.user?.id;
      const targetId = req.params.id;

      // Allow if requesting own profile or admin
      const requestingUser = await storage.getUser(currentUserId);
      const isAdminUser = requestingUser?.role === 'admin';
      if (!isAdminUser && currentUserId !== targetId) {
        return res.status(403).json({ message: 'Not authorized to view this user' });
      }

      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const profile = await storage.getUserProfile(targetId);

      // Include listings and recent messages when admin or requesting own profile
      let listings = null;
      let recentMessages = null;
      try {
        listings = await storage.getListingsBySellerId(targetId);
      } catch (err) {
        listings = null;
      }

      // Only include message previews for admin users or the owner
      if (isAdminUser || currentUserId === targetId) {
        try {
          const msgs = await storage.getMessagesByUserId(targetId);
          // provide a small preview: last 5 messages
          recentMessages = (msgs || []).slice(0, 5).map(m => ({ id: m.id, content: m.content, createdAt: m.createdAt, senderId: m.senderId, receiverId: m.receiverId }));
        } catch (err) {
          recentMessages = null;
        }
      }

      res.json({ user, profile, listings, recentMessages });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  // Public profile endpoint (no authentication) with limited fields and public listings
  app.get('/api/public/users/:id', async (req: any, res) => {
    try {
      const targetId = req.params.id;
      const user = await storage.getUserById(targetId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const profile = await storage.getUserProfile(targetId);

  // Public listings: only return listings with status 'active' or published
  let publicListings: any[] = [];
      try {
        const allListings = await storage.getListingsBySellerId(targetId);
        publicListings = (allListings || []).filter(l => (l.status || '').toLowerCase() === 'active');
      } catch (err) {
        publicListings = [];
      }

      // Build public payload (exclude email/phone)
      const publicUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role };
      const publicProfile = { companyName: profile?.companyName, location: profile?.location, bio: profile?.bio };

      res.json({ user: publicUser, profile: publicProfile, listings: publicListings });
    } catch (error) {
      console.error('Error fetching public user profile:', error);
      res.status(500).json({ message: 'Failed to fetch public profile' });
    }
  });

  // ========================================================================
  // Blog Routes
  // ========================================================================
  app.get('/api/blog', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post('/api/blog', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const authorId = req.user.claims?.sub || req.user.id;
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId,
      });
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.patch('/api/blog/:id/publish', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const post = await storage.publishBlogPost(req.params.id);
      res.json(post);
    } catch (error) {
      console.error("Error publishing blog post:", error);
      res.status(500).json({ message: "Failed to publish blog post" });
    }
  });

  app.patch('/api/blog/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating blog post:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/blog/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  app.get('/api/blog/admin/all', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // ========================================================================
  // Contact Routes
  // ========================================================================
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error submitting contact form:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get('/api/contact/submissions', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.patch('/api/contact/submissions/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const submission = await storage.updateContactSubmissionStatus(req.params.id, status);
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  app.get('/api/contact/settings', async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching contact settings:", error);
      res.status(500).json({ message: "Failed to fetch contact settings" });
    }
  });

  app.patch('/api/contact/settings', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.updateContactSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Error updating contact settings:", error);
      res.status(500).json({ message: "Failed to update contact settings" });
    }
  });

  // ========================================================================
  // Admin Routes
  // ========================================================================
  app.get('/api/admin/verification-queue', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const listings = await storage.getPendingListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching verification queue:", error);
      res.status(500).json({ message: "Failed to fetch verification queue" });
    }
  });

  app.post('/api/admin/verify/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      await storage.approveListing(listingId, reviewerId);
      res.json({ message: "Listing approved successfully" });
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Failed to approve listing" });
    }
  });

  app.post('/api/admin/reject/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const reviewerId = req.user.claims?.sub || req.user.id;
      const listingId = req.params.id;
      await storage.rejectListing(listingId, reviewerId);
      res.json({ message: "Listing rejected successfully" });
    } catch (error) {
      console.error("Error rejecting listing:", error);
      res.status(500).json({ message: "Failed to reject listing" });
    }
  });

  app.get('/api/admin/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch('/api/admin/users/:id/role', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      if (!role || !['admin', 'buyer', 'seller'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const user = await storage.updateUserRole(req.params.id, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.delete('/api/admin/users/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Return marketplace listings for a specific user (admin only)
  app.get('/api/admin/users/:id/listings', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const sellerId = req.params.id;
      const listings = await storage.getListingsBySellerId(sellerId);
      res.json(listings);
    } catch (error) {
      console.error('Error fetching user listings (admin):', error);
      res.status(500).json({ message: 'Failed to fetch user listings' });
    }
  });

  // ========================================================================
  // Activity Log Routes
  // ========================================================================
  app.get('/api/admin/activity-logs', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const logs = await storage.getActivityLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  app.get('/api/activity-logs/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getUserActivityLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching user activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  // ========================================================================
  // Notification Routes
  // ========================================================================
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.get('/api/notifications/unread-count', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const count = await storage.getUnreadNotificationCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({ message: "Failed to fetch unread count" });
    }
  });

  app.post('/api/notifications/:id/read', isAuthenticated, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.post('/api/notifications/mark-all-read', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  // ========================================================================
  // Dashboard Stats Routes
  // ========================================================================
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user.id;
      const [listingsCount, unreadMessagesCount, interestsCount] = await Promise.all([
        storage.getUserListingsCount(userId),
        storage.getUserUnreadMessagesCount(userId),
        storage.getUserInterestsCount(userId),
      ]);
      res.json({
        listingsCount,
        unreadMessagesCount,
        interestsCount,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // ========================================================================
  // Video Routes
  // ========================================================================
  app.get('/api/videos/active', async (req, res) => {
    try {
      const videos = await storage.getActiveVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching active videos:", error);
      res.status(500).json({ message: "Failed to fetch active videos" });
    }
  });

  app.get('/api/videos', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post('/api/videos', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error creating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  app.patch('/api/videos/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = updateVideoSchema.parse({ ...req.body, id: req.params.id });
      const video = await storage.updateVideo(validatedData);
      res.json(video);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.error("Validation error updating video:", formatZodError(error));
        return res.status(400).json({ message: formatZodError(error) });
      }
      console.error("Error updating video:", error);
      res.status(500).json({ message: "Failed to update video" });
    }
  });

  app.post('/api/videos/:id/toggle-active', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const video = await storage.toggleVideoActive(req.params.id);
      res.json(video);
    } catch (error: any) {
      console.error("Error toggling video active status:", error);
      res.status(400).json({ message: error.message || "Failed to toggle video status" });
    }
  });

  app.delete('/api/videos/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteVideo(req.params.id);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
