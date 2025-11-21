import { Project, ProjectCategory } from './types';

export const HERO_SLOGAN = "Explore the Universe of my Projects";
export const SUB_SLOGAN = "Contact me: hu_chenxin@163.com";

// Using placeholder services for demo purposes. 
// In a real deployment, replace URLs with local paths (e.g., '/assets/video.mp4')
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '《梦镜岛》AI Roguelike游戏',
    category: ProjectCategory.Game,
    description: '本作提供了一种AI创建角色的范式，玩家可以在游戏世界中捏出千人千面的角色来战斗、打怪、升级，发现并修正世界的漏洞，创造独属于自己的if线梦境。(2025世界人工智能大会参展)',
    date: '2025-07',
    tags: ['TA', '美术设计','UX/UI','ComfyUI', 'LoRA训练', 'Unity'],
    media: [
      {
        type: 'video',
        url: '/assets/Mirrorland/视频.mp4',
        thumbnail: '/assets/Mirrorland/封面.png'
      },
      {
        type: 'pdf',
        url: '/assets/Mirrorland/作品集.pdf',
        thumbnail: '/assets/Mirrorland/封面1.png'
      }
    ],
    link: 'https://www.xiaohongshu.com/user/profile/6821bf22000000000e01c687'
  },
  {
    id: '2',
    title: '《GROWYOU》健康可视化花园',
    category: ProjectCategory.AI,
    description: `一款面向年轻人设计的心理疗愈类 APP，以“每日照料一座花园”的方式引导用户关注自我身心状态，实现轻度疗愈、行为激励与持续陪伴。

  （团队成员：惠英、培莎、子玲）`,
    date: '2025-05',
    tags: ['产品策划', 'UX', 'Coze','Figma','WebGL'],
    media: [
      {
        type: 'video',
        url: '/assets/GrowYou/视频.mp4',
        thumbnail: '/assets/GrowYou/截图.png'
      },
      {
        type: 'pdf',
        url: '/assets/GrowYou/作品集.pdf',
        thumbnail: '/assets/GrowYou/封面.png'
      }
    ],
    link: 'https://github.com/huiying1212/PixelGarden'
  },
  {
    id: '3',
    title: '《皇室战争》小游戏策划',
    category: ProjectCategory.Game,
    description: 'Supercell笔试题：以小游戏化重构为核心策略，让《皇室战争》重新回到碎片时间战场，构建出兼具即时爽感、成长动机与社交裂变的轻竞技生态，达成 1 亿 MAU 目标。',
    date: '2025-10',
    tags: ['游戏策划', '策略类', '用户体验'],
    media: {
      type: 'pdf',
      url: '/assets/ClashRoyale/皇室战争策划案.pdf', 
      thumbnail: '/assets/ClashRoyale/皇室战争.png'
    }
  },
  {
    id: '4',
    title: '实习产出：AI搜索与游戏客服巡检',
    category: ProjectCategory.AI,
    description: '在网易互娱实习期间，参与了C端大神AI搜索与B端客服AI巡检项目。',
    date: '2025-09',
    tags: ['产品实习', 'AI搜索', '客服巡检', 'Dify', 'python'],
    media: {
      type: 'pdf',
      url: '/assets/NetEase/作品集.pdf', 
      thumbnail: '/assets/NetEase/封面.jpg'
    }
  },
  {
    id: '5',
    title: '《铜梁龙舞》非遗VR游戏',
    category: ProjectCategory.Game,
    description: '搭建VR交互框架，实现非遗文化中"打铁花"的功能流程与视觉效果。在玩家拾取道具时与场景物体进行交互，增加UI界面进行操作提示，调整手部动作的锚点，使抓取摆放的手部动画与物件贴合。使用Visual Effect Graph制作火焰特效，通过碰撞检测触发点火交互。使用particle system设计铁花迸射特效，c#编程控制粒子发射器角度与铁花模型动画触发。布置场景并渲染模型，完成页面跳转及各交互动作的的衔接与测试。',
    date: '2024-10',
    tags: ['游戏开发','Unity','Steam VR','Pico4'],
    media: {
      type: 'video',
      url: '/assets/VR/视频.mp4',
      thumbnail: '/assets/VR/截图.png'
    }
  },
  {
    id: '6',
    title: '《VitalMemory》音画复刻小程序',
    category: ProjectCategory.AI,
    description: '0-1开发小程序，设计UI稿并搭建前端交互功能。基于WXML、WXSS与JavaScript语法，调用原生开发工具接口，实现音频上传、音色复刻、智能体语音通话等核心功能，明确前后端数据交互逻辑。根据产品定位设计界面风格、配色与元素，强调"情感+生命力"的视觉基调和用户体验。',
    date: '2025-03',
    tags: ['前端开发', 'UX/UI', 'JS', 'Figma'],
    media: {
      type: 'video',
      url: '/assets/LifeMemory/视频.mp4',
      thumbnail: '/assets/LifeMemory/截图.png'
    }
  },
  {
    id: '7',
    title: 'live2D虚拟互动模型生成',
    category: ProjectCategory.AI,
    description: '工程化AI生成live2D互动形象，优化传统模型生产方式。通过lineart_anime模型提取边缘，基于手绘线稿控制Stable Diffusion生图；使用EasyVtuber预训练模型，基于面部标志点检测和GAN技术对图像进行实时虚拟人物生成。',
    date: '2024-11',
    tags: ['GAN', 'EasyVtuber', 'Stable Diffusion', 'OBS studio'],
    media: {
      type: 'video',
      url: '/assets/live2d/视频.mp4',
      thumbnail: '/assets/live2d/封面.png'
    }
  },
  {
    id: '8',
    title: 'RPG游戏开发练习',
    category: ProjectCategory.Game,
    description: '练习Unity引擎开发，掌握 RPG 角色控制、战斗系统、过程存档等核心功能实现原理。搭建3D场景并烘焙智能导航地图，开发基本的角色状态管理系统（血量、蓝量、升级）与UI面板，实现普通攻击、技能释放、冷却时间等战斗逻辑与角色怪物的状态切换。搭建主菜单界面及多场景转换，最后打包运行。',
    date: '2025-01',
    tags: ['游戏开发', 'Unity', 'C#', '3D RPG'],
    media: {
      type: 'video',
      url: '/assets/rpg/视频.mp4',
      thumbnail: '/assets/rpg/截图.png'
    }
  },
  {
    id: '9',
    title: 'Houdini程序化建模',
    category: ProjectCategory.Game,
    description: '依赖于节点网络和参数化控制，实现自动化和可迭代设计。将程序化建模应用至数据可视化项目中，映射数据至几何形态变化或生成动态场景，通过云计算渲染，在移动端加载交互式 3D 视觉效果。',
    date: '2025-04',
    tags: ['TA','PCG','UE', 'Houdini', 'python'],
    media: {
      type: 'video',
      url: '/assets/pcg/视频.mp4',
      thumbnail: '/assets/pcg/截图.png'
    }
  },
  {
    id: '10',
    title: '《Fantastic Nights》角色设计',
    category: ProjectCategory.Art,
    description: '灵感来自好友的性格、音乐偏好与万圣节棒糖果造型。',
    date: '2023-10',
    tags: ['角色设计','乐队主题','伪厚涂', 'SAI2'],
    media: [
      {
        type: 'image',
        url: '/assets/art/主唱.jpg'
      },
      {
        type: 'image',
        url: '/assets/art/键盘手.jpg'
      },
      {
        type: 'image',
        url: '/assets/art/贝斯手.jpg'
      }
    ]
  },
  {
    id: '11',
    title: '东北大学校史馆综合体设计',
    category: ProjectCategory.Architecture,
    description: '基于空间叙事的建筑设计与日常化空间构建',
    date: '2024-06',
    tags: ['建筑设计','展馆空间','Rhino', '场景渲染'],
    media: [
      {
        type: 'pdf',
        url: '/assets/arch/毕设.pdf',
        thumbnail: '/assets/arch/毕设.jpg'
      }
    ]
  }
  
];

export const CATEGORIES = Object.values(ProjectCategory);