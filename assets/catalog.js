// 新增教程时，把 HTML 放入网站目录，并在对应分组的 pages 中添加一项。
// id 全站唯一；path 相对于网站根目录。侧边栏和首页共用此配置。
window.TENSOR_LAB_CATALOG = [
  {
    id: 'mha', number: '01', title: 'MHA', subtitle: '多头注意力',
    description: '先看懂标准注意力里，张量如何一步步变化。',
    pages: [
      { id: 'mha', title: 'MHA 张量实验室', description: '从三个 token 开始，跟着 Q、K、V 完成一次多头注意力计算。', type: '交互教程', path: 'mha-tensor-lab/index.html' }
    ]
  },
  {
    id: 'mla', number: '02', title: 'MLA', subtitle: '多头潜在注意力',
    description: '把多头 K/V 压缩进共享向量，理解存储与计算的关系。',
    pages: [
      { id: 'mla', title: 'MLA 张量实验室', description: 'KV 联合压缩、解耦 RoPE，以及不展开 K/V 的等价计算。', type: '交互教程', path: 'mha-tensor-lab/mla.html' },
      { id: 'mla-flow', title: 'MLA 张量与原理图', description: '并排理解展开路径与吸收路径，点击节点查看真实矩阵。', type: '数据流图', path: 'mha-tensor-lab/mla-flow.html' }
    ]
  },
  {
    id: 'dsa', number: '03', title: 'DSA', subtitle: '稀疏注意力',
    description: '接入 Indexer 与 Top-k：先选位置，再计算主注意力。',
    pages: [
      { id: 'dsa', title: 'DSA 数值实验室', description: '用具体数字区分索引分数、Top-k 位置与主注意力权重。', type: '交互教程', path: 'mha-tensor-lab/dsa.html' },
      { id: 'dsa-flow', title: 'DSA 单 query 数据流', description: '跟踪一个 query：选出候选、读取缓存，直到得到输出。', type: '数据流图', path: 'mha-tensor-lab/dsa-flow.html' },
      { id: 'dsa-prefill', title: 'DSA 多 token Prefill', description: '一次输入五个 token，看每个 query 怎样独立选择位置。', type: '交互图解', path: 'mha-tensor-lab/dsa-prefill.html' },
      { id: 'dsa-on-mla', title: '在 MLA 图上增加 DSA', description: '沿用熟悉的 MLA 主链，对照 Top-k mask 与只计算选中列。', type: '对照图解', path: 'mha-tensor-lab/dsa-on-mla.html' }
    ]
  }
];
