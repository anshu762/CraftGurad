// server/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@craftguard.com' },
    update: {},
    create: {
      email: 'admin@craftguard.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'CraftGuard',
      role: 'SUPER_ADMIN',
      isActive: true,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create artisan users
  const artisanPassword = await bcrypt.hash('Artisan@123456', 12);

  const artisanUser1 = await prisma.user.upsert({
    where: { email: 'lakshmi@craftguard.com' },
    update: {},
    create: {
      email: 'lakshmi@craftguard.com',
      passwordHash: artisanPassword,
      firstName: 'Lakshmi',
      lastName: 'Devi',
      phone: '+91-9876543210',
      role: 'ARTISAN',
      isActive: true,
      emailVerified: true,
    },
  });

  const artisanUser2 = await prisma.user.upsert({
    where: { email: 'savitri@craftguard.com' },
    update: {},
    create: {
      email: 'savitri@craftguard.com',
      passwordHash: artisanPassword,
      firstName: 'Savitri',
      lastName: 'Hallur',
      phone: '+91-9876543211',
      role: 'ARTISAN',
      isActive: true,
      emailVerified: true,
    },
  });

  const artisanUser3 = await prisma.user.upsert({
    where: { email: 'meenakshi@craftguard.com' },
    update: {},
    create: {
      email: 'meenakshi@craftguard.com',
      passwordHash: artisanPassword,
      firstName: 'Meenakshi',
      lastName: 'Pujar',
      phone: '+91-9876543212',
      role: 'ARTISAN',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Artisan users created');

  // Create crafts
  const kasuti = await prisma.craft.upsert({
    where: { type: 'KASUTI' },
    update: {},
    create: {
      name: 'Kasuti Embroidery',
      type: 'KASUTI',
      description: 'Kasuti is a traditional form of folk embroidery practiced in the state of Karnataka, India. This ancient craft involves creating intricate geometric patterns and motifs on handloom fabrics using pure cotton or silk threads. The word "Kasuti" is derived from "kai" (hand) and "suti" (cotton), reflecting its handmade cotton heritage. The embroidery is characterized by its precision — the design appears identical on both sides of the fabric.',
      heroImageUrl: '/images/kasuti-hero.jpg',
    },
  });

  const ilkal = await prisma.craft.upsert({
    where: { type: 'ILKAL' },
    update: {},
    create: {
      name: 'Ilkal Weaving',
      type: 'ILKAL',
      description: 'Ilkal sarees are traditional handloom sarees that originate from the town of Ilkal in Bagalkot district of Karnataka, India. These sarees are known for their distinctive style of joining the body and pallu (the decorative end piece) using a unique technique called "topi teni" or the "Kondi." The characteristic features include a red or maroon body with a contrasting pallu, often featuring traditional motifs and borders.',
      heroImageUrl: '/images/ilkal-hero.jpg',
    },
  });

  console.log('✅ Crafts created');

  // Create artisan profiles
  const artisan1 = await prisma.artisanProfile.upsert({
    where: { userId: artisanUser1.id },
    update: {},
    create: {
      userId: artisanUser1.id,
      displayName: 'Lakshmi Devi',
      location: 'Dharwad, Karnataka',
      biography: 'Lakshmi Devi has been practicing Kasuti embroidery for over 30 years, learning the craft from her grandmother in the small village of Kundgol. Her work is known for its extraordinary precision — each stitch placed with mathematical accuracy, creating patterns that appear identical on both sides of the fabric. She has trained over 50 young women in the art of Kasuti, ensuring this ancient tradition continues to thrive.',
      craftAssociation: 'KASUTI',
      portraitUrl: '/images/artisans/lakshmi-portrait.jpg',
      quote: 'Each stitch carries the memory of the women who came before me. When I embroider, I am not just making a pattern — I am continuing a conversation that began centuries ago.',
      quoteApproved: true,
      profileVisible: true,
      contactVisible: false,
    },
  });

  const artisan2 = await prisma.artisanProfile.upsert({
    where: { userId: artisanUser2.id },
    update: {},
    create: {
      userId: artisanUser2.id,
      displayName: 'Savitri Hallur',
      location: 'Ilkal, Bagalkot, Karnataka',
      biography: 'Savitri Hallur represents the fourth generation of weavers in her family. Working from her home in Ilkal town, she weaves traditional Ilkal sarees on a pit loom that has been in her family for decades. Her specialty lies in the "topi teni" technique — the distinctive method of joining the saree body to its pallu that gives Ilkal sarees their unique character.',
      craftAssociation: 'ILKAL',
      portraitUrl: '/images/artisans/savitri-portrait.jpg',
      quote: 'The loom speaks its own language. After years of weaving, my hands know the rhythm of the threads. Every saree I weave tells a story of Ilkal — our traditions, our colours, our identity.',
      quoteApproved: true,
      profileVisible: true,
      contactVisible: false,
    },
  });

  const artisan3 = await prisma.artisanProfile.upsert({
    where: { userId: artisanUser3.id },
    update: {},
    create: {
      userId: artisanUser3.id,
      displayName: 'Meenakshi Pujar',
      location: 'Guledgud, Karnataka',
      biography: 'Meenakshi Pujar brings a contemporary vision to traditional Kasuti while deeply respecting its roots. She specializes in adapting traditional motifs — the chariot, the palanquin, the gopura — for modern applications while maintaining the authentic stitch techniques that make Kasuti unique.',
      craftAssociation: 'KASUTI',
      portraitUrl: '/images/artisans/meenakshi-portrait.jpg',
      quote: 'Kasuti is not just embroidery. It is a meditation. It teaches patience, precision, and the beauty of repetition. Every motif has a meaning, and every meaning connects us to our land.',
      quoteApproved: true,
      profileVisible: true,
      contactVisible: false,
    },
  });

  console.log('✅ Artisan profiles created');

  // Create stories
  const kasutiStory = await prisma.story.upsert({
    where: { slug: 'kasuti-embroidery-tradition' },
    update: {},
    create: {
      title: 'Kasuti — The Living Thread of Karnataka',
      slug: 'kasuti-embroidery-tradition',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      subtitle: 'An embroidery tradition carried through pattern, memory and labour',
      introduction: 'In the northern reaches of Karnataka, where red earth meets the Deccan plateau, an embroidery tradition has survived for over five centuries. Kasuti — derived from "kai" (hand) and "suti" (cotton) — is not merely decorative needlework. It is a living language of geometric precision, cultural memory, and patient artistry passed from grandmother to granddaughter across generations.',
      heroMediaUrl: '/images/stories/kasuti-hero.jpg',
      heroMediaAlt: 'Close-up of hands creating intricate Kasuti embroidery with red and gold thread on dark fabric',
      seoTitle: 'Kasuti Embroidery — A Living Tradition of Karnataka | CRAFTGUARD',
      seoDescription: 'Discover the ancient art of Kasuti embroidery from Karnataka, India. Learn about its origins, techniques, artisans, and the geometric patterns that have been preserved for centuries.',
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  const ilkalStory = await prisma.story.upsert({
    where: { slug: 'ilkal-weaving-tradition' },
    update: {},
    create: {
      title: 'Ilkal — Woven Identity of the Deccan',
      slug: 'ilkal-weaving-tradition',
      craftId: ilkal.id,
      craftType: 'ILKAL',
      subtitle: 'A weaving heritage that binds community, colour and tradition in every thread',
      introduction: 'In the dusty lanes of Ilkal town in Bagalkot district, the rhythmic clacking of pit looms creates a soundscape that has defined this community for generations. The Ilkal saree — with its distinctive red body, contrasting pallu, and the signature "topi teni" joining technique — is more than a textile. It is an expression of regional identity woven thread by thread.',
      heroMediaUrl: '/images/stories/ilkal-hero.jpg',
      heroMediaAlt: 'Wide shot of a weaver working on a traditional pit loom creating an Ilkal saree with rich red and gold threads',
      seoTitle: 'Ilkal Weaving — The Handloom Heritage of Karnataka | CRAFTGUARD',
      seoDescription: 'Explore the traditional art of Ilkal saree weaving from Karnataka. Discover the unique topi teni technique, vibrant colours, and the weavers who keep this heritage alive.',
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Stories created');

  // Create story sections for Kasuti
  const kasutiSections = [
    {
      storyId: kasutiStory.id,
      sectionNumber: 1,
      sectionLabel: 'ORIGIN',
      heading: 'A Living Embroidery Tradition',
      bodyText: 'Kasuti embroidery finds its roots in the Dharwad and Belgaum regions of northern Karnataka, where it has been practiced for over five centuries. Historical records trace its origins to the Chalukyan dynasty, where it adorned the garments of royalty and gradually became a folk art practiced in villages across the region. The craft survived because it was woven into the fabric of daily life — literally adorning the sarees, blouses, and household textiles of ordinary families.',
      primaryImageUrl: '/images/stories/kasuti-origin.jpg',
      primaryImageAlt: 'Historical textile fragment showing early Kasuti embroidery patterns from Karnataka',
      imageCaption: 'Traditional Kasuti patterns have remained remarkably consistent over centuries, each motif carrying specific cultural significance.',
      displayOrder: 1,
      isPublished: true,
      layoutType: 'full-width',
    },
    {
      storyId: kasutiStory.id,
      sectionNumber: 2,
      sectionLabel: 'THE MAKING',
      heading: 'Stitch, Fabric, Tools, Repetition',
      bodyText: 'Kasuti employs four fundamental stitches: Gavanti (double running stitch), Murgi (zigzag), Negi (darning stitch), and Menthi (cross-stitch). The most remarkable aspect is that the embroidery appears identical on both sides of the fabric — a feat requiring extraordinary precision and spatial memory. The artisan works without marked guidelines, counting threads in the weave of the fabric to place each stitch with mathematical accuracy.',
      primaryImageUrl: '/images/stories/kasuti-making-1.jpg',
      primaryImageAlt: 'Close-up of Kasuti embroidery showing the gavanti double running stitch technique',
      secondaryImageUrl: '/images/stories/kasuti-making-2.jpg',
      secondaryImageAlt: 'Artisan hands carefully counting threads while creating Kasuti embroidery',
      imageCaption: 'The gavanti stitch creates patterns that appear identical on both sides of the fabric, requiring extraordinary precision.',
      quote: 'You cannot rush Kasuti. The fabric tells you where to place each stitch. You must listen to the threads.',
      quoteAttribution: 'Lakshmi Devi, Kasuti artisan, Dharwad',
      displayOrder: 2,
      isPublished: true,
      layoutType: 'split',
    },
    {
      storyId: kasutiStory.id,
      sectionNumber: 3,
      sectionLabel: 'MATERIALS & MOTIFS',
      heading: 'Patterns That Carry Meaning',
      bodyText: 'Traditional Kasuti motifs draw from the natural and cultural landscape of Karnataka. The Ratha (chariot), Gopura (temple tower), Palanquin, Conch shell, Lotus, and various geometric patterns each carry specific cultural significance. The colour palette traditionally centres around deep reds, blacks, and greens, with threads of silk or cotton on handloom fabric. Contemporary artisans sometimes expand this palette while maintaining the geometric discipline that defines Kasuti.',
      primaryImageUrl: '/images/stories/kasuti-motifs.jpg',
      primaryImageAlt: 'Collection of traditional Kasuti motifs including chariot, gopura, and lotus patterns',
      imageCaption: 'Each traditional motif — the chariot, the temple tower, the conch — carries centuries of cultural meaning.',
      displayOrder: 3,
      isPublished: true,
      layoutType: 'image-left',
    },
    {
      storyId: kasutiStory.id,
      sectionNumber: 4,
      sectionLabel: 'THE MAKER',
      heading: 'Hands That Remember',
      bodyText: 'Behind every Kasuti piece is an artisan whose hands carry the memory of generations. These women — and Kasuti has historically been practiced almost exclusively by women — begin learning as children, sitting beside their mothers and grandmothers, watching before they are allowed to hold a needle. The knowledge is transmitted not through written instructions but through observation, repetition, and the patient correction of elders.',
      primaryImageUrl: '/images/stories/kasuti-maker.jpg',
      primaryImageAlt: 'Portrait of Lakshmi Devi working on Kasuti embroidery in her home workshop in Dharwad',
      quote: 'Each stitch carries the memory of the women who came before me. When I embroider, I am not just making a pattern — I am continuing a conversation that began centuries ago.',
      quoteAttribution: 'Lakshmi Devi, Dharwad',
      displayOrder: 4,
      isPublished: true,
      layoutType: 'portrait',
    },
    {
      storyId: kasutiStory.id,
      sectionNumber: 5,
      sectionLabel: 'THE CHALLENGE',
      heading: 'Visibility, Pricing, and Market Barriers',
      bodyText: 'Despite its cultural significance, Kasuti faces significant challenges. Machine-produced imitations flood the market at a fraction of the cost, making it difficult for authentic handwork to compete. Many artisans struggle with market access — their work is extraordinary, but it rarely reaches buyers who would value and fairly compensate the skill and time involved. A single Kasuti piece can take weeks or months to complete, yet artisans often receive only a fraction of what their work deserves.',
      primaryImageUrl: '/images/stories/kasuti-challenge.jpg',
      primaryImageAlt: 'Workshop setting showing the tools and workspace of a Kasuti artisan, highlighting the traditional working conditions',
      imageCaption: 'The challenge is not the craft itself — it is ensuring that the market recognises and fairly compensates the extraordinary skill involved.',
      displayOrder: 5,
      isPublished: true,
      layoutType: 'full-width',
    },
  ];

  for (const section of kasutiSections) {
    await prisma.storySection.create({ data: section });
  }

  // Create story sections for Ilkal
  const ilkalSections = [
    {
      storyId: ilkalStory.id,
      sectionNumber: 1,
      sectionLabel: 'ORIGIN',
      heading: 'A Weaving Heritage of the Deccan',
      bodyText: 'The Ilkal saree tradition traces its origins to the town of Ilkal in Bagalkot district of northern Karnataka, where weaving has been the primary occupation for hundreds of families across generations. The town itself is synonymous with the craft — the name "Ilkal" has become shorthand for this distinctive style of handloom saree across Karnataka and beyond. Historical records suggest that this weaving tradition has flourished for over four centuries, deeply intertwined with the cultural and economic life of the region.',
      primaryImageUrl: '/images/stories/ilkal-origin.jpg',
      primaryImageAlt: 'Panoramic view of Ilkal town with visible weaving workshops and drying threads in the foreground',
      imageCaption: 'The town of Ilkal has been synonymous with handloom weaving for centuries, with the craft forming the backbone of the local economy.',
      displayOrder: 1,
      isPublished: true,
      layoutType: 'full-width',
    },
    {
      storyId: ilkalStory.id,
      sectionNumber: 2,
      sectionLabel: 'THE MAKING',
      heading: 'The Loom, The Thread, The Rhythm',
      bodyText: 'Ilkal sarees are woven on traditional pit looms — large wooden frames set into the ground where the weaver sits at floor level, operating foot pedals to create the weave. The process begins with preparing the warp and weft threads, a task that itself takes considerable skill and time. The most distinctive technique in Ilkal weaving is the "topi teni" or "Kondi" — the method by which the body of the saree and the pallu (decorative end piece) are joined. This is done on the loom itself, creating a seamless transition that is unique to Ilkal sarees.',
      primaryImageUrl: '/images/stories/ilkal-making-1.jpg',
      primaryImageAlt: 'Weaver Savitri Hallur working on her pit loom, fingers moving between warp threads',
      secondaryImageUrl: '/images/stories/ilkal-making-2.jpg',
      secondaryImageAlt: 'Close-up of the topi teni joining technique showing where the saree body meets the pallu',
      imageCaption: 'The topi teni technique creates a seamless join between the saree body and pallu — a hallmark of authentic Ilkal weaving.',
      quote: 'The loom speaks its own language. After years of weaving, my hands know the rhythm of the threads.',
      quoteAttribution: 'Savitri Hallur, Ilkal weaver',
      displayOrder: 2,
      isPublished: true,
      layoutType: 'split',
    },
    {
      storyId: ilkalStory.id,
      sectionNumber: 3,
      sectionLabel: 'COLOURS & PATTERNS',
      heading: 'The Palette of Tradition',
      bodyText: 'Ilkal sarees are immediately recognisable by their colour palette. The body of the saree is traditionally woven in bold reds, maroons, or dark greens, while the pallu features contrasting colours — often white, cream, or gold. The border typically features a distinctive check or stripe pattern called "chikki" design. The colour choices are not arbitrary; they reflect local traditions, auspicious associations, and the availability of natural dyes that were historically used in the region.',
      primaryImageUrl: '/images/stories/ilkal-colours.jpg',
      primaryImageAlt: 'Array of Ilkal sarees showing the range of traditional colour combinations and border patterns',
      imageCaption: 'The bold colour combinations of Ilkal sarees — deep reds, rich greens, and contrasting pallus — reflect centuries of aesthetic tradition.',
      displayOrder: 3,
      isPublished: true,
      layoutType: 'image-right',
    },
    {
      storyId: ilkalStory.id,
      sectionNumber: 4,
      sectionLabel: 'THE WEAVER',
      heading: 'Families of Thread',
      bodyText: 'In Ilkal, weaving is a family affair. The preparation of threads, the setting of the loom, and the weaving itself involve multiple family members. Children grow up absorbing the rhythms and techniques of the craft, often beginning to assist with thread preparation from a young age. The knowledge of colour combinations, pattern creation, and the all-important topi teni technique is passed orally and through hands-on practice. Each family has its own subtle variations and specialties.',
      primaryImageUrl: '/images/stories/ilkal-weaver.jpg',
      primaryImageAlt: 'Portrait of Savitri Hallur at her loom in Ilkal, light streaming through the workshop window',
      quote: 'Every saree I weave tells a story of Ilkal — our traditions, our colours, our identity. This is not just my livelihood; it is my heritage.',
      quoteAttribution: 'Savitri Hallur, Ilkal',
      displayOrder: 4,
      isPublished: true,
      layoutType: 'portrait',
    },
    {
      storyId: ilkalStory.id,
      sectionNumber: 5,
      sectionLabel: 'THE CHALLENGE',
      heading: 'Sustaining the Tradition',
      bodyText: 'The Ilkal weaving community faces mounting pressures. Power looms can produce imitation Ilkal sarees at a fraction of the cost and time, making it increasingly difficult for handloom weavers to compete on price. Young people are leaving the profession for more predictable employment. The raw materials — quality cotton and silk threads — have become more expensive, squeezing margins further. Yet despite these challenges, a dedicated community of weavers continues to practice and preserve the authentic Ilkal tradition, driven by pride in their craft and a determination to keep this heritage alive.',
      primaryImageUrl: '/images/stories/ilkal-challenge.jpg',
      primaryImageAlt: 'Empty looms in an Ilkal workshop, symbolising the challenges facing traditional weavers',
      imageCaption: 'The challenge facing Ilkal weavers is not a lack of skill or will — it is a market that often fails to recognise the value of authentic handloom work.',
      displayOrder: 5,
      isPublished: true,
      layoutType: 'full-width',
    },
  ];

  for (const section of ilkalSections) {
    await prisma.storySection.create({ data: section });
  }

  console.log('✅ Story sections created');

  // Create products
  const products = [
    {
      name: 'Kasuti Embroidered Silk Saree — Chariot Motif',
      slug: 'kasuti-silk-saree-chariot-motif',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      artisanId: artisan1.id,
      description: 'A magnificent silk saree featuring the traditional Ratha (chariot) motif, meticulously hand-embroidered using the Gavanti stitch technique. The deep burgundy fabric is adorned with intricate geometric patterns in golden silk thread, creating a stunning piece that embodies centuries of Kasuti tradition.',
      story: 'This saree represents over three months of dedicated handwork by Lakshmi Devi. The chariot motif — one of the most significant symbols in Kasuti embroidery — is rendered with extraordinary precision across the pallu and border. Each stitch was placed by counting individual threads in the fabric weave, ensuring the pattern appears identical on both sides.',
      material: 'Pure silk fabric with silk embroidery thread',
      technique: 'Gavanti (double running stitch) and Murgi (zigzag stitch)',
      motif: 'Ratha (Chariot), Gopura (Temple tower), Geometric borders',
      dimensions: '5.5 meters length, 47 inches width',
      color: 'Deep Burgundy with Golden Thread',
      approxMakingTime: '3-4 months',
      origin: 'Dharwad, Karnataka',
      price: 28500.00,
      reservePrice: 25000.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: true,
      provenance: 'Hand-embroidered by Lakshmi Devi in her home workshop in Dharwad, Karnataka. Authenticated through CRAFTGUARD documentation process.',
      shippingInfo: 'Carefully packaged in acid-free tissue paper within a protective box. Shipped via insured courier within India. International shipping available on request.',
      seoTitle: 'Kasuti Embroidered Silk Saree with Chariot Motif | CRAFTGUARD',
      seoDescription: 'Hand-embroidered Kasuti silk saree featuring the traditional Ratha (chariot) motif. Created by master artisan Lakshmi Devi from Dharwad, Karnataka.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Kasuti Embroidered Cotton Blouse Piece — Lotus Pattern',
      slug: 'kasuti-cotton-blouse-lotus-pattern',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      artisanId: artisan3.id,
      description: 'An exquisite cotton blouse piece featuring the traditional lotus motif rendered in classic Kasuti embroidery. The deep green fabric carries intricate patterns in white and red thread, demonstrating the mathematical precision that defines authentic Kasuti work.',
      story: 'Meenakshi Pujar created this blouse piece as part of her exploration of traditional lotus motifs adapted for contemporary wear. The lotus — symbolising purity and divine beauty — is rendered using the Negi darning stitch, creating a rich, textured surface that elevates this everyday garment into a piece of wearable art.',
      material: 'Handloom cotton fabric with cotton embroidery thread',
      technique: 'Negi (darning stitch) and Gavanti (double running stitch)',
      motif: 'Lotus, Geometric border patterns',
      dimensions: '1 meter length, 42 inches width',
      color: 'Deep Green with White and Red Thread',
      approxMakingTime: '3-4 weeks',
      origin: 'Guledgud, Karnataka',
      price: 4500.00,
      reservePrice: 3800.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: true,
      provenance: 'Hand-embroidered by Meenakshi Pujar in Guledgud, Karnataka.',
      shippingInfo: 'Shipped in protective packaging via courier within India.',
      seoTitle: 'Kasuti Cotton Blouse Piece with Lotus Pattern | CRAFTGUARD',
      seoDescription: 'Handcrafted Kasuti embroidered cotton blouse piece featuring the traditional lotus motif by artisan Meenakshi Pujar.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Traditional Ilkal Saree — Red Body with Cream Pallu',
      slug: 'ilkal-saree-red-cream-pallu',
      craftId: ilkal.id,
      craftType: 'ILKAL',
      artisanId: artisan2.id,
      description: 'A classic Ilkal saree featuring the signature red body with a contrasting cream pallu, joined using the traditional topi teni technique. The borders display the characteristic chikki check pattern in deep maroon and gold, while the pallu features traditional temple motifs woven in gold thread.',
      story: 'This saree was woven by Savitri Hallur on her family\'s pit loom in Ilkal town. The entire process — from thread preparation to final finishing — took approximately four weeks. The topi teni join between the body and pallu is executed with such precision that the transition appears seamless, a hallmark of Savitri\'s exceptional skill.',
      material: 'Cotton body with silk pallu and border',
      technique: 'Handloom weaving with topi teni (Kondi) joining technique',
      motif: 'Chikki check border, Temple motifs on pallu',
      dimensions: '6 meters length, 48 inches width',
      color: 'Red body, Cream and Gold pallu, Maroon border',
      approxMakingTime: '3-4 weeks',
      origin: 'Ilkal, Bagalkot, Karnataka',
      price: 12500.00,
      reservePrice: 10000.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: true,
      provenance: 'Handwoven by Savitri Hallur on a traditional pit loom in Ilkal, Bagalkot district, Karnataka.',
      shippingInfo: 'Carefully folded in muslin cloth and boxed for shipping. Insured courier within India.',
      seoTitle: 'Traditional Ilkal Saree — Red Body with Cream Pallu | CRAFTGUARD',
      seoDescription: 'Authentic handwoven Ilkal saree with red cotton body and cream silk pallu by weaver Savitri Hallur from Ilkal, Karnataka.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Ilkal Saree — Green Body with Gold Pallu',
      slug: 'ilkal-saree-green-gold-pallu',
      craftId: ilkal.id,
      craftType: 'ILKAL',
      artisanId: artisan2.id,
      description: 'A striking Ilkal saree in deep forest green with a lustrous gold pallu, showcasing the traditional weaving excellence of Ilkal. The saree features intricate border patterns and the distinctive topi teni joining technique that is unique to this craft.',
      story: 'Savitri Hallur chose this colour combination as a departure from the more common red Ilkal sarees, while maintaining all the traditional techniques and patterns. The forest green body is woven in fine cotton, while the pallu transitions to silk with gold thread, creating a rich contrast.',
      material: 'Cotton body with silk and gold thread pallu',
      technique: 'Handloom weaving with topi teni technique',
      motif: 'Geometric border patterns, Traditional pallu motifs',
      dimensions: '6 meters length, 48 inches width',
      color: 'Forest Green body, Gold pallu',
      approxMakingTime: '4 weeks',
      origin: 'Ilkal, Bagalkot, Karnataka',
      price: 15000.00,
      reservePrice: 13000.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: false,
      provenance: 'Handwoven by Savitri Hallur in Ilkal, Karnataka.',
      shippingInfo: 'Shipped via insured courier within India.',
      seoTitle: 'Ilkal Saree — Green Body with Gold Pallu | CRAFTGUARD',
      seoDescription: 'Handwoven Ilkal saree in forest green with gold pallu by master weaver Savitri Hallur.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Kasuti Embroidered Table Runner — Gopura Series',
      slug: 'kasuti-table-runner-gopura',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      artisanId: artisan1.id,
      description: 'A beautifully crafted table runner featuring repeated Gopura (temple tower) motifs in classic Kasuti embroidery. This piece brings the elegance of traditional Kasuti into contemporary living spaces.',
      story: 'Lakshmi Devi created this table runner as part of a series exploring how traditional Kasuti motifs can be adapted for home décor without losing their cultural significance. The Gopura motif — representing the temple towers of Karnataka — is repeated in a measured rhythm across the length of the runner.',
      material: 'Handloom cotton with cotton and silk embroidery thread',
      technique: 'Gavanti and Menthi (cross-stitch)',
      motif: 'Gopura (Temple tower), Geometric borders',
      dimensions: '72 inches x 14 inches',
      color: 'Natural cotton with Maroon and Gold thread',
      approxMakingTime: '5-6 weeks',
      origin: 'Dharwad, Karnataka',
      price: 8500.00,
      reservePrice: 7000.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: true,
      provenance: 'Hand-embroidered by Lakshmi Devi in Dharwad.',
      shippingInfo: 'Shipped flat in protective packaging.',
      seoTitle: 'Kasuti Table Runner — Gopura Series | CRAFTGUARD',
      seoDescription: 'Handcrafted Kasuti embroidered table runner with traditional Gopura temple tower motifs.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Kasuti Embroidered Cushion Cover Set — Palanquin Design',
      slug: 'kasuti-cushion-covers-palanquin',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      artisanId: artisan3.id,
      description: 'A set of two cushion covers featuring the traditional Palanquin motif, embroidered in authentic Kasuti technique. These pieces marry traditional craftsmanship with contemporary home décor sensibility.',
      story: 'Meenakshi Pujar designed these cushion covers to introduce Kasuti embroidery to a broader audience through functional home accessories. The Palanquin — a symbol of celebration and ceremony — is rendered in vibrant threads against a rich indigo background.',
      material: 'Handloom cotton with cotton embroidery thread',
      technique: 'Gavanti and Negi stitch',
      motif: 'Palanquin, Border patterns',
      dimensions: '16 x 16 inches (each)',
      color: 'Indigo with Multi-colour thread',
      approxMakingTime: '4 weeks per set',
      origin: 'Guledgud, Karnataka',
      price: 5500.00,
      reservePrice: 4500.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: false,
      provenance: 'Hand-embroidered by Meenakshi Pujar in Guledgud.',
      shippingInfo: 'Shipped as a set in protective packaging.',
      seoTitle: 'Kasuti Cushion Cover Set — Palanquin Design | CRAFTGUARD',
      seoDescription: 'Set of two Kasuti embroidered cushion covers with traditional Palanquin motif.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Ilkal Dupatta — Maroon with Traditional Border',
      slug: 'ilkal-dupatta-maroon-traditional',
      craftId: ilkal.id,
      craftType: 'ILKAL',
      artisanId: artisan2.id,
      description: 'A versatile Ilkal dupatta in rich maroon with traditional border patterns woven in gold thread. This piece brings the distinctive Ilkal weaving aesthetic to a more contemporary format.',
      story: 'Recognising the demand for Ilkal textiles beyond the traditional saree format, Savitri Hallur began weaving dupattas that carry all the hallmarks of authentic Ilkal craftsmanship. This maroon dupatta features the characteristic border patterns and the quality of weave that defines her work.',
      material: 'Cotton with silk border',
      technique: 'Handloom weaving',
      motif: 'Traditional border patterns',
      dimensions: '2.5 meters x 36 inches',
      color: 'Maroon with Gold border',
      approxMakingTime: '1 week',
      origin: 'Ilkal, Bagalkot, Karnataka',
      price: 3500.00,
      reservePrice: 2800.00,
      currency: 'INR',
      status: 'AVAILABLE',
      isFeatured: false,
      provenance: 'Handwoven by Savitri Hallur in Ilkal.',
      shippingInfo: 'Shipped via courier within India.',
      seoTitle: 'Ilkal Dupatta — Maroon with Traditional Border | CRAFTGUARD',
      seoDescription: 'Authentic handwoven Ilkal dupatta in maroon with gold border by Savitri Hallur.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
    {
      name: 'Kasuti Framed Art — Conch Shell Motif',
      slug: 'kasuti-framed-art-conch-shell',
      craftId: kasuti.id,
      craftType: 'KASUTI',
      artisanId: artisan1.id,
      description: 'A framed piece of Kasuti art featuring the traditional Conch Shell (Shankha) motif, presented as a standalone artwork. This piece celebrates Kasuti embroidery as fine art rather than textile decoration.',
      story: 'Lakshmi Devi created this piece specifically as a framed artwork, allowing the intricacy of Kasuti embroidery to be appreciated up close. The Conch Shell motif — symbolising auspiciousness and the divine — is rendered with the precision that has defined her work for over three decades.',
      material: 'Handloom cotton with silk thread, wooden frame',
      technique: 'Gavanti and Murgi stitch',
      motif: 'Shankha (Conch Shell)',
      dimensions: '12 x 10 inches (framed)',
      color: 'Cream base with Maroon thread',
      approxMakingTime: '3 weeks',
      origin: 'Dharwad, Karnataka',
      price: 6500.00,
      reservePrice: 5500.00,
      currency: 'INR',
      status: 'SOLD',
      isFeatured: false,
      provenance: 'Hand-embroidered and framed by Lakshmi Devi in Dharwad.',
      shippingInfo: 'Shipped in rigid protective packaging.',
      seoTitle: 'Kasuti Framed Art — Conch Shell Motif | CRAFTGUARD',
      seoDescription: 'Kasuti embroidery art piece featuring the traditional Conch Shell motif, framed.',
      makerVisibility: true,
      publishedAt: new Date(),
    },
  ];

  for (const product of products) {
    const created = await prisma.product.create({ data: product });

    // Create product images
    const imageData = [
      {
        productId: created.id,
        imageUrl: `/images/products/${created.slug}-1.jpg`,
        thumbnailUrl: `/images/products/${created.slug}-1-thumb.jpg`,
        altText: `${created.name} — main view showing full detail`,
        caption: `${created.name}`,
        isPrimary: true,
        displayOrder: 1,
      },
      {
        productId: created.id,
        imageUrl: `/images/products/${created.slug}-2.jpg`,
        thumbnailUrl: `/images/products/${created.slug}-2-thumb.jpg`,
        altText: `${created.name} — detail close-up showing stitch work`,
        caption: 'Detail view',
        isPrimary: false,
        displayOrder: 2,
      },
      {
        productId: created.id,
        imageUrl: `/images/products/${created.slug}-3.jpg`,
        thumbnailUrl: `/images/products/${created.slug}-3-thumb.jpg`,
        altText: `${created.name} — full view showing the complete piece`,
        caption: 'Full view',
        isPrimary: false,
        displayOrder: 3,
      },
    ];

    for (const img of imageData) {
      await prisma.productImage.create({ data: img });
    }
  }

  console.log('✅ Products and images created');

  // Create site settings
  const siteSettings = [
    {
      key: 'site_name',
      value: { text: 'CRAFTGUARD' },
    },
    {
      key: 'site_tagline',
      value: { text: 'The Hands Behind Kasuti & Ilkal' },
    },
    {
      key: 'site_description',
      value: { text: 'A living archive of craft, makers and market access' },
    },
    {
      key: 'contact_email',
      value: { text: 'hello@craftguard.com' },
    },
    {
      key: 'social_instagram',
      value: { text: 'https://instagram.com/craftguard' },
    },
    {
      key: 'hero_images',
      value: {
        images: [
          { url: '/images/hero-1.jpg', alt: 'Kasuti artisan at work' },
          { url: '/images/hero-2.jpg', alt: 'Ilkal weaver on pit loom' },
          { url: '/images/hero-3.jpg', alt: 'Close-up of Kasuti embroidery' },
        ],
      },
    },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Site settings created');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });