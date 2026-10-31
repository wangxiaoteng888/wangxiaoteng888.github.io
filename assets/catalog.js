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
    description: '跟踪原始 MLA 的完整张量流，理解每个 token 的压缩缓存。',
    pages: [
      { id: 'mla', title: '原始 MLA：完整张量流与 KV Cache', description: '切换 Prefill 与 Decode，跟踪低秩投影、解耦 RoPE、主注意力与实际保存的 KV Cache。', type: '交互图解', path: 'mha-tensor-lab/mla-original.html' }
    ]
  },
  {
    id: 'dsa', number: '03', title: 'DSA', subtitle: '稀疏注意力',
    description: '接入 Indexer 与 Top-k：先选位置，再计算主注意力。',
    pages: [
      { id: 'dsa-on-mla', title: '在 MLA 图上增加 DSA', description: '沿用熟悉的 MLA 主链，对照 Top-k mask 与只计算选中列。', type: '对照图解', path: 'mha-tensor-lab/dsa-on-mla.html' }
    ]
  },
  {
    id: 'swa', number: '04', title: 'SWA', subtitle: '滑动窗口注意力',
    description: '按位置保留近期窗口，观察候选、计算与缓存怎样变化。',
    pages: [
      { id: 'swa-on-mla', title: '在 MLA 图上理解 SWA', description: '调整窗口大小，对照只计算窗口内 K/V 与完整矩阵加窗口 mask。', type: '对照图解', path: 'mha-tensor-lab/swa-on-mla.html' }
    ]
  },
  {
    id: 'csa', number: '05', title: 'CSA', subtitle: '压缩稀疏注意力',
    description: '把历史压缩候选与近期窗口汇合，跟踪一次主注意力计算。',
    pages: [
      { id: 'csa-v4', title: 'V4 CSA：DSA 与 SWA 如何汇合', description: '跟着单个 query，看压缩条目 Top-k 与窗口 KV 如何合并并统一归一化。', type: '交互图解', path: 'mha-tensor-lab/csa-v4.html' }
    ]
  },
  {
    id: 'kv-cache', number: '06', title: 'KV Cache 布局', subtitle: '具体模型',
    description: '按模型查看底层缓存，从逻辑分组追到物理页、张量视图与字节偏移。',
    pages: [
      { id: 'deepseek-v41-kv-cache', title: 'DeepSeek V4.1 Flash', description: '切换存储路径，追踪模型层的 KV 共享、物理页复用与页内元素寻址。', type: '内存布局实验台', path: 'kv-cache/deepseek-v41-kv-cache.html' },
      { id: 'qwen38-six-region', title: 'Qwen3.8老方案六区设计', description: '从 group、block table 和 layer slot 定位六区地址，演示 QSA 与 GDN 对 R2 的复用。', type: '内存布局实验台', path: 'kv-cache/qwen38-six-region.html' }
    ]
  }
];
