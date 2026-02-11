// Seed script for development testing
import 'dotenv/config';
import { db } from "./db";
import { users, projects, marketplaceListings, buyerRequests, userProfiles, blogPosts, contactSettings, membershipBenefits, messageThreads, messages, paymentMethodDetails, tierUpgradeRequests, tierUpgradePayments } from "@shared/schema";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Starting database seeding...");

  try {
    // Create tier upgrade requests table if it doesn't exist
    console.log("Ensuring tier upgrade requests table exists...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS tier_upgrade_requests (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        requested_tier membership_tier NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'draft',
        rejection_reason TEXT,
        submitted_at TIMESTAMP WITH TIME ZONE,
        reviewed_at TIMESTAMP WITH TIME ZONE,
        reviewed_by VARCHAR(255) REFERENCES users(id),
        document_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `);
    console.log("✓ Tier upgrade requests table ready");

    // Seed membership tier benefits first
    console.log("Creating membership tier benefits...");

    await db.insert(membershipBenefits).values([
      {
        tier: "basic",
        maxActiveRFQs: 2,
        canAccessAnalytics: false,
        canDirectMessage: false,
        prioritySupport: false,
        visibilityRanking: 3, // Lowest visibility
        monthlyPrice: "0.00",
      },
      {
        tier: "standard",
        maxActiveRFQs: 10,
        canAccessAnalytics: true,
        canDirectMessage: true,
        prioritySupport: false,
        visibilityRanking: 2, // Medium visibility
        monthlyPrice: "49.99",
      },
      {
        tier: "premium",
        maxActiveRFQs: -1, // Unlimited
        canAccessAnalytics: true,
        canDirectMessage: true,
        prioritySupport: true,
        visibilityRanking: 1, // Highest visibility
        monthlyPrice: "199.99",
      },
    ]).onConflictDoUpdate({
      target: [membershipBenefits.tier],
      set: {
        maxActiveRFQs: sql`EXCLUDED.max_active_rfqs`,
        canAccessAnalytics: sql`EXCLUDED.can_access_analytics`,
        canDirectMessage: sql`EXCLUDED.can_direct_message`,
        prioritySupport: sql`EXCLUDED.priority_support`,
        visibilityRanking: sql`EXCLUDED.visibility_ranking`,
        monthlyPrice: sql`EXCLUDED.monthly_price`,
        updatedAt: sql`now()`,
      },
    });

    console.log("✓ Membership tier benefits created");

    // Create test users
    console.log("Creating test users...");

    const [adminUser] = await db.insert(users).values({
      id: "test-admin-123",
      email: "admin@fusionmining.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    }).onConflictDoNothing().returning();

    const [sellerUser] = await db.insert(users).values({
      id: "test-seller-456",
      email: "seller@fusionmining.com",
      firstName: "Sarah",
      lastName: "Seller",
      role: "seller",
    }).onConflictDoNothing().returning();

    const [buyerUser] = await db.insert(users).values({
      id: "test-buyer-789",
      email: "buyer@fusionmining.com",
      firstName: "Bob",
      lastName: "Buyer",
      role: "buyer",
    }).onConflictDoNothing().returning();

    console.log("✓ Test users created");

    // Create user profiles
    console.log("Creating user profiles...");

    await db.insert(userProfiles).values({
      userId: "test-seller-456",
      profileType: "company",
      companyName: "Copper Valley Mining Co.",
      phoneNumber: "+260 97 123 4567",
      location: "Kitwe, Copperbelt",
      bio: "Leading copper extraction company with 15 years of experience in Zambia's mining sector.",
      interests: ["Copper", "Cobalt", "Mining Equipment"],
      verified: true,
    }).onConflictDoNothing();

    await db.insert(userProfiles).values({
      userId: "test-buyer-789",
      profileType: "company",
      companyName: "Global Minerals Trading Ltd",
      phoneNumber: "+260 96 987 6543",
      location: "Lusaka, Zambia",
      bio: "International mineral trading company looking for quality Zambian minerals.",
      interests: ["Emeralds", "Copper", "Gold"],
      verified: true,
    }).onConflictDoNothing();

    console.log("✓ User profiles created");

    // Create sample projects
    console.log("Creating sample projects...");

    await db.insert(projects).values([
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
        name: "Solwezi Copper-Gold Prospect",
        description: "Promising copper-gold deposit in North-Western Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.",
        licenseType: "exploration",
        minerals: ["Copper", "Gold"],
        location: "North-Western Province",
        latitude: "-12.1833",
        longitude: "26.3833",
        status: "active",
        area: "650 hectares",
        estimatedValue: "$120M - $250M",
      },
      {
        name: "Southern Province Manganese",
        description: "Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.",
        licenseType: "exploration",
        minerals: ["Manganese"],
        location: "Southern Province",
        latitude: "-16.6667",
        longitude: "27.8667",
        status: "pending",
        area: "400 hectares",
        estimatedValue: "$60M - $140M",
      },
      {
        name: "Eastern Province Gemstone Fields",
        description: "Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.",
        licenseType: "mining",
        minerals: ["Aquamarine", "Tourmaline", "Amethyst"],
        location: "Eastern Province",
        latitude: "-13.5000",
        longitude: "32.0000",
        status: "active",
        area: "300 hectares",
        estimatedValue: "$30M - $80M",
      },
      {
        name: "Kafue River Uranium Project",
        description: "Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.",
        licenseType: "exploration",
        minerals: ["Uranium"],
        location: "Central Province",
        latitude: "-15.7667",
        longitude: "28.1833",
        status: "pending",
        area: "1,000 hectares",
        estimatedValue: "$200M - $500M",
      },
      {
        name: "Luanshya Copper Tailings Reprocessing",
        description: "Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.",
        licenseType: "processing",
        minerals: ["Copper"],
        location: "Copperbelt",
        latitude: "-13.1361",
        longitude: "28.4167",
        status: "active",
        area: "150 hectares",
        estimatedValue: "$80M - $180M",
      },
    ]).onConflictDoNothing();

    console.log("✓ Sample projects created");

    // Create marketplace listings
    console.log("Creating marketplace listings...");

    await db.insert(marketplaceListings).values([
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
      // Mining equipment / tools
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_tools",
        toolSubcategory: "heavy_equipment",
        title: "CAT 793F Haul Truck - Excellent Condition",
        description: "Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.",
        location: "Solwezi",
        quantity: "1 unit",
        price: "$1,200,000",
        status: "approved",
      },
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_tools",
        toolSubcategory: "drilling_equipment",
        title: "Exploration Drill Rig - Atlas Copco",
        description: "Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.",
        location: "Ndola",
        quantity: "2 units",
        price: "$220,000 each",
        status: "approved",
      },
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_tools",
        toolSubcategory: "ore_processing",
        title: "Mobile Jaw Crusher & Cone Plant",
        description: "Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.",
        location: "Kitwe",
        quantity: "1 plant",
        price: "$480,000",
        status: "pending",
      },
      // Mining services
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_services",
        serviceSubcategory: "drilling_blasting",
        title: "Specialist Drilling & Blasting Services",
        description: "Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.",
        location: "Copperbelt",
        price: "Contact for quote",
        status: "approved",
      },
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_services",
        serviceSubcategory: "freight_services",
        title: "Bulk Mineral Freight & Logistics",
        description: "End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.",
        location: "Lusaka",
        price: "Contact for quote",
        status: "approved",
      },
      {
        sellerId: "test-seller-456",
        type: "partnership",
        mainCategory: "mining_services",
        serviceSubcategory: "consulting_advisory",
        title: "Mining Feasibility & Technical Advisory",
        description: "Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.",
        location: "Lusaka",
        price: "$50,000+ (project dependent)",
        status: "approved",
      },
    ] as any).onConflictDoNothing();

    console.log("✓ Marketplace listings created");

    // Ensure main_category is populated for existing seeded rows
    console.log("Ensuring main_category for seeded listings...");
    await db.execute(sql`UPDATE marketplace_listings SET main_category = 'minerals' WHERE (main_category IS NULL OR main_category::text = '') AND (type = 'mineral' OR mineral_type IS NOT NULL);`);
    await db.execute(sql`UPDATE marketplace_listings SET main_category = 'mining_services' WHERE (main_category IS NULL OR main_category::text = '') AND type = 'partnership';`);
    await db.execute(sql`UPDATE marketplace_listings SET main_category = 'mining_equipment' WHERE (main_category IS NULL OR main_category::text = '') AND (tool_subcategory IS NOT NULL OR service_subcategory IS NOT NULL OR ppe_subcategory IS NOT NULL);`);
    console.log('✓ main_category fixes applied');

    // Create buyer requests
    console.log("Creating buyer requests...");

    await db.insert(buyerRequests).values([
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
    ]).onConflictDoNothing();

    console.log("✓ Buyer requests created");

    // Create blog posts (News & Insights)
    console.log("Creating blog posts...");

    await db.insert(blogPosts).values([
      {
        authorId: "test-admin-123",
        title: "Zambia's Copper Industry Sees Record Growth in 2025",
        slug: "zambia-copper-industry-record-growth-2025",
        excerpt: "The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.",
        content: `The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.

Industry analysts attribute this growth to several key factors:

**Increased Foreign Investment**
Major international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.

**Government Support**
The Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.

**Global Demand**
Rising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.

**Technological Advancements**
Modern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.

Looking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.`,
        category: "Industry News",
        published: true,
      },
      {
        authorId: "test-admin-123",
        title: "Emerald Mining: Zambia's Hidden Gem",
        slug: "emerald-mining-zambia-hidden-gem",
        excerpt: "Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.",
        content: `While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.

**Why Zambian Emeralds Stand Out**

Zambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.

**Major Production Sites**

The Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.

**Sustainable Mining Practices**

Leading emerald producers in Zambia have committed to responsible mining practices, including:
- Environmental rehabilitation programs
- Fair labor standards and community development
- Transparent supply chains to prevent conflict minerals
- Investment in local education and healthcare

**Market Growth**

The global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.

**Investment Opportunities**

For investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.`,
        category: "Market Analysis",
        published: true,
      },
      {
        authorId: "test-admin-123",
        title: "Sustainable Mining Practices Transform Zambian Industry",
        slug: "sustainable-mining-practices-zambia",
        excerpt: "Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.",
        content: `The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.

**Key Sustainability Initiatives**

1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.

2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.

3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.

4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.

**Economic and Environmental Benefits**

These sustainability measures aren't just good for the environment—they're good for business. Companies report:
- 25% reduction in operating costs through energy efficiency
- Improved relations with local communities
- Enhanced international reputation and access to ESG-focused investment
- Reduced regulatory risks and compliance costs

**The Road Ahead**

The Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.`,
        category: "Sustainability",
        published: true,
      },
      {
        authorId: "test-admin-123",
        title: "Investment Guide: Navigating Zambia's Mining Sector",
        slug: "investment-guide-zambia-mining-sector",
        excerpt: "A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.",
        content: `Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.

**Legal Framework**

Zambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:
- Mining rights and licenses
- Environmental obligations
- Tax structure and royalties
- Employment requirements
- Repatriation of profits

**Types of Mining Licenses**

1. **Exploration License**: Valid for 4 years, renewable
2. **Mining License**: Valid for 25 years, renewable
3. **Processing License**: For mineral processing facilities
4. **Artisanal License**: For small-scale operations

**Investment Incentives**

The government offers several incentives:
- Capital allowances on equipment and infrastructure
- Reduced corporate tax rates for the first 5 years
- Exemption from import duties on mining equipment
- Access to specially designated mining zones with enhanced infrastructure

**Due Diligence Checklist**

Before investing, conduct thorough due diligence:
- Geological surveys and resource assessments
- Environmental impact studies
- Title searches and license verification
- Community stakeholder consultations
- Infrastructure and logistics evaluation
- Market analysis for target minerals

**Success Factors**

Successful investors typically:
- Partner with experienced local operators
- Invest in community development
- Adopt international best practices
- Maintain transparent operations
- Plan for long-term sustainability

For personalized investment guidance, contact Fusion Mining Limited's advisory team.`,
        category: "Investment Guide",
        published: true,
      },
      {
        authorId: "test-admin-123",
        title: "Technology Revolutionizes Zambian Mining Operations",
        slug: "technology-revolutionizes-zambian-mining",
        excerpt: "From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.",
        content: `The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.

**AI and Machine Learning**

Mining companies are deploying AI systems for:
- Predictive maintenance reducing equipment downtime by 30%
- Ore grade detection and sorting optimization
- Real-time safety monitoring and hazard detection
- Resource estimation and exploration targeting

**Automation and Robotics**

Automated systems now handle:
- Drilling and blasting operations
- Ore transportation and processing
- Quality control and sampling
- Environmental monitoring

**Drone Technology**

Unmanned aerial vehicles (UAVs) are used for:
- Topographical mapping and surveying
- Infrastructure inspection
- Environmental compliance monitoring
- Security surveillance

**Digital Twins**

Several major operations have created digital replicas of their entire mining processes, enabling:
- Scenario planning and optimization
- Training simulations for operators
- Predictive modeling of equipment performance
- Real-time operations monitoring

**Blockchain for Traceability**

Zambian mines are pioneering blockchain-based supply chain tracking, ensuring:
- Conflict-free mineral certification
- Transparency for ESG investors
- Premium pricing for ethically sourced materials
- Reduced fraud and smuggling

**Skills Development**

This technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:
- Data analytics and AI
- Robotics and automation
- Digital systems management
- Cybersecurity

The tech revolution positions Zambia as Africa's most advanced mining destination.`,
        category: "Technology",
        published: true,
      },
    ]).onConflictDoNothing();

    console.log("✓ Blog posts created");

    // Upsert contact settings (idempotent) so contact info is persisted for the app
    console.log("Upserting contact settings...");
    await db.insert(contactSettings).values({
      id: "default-contact-settings",
      officeAddress: "Shaolin Temple, Ngwerere Road, Office # 1",
      phone: "+260 978 838 939",
      email: "support@fusionmining.com",
      supportEmail: "support@fusionmining.com",
      mondayFriday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed",
    }).onConflictDoUpdate({
      target: [contactSettings.id],
      set: {
        officeAddress: sql`EXCLUDED.office_address`,
        phone: sql`EXCLUDED.phone`,
        email: sql`EXCLUDED.email`,
        supportEmail: sql`EXCLUDED.support_email`,
        mondayFriday: sql`EXCLUDED.monday_friday`,
        saturday: sql`EXCLUDED.saturday`,
        sunday: sql`EXCLUDED.sunday`,
        updatedAt: sql`now()`,
      },
    });

    console.log("✓ Contact settings upserted");

    // Create support tickets for testing
    console.log("Creating support tickets...");

    await db.insert(messageThreads).values([
      {
        id: "ticket-001",
        title: "Account verification not working",
        type: "general",
        createdBy: "test-buyer-789",
        buyerId: "test-buyer-789",
        context: "general",
        status: "open",
        isAdminSupport: true,
        ticketStatus: "open",
        ticketPriority: "high",
        lastMessageAt: new Date(),
      },
      {
        id: "ticket-002",
        title: "Payment issue with subscription",
        type: "general",
        createdBy: "test-seller-456",
        buyerId: "test-seller-456",
        context: "general",
        status: "open",
        isAdminSupport: true,
        ticketStatus: "in_progress",
        ticketPriority: "urgent",
        assignedAdminId: "test-admin-123",
        lastMessageAt: new Date(),
      },
      {
        id: "ticket-003",
        title: "How to list products on marketplace",
        type: "general",
        createdBy: "test-seller-456",
        buyerId: "test-seller-456",
        context: "general",
        status: "open",
        isAdminSupport: true,
        ticketStatus: "waiting_user",
        ticketPriority: "normal",
        assignedAdminId: "test-admin-123",
        lastMessageAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "ticket-004",
        title: "Listing approval delay",
        type: "general",
        createdBy: "test-seller-456",
        buyerId: "test-seller-456",
        context: "general",
        status: "closed",
        isAdminSupport: true,
        ticketStatus: "resolved",
        ticketPriority: "normal",
        assignedAdminId: "test-admin-123",
        resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: "ticket-005",
        title: "KYC documentation rejected - please help",
        type: "general",
        createdBy: "test-buyer-789",
        buyerId: "test-buyer-789",
        context: "general",
        status: "open",
        isAdminSupport: true,
        ticketStatus: "open",
        ticketPriority: "high",
        lastMessageAt: new Date(),
      },
      {
        id: "ticket-006",
        title: "Can't reset password",
        type: "general",
        createdBy: "test-buyer-789",
        buyerId: "test-buyer-789",
        context: "general",
        status: "closed",
        isAdminSupport: true,
        ticketStatus: "resolved",
        ticketPriority: "high",
        assignedAdminId: "test-admin-123",
        resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]).onConflictDoNothing();

    console.log("✓ Support tickets created");

    // Create sample messages for support tickets
    console.log("Creating sample messages for tickets...");
    await db.insert(messages).values([
      // ticket-001: Account verification not working
      {
        threadId: "ticket-001",
        senderId: "test-buyer-789",
        receiverId: "test-admin-123",
        subject: "Account verification not working",
        content: "Hi, I submitted my verification documents but the status remains pending for days. Can someone help?",
        read: false,
        unread: true,
        context: 'general',
        createdAt: new Date(),
      },
      // ticket-002: Payment issue with subscription
      {
        threadId: "ticket-002",
        senderId: "test-seller-456",
        receiverId: "test-admin-123",
        subject: "Payment issue with subscription",
        content: "My subscription renewal failed but I was charged twice. Please advise.",
        read: false,
        unread: true,
        context: 'general',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
      {
        threadId: "ticket-002",
        senderId: "test-admin-123",
        receiverId: "test-seller-456",
        subject: "Re: Payment issue with subscription",
        content: "Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      // ticket-003: How to list products on marketplace (waiting for user)
      {
        threadId: "ticket-003",
        senderId: "test-admin-123",
        receiverId: "test-seller-456",
        subject: "Re: How to list products on marketplace",
        content: "Please provide the product images and the desired listing details. I can assist with publishing.",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1000 * 60 * 30),
      },
      // ticket-004: Listing approval delay (resolved)
      {
        threadId: "ticket-004",
        senderId: "test-seller-456",
        receiverId: "test-admin-123",
        subject: "Listing approval delay",
        content: "My listing has been pending approval for over a week. Any update?",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        threadId: "ticket-004",
        senderId: "test-admin-123",
        receiverId: "test-seller-456",
        subject: "Re: Listing approval delay",
        content: "Apologies — the listing was approved and is now live. Thanks for your patience.",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      // ticket-005: KYC documentation rejected
      {
        threadId: "ticket-005",
        senderId: "test-buyer-789",
        receiverId: "test-admin-123",
        subject: "KYC documentation rejected - please help",
        content: "I received a rejection notice for my KYC submission. What documents do I need to provide?",
        read: false,
        unread: true,
        context: 'general',
        createdAt: new Date(),
      },
      // ticket-006: Can't reset password (resolved)
      {
        threadId: "ticket-006",
        senderId: "test-buyer-789",
        receiverId: "test-admin-123",
        subject: "Can't reset password",
        content: "I tried the password reset link but it fails with an error. Please assist.",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        threadId: "ticket-006",
        senderId: "test-admin-123",
        receiverId: "test-buyer-789",
        subject: "Re: Can't reset password",
        content: "We've reset your password manually. Please check your email for a temporary link and update your password after login.",
        read: true,
        unread: false,
        context: 'general',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ] as any).onConflictDoNothing();

    console.log("✓ Sample messages created");

    // Seed payment methods
    console.log("Creating payment methods...");

    // Delete existing payment methods to ensure clean data
    await db.delete(paymentMethodDetails);

    await db.insert(paymentMethodDetails).values([
      {
        method: "bank_transfer",
        name: "Bank Transfer",
        description: "Direct bank transfer to our corporate account",
        instructions: `Please transfer the exact amount to:\n\nBank: First National Bank (FNB)\nAccount Name: Fusion Mining Limited\nAccount Number: 1234567890\nBranch: Lusaka Main\nSwift Code: FIRNZMLX\n\nReference: Your upgrade request ID`,
        accountDetails: {
          bank: "First National Bank (FNB)",
          accountName: "Fusion Mining Limited",
          accountNumber: "1234567890",
          branch: "Lusaka Main",
          swiftCode: "FIRNZMLX"
        },
        currencyCode: "ZMW",
        currencyName: "Zambian Kwacha",
      },
      {
        method: "airtel_money",
        name: "Airtel Money",
        description: "Mobile money transfer via Airtel Money",
        instructions: `Send money to:\n\nPhone Number: +260 97 123 4567\nName: Fusion Mining Limited\n\nReference: Your upgrade request ID\n\nPlease ensure you send from a registered Airtel Money account.`,
        accountDetails: {
          phoneNumber: "+260 97 123 4567",
          name: "Fusion Mining Limited",
          qrCode: "/attached_assets/files/payments/wechat_qr.jpg"
        },
        currencyCode: "ZMW",
        currencyName: "Zambian Kwacha",
      },
      {
        method: "wechat_alipay",
        name: "WeChat Pay / Alipay",
        description: "Payment via WeChat Pay or Alipay for international users",
        instructions: `Scan the QR code or use the following details:\n\nWeChat Pay ID: fusionmining_zambia\nAlipay ID: fusionmining@alipay.com\n\nReference: Your upgrade request ID\n\nContact us if you need assistance with the payment.`,
        accountDetails: {
          wechatId: "fusionmining_zambia",
          alipayId: "fusionmining@alipay.com",
          wechatQrCode: "/attached_assets/files/payments/wechat_qr.jpg",
          alipayQrCode: "/attached_assets/files/payments/alipay_qr.jpg"
        },
        currencyCode: "CNY",
        currencyName: "Chinese Yuan",
      },
    ]);

    console.log("✓ Payment methods created/updated");

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\nTest Account Credentials:");
    console.log("========================");
    console.log("Admin: admin@fusionmining.com (test-admin-123)");
    console.log("Seller: seller@fusionmining.com (test-seller-456)");
    console.log("Buyer: buyer@fusionmining.com (test-buyer-789)");

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
