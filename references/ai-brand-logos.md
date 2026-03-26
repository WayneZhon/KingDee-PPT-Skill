# AI 品牌 Logo 映射表（lobe-icons）

> 本文件供 **Phase 3 生成阶段**使用。Phase 0-2 只需在大纲标注 `[logo: slug]`，无需读取此文件。
>
> ✅ 所有 slug 均经 `@lobehub/icons-static-svg` 本地安装验证。
> 彩色版：slug 加 `-color` 后缀（如 `deepseek-color`）；文字版：加 `-text` 后缀。

---

## CDN 地址格式

- **npmmirror（国内首选）**：`https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/{slug}.svg`
- **unpkg（国际备用）**：`https://unpkg.com/@lobehub/icons-static-svg@latest/icons/{slug}.svg`
- **PNG fallback**：`https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/icons/{slug}.png`

**彩色版规则**：深色（主蓝/品青）卡片背景 → 优先用 `{slug}-color`，浅色背景 → 用原色 `{slug}`

---

## 国际 AI 大模型 & 平台

| 用户内容关键词 | lobe-icons Slug | 备注 |
|--------------|-----------------|------|
| OpenAI / ChatGPT / GPT-4 / o1 / o3 | `openai` | 无彩色版，纯黑白 |
| Claude / Anthropic / Claude Code | `claude` / `claudecode` | `claude-color` ✅ |
| Gemini / Google AI / Bard | `gemini` | `gemini-color` ✅ |
| DeepSeek / 深度求索 | `deepseek` | `deepseek-color` ✅ |
| Llama / Meta AI / Meta | `metaai` / `meta` | ⚠️ `llama` 不存在，用 `metaai` |
| Mistral | `mistral` | `mistral-color` ✅ |
| Cohere | `cohere` | `cohere-color` ✅ |
| HuggingFace | `huggingface` | `huggingface-color` ✅ |
| AWS / Amazon | `aws` | `aws-color` ✅ |
| Amazon Bedrock | `bedrock` | `bedrock-color` ✅ |
| Azure / Microsoft Azure | `azure` | `azure-color` ✅ |
| Azure AI / Copilot | `azureai` / `copilot` | `azureai-color` ✅ |
| Microsoft | `microsoft` | `microsoft-color` ✅ |
| Google Cloud | `googlecloud` | `googlecloud-color` ✅ |
| Groq | `groq` | 无彩色版 |
| Perplexity | `perplexity` | `perplexity-color` ✅ |
| Midjourney | `midjourney` | 无彩色版 |
| Stable Diffusion / Stability AI | `stability` | `stability-color` ✅ |
| Ollama（本地模型） | `ollama` | 无彩色版 |
| GitHub Copilot | `githubcopilot` | 无彩色版 |
| GitHub | `github` | 无彩色版 |
| Cursor（AI IDE） | `cursor` | 无彩色版 |

---

## 中国 AI 大模型 & 云平台

| 用户内容关键词 | lobe-icons Slug | 备注 |
|--------------|-----------------|------|
| 通义千问 / Qwen | `qwen` | `qwen-color` ✅ |
| 阿里云 / Aliyun / 百炼 | `alibabacloud` / `bailian` | `alibabacloud-color` ✅ |
| Alibaba / 阿里巴巴（集团） | `alibaba` | `alibaba-color` ✅ |
| 文心一言 / ERNIE / 百度 | `wenxin` / `baidu` | `wenxin-color` ✅ |
| 百度智能云 | `baiducloud` | `baiducloud-color` ✅ |
| 豆包 / Doubao | `doubao` | `doubao-color` ✅ |
| 字节跳动 / ByteDance | `bytedance` | `bytedance-color` ✅ |
| Kimi / 月之暗面 | `moonshot` | 无彩色版 |
| 智谱 / ChatGLM / GLM / ZhipuAI | `chatglm` / `zhipu` | `chatglm-color` ✅ |
| 混元 / 腾讯 Hunyuan | `hunyuan` | `hunyuan-color` ✅ |
| 腾讯云 / Tencent Cloud | `tencentcloud` / `tencent` | `tencentcloud-color` ✅ |
| 华为 / Huawei（集团） | `huawei` | `huawei-color` ✅ |
| 华为云 / HuaweiCloud / 盘古 | `huaweicloud` | `huaweicloud-color` ✅ ← 优先用此 |
| 讯飞 / 星火 / IFLYTEK Spark | `spark` | `spark-color` ✅ |
| 百川 / Baichuan | `baichuan` | 无彩色版 |
| 零一万物 / Yi / 01.AI | `yi` | `yi-color` ✅ |
| MiniMax / 海螺 | `minimax` | `minimax-color` ✅ |
| 智谱 CodeGeeX / 代码助手 | `codegeex` | 无彩色版 |
| 360智脑 / 360 AI | `ai360` | `ai360-color` ✅ |
| Coze / 扣子（字节） | `coze` | 无彩色版 |
| FastGPT / 知识库平台 | `fastgpt` | `fastgpt-color` ✅ |

---

## AI 开发基础设施（Skill 生态高频）

| 用户内容关键词 | lobe-icons Slug | 备注 |
|--------------|-----------------|------|
| MCP / Model Context Protocol | `mcp` | 无彩色版，⭐ 苍穹Skill生态必备 |
| LangChain | `langchain` | 确认存在 |
| LlamaIndex | `llamaindex` | `llamaindex-color` ✅ |
| CrewAI | `crewai` | 无彩色版 |
| Suno（音乐AI） | `suno` | 无彩色版 |
| Runway（视频AI） | `runway` | 无彩色版 |
| Pika（视频AI） | `pika` | 无彩色版 |
| DALL-E | `dalle` | 无彩色版 |

---

## 降级处理

| 情况 | 处理方式 |
|------|---------|
| Slug 在映射表中找不到 | 跳过 logo，使用 emoji 替代（如 🤖 🔬 ☁️），不报错 |
| CDN 拉取失败（网络超时） | 先切 npmmirror，再切 unpkg，仍失败则跳过 |
| SVG 转 PNG 失败 | 直接用 PNG CDN 地址拉取 fallback |
| 单页 logo 数量 > 6 个 | 合并为「logo 墙」版式，底部横排，文字移至标题区 |
