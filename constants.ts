import { Project, ProjectCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'creation-workshop',
    title: '《造化工坊》平台冷启动游戏合集',
    category: ProjectCategory.Game,
    featured: true,
    org: '腾讯 IEG · 光子工作室群',
    role: '产品策划 · 小游戏开发',
    period: '2026.05',
    date: '2026-04',
    coverWord: '造化工坊',
    coverOrbs: ['orb-c6', 'orb-c5', 'orb-c2'],
    coverMark: '/assets/bg/logo-zaohua.png',
    description:
      '作为《造化工坊》AI 游戏生成平台首批核心开发者，负责平台冷启动阶段的内容生态建设，跑通立项选题 - 游戏设计 - 开发迭代 - 打包上线全流程。4 款小游戏产出覆盖 3D 模拟经营、2D RPG、互动影游等品类，总游玩人次1400+，有效验证了初期平台管线能力并沉淀创作者经验。',
    links: [
      {
        genre: '互动影游',
        label: '终极一战',
        url: 'https://zaohua.qq.com/app/share.html?game_id=019e4e54-2b3e-7c44-8e3f-956b2f672cbb',
        cover: '/assets/bg/cover-zhiji-yizhan.png',
      },
      {
        genre: '文字角色扮演',
        label: '重生之成为独立游戏制作人',
        url: 'https://zaohua.qq.com/play/019e486a-e8a6-797a-9443-aa148c411c6d',
        cover: '/assets/bg/cover-indie-dev.png',
        coverTone: 'light',
      },
      {
        genre: '2D桌宠',
        label: '迷你工作室',
        url: 'https://zaohua.qq.com/play/019e4870-5840-7a1b-a385-10cd34657e7e',
        cover: '/assets/bg/cover-mini-studio.png',
      },
      {
        genre: '3D 模拟经营',
        label: '宇宙漫游餐馆',
        url: 'https://zaohua.qq.com/play/019e4871-463a-78b4-ab13-050738761601',
        cover: '/assets/bg/cover-cosmic-restaurant.png',
      },
    ],
    tags: ['内容管线', '游戏设计', '3D 模拟经营', '2D RPG', '互动影游'],
  },
  {
    id: 'ttrpg',
    title: 'AI Native 游戏与 LLM NPC 工程实战',
    category: ProjectCategory.Game,
    featured: true,
    org: '腾讯 IEG · 星跃实战营',
    role: '技术策划 · 全栈开发',
    period: '2026.01',
    date: '2026-01',
    coverWord: 'AI-TRPG',
    coverOrbs: ['orb-c1', 'orb-c3', 'orb-c4'],
    description:
      '基于《山屋惊魂》桌游改编，设计并开发 AI NPC ​陪玩、自然语言交互、重玩自由度高的 2.5D 策略探索跑团游戏。',

    tags: ['Godot 4.6', 'Python WebSocket', 'Multi-Agent', '感知、记忆与决策'],
  },
  {
    id: '1',
    title: '《梦镜岛》AI Roguelike 游戏',
    category: ProjectCategory.Game,
    featured: true,
    org: 'WAIC · 人工智能大会参展',
    role: '主美术 · 客户端开发',
    period: '2025.07',
    date: '2025-09',
    coverWord: 'ROGUE',
    coverOrbs: ['orb-c2', 'orb-c5', 'orb-c6'],
    description:
      '运用 AIGC 解决传统游戏内容供应不足的肉鸽游戏，团队自研 AI 角色生成与进化系统。玩家可以在游戏世界中捏出千人千面的角色来战斗、打怪、升级，发现并修正世界的漏洞，创造独属于自己的 if 线梦境。',

    tags: ['TA', 'Unity', '美术设计', 'UX/UI', 'ComfyUI'],
    media: [
      {
        type: 'video',
        url: '/assets/Mirrorland/视频.mp4',
        thumbnail: '/assets/Mirrorland/封面.png',
      },
      {
        type: 'pdf',
        url: '/assets/Mirrorland/作品集.pdf',
        thumbnail: '/assets/Mirrorland/封面1.png',
      },
    ],
    link: 'https://www.xiaohongshu.com/user/profile/6821bf22000000000e01c687',
  },
  {
    id: '2',
    title: '《GROWYOU》健康可视化花园',
    category: ProjectCategory.AI,
    featured: true,
    org: 'NCDA · 国赛一等奖',
    role: '产品策划 · 前端开发',
    period: '2025.05',
    description: `一款面向年轻人设计的心理疗愈类 APP，以“每日照料一座花园”的方式引导用户关注自我身心状态，实现轻度疗愈、行为激励与持续陪伴。
（合作者：惠英、培莎、子玲）`,
    date: '2025-05',
    coverWord: 'GROW',
    coverOrbs: ['orb-c3', 'orb-c2', 'orb-c6'],
    tags: ['产品策划', 'UX', 'WebGL', 'Coze', 'Figma'],
    media: [
      {
        type: 'video',
        url: '/assets/GrowYou/视频.mp4',
        thumbnail: '/assets/GrowYou/截图.png',
      },
      {
        type: 'pdf',
        url: '/assets/GrowYou/作品集.pdf',
        thumbnail: '/assets/GrowYou/封面.png',
      },
    ],
    link: 'https://github.com/huiying1212/PixelGarden',
  },
  {
    id: '3',
    title: '《皇室战争》小游戏策划',
    category: ProjectCategory.Game,
    description:
      'Supercell笔试题：以小游戏化重构为核心策略，让《皇室战争》重新回到碎片时间战场，构建出兼具即时爽感、成长动机与社交裂变的轻竞技生态，达成 1 亿 MAU 目标。',
    date: '2025-10',
    tags: ['游戏策划', '策略类', '用户体验'],
    media: {
      type: 'pdf',
      url: '/assets/ClashRoyale/皇室战争策划案.pdf',
      thumbnail: '/assets/ClashRoyale/皇室战争.png',
    },
  },
  {
    id: '5',
    title: '《铜梁龙舞》非遗VR游戏',
    category: ProjectCategory.Game,
    description:
      '搭建VR交互框架，实现非遗文化中"打铁花"的功能流程与视觉效果。在玩家拾取道具时与场景物体进行交互，增加UI界面进行操作提示，调整手部动作的锚点，使抓取摆放的手部动画与物件贴合。使用Visual Effect Graph制作火焰特效，通过碰撞检测触发点火交互。使用particle system设计铁花迸射特效，c#编程控制粒子发射器角度与铁花模型动画触发。布置场景并渲染模型，完成页面跳转及各交互动作的的衔接与测试。',
    date: '2024-10',
    tags: ['游戏开发', 'Unity', 'Steam VR', 'Pico4'],
    media: {
      type: 'video',
      url: '/assets/VR/视频.mp4',
      thumbnail: '/assets/VR/截图.png',
    },
  },
  {
    id: '6',
    title: '《VitalMemory》音画复刻小程序',
    category: ProjectCategory.AI,
    description:
      '0-1开发小程序，设计UI稿并搭建前端交互功能。基于WXML、WXSS与JavaScript语法，调用原生开发工具接口，实现音频上传、音色复刻、智能体语音通话等核心功能，明确前后端数据交互逻辑。根据产品定位设计界面风格、配色与元素，强调"情感+生命力"的视觉基调和用户体验。',
    date: '2025-03',
    tags: ['前端开发', 'UX/UI', 'JS', 'Figma'],
    media: {
      type: 'video',
      url: '/assets/LifeMemory/视频.mp4',
      thumbnail: '/assets/LifeMemory/截图.png',
    },
  },
  {
    id: '7',
    title: 'live2D虚拟互动模型生成',
    category: ProjectCategory.AI,
    description:
      '工程化AI生成live2D互动形象，优化传统模型生产方式。通过lineart_anime模型提取边缘，基于手绘线稿控制Stable Diffusion生图；使用EasyVtuber预训练模型，基于面部标志点检测和GAN技术对图像进行实时虚拟人物生成。',
    date: '2024-11',
    tags: ['GAN', 'EasyVtuber', 'Stable Diffusion', 'OBS studio'],
    media: {
      type: 'video',
      url: '/assets/live2d/视频.mp4',
      thumbnail: '/assets/live2d/封面.png',
    },
  },
  {
    id: '8',
    title: 'RPG游戏开发练习',
    category: ProjectCategory.Game,
    description:
      '练习Unity引擎开发，掌握 RPG 角色控制、战斗系统、过程存档等核心功能实现原理。搭建3D场景并烘焙智能导航地图，开发基本的角色状态管理系统（血量、蓝量、升级）与UI面板，实现普通攻击、技能释放、冷却时间等战斗逻辑与角色怪物的状态切换。搭建主菜单界面及多场景转换，最后打包运行。',
    date: '2025-01',
    tags: ['游戏开发', 'Unity', 'C#', '3D RPG'],
    media: {
      type: 'video',
      url: '/assets/rpg/视频.mp4',
      thumbnail: '/assets/rpg/截图.png',
    },
  },
  {
    id: '9',
    title: 'Houdini程序化建模',
    category: ProjectCategory.Game,
    description:
      '依赖于节点网络和参数化控制，实现自动化和可迭代设计。将程序化建模应用至数据可视化项目中，映射数据至几何形态变化或生成动态场景，通过云计算渲染，在移动端加载交互式 3D 视觉效果。',
    date: '2025-04',
    tags: ['TA', 'PCG', 'UE', 'Houdini', 'python'],
    media: {
      type: 'video',
      url: '/assets/pcg/视频.mp4',
      thumbnail: '/assets/pcg/截图.png',
    },
  },
  {
    id: '10',
    title: '《Fantastic Nights》角色设计',
    category: ProjectCategory.Art,
    description: '灵感来自好友的性格、音乐偏好与万圣节棒糖果造型。',
    date: '2023-10',
    tags: ['角色设计', '伪厚涂', 'SAI2'],
    media: {
      type: 'pdf',
      url: '/assets/art/角色设计.pdf',
      thumbnail: '/assets/art/主唱.jpg',
    },
  },
  {
    id: '11',
    title: '东北大学校史馆综合体设计',
    category: ProjectCategory.Architecture,
    description: '基于空间叙事的建筑设计与日常化空间构建',
    date: '2024-06',
    tags: ['建筑设计', 'Rhino', '场景渲染'],
    media: {
      type: 'pdf',
      url: '/assets/arch/毕设.pdf',
      thumbnail: '/assets/arch/毕设.jpg',
    },
  },
  {
    id: '12',
    title: '插画合集',
    category: ProjectCategory.Art,
    description: '广告插画与原创作品合集。',
    date: '2022-08',
    tags: ['广告设计', '插画'],
    media: {
      type: 'pdf',
      url: '/assets/art/插画.pdf',
      thumbnail: '/assets/art/纤茶.jpg',
    },
  },
];

/** 精选项目：以大卡形式展示，含职责、要点与数据 */
export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured);

/** 项目档案：可筛选的网格，点击查看视频 / PDF */
export const ARCHIVE_PROJECTS = PROJECTS.filter(p => !p.featured);

/** 只展示档案中真实存在的分类，避免出现空筛选项 */
export const CATEGORIES: ProjectCategory[] = [
  ProjectCategory.All,
  ...Object.values(ProjectCategory).filter(
    cat => cat !== ProjectCategory.All && ARCHIVE_PROJECTS.some(p => p.category === cat)
  ),
];
