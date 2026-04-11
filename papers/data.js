// ============================================================
// Paper Data
// ============================================================
// To add a new paper review, add an object to the PAPERS array.
// Each paper needs both English (en) and Korean (ko) fields.
//
// Folder structure:
//   images/
//     {id}/
//       thumbnail.png      <- card thumbnail
//       figure1.png        <- figures used in review
//       my-diagram.png     <- your own diagrams
//       ...
//
// Template:
// {
//   id: "unique-slug",
//   date: "YYYY-MM-DD",
//   authors: "Author1, Author2, ...",
//   venue: "Conference/Journal Year",
//   image: "images/unique-slug/thumbnail.png",
//   link: "https://arxiv.org/abs/...",
//   domain: "autonomous-driving",  // autonomous-driving | quantum-computing | ai-security | deep-learning
//   tags: ["tag1", "tag2"],
//   en: {
//     title: "Paper Title",
//     summary: "One-line summary for the card.",
//     review: `
//       <h2>Summary</h2>
//       <p>...</p>
//
//       // ---- Inserting images in review ----
//       // Paper figure:
//       <figure>
//         <img src="images/unique-slug/figure1.png" alt="description">
//         <figcaption>Figure 1: Description</figcaption>
//       </figure>
//
//       // Your own diagram:
//       <figure>
//         <img src="images/unique-slug/my-diagram.png" alt="description">
//         <figcaption>My understanding of the architecture</figcaption>
//       </figure>
//     `
//   },
//   ko: { ... }
// }
// ============================================================

const PAPERS = [
// ====================================================================
  // 1. OpenDriveVLA
  // ====================================================================
  {
    id: "opendrivevla",
    date: "2025-04-11",
    authors: "Zhou, X., Han, X., Yang, F., Ma, Y., Tresp, V., Knoll, A.",
    venue: "AAAI 2026",
    image: "images/opendrivevla/thumbnail.png",
    link: "https://arxiv.org/abs/2503.23463",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "VLM", "End-to-End", "LLM", "Planning"],
    en: {
      title: "OpenDriveVLA: Towards End-to-End Autonomous Driving with Large Vision Language Action Model",
      summary: "Proposes a 3D-aware VLA architecture that enables LLMs to serve as autonomous driving planners through structured 3D token design and staged training.",
      review: `
        <h2>One-line Verdict</h2>
        <p>The core novelty is not "using an LLM as a planner" itself, but showing <strong>how to inject 3D grounding and interaction priors</strong> into an LLM so it can actually function as a planner — through architecture and training curriculum design.</p>

        <h2>Research Question</h2>
        <blockquote>To bring the semantic reasoning capability of general-purpose VLM/LLMs into real autonomous driving planning, what form of 3D perception and training stages are needed?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Vision-Language Models (VLMs) have demonstrated remarkable reasoning capabilities in general domains. The autonomous driving community has explored multiple ways to leverage these models — from using them as captioning modules to high-level decision makers. However, most approaches treat the VLM as a peripheral component rather than the core planner. The fundamental challenge is that general-purpose VLMs lack 3D spatial understanding and multi-agent interaction awareness, both of which are critical for safe driving. This paper argues that the missing pieces are not bigger models, but rather <strong>proper 3D perception tokens</strong> and a <strong>carefully designed training curriculum</strong> that progressively builds from perception to planning.</p>

        <h2>Architecture / Methodology</h2>
        <p>This paper belongs to the fourth paradigm of VLM usage in autonomous driving: <strong>native end-to-end VLA</strong>, where the VLM directly generates trajectory as a planner.</p>

        <figure>
          <img src="images/opendrivevla/fig1-paradigms.png" alt="Four paradigms of VLM in autonomous driving">
          <figcaption>Figure 1 (from paper): Taxonomy of vision-language model applications in end-to-end autonomous driving.</figcaption>
        </figure>

        <table>
          <thead><tr><th>Paradigm</th><th>Planner Location</th><th>3D Grounding</th><th>Key Limitation / Differentiation</th></tr></thead>
          <tbody>
            <tr><td>Caption/QA Head</td><td>Separate planner</td><td>Low</td><td>High explainability but barely changes the planning policy.</td></tr>
            <tr><td>High-level Decision Maker</td><td>Before low-level planner</td><td>Medium</td><td>Semantic reasoning possible but hard to jointly optimize with planning.</td></tr>
            <tr><td>Native 2D VLM Driving</td><td>VLM generates action</td><td>Low-Medium</td><td>2D token-centric; weak instance / 3D layout / interaction modeling.</td></tr>
            <tr><td><strong>OpenDriveVLA</strong></td><td><strong>LLM directly generates trajectory</strong></td><td><strong>High</strong></td><td><strong>Scene/agent/map tokens + staged training enable planner-level LLM.</strong></td></tr>
          </tbody>
        </table>

        <p>The model follows four stages: <strong>3D Perception → Alignment → Reasoning → Planning</strong>.</p>
        <ul>
          <li><strong>3D Perception:</strong> Multi-view images are lifted into BEV, producing scene/agent/map tokens.</li>
          <li><strong>Alignment:</strong> Each token type is projected into language space via dedicated projectors.</li>
          <li><strong>Reasoning:</strong> Driving QA and interaction modeling inject semantic and physical priors.</li>
          <li><strong>Planning:</strong> Ego trajectory is generated autoregressively as a token sequence.</li>
        </ul>

        <figure>
          <img src="images/opendrivevla/fig2-architecture.png" alt="OpenDriveVLA full architecture">
          <figcaption>Figure 2 (from paper): OpenDriveVLA full architecture. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Scene/agent/map separation:</strong> Unlike general VLMs that pass the entire scene as one image token set, this model separates tokens by semantic role, enabling fine-grained 3D grounding.</li>
          <li><strong>Token-specific projectors:</strong> Dedicated projectors for each token type enable fine-grained alignment to language space, preserving the distinct information carried by each modality.</li>
          <li><strong>Stage 2.5 Interaction Modeling:</strong> Conditional motion forecasting as an auxiliary task injects interaction-aware priors, bridging the gap from "linguistically plausible" to "drivable."</li>
          <li><strong>Ego + driver command injection:</strong> The planner sees both the driving intent and vehicle state alongside perception, enabling command-conditional planning.</li>
          <li><strong>Scalable across model sizes:</strong> Demonstrated effectiveness from 0.5B to 7B parameters, showing that representation design matters more than raw scale.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <figure>
          <img src="images/opendrivevla/fig3-training.png" alt="Training stages">
          <figcaption>Figure 3 (from paper): Four-stage training pipeline. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <table>
          <thead><tr><th>Stage</th><th>What It Does</th><th>Research Purpose</th></tr></thead>
          <tbody>
            <tr><td>Stage 1: Hierarchical Alignment</td><td>Align scene/agent/map tokens with captions</td><td>Reduce modality gap; anchor semantic meaning to 3D tokens.</td></tr>
            <tr><td>Stage 2: Driving Instruction Tuning</td><td>Learn driving QA in instruction-response format</td><td>Enable the planner to interpret scenes linguistically and follow commands.</td></tr>
            <tr><td>Stage 2.5: Interaction Modeling</td><td>Agent trajectory forecasting as auxiliary task</td><td>Inject interaction prior and physical feasibility into the LLM.</td></tr>
            <tr><td>Stage 3: Trajectory Planning</td><td>Generate ego trajectory as discrete tokens</td><td>Connect reasoned representations to actual planning output.</td></tr>
          </tbody>
        </table>

        <p><strong>Why Stage 2.5 matters:</strong> This is the most underappreciated part. Pure instruction tuning alone cannot teach a planner physically plausible multi-agent dynamics. Conditional motion forecasting injects interaction-aware priors, bridging the gap from "linguistically plausible" to "drivable."</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Evaluation</th><th>Key Result</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>Open-loop (ST-P3)</td><td>Avg L2 error ~0.33m (3B/7B)</td><td>Autoregressive LLM is competitive for planning.</td></tr>
            <tr><td>Open-loop (UniAD)</td><td>Avg L2 error 0.66m (7B)</td><td>Strong among open-source autoregressive models.</td></tr>
            <tr><td>Driving QA/Captioning</td><td>Strong on nuCaption, nuScenes-QA, Nu-X</td><td>Representation learning benefits scene understanding, not just planning.</td></tr>
            <tr><td>Ablation</td><td>Collision: 0.37 → 0.26 with staged training</td><td>Alignment and interaction modeling directly improve planning safety.</td></tr>
            <tr><td>Small model</td><td>0.5B model is surprisingly strong</td><td>Representation + supervision design matters more than backbone scale.</td></tr>
          </tbody>
        </table>

        <figure>
          <img src="images/opendrivevla/fig4-qualitative.png" alt="Qualitative results">
          <figcaption>Figure 4 (from paper): Qualitative results showing command-following and QA capabilities. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <h2>Strengths</h2>
        <ul>
          <li>Clear problem definition — identifies 3D grounding and interaction gaps as the barrier for VLM planners.</li>
          <li>Sophisticated input representation — scene/agent/map token separation is a structural contribution, not just engineering.</li>
          <li>Convincing training curriculum — alignment → semantics → interaction → planning matches the structure of the driving problem.</li>
          <li>Small models are strong — 0.5B results suggest representation design is more essential than LLM scale.</li>
          <li>Joint QA and planning — explainability and action generation in one framework.</li>
          <li>Comprehensive ablation study — clearly isolates the contribution of each training stage and token type.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Open-loop centric — closed-loop robustness is not directly demonstrated.</li>
          <li>No safety guarantee — collision metric improvements exist but no formal safety assurance.</li>
          <li>Autoregressive latency — real-time performance at vehicle control level needs separate verification.</li>
          <li>Hallucination not fully solved — reduced by instance-aware tokens but calibration issues remain.</li>
          <li>Complex pipeline — data preparation, projector training, and auxiliary objectives make reproduction costly.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Is the performance gain from LLM reasoning itself, or is it effectively structured imitation learning?</li>
          <li>How directly does Stage 2.5 interaction modeling contribute to planner robustness?</li>
          <li>What trade-offs emerge between instruction following and stability in closed-loop settings?</li>
          <li>Where should uncertainty estimation / fallback policies / safety shields be placed when the planner is an LLM?</li>
          <li>Does the strong 0.5B result serve as evidence that "better representation" matters more than "bigger model"?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is best read not as "a huge multimodal model" but as an answer to three specific questions:</p>
        <ul>
          <li>What 3D representations must enter an LLM for it to serve as a planner?</li>
          <li>What training sequence connects language reasoning to driving actions?</li>
          <li>What role does interaction modeling play in planner-level reliability?</li>
        </ul>
        <p>With these three questions in mind, the complexity of the architecture and training pipeline becomes much clearer.</p>
      `
    },
    ko: {
      title: "OpenDriveVLA: 대규모 비전-언어-행동 모델을 활용한 End-to-End 자율주행",
      summary: "LLM이 자율주행 planner로 작동할 수 있도록 3D 토큰 설계와 단계적 학습을 제안하는 VLA 아키텍처입니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문의 핵심은 "LLM이 planner가 될 수 있다"는 선언 자체보다, <strong>LLM이 planner가 될 수 있도록 3D grounding과 interaction prior를 어떻게 주입할 것인가</strong>를 구조와 학습 절차로 보여준 데 있습니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>일반 VLM/LLM의 semantic reasoning 능력을 실제 자율주행 planning으로 끌어올리려면, 어떤 형태의 3D perception과 학습 단계가 필요한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>비전-언어 모델(VLM)은 일반 도메인에서 뛰어난 추론 능력을 보여주고 있습니다. 자율주행 커뮤니티에서는 이러한 모델을 캡셔닝 모듈부터 고수준 의사결정자까지 다양한 방식으로 활용해 왔습니다. 하지만 대부분의 접근법은 VLM을 핵심 planner가 아닌 주변 구성 요소로 취급합니다. 근본적인 문제는 범용 VLM이 안전한 주행에 필수적인 3D 공간 이해와 다중 에이전트 상호작용 인식이 부족하다는 점입니다. 이 논문은 부족한 것이 더 큰 모델이 아니라 <strong>적절한 3D 인식 토큰</strong>과 인식에서 계획까지 점진적으로 구축하는 <strong>세심하게 설계된 학습 커리큘럼</strong>이라고 주장합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>자율주행에서 VLM을 사용하는 네 번째 패러다임인 <strong>native end-to-end VLA</strong>에 해당하며, VLM이 직접 trajectory를 생성하는 planner 역할을 맡습니다.</p>

        <figure>
          <img src="images/opendrivevla/fig1-paradigms.png" alt="자율주행에서 VLM의 네 가지 패러다임">
          <figcaption>Figure 1 (원문): 자율주행에서의 비전-언어 모델 적용 분류. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <table>
          <thead><tr><th>패러다임</th><th>Planner 위치</th><th>3D Grounding</th><th>핵심 한계 또는 차별점</th></tr></thead>
          <tbody>
            <tr><td>Caption/QA Head</td><td>별도 planner 유지</td><td>낮음</td><td>설명 가능성은 높지만 planning policy 자체는 거의 바꾸지 못한다.</td></tr>
            <tr><td>High-level Decision Maker</td><td>저수준 planner 앞단</td><td>중간</td><td>Semantic reasoning은 가능하지만 planning과 joint optimization이 어렵다.</td></tr>
            <tr><td>Native 2D VLM Driving</td><td>VLM이 action 생성</td><td>낮음-중간</td><td>2D token 위주라 instance / 3D layout / interaction modeling이 약하다.</td></tr>
            <tr><td><strong>OpenDriveVLA</strong></td><td><strong>LLM이 trajectory를 직접 생성</strong></td><td><strong>높음</strong></td><td><strong>Scene/agent/map token과 staged training으로 planner-level LLM을 구현한다.</strong></td></tr>
          </tbody>
        </table>

        <p>모델은 네 단계를 따릅니다: <strong>3D Perception → Alignment → Reasoning → Planning</strong></p>
        <ul>
          <li><strong>3D Perception:</strong> multi-view image를 BEV로 올린 뒤 scene/agent/map token을 만든다.</li>
          <li><strong>Alignment:</strong> 각 token을 LLM이 처리할 수 있는 language space로 보낸다.</li>
          <li><strong>Reasoning:</strong> driving QA와 interaction modeling으로 semantic prior와 physical prior를 학습한다.</li>
          <li><strong>Planning:</strong> 최종적으로 ego trajectory를 token sequence처럼 autoregressive하게 생성한다.</li>
        </ul>

        <figure>
          <img src="images/opendrivevla/fig2-architecture.png" alt="OpenDriveVLA 전체 구조">
          <figcaption>Figure 2 (원문): OpenDriveVLA 전체 구조. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>Scene/agent/map 분리:</strong> 일반 VLM처럼 장면 전체를 하나의 이미지 token 집합으로 넘기지 않고, 의미 역할별로 분리하여 세밀한 3D grounding을 가능하게 한다.</li>
          <li><strong>Token-specific projector:</strong> 각 의미 단위별로 projector를 따로 둬서, 각 modality가 전달하는 고유한 정보를 보존하면서 언어 공간으로의 정합 방식을 세분화한다.</li>
          <li><strong>Stage 2.5 Interaction Modeling:</strong> Conditional motion forecasting을 auxiliary task로 넣어 interaction-aware prior를 주입하고, "언어적으로 그럴듯한" 수준에서 "주행 가능한" 수준으로의 간극을 메운다.</li>
          <li><strong>Ego + driver command 주입:</strong> Perception만으로 끝나지 않고, planner가 따라야 할 intent와 상태를 동시에 보면서 command-conditional planning을 가능하게 한다.</li>
          <li><strong>다양한 모델 크기에서 효과적:</strong> 0.5B에서 7B까지의 파라미터 범위에서 효과를 보여, 원시 규모보다 representation 설계가 더 중요함을 입증한다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <figure>
          <img src="images/opendrivevla/fig3-training.png" alt="학습 단계">
          <figcaption>Figure 3 (원문): 핵심 학습 단계. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <table>
          <thead><tr><th>단계</th><th>직접 하는 일</th><th>연구적으로 하는 일</th></tr></thead>
          <tbody>
            <tr><td>Stage 1: Hierarchical Alignment</td><td>Scene/agent/map token을 caption과 맞춘다</td><td>Modality gap을 줄이고 3D token에 semantic anchor를 부여한다.</td></tr>
            <tr><td>Stage 2: Driving Instruction Tuning</td><td>Driving QA를 instruction-response 형태로 학습한다</td><td>Planner가 장면을 언어적으로 해석하고 command를 따를 수 있게 한다.</td></tr>
            <tr><td>Stage 2.5: Interaction Modeling</td><td>Agent trajectory forecasting을 auxiliary task로 넣는다</td><td>Interaction prior와 physical feasibility를 LLM 내부에 주입한다.</td></tr>
            <tr><td>Stage 3: Trajectory Planning</td><td>Ego trajectory를 discrete token처럼 생성한다</td><td>Reasoning된 표현을 실제 planning output으로 연결한다.</td></tr>
          </tbody>
        </table>

        <p><strong>Stage 2.5가 중요한 이유:</strong> 이 논문에서 가장 과소평가되기 쉬운 부분입니다. 단순 instruction tuning만으로는 planner가 물리적으로 타당한 multi-agent dynamics를 이해하기 어렵기 때문에, conditional motion forecasting을 통해 interaction-aware prior를 주입합니다. 이 단계가 planner를 "언어적으로 그럴듯한 모델"이 아니라 주행 가능한 모델로 만들기 위한 연결고리입니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>평가 항목</th><th>핵심 결과</th><th>해석</th></tr></thead>
          <tbody>
            <tr><td>Open-loop (ST-P3)</td><td>평균 L2 오차 ~0.33m (3B/7B)</td><td>Autoregressive LLM 구조가 planning에서도 경쟁력 있음을 보인다.</td></tr>
            <tr><td>Open-loop (UniAD)</td><td>평균 L2 오차 0.66m (7B)</td><td>Open-source autoregressive 계열 중 강한 성능을 보인다.</td></tr>
            <tr><td>Driving QA / Captioning</td><td>nuCaption, nuScenes-QA, Nu-X에서 강한 결과</td><td>표현 학습이 단순 planner tuning이 아니라 scene understanding에도 기여한다.</td></tr>
            <tr><td>Ablation</td><td>Collision: 0.37 → 0.26</td><td>Alignment와 interaction modeling이 실제로 planning 안전성에 영향을 준다.</td></tr>
            <tr><td>경량 모델</td><td>0.5B 모델도 매우 강함</td><td>Backbone 규모보다 representation + supervision design의 기여가 크다.</td></tr>
          </tbody>
        </table>

        <figure>
          <img src="images/opendrivevla/fig4-qualitative.png" alt="정성적 결과">
          <figcaption>Figure 4 (원문): Command-following과 QA 결과 시각화. Source: Zhou et al., AAAI 2026.</figcaption>
        </figure>

        <h2>강점</h2>
        <ul>
          <li>문제 정의가 명확하다 — 일반 VLM을 planner로 쓰기 어려운 이유를 3D grounding과 interaction 부족으로 정리한다.</li>
          <li>입력 표현이 정교하다 — scene/agent/map token 분리는 단순한 engineering tweak가 아니라 구조적 기여다.</li>
          <li>학습 커리큘럼이 설득력 있다 — alignment → semantics → interaction → planning의 순서는 자율주행 문제 구조와 잘 맞는다.</li>
          <li>작은 모델도 강하다 — 0.5B 결과는 LLM 규모 경쟁보다 representation 설계가 더 본질적일 수 있음을 시사한다.</li>
          <li>QA와 planning을 함께 본다 — 해석 가능성과 행동 생성을 같은 프레임에서 본다는 점이 유용하다.</li>
          <li>포괄적인 ablation study — 각 학습 단계와 토큰 유형의 기여를 명확히 분리한다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>Open-loop 중심이라 closed-loop robustness를 직접 보여주지 않는다.</li>
          <li>Safety guarantee가 없다 — collision metric 개선은 있지만 형식적 안전 보장은 아니다.</li>
          <li>Autoregressive latency 문제가 남아 있다 — 실제 차량 제어 수준의 실시간성은 별도 검증이 필요하다.</li>
          <li>Hallucination이 완전히 해결된 것은 아니다 — instance-aware token으로 줄였을 뿐, calibration 문제는 여전히 남는다.</li>
          <li>Pipeline이 복잡하다 — 데이터 구성, projector 학습, auxiliary objective 설계까지 포함하면 재현 비용이 높다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>이 모델의 성능 향상은 LLM reasoning 자체에서 오는가, 아니면 사실상 structured imitation learning 효과가 더 큰가?</li>
          <li>Stage 2.5 interaction modeling은 planner robustness에 얼마나 직접적으로 기여하는가?</li>
          <li>이 구조를 closed-loop로 옮기면 instruction following과 stability 사이에 어떤 trade-off가 생길까?</li>
          <li>Planner를 LLM으로 만들었을 때, uncertainty estimation / fallback policy / safety shield는 어디에 두는 것이 맞는가?</li>
          <li>0.5B 모델이 강하다는 결과는 "더 큰 모델"보다 "더 좋은 representation"이 중요하다는 근거로 볼 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 "거대한 multimodal model"로 읽기보다 다음 세 가지 질문에 대한 답으로 읽는 편이 좋습니다:</p>
        <ul>
          <li>어떤 3D 표현이 LLM에 들어가야 planner로 쓸 수 있는가?</li>
          <li>어떤 학습 순서가 language reasoning을 driving action으로 연결하는가?</li>
          <li>Interaction modeling이 planner-level reliability에 어떤 역할을 하는가?</li>
        </ul>
        <p>이 세 질문을 중심으로 보면, Figure 2와 Figure 3의 복잡성이 훨씬 명확하게 정리됩니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. Attention Is All You Need
  // ====================================================================
  {
    id: "attention-is-all-you-need",
    date: "2025-04-11",
    authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, \u0141., Polosukhin, I.",
    venue: "NeurIPS 2017",
    image: "images/attention-is-all-you-need/thumbnail.png",
    link: "https://arxiv.org/abs/1706.03762",
    domain: "deep-learning",
    tags: ["Transformer", "NLP", "Attention", "Deep Learning"],
    en: {
      title: "Attention Is All You Need",
      summary: "Introduces the Transformer architecture that replaces recurrence and convolutions entirely with self-attention, achieving state-of-the-art machine translation with dramatically better parallelization.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper did not merely propose a new architecture — it <strong>redefined the computational primitive</strong> for sequence modeling by showing that attention alone, without any recurrence or convolution, is sufficient to achieve state-of-the-art results while enabling massive parallelization.</p>

        <h2>Research Question</h2>
        <blockquote>Can a sequence transduction model based entirely on attention mechanisms — without recurrence or convolutions — match or exceed the performance of established encoder-decoder architectures while being fundamentally more parallelizable?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>By 2017, sequence-to-sequence models with attention (e.g., Bahdanau attention over LSTM/GRU encoder-decoders) were the dominant paradigm for machine translation and other sequence transduction tasks. However, these models suffered from a fundamental computational bottleneck: <strong>recurrent computation is inherently sequential</strong>. Each hidden state depends on the previous one, making it impossible to parallelize across sequence positions during training. This O(n) sequential dependency meant that training on long sequences was prohibitively slow even with modern GPUs.</p>
        <p>Convolutional approaches (e.g., ConvS2S, ByteNet) offered better parallelization but required O(n) or O(log n) operations to relate distant positions, making long-range dependency learning indirect. The Transformer was designed to solve both problems simultaneously: <strong>O(1) sequential operations</strong> (full parallelization) with <strong>direct connections between all positions</strong> in each layer.</p>

        <h2>Architecture / Methodology</h2>
        <p>The Transformer follows an encoder-decoder structure, but both components are built entirely from attention and feed-forward layers — no recurrence, no convolution.</p>

        <figure>
          <img src="images/attention-is-all-you-need/fig1-transformer-architecture.png" alt="The Transformer architecture">
          <figcaption>Figure 1 (from paper): The Transformer model architecture showing the encoder (left) and decoder (right) stacks.</figcaption>
        </figure>

        <p><strong>Encoder:</strong> A stack of N=6 identical layers, each containing:</p>
        <ul>
          <li>Multi-head self-attention sublayer</li>
          <li>Position-wise feed-forward network (FFN) sublayer</li>
          <li>Residual connections + layer normalization around each sublayer</li>
        </ul>

        <p><strong>Decoder:</strong> A stack of N=6 identical layers, each containing:</p>
        <ul>
          <li>Masked multi-head self-attention (prevents attending to future positions)</li>
          <li>Multi-head cross-attention over encoder output</li>
          <li>Position-wise FFN sublayer</li>
          <li>Residual connections + layer normalization around each sublayer</li>
        </ul>

        <p><strong>Scaled Dot-Product Attention:</strong></p>
        <blockquote>Attention(Q, K, V) = softmax(QK<sup>T</sup> / sqrt(d<sub>k</sub>)) V</blockquote>
        <p>The scaling factor 1/sqrt(d<sub>k</sub>) is critical — without it, for large d<sub>k</sub>, the dot products grow large in magnitude, pushing the softmax into regions with extremely small gradients.</p>

        <figure>
          <img src="images/attention-is-all-you-need/fig2-attention-mechanisms.png" alt="Scaled dot-product attention and multi-head attention">
          <figcaption>Figure 2 (from paper): (left) Scaled Dot-Product Attention. (right) Multi-Head Attention consisting of several attention layers running in parallel.</figcaption>
        </figure>

        <p><strong>Multi-Head Attention:</strong> Instead of a single attention function with d<sub>model</sub>-dimensional keys/values/queries, the model projects them h=8 times with different learned projections to d<sub>k</sub>=d<sub>v</sub>=64 dimensions, applies attention in parallel, concatenates, and projects back. This allows the model to attend to information from different representation subspaces at different positions.</p>

        <p><strong>Positional Encoding:</strong> Since the model contains no recurrence or convolution, positional information must be injected explicitly. The paper uses sinusoidal functions of different frequencies:</p>
        <blockquote>PE(pos, 2i) = sin(pos / 10000<sup>2i/d_model</sup>)<br>PE(pos, 2i+1) = cos(pos / 10000<sup>2i/d_model</sup>)</blockquote>
        <p>This design allows the model to learn relative positions, since PE(pos+k) can be represented as a linear function of PE(pos) for any fixed offset k.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Pure attention architecture:</strong> First model to achieve competitive sequence transduction using only attention mechanisms, proving recurrence and convolution are not necessary.</li>
          <li><strong>Multi-head attention:</strong> The concept of splitting attention into multiple heads with separate learned projections, enabling diverse representation subspace attention.</li>
          <li><strong>Scaled dot-product attention:</strong> The specific attention formulation with sqrt(d_k) scaling that became the standard.</li>
          <li><strong>Positional encoding:</strong> Sinusoidal position embeddings that encode absolute position while enabling relative position reasoning.</li>
          <li><strong>Parallelization paradigm shift:</strong> Demonstrated that O(1) sequential operations could replace O(n) while improving quality, fundamentally changing how the field thinks about sequence model design.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Hyperparameter</th><th>Base Model</th><th>Big Model</th></tr></thead>
          <tbody>
            <tr><td>d<sub>model</sub></td><td>512</td><td>1024</td></tr>
            <tr><td>d<sub>ff</sub></td><td>2048</td><td>4096</td></tr>
            <tr><td>Heads (h)</td><td>8</td><td>16</td></tr>
            <tr><td>d<sub>k</sub> = d<sub>v</sub></td><td>64</td><td>64</td></tr>
            <tr><td>Layers (N)</td><td>6</td><td>6</td></tr>
            <tr><td>Parameters</td><td>65M</td><td>213M</td></tr>
            <tr><td>Training steps</td><td>100K</td><td>300K</td></tr>
            <tr><td>Training time</td><td>12 hours (8x P100)</td><td>3.5 days (8x P100)</td></tr>
          </tbody>
        </table>

        <p><strong>Optimization:</strong> Adam optimizer with custom learning rate schedule — linear warmup for 4000 steps followed by inverse square root decay. This "warmup" schedule became widely adopted in subsequent Transformer training.</p>

        <p><strong>Regularization:</strong></p>
        <ul>
          <li>Residual dropout (P<sub>drop</sub> = 0.1) applied to sublayer outputs and positional encodings</li>
          <li>Label smoothing (epsilon = 0.1) — hurts perplexity but improves BLEU score and accuracy, a notable finding</li>
        </ul>

        <p><strong>Data:</strong> WMT 2014 English-German (4.5M sentence pairs, ~37K BPE vocabulary) and English-French (36M sentence pairs, 32K word-piece vocabulary). Batched by approximate sequence length, ~25K source + 25K target tokens per batch.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Model</th><th>EN-DE BLEU</th><th>EN-FR BLEU</th><th>Training Cost (FLOPs)</th></tr></thead>
          <tbody>
            <tr><td>ByteNet</td><td>23.75</td><td>-</td><td>-</td></tr>
            <tr><td>GNMT + RL</td><td>24.6</td><td>39.92</td><td>1.4 x 10<sup>20</sup></td></tr>
            <tr><td>ConvS2S</td><td>25.16</td><td>40.46</td><td>1.5 x 10<sup>20</sup></td></tr>
            <tr><td>MoE</td><td>26.03</td><td>40.56</td><td>1.2 x 10<sup>20</sup></td></tr>
            <tr><td>Transformer (base)</td><td>27.3</td><td>38.1</td><td>3.3 x 10<sup>18</sup></td></tr>
            <tr><td><strong>Transformer (big)</strong></td><td><strong>28.4</strong></td><td><strong>41.8</strong></td><td><strong>2.3 x 10<sup>19</sup></strong></td></tr>
          </tbody>
        </table>

        <p>Key observations from results:</p>
        <ul>
          <li>The Transformer (big) achieves new SOTA on both EN-DE (28.4 BLEU) and EN-FR (41.8 BLEU).</li>
          <li>The training cost is <strong>an order of magnitude lower</strong> than previous SOTA models — the big model uses 2.3x10<sup>19</sup> FLOPs vs 1.4-1.5x10<sup>20</sup> for competitors.</li>
          <li>Even the base model (3.3x10<sup>18</sup> FLOPs) outperforms all previous models on EN-DE at a fraction of the cost.</li>
          <li>English constituency parsing: the Transformer also achieves competitive results (WSJ 23 F1 = 91.3), demonstrating generalization beyond translation.</li>
        </ul>

        <h2>Strengths</h2>
        <ul>
          <li>Conceptual clarity — the paper clearly articulates why recurrence is a bottleneck and how attention solves it, making the motivation immediately compelling.</li>
          <li>Dramatic efficiency gains — not just better quality, but orders of magnitude cheaper training, making the practical impact undeniable.</li>
          <li>Clean architectural design — the encoder-decoder symmetry, residual connections, and layer normalization create a highly modular and extensible architecture.</li>
          <li>Thorough ablation — Table 3 in the paper systematically varies the number of heads, key dimensions, model size, and attention types, isolating each design choice.</li>
          <li>Generalization beyond MT — the constituency parsing experiment shows this is not a task-specific trick but a general architecture.</li>
          <li>Foundational impact — this paper became the basis for BERT, GPT, ViT, and essentially all modern deep learning, validated by 100,000+ citations.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>O(n<sup>2</sup>) attention complexity — the self-attention mechanism scales quadratically with sequence length, limiting applicability to very long sequences (addressed later by Linformer, Performer, etc.).</li>
          <li>No explicit structure modeling — the model treats input as a flat sequence with positional encodings, without explicit hierarchical or syntactic structure.</li>
          <li>Positional encoding limitations — sinusoidal encodings provide absolute positions but learned relative position schemes (e.g., RoPE, ALiBi) later proved more effective for generalization to unseen lengths.</li>
          <li>Fixed context window — the model cannot attend beyond its training context length, a limitation that persists in modern LLMs.</li>
          <li>Evaluation limited to translation — while constituency parsing is included, broader NLU/NLG benchmarks were not explored (these came with BERT/GPT).</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Why did the Transformer succeed so comprehensively where previous attention-augmented models (e.g., Bahdanau attention) only partially improved RNNs? What is the architectural minimum for attention-only models?</li>
          <li>The quadratic attention cost has inspired numerous efficient attention variants — but none have fully replaced standard attention in practice. Why is the O(n<sup>2</sup>) formulation so hard to improve upon without quality loss?</li>
          <li>Multi-head attention splits the representation into independent subspaces. Is this truly learning diverse attention patterns, or do many heads become redundant (as suggested by later pruning studies)?</li>
          <li>The warmup learning rate schedule was crucial for training stability. What does this reveal about the loss landscape of Transformer models compared to RNNs?</li>
          <li>Sinusoidal positional encodings were later largely replaced by learned or rotary encodings. Was the original design fundamentally limited, or was it simply undertested at scale?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>The lasting significance of this paper extends far beyond machine translation. By demonstrating that <strong>attention alone is a sufficient computational primitive for sequence transduction</strong>, it unlocked three transformative insights:</p>
        <ul>
          <li><strong>Parallelism as a first-class design goal:</strong> The shift from O(n) sequential to O(1) sequential operations was not just an engineering improvement — it changed what scale of models and data could be practically trained.</li>
          <li><strong>Modular composability:</strong> The Transformer's clean layer structure (attention + FFN + residual + norm) became the universal building block for models from 65M to 1T+ parameters.</li>
          <li><strong>Architecture as the bottleneck:</strong> Before the Transformer, scaling was often about more data or compute. After it, the community realized that the right architecture could make existing compute dramatically more effective.</li>
        </ul>
        <p>Reading this paper in 2025, it remains striking how many of its design choices — residual connections, layer normalization, multi-head attention, the encoder-decoder split — survived essentially unchanged into GPT-4, Gemini, and Claude.</p>
      `
    },
    ko: {
      title: "Attention Is All You Need",
      summary: "순환과 합성곱을 완전히 자기 어텐션으로 대체한 Transformer 아키텍처를 제안하여, 극적으로 향상된 병렬화와 함께 최고 수준의 기계 번역 성능을 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 단순히 새로운 아키텍처를 제안한 것이 아니라, 어텐션만으로도 — 순환이나 합성곱 없이 — 최첨단 결과를 달성하면서 대규모 병렬화가 가능함을 보여줌으로써 <strong>시퀀스 모델링의 계산 기본 단위를 재정의</strong>했습니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>순환이나 합성곱 없이 전적으로 어텐션 메커니즘에 기반한 시퀀스 변환 모델이, 기존 인코더-디코더 아키텍처의 성능을 맞추거나 넘어서면서 근본적으로 더 높은 병렬화가 가능한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>2017년까지 어텐션을 갖춘 시퀀스-투-시퀀스 모델(예: LSTM/GRU 인코더-디코더 위의 Bahdanau 어텐션)이 기계 번역 및 기타 시퀀스 변환 작업의 지배적 패러다임이었습니다. 그러나 이 모델들은 근본적인 계산 병목에 시달렸습니다: <strong>순환 계산은 본질적으로 순차적</strong>입니다. 각 은닉 상태가 이전 상태에 의존하므로 학습 중 시퀀스 위치 간 병렬화가 불가능합니다. 이 O(n) 순차 의존성은 현대 GPU로도 긴 시퀀스 학습을 비현실적으로 느리게 만들었습니다.</p>
        <p>합성곱 접근법(예: ConvS2S, ByteNet)은 더 나은 병렬화를 제공했지만 먼 위치를 연결하려면 O(n) 또는 O(log n) 연산이 필요해 장거리 의존성 학습이 간접적이었습니다. Transformer는 두 문제를 동시에 해결하도록 설계되었습니다: <strong>O(1) 순차 연산</strong>(완전한 병렬화)과 각 레이어에서 <strong>모든 위치 간 직접 연결</strong>.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>Transformer는 인코더-디코더 구조를 따르지만, 두 구성 요소 모두 어텐션과 피드포워드 레이어만으로 구축됩니다 — 순환도 합성곱도 없습니다.</p>

        <figure>
          <img src="images/attention-is-all-you-need/fig1-transformer-architecture.png" alt="Transformer 아키텍처">
          <figcaption>Figure 1 (원문): 인코더(왼쪽)와 디코더(오른쪽) 스택을 보여주는 Transformer 모델 아키텍처.</figcaption>
        </figure>

        <p><strong>인코더:</strong> N=6개의 동일한 레이어 스택, 각 레이어 구성:</p>
        <ul>
          <li>멀티헤드 셀프 어텐션 서브레이어</li>
          <li>위치별 피드포워드 네트워크(FFN) 서브레이어</li>
          <li>각 서브레이어 주위의 잔차 연결 + 레이어 정규화</li>
        </ul>

        <p><strong>디코더:</strong> N=6개의 동일한 레이어 스택, 각 레이어 구성:</p>
        <ul>
          <li>마스크된 멀티헤드 셀프 어텐션 (미래 위치 어텐션 방지)</li>
          <li>인코더 출력에 대한 멀티헤드 크로스 어텐션</li>
          <li>위치별 FFN 서브레이어</li>
          <li>각 서브레이어 주위의 잔차 연결 + 레이어 정규화</li>
        </ul>

        <p><strong>Scaled Dot-Product Attention:</strong></p>
        <blockquote>Attention(Q, K, V) = softmax(QK<sup>T</sup> / sqrt(d<sub>k</sub>)) V</blockquote>
        <p>스케일링 팩터 1/sqrt(d<sub>k</sub>)는 매우 중요합니다 — 이것 없이는 큰 d<sub>k</sub>에서 내적이 크게 증가하여 softmax가 극히 작은 기울기 영역으로 밀려납니다.</p>

        <figure>
          <img src="images/attention-is-all-you-need/fig2-attention-mechanisms.png" alt="Scaled dot-product attention과 multi-head attention">
          <figcaption>Figure 2 (원문): (왼쪽) Scaled Dot-Product Attention. (오른쪽) 여러 어텐션 레이어가 병렬로 실행되는 Multi-Head Attention.</figcaption>
        </figure>

        <p><strong>Multi-Head Attention:</strong> d<sub>model</sub> 차원의 키/값/쿼리에 대해 단일 어텐션 함수 대신, h=8번 서로 다른 학습된 프로젝션으로 d<sub>k</sub>=d<sub>v</sub>=64 차원에 투영하고, 병렬로 어텐션을 적용한 뒤 연결하고 다시 투영합니다. 이를 통해 모델이 서로 다른 표현 부분공간에서 다른 위치의 정보에 어텐션할 수 있습니다.</p>

        <p><strong>위치 인코딩:</strong> 모델에 순환이나 합성곱이 없으므로 위치 정보를 명시적으로 주입해야 합니다. 논문은 서로 다른 주파수의 사인 함수를 사용합니다:</p>
        <blockquote>PE(pos, 2i) = sin(pos / 10000<sup>2i/d_model</sup>)<br>PE(pos, 2i+1) = cos(pos / 10000<sup>2i/d_model</sup>)</blockquote>
        <p>이 설계는 모델이 상대 위치를 학습할 수 있게 합니다. 고정 오프셋 k에 대해 PE(pos+k)가 PE(pos)의 선형 함수로 표현 가능하기 때문입니다.</p>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>순수 어텐션 아키텍처:</strong> 어텐션 메커니즘만으로 경쟁력 있는 시퀀스 변환을 달성한 최초의 모델로, 순환과 합성곱이 필수가 아님을 증명했다.</li>
          <li><strong>Multi-head attention:</strong> 어텐션을 별도 학습 프로젝션을 가진 여러 헤드로 분할하여 다양한 표현 부분공간 어텐션을 가능하게 하는 개념.</li>
          <li><strong>Scaled dot-product attention:</strong> sqrt(d_k) 스케일링을 갖춘 표준이 된 특정 어텐션 공식.</li>
          <li><strong>위치 인코딩:</strong> 절대 위치를 인코딩하면서 상대 위치 추론을 가능하게 하는 사인파 위치 임베딩.</li>
          <li><strong>병렬화 패러다임 전환:</strong> O(1) 순차 연산이 품질을 향상시키면서 O(n)을 대체할 수 있음을 보여, 시퀀스 모델 설계에 대한 분야의 사고방식을 근본적으로 변화시켰다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>하이퍼파라미터</th><th>Base 모델</th><th>Big 모델</th></tr></thead>
          <tbody>
            <tr><td>d<sub>model</sub></td><td>512</td><td>1024</td></tr>
            <tr><td>d<sub>ff</sub></td><td>2048</td><td>4096</td></tr>
            <tr><td>헤드 수 (h)</td><td>8</td><td>16</td></tr>
            <tr><td>d<sub>k</sub> = d<sub>v</sub></td><td>64</td><td>64</td></tr>
            <tr><td>레이어 수 (N)</td><td>6</td><td>6</td></tr>
            <tr><td>파라미터</td><td>65M</td><td>213M</td></tr>
            <tr><td>학습 스텝</td><td>100K</td><td>300K</td></tr>
            <tr><td>학습 시간</td><td>12시간 (8x P100)</td><td>3.5일 (8x P100)</td></tr>
          </tbody>
        </table>

        <p><strong>최적화:</strong> 커스텀 학습률 스케줄을 사용하는 Adam 옵티마이저 — 4000 스텝 동안 선형 워밍업 후 역제곱근 감쇠. 이 "워밍업" 스케줄은 이후 Transformer 학습에서 널리 채택되었습니다.</p>

        <p><strong>정규화:</strong></p>
        <ul>
          <li>잔차 드롭아웃 (P<sub>drop</sub> = 0.1) — 서브레이어 출력과 위치 인코딩에 적용</li>
          <li>라벨 스무딩 (epsilon = 0.1) — 퍼플렉시티는 해치지만 BLEU 점수와 정확도를 향상시키는 주목할 만한 발견</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>모델</th><th>EN-DE BLEU</th><th>EN-FR BLEU</th><th>학습 비용 (FLOPs)</th></tr></thead>
          <tbody>
            <tr><td>ByteNet</td><td>23.75</td><td>-</td><td>-</td></tr>
            <tr><td>GNMT + RL</td><td>24.6</td><td>39.92</td><td>1.4 x 10<sup>20</sup></td></tr>
            <tr><td>ConvS2S</td><td>25.16</td><td>40.46</td><td>1.5 x 10<sup>20</sup></td></tr>
            <tr><td>MoE</td><td>26.03</td><td>40.56</td><td>1.2 x 10<sup>20</sup></td></tr>
            <tr><td>Transformer (base)</td><td>27.3</td><td>38.1</td><td>3.3 x 10<sup>18</sup></td></tr>
            <tr><td><strong>Transformer (big)</strong></td><td><strong>28.4</strong></td><td><strong>41.8</strong></td><td><strong>2.3 x 10<sup>19</sup></strong></td></tr>
          </tbody>
        </table>

        <p>결과에서의 핵심 관찰:</p>
        <ul>
          <li>Transformer (big)는 EN-DE (28.4 BLEU)와 EN-FR (41.8 BLEU) 모두에서 새로운 SOTA를 달성한다.</li>
          <li>학습 비용이 이전 SOTA 모델보다 <strong>한 자릿수 낮다</strong> — big 모델은 2.3x10<sup>19</sup> FLOPs vs 경쟁 모델의 1.4-1.5x10<sup>20</sup>.</li>
          <li>base 모델(3.3x10<sup>18</sup> FLOPs)조차도 훨씬 적은 비용으로 EN-DE에서 모든 이전 모델을 능가한다.</li>
          <li>영어 구문 분석: Transformer는 경쟁력 있는 결과(WSJ 23 F1 = 91.3)를 달성하여 번역을 넘어선 일반화를 입증한다.</li>
        </ul>

        <h2>강점</h2>
        <ul>
          <li>개념적 명확성 — 순환이 왜 병목인지, 어텐션이 어떻게 해결하는지 명확히 서술하여 동기 부여가 즉각적으로 설득력 있다.</li>
          <li>극적인 효율성 향상 — 단순히 더 나은 품질뿐 아니라 수십 배 저렴한 학습으로, 실용적 영향이 부인할 수 없다.</li>
          <li>깔끔한 아키텍처 설계 — 인코더-디코더 대칭성, 잔차 연결, 레이어 정규화가 매우 모듈적이고 확장 가능한 아키텍처를 만든다.</li>
          <li>철저한 ablation — 헤드 수, 키 차원, 모델 크기, 어텐션 유형을 체계적으로 변화시켜 각 설계 선택을 분리한다.</li>
          <li>MT를 넘어선 일반화 — 구문 분석 실험이 이것이 작업 특화 트릭이 아니라 범용 아키텍처임을 보여준다.</li>
          <li>근본적 영향 — BERT, GPT, ViT, 그리고 본질적으로 모든 현대 딥러닝의 기초가 되어 100,000회 이상 인용으로 검증되었다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>O(n<sup>2</sup>) 어텐션 복잡도 — 셀프 어텐션이 시퀀스 길이에 따라 이차적으로 증가하여 매우 긴 시퀀스에 대한 적용성을 제한한다 (이후 Linformer, Performer 등으로 해결 시도).</li>
          <li>명시적 구조 모델링 없음 — 명시적 계층 또는 구문 구조 없이 입력을 위치 인코딩이 있는 평평한 시퀀스로 취급한다.</li>
          <li>위치 인코딩 한계 — 사인파 인코딩은 절대 위치를 제공하지만 학습된 상대 위치 체계(예: RoPE, ALiBi)가 이후 보이지 않는 길이에 대한 일반화에서 더 효과적임이 밝혀졌다.</li>
          <li>고정된 컨텍스트 윈도우 — 학습 컨텍스트 길이를 넘어서는 어텐션이 불가능한 한계가 현대 LLM에서도 지속된다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>이전 어텐션 증강 모델(예: Bahdanau 어텐션)이 RNN을 부분적으로만 개선한 반면 Transformer가 왜 그토록 포괄적으로 성공했는가? 어텐션 전용 모델의 아키텍처 최소 조건은 무엇인가?</li>
          <li>이차 어텐션 비용이 수많은 효율적 어텐션 변형을 촉발했지만 실제로 표준 어텐션을 완전히 대체한 것은 없다. O(n<sup>2</sup>) 공식이 왜 품질 손실 없이 개선하기 그토록 어려운가?</li>
          <li>Multi-head attention이 표현을 독립 부분공간으로 분할하는데, 이것이 진정으로 다양한 어텐션 패턴을 학습하는 것인가, 아니면 많은 헤드가 중복되는 것인가(이후 프루닝 연구가 시사하듯)?</li>
          <li>워밍업 학습률 스케줄이 학습 안정성에 결정적이었다. 이것이 RNN 대비 Transformer 모델의 손실 랜드스케이프에 대해 무엇을 드러내는가?</li>
          <li>사인파 위치 인코딩은 이후 대부분 학습된 인코딩이나 회전 인코딩으로 대체되었다. 원래 설계가 근본적으로 제한적이었는가, 아니면 단순히 대규모에서 충분히 테스트되지 않았는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문의 지속적인 중요성은 기계 번역을 훨씬 넘어섭니다. <strong>어텐션만으로도 시퀀스 변환에 충분한 계산 기본 단위</strong>임을 보여줌으로써 세 가지 변혁적 통찰을 열었습니다:</p>
        <ul>
          <li><strong>일급 설계 목표로서의 병렬성:</strong> O(n) 순차에서 O(1) 순차 연산으로의 전환은 단순한 엔지니어링 개선이 아니라 — 실제로 학습 가능한 모델과 데이터의 규모를 바꾸었다.</li>
          <li><strong>모듈식 조합 가능성:</strong> Transformer의 깔끔한 레이어 구조(어텐션 + FFN + 잔차 + 정규화)가 65M에서 1T+ 파라미터 모델까지의 보편적 구성 요소가 되었다.</li>
          <li><strong>병목으로서의 아키텍처:</strong> Transformer 이전에는 스케일링이 종종 더 많은 데이터나 계산에 관한 것이었다. 이후 커뮤니티는 올바른 아키텍처가 기존 계산을 극적으로 더 효과적으로 만들 수 있음을 깨달았다.</li>
        </ul>
        <p>2025년에 이 논문을 읽으면서, 잔차 연결, 레이어 정규화, 멀티헤드 어텐션, 인코더-디코더 분할 등 설계 선택의 얼마나 많은 것이 GPT-4, Gemini, Claude에 본질적으로 변하지 않고 살아남았는지 여전히 놀랍습니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. OpenEMMA
  // ====================================================================
  {
    id: "openemma",
    date: "2025-04-11",
    authors: "Xing, S., Qian, C., Wang, Y., Hua, H., Tian, K., Zhou, Y., Tu, Z.",
    venue: "CVPR 2025 Workshop",
    image: "images/openemma/thumbnail.png",
    link: "https://arxiv.org/abs/2412.15208",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "MLLM", "End-to-End", "Open-Source"],
    en: {
      title: "OpenEMMA: Open-Source Multimodal Model for End-to-End Autonomous Driving",
      summary: "An open-source replication of Waymo's EMMA that leverages Chain-of-Thought reasoning and YOLO-based 3D detection to enable multimodal LLMs for end-to-end driving trajectory prediction.",
      review: `
        <h2>One-line Verdict</h2>
        <p>OpenEMMA demonstrates that <strong>open-source multimodal LLMs can approximate proprietary end-to-end driving systems</strong> when augmented with structured Chain-of-Thought prompting and external 3D object detection, though significant performance gaps remain.</p>

        <h2>Research Question</h2>
        <blockquote>Can open-source multimodal large language models replicate the end-to-end autonomous driving capabilities of proprietary models like Waymo's EMMA, and what prompting and perception augmentations are needed to make this feasible?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Waymo's EMMA (End-to-End Multimodal Model for Autonomous Driving) demonstrated impressive results by using Gemini as a backbone for end-to-end driving. However, EMMA is entirely closed-source, built on proprietary Gemini models, and evaluated on Waymo's internal dataset — making it inaccessible for academic research and reproducibility. OpenEMMA aims to bridge this gap by building an open-source alternative using publicly available multimodal LLMs (LLaVA, Llama, Qwen2-VL) and the nuScenes dataset.</p>
        <p>The key challenge is that general-purpose MLLMs were not designed for driving — they lack 3D spatial reasoning, have no notion of vehicle dynamics, and cannot natively process driving-specific representations like trajectories. OpenEMMA addresses this through a combination of <strong>Chain-of-Thought (CoT) reasoning prompts</strong> and <strong>external 3D detection from YOLO11n</strong> to provide the spatial grounding that MLLMs lack.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/openemma/fig1-framework.png" alt="OpenEMMA framework overview">
          <figcaption>Figure 1 (from paper): OpenEMMA framework — front camera image + YOLO 3D detection + CoT prompting fed to an MLLM for trajectory prediction.</figcaption>
        </figure>

        <p>The OpenEMMA pipeline consists of three main components:</p>
        <ol>
          <li><strong>Visual Input Processing:</strong> Front-view camera image is processed by YOLO11n to extract 3D bounding boxes for nearby objects, providing spatial context that the MLLM cannot infer from 2D images alone.</li>
          <li><strong>Chain-of-Thought Prompting:</strong> A structured prompt template guides the MLLM through five reasoning stages before trajectory prediction.</li>
          <li><strong>Trajectory Generation:</strong> The MLLM outputs future waypoints encoded as speed and curvature values, which are then converted to (x, y) coordinates.</li>
        </ol>

        <p><strong>Chain-of-Thought Reasoning Steps:</strong></p>
        <ul>
          <li><strong>Object Description:</strong> Identify and describe all detected objects with their 3D positions and attributes.</li>
          <li><strong>Intent Command:</strong> Determine the high-level driving intent (e.g., go straight, turn left, lane change).</li>
          <li><strong>Scene Description:</strong> Provide an overall description of the driving environment (road type, weather, traffic density).</li>
          <li><strong>Major Objects:</strong> Identify the most safety-critical objects that should influence the driving decision.</li>
          <li><strong>Driving Decision:</strong> Generate the final trajectory based on all preceding reasoning steps.</li>
        </ul>

        <figure>
          <img src="images/openemma/fig2-comparison.png" alt="Comparison with EMMA and other approaches">
          <figcaption>Figure 2 (from paper): Comparison of OpenEMMA's approach with the original EMMA and other driving frameworks.</figcaption>
        </figure>

        <p><strong>Trajectory Representation:</strong> Rather than directly predicting (x, y) waypoints, OpenEMMA uses speed and curvature as the output representation. This is more physically meaningful and constrains the output to kinematically feasible trajectories. The speed-curvature pairs are then converted to waypoints via numerical integration.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Open-source EMMA replication:</strong> First publicly available implementation attempting to replicate EMMA's end-to-end driving approach with open-source models.</li>
          <li><strong>CoT prompting for driving:</strong> Structured five-stage reasoning pipeline that decomposes the driving task into interpretable sub-problems before trajectory prediction.</li>
          <li><strong>YOLO-augmented spatial grounding:</strong> Integration of lightweight 3D detection to compensate for MLLMs' lack of native 3D understanding.</li>
          <li><strong>Multi-model benchmarking:</strong> Systematic comparison of LLaVA, Llama, and Qwen2-VL backbones for driving trajectory prediction.</li>
          <li><strong>Speed-curvature representation:</strong> Physically meaningful trajectory encoding that constrains outputs to kinematically feasible paths.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>OpenEMMA operates primarily in a <strong>zero-shot or few-shot inference mode</strong> — the MLLMs are not fine-tuned on driving data but rather prompted with structured CoT instructions. This is both a strength (no driving-specific training needed) and a limitation (performance ceiling).</p>

        <table>
          <thead><tr><th>Component</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>3D Detector</td><td>YOLO11n (nano variant for real-time performance)</td></tr>
            <tr><td>MLLM Backbones</td><td>LLaVA-v1.6-34B, Llama-3.2-11B-Vision, Qwen2-VL-7B</td></tr>
            <tr><td>Evaluation Dataset</td><td>nuScenes validation set</td></tr>
            <tr><td>Trajectory Horizon</td><td>3 seconds (6 waypoints at 2Hz)</td></tr>
            <tr><td>Output Format</td><td>Speed (m/s) + curvature (1/m) pairs per timestep</td></tr>
            <tr><td>Inference Mode</td><td>Zero-shot with CoT prompting</td></tr>
          </tbody>
        </table>

        <figure>
          <img src="images/openemma/fig3-driving-scenarios.png" alt="Driving scenario examples">
          <figcaption>Figure 3 (from paper): Example driving scenarios showing OpenEMMA's predicted trajectories across different conditions.</figcaption>
        </figure>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Model</th><th>L2 (1s)</th><th>L2 (2s)</th><th>L2 (3s)</th><th>Avg L2</th><th>Failure Rate</th></tr></thead>
          <tbody>
            <tr><td>LLaVA-v1.6-34B (zero-shot)</td><td>-</td><td>-</td><td>-</td><td>high</td><td>high</td></tr>
            <tr><td>LLaVA-v1.6-34B (CoT)</td><td>-</td><td>-</td><td>-</td><td>improved</td><td>reduced</td></tr>
            <tr><td>Llama-3.2-11B (CoT)</td><td>-</td><td>-</td><td>-</td><td>moderate</td><td>moderate</td></tr>
            <tr><td><strong>Qwen2-VL-7B (CoT)</strong></td><td>-</td><td>-</td><td>-</td><td><strong>2.81</strong></td><td><strong>lowest</strong></td></tr>
          </tbody>
        </table>

        <p>Key findings from the experiments:</p>
        <ul>
          <li><strong>Qwen2-VL-7B achieves the best average L2 error of 2.81m</strong> across the prediction horizon, despite being the smallest model tested.</li>
          <li><strong>CoT prompting significantly reduces failure rate</strong> compared to zero-shot prompting — the model produces far fewer invalid or catastrophically wrong trajectories.</li>
          <li><strong>YOLO 3D detection augmentation is critical</strong> — without it, the MLLMs have no reliable spatial grounding and trajectory quality degrades substantially.</li>
          <li><strong>Model size does not directly correlate with driving performance</strong> — Qwen2-VL-7B outperforms LLaVA-34B, suggesting architectural design and visual understanding capability matter more.</li>
          <li>The performance gap with fine-tuned driving-specific models (e.g., UniAD at ~1m L2) remains significant, highlighting the limitations of prompt-only approaches.</li>
        </ul>

        <h2>Strengths</h2>
        <ul>
          <li>Open-source accessibility — provides the research community with a reproducible baseline for MLLM-based driving, filling the gap left by closed-source EMMA.</li>
          <li>No training required — the zero-shot/CoT approach eliminates the need for expensive driving-specific fine-tuning, making experimentation accessible.</li>
          <li>Interpretable reasoning — the CoT pipeline produces human-readable intermediate reasoning steps, enabling diagnosis of failure modes.</li>
          <li>Modular design — YOLO detection, MLLM backbone, and prompt template are independently replaceable, enabling systematic ablation and improvement.</li>
          <li>Practical trajectory representation — speed-curvature encoding ensures kinematic feasibility, a detail often overlooked in LLM-based planners.</li>
          <li>Multi-backbone evaluation — testing across three different MLLMs provides insight into which model capabilities matter for driving.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Performance gap — average L2 error of 2.81m is substantially higher than fine-tuned driving models (UniAD ~1m), limiting practical applicability.</li>
          <li>Single camera only — reliance on front-view camera only, unlike multi-view or sensor-fusion approaches, limits spatial awareness.</li>
          <li>No temporal reasoning — each frame is processed independently without temporal context from previous frames, unlike video-based approaches.</li>
          <li>YOLO dependency — the quality of trajectory prediction is tightly coupled to YOLO's 3D detection accuracy, creating a fragile dependency.</li>
          <li>Inference latency — running a 7B+ parameter MLLM per frame is orders of magnitude slower than specialized driving models, making real-time deployment impractical.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Is the CoT prompting approach fundamentally limited for driving, or could better prompt engineering close the gap with fine-tuned models?</li>
          <li>The smaller Qwen2-VL outperforming larger LLaVA suggests vision encoder quality matters more than LLM size — what visual capabilities are most critical for driving?</li>
          <li>Could OpenEMMA's CoT reasoning pipeline be used as a data generation tool to create training data for fine-tuned, more efficient driving models?</li>
          <li>How would the system perform with multi-view cameras or temporal video input instead of single-frame processing?</li>
          <li>What is the practical role of open-source MLLM-based driving systems — research prototyping, data annotation, or eventual deployment?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>OpenEMMA is best understood not as a competitor to fine-tuned driving models, but as a <strong>proof-of-concept and research platform</strong> that answers a specific question: how far can off-the-shelf MLLMs go for driving without any driving-specific training? The answer — reasonably far with structured prompting and external perception, but not far enough for deployment — provides a useful calibration point for the field. Its primary value lies in:</p>
        <ul>
          <li>Demonstrating the minimum viable approach for MLLM-based driving</li>
          <li>Identifying where general-purpose vision-language understanding falls short for driving-specific 3D reasoning</li>
          <li>Providing an open-source baseline that the community can build upon</li>
        </ul>
        <p>The gap between OpenEMMA (2.81m L2) and specialized models (~1m L2) precisely quantifies the value of driving-specific training and architecture design.</p>
      `
    },
    ko: {
      title: "OpenEMMA: End-to-End 자율주행을 위한 오픈소스 멀티모달 모델",
      summary: "Waymo의 EMMA를 오픈소스로 재현한 연구로, Chain-of-Thought 추론과 YOLO 기반 3D 검출을 활용하여 멀티모달 LLM의 주행 궤적 예측을 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>OpenEMMA는 구조화된 Chain-of-Thought 프롬프팅과 외부 3D 객체 검출을 보강하면 <strong>오픈소스 멀티모달 LLM이 독점 end-to-end 주행 시스템에 근접할 수 있음</strong>을 보여주지만, 여전히 상당한 성능 차이가 남아 있습니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>오픈소스 멀티모달 대규모 언어 모델이 Waymo의 EMMA와 같은 독점 모델의 end-to-end 자율주행 능력을 재현할 수 있는가, 그리고 이를 실현하기 위해 어떤 프롬프팅 및 인식 보강이 필요한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>Waymo의 EMMA(End-to-End Multimodal Model for Autonomous Driving)는 Gemini를 백본으로 사용하여 end-to-end 주행에서 인상적인 결과를 보여주었습니다. 그러나 EMMA는 완전히 비공개 소스이며, 독점 Gemini 모델 위에 구축되고, Waymo의 내부 데이터셋에서만 평가되어 학술 연구와 재현성에 접근할 수 없습니다. OpenEMMA는 공개 가용한 멀티모달 LLM(LLaVA, Llama, Qwen2-VL)과 nuScenes 데이터셋을 사용하여 오픈소스 대안을 구축함으로써 이 격차를 해소하고자 합니다.</p>
        <p>핵심 과제는 범용 MLLM이 주행용으로 설계되지 않았다는 것입니다 — 3D 공간 추론이 부족하고, 차량 동역학 개념이 없으며, 궤적과 같은 주행 특화 표현을 기본적으로 처리할 수 없습니다. OpenEMMA는 MLLM이 부족한 공간 기반을 보충하기 위해 <strong>Chain-of-Thought(CoT) 추론 프롬프트</strong>와 <strong>YOLO11n의 외부 3D 검출</strong>을 결합하여 이를 해결합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <figure>
          <img src="images/openemma/fig1-framework.png" alt="OpenEMMA 프레임워크 개요">
          <figcaption>Figure 1 (원문): OpenEMMA 프레임워크 — 전방 카메라 이미지 + YOLO 3D 검출 + CoT 프롬프팅을 MLLM에 입력하여 궤적 예측.</figcaption>
        </figure>

        <p>OpenEMMA 파이프라인은 세 가지 주요 구성 요소로 이루어집니다:</p>
        <ol>
          <li><strong>시각 입력 처리:</strong> 전방 카메라 이미지를 YOLO11n으로 처리하여 근처 객체의 3D 바운딩 박스를 추출, MLLM이 2D 이미지만으로는 추론할 수 없는 공간 컨텍스트를 제공한다.</li>
          <li><strong>Chain-of-Thought 프롬프팅:</strong> 구조화된 프롬프트 템플릿이 궤적 예측 전 다섯 가지 추론 단계를 통해 MLLM을 안내한다.</li>
          <li><strong>궤적 생성:</strong> MLLM이 속도와 곡률 값으로 인코딩된 미래 웨이포인트를 출력하고, 이를 (x, y) 좌표로 변환한다.</li>
        </ol>

        <p><strong>Chain-of-Thought 추론 단계:</strong></p>
        <ul>
          <li><strong>Object Description:</strong> 감지된 모든 객체를 3D 위치와 속성과 함께 식별하고 설명한다.</li>
          <li><strong>Intent Command:</strong> 고수준 주행 의도를 결정한다 (예: 직진, 좌회전, 차선 변경).</li>
          <li><strong>Scene Description:</strong> 주행 환경의 전반적 설명을 제공한다 (도로 유형, 날씨, 교통 밀도).</li>
          <li><strong>Major Objects:</strong> 주행 결정에 영향을 미쳐야 할 가장 안전에 중요한 객체를 식별한다.</li>
          <li><strong>Driving Decision:</strong> 모든 선행 추론 단계를 바탕으로 최종 궤적을 생성한다.</li>
        </ul>

        <figure>
          <img src="images/openemma/fig2-comparison.png" alt="EMMA 및 다른 접근법과의 비교">
          <figcaption>Figure 2 (원문): OpenEMMA의 접근법과 원본 EMMA 및 다른 주행 프레임워크의 비교.</figcaption>
        </figure>

        <p><strong>궤적 표현:</strong> (x, y) 웨이포인트를 직접 예측하는 대신 OpenEMMA는 속도와 곡률을 출력 표현으로 사용합니다. 이는 물리적으로 더 의미 있으며 출력을 운동학적으로 실현 가능한 궤적으로 제한합니다. 속도-곡률 쌍은 수치 적분을 통해 웨이포인트로 변환됩니다.</p>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>오픈소스 EMMA 재현:</strong> 오픈소스 모델로 EMMA의 end-to-end 주행 접근법을 재현하려는 최초의 공개 구현.</li>
          <li><strong>주행을 위한 CoT 프롬프팅:</strong> 궤적 예측 전 주행 작업을 해석 가능한 하위 문제로 분해하는 구조화된 5단계 추론 파이프라인.</li>
          <li><strong>YOLO 보강 공간 기반:</strong> MLLM의 기본 3D 이해 부족을 보완하기 위한 경량 3D 검출 통합.</li>
          <li><strong>다중 모델 벤치마킹:</strong> 주행 궤적 예측을 위한 LLaVA, Llama, Qwen2-VL 백본의 체계적 비교.</li>
          <li><strong>속도-곡률 표현:</strong> 출력을 운동학적으로 실현 가능한 경로로 제한하는 물리적으로 의미 있는 궤적 인코딩.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>OpenEMMA는 주로 <strong>제로샷 또는 퓨샷 추론 모드</strong>로 작동합니다 — MLLM은 주행 데이터에 대해 미세 조정되지 않고 구조화된 CoT 지시로 프롬프팅됩니다. 이는 강점(주행 특화 학습 불필요)이자 한계(성능 상한)입니다.</p>

        <table>
          <thead><tr><th>구성 요소</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>3D 검출기</td><td>YOLO11n (실시간 성능을 위한 나노 변형)</td></tr>
            <tr><td>MLLM 백본</td><td>LLaVA-v1.6-34B, Llama-3.2-11B-Vision, Qwen2-VL-7B</td></tr>
            <tr><td>평가 데이터셋</td><td>nuScenes 검증 세트</td></tr>
            <tr><td>궤적 예측 범위</td><td>3초 (2Hz에서 6개 웨이포인트)</td></tr>
            <tr><td>출력 형식</td><td>타임스텝당 속도(m/s) + 곡률(1/m) 쌍</td></tr>
            <tr><td>추론 모드</td><td>CoT 프롬프팅을 통한 제로샷</td></tr>
          </tbody>
        </table>

        <figure>
          <img src="images/openemma/fig3-driving-scenarios.png" alt="주행 시나리오 예시">
          <figcaption>Figure 3 (원문): 다양한 조건에서 OpenEMMA의 예측 궤적을 보여주는 주행 시나리오 예시.</figcaption>
        </figure>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>모델</th><th>L2 (1s)</th><th>L2 (2s)</th><th>L2 (3s)</th><th>평균 L2</th><th>실패율</th></tr></thead>
          <tbody>
            <tr><td>LLaVA-v1.6-34B (제로샷)</td><td>-</td><td>-</td><td>-</td><td>높음</td><td>높음</td></tr>
            <tr><td>LLaVA-v1.6-34B (CoT)</td><td>-</td><td>-</td><td>-</td><td>개선됨</td><td>감소됨</td></tr>
            <tr><td>Llama-3.2-11B (CoT)</td><td>-</td><td>-</td><td>-</td><td>중간</td><td>중간</td></tr>
            <tr><td><strong>Qwen2-VL-7B (CoT)</strong></td><td>-</td><td>-</td><td>-</td><td><strong>2.81</strong></td><td><strong>최저</strong></td></tr>
          </tbody>
        </table>

        <p>실험에서의 핵심 발견:</p>
        <ul>
          <li><strong>Qwen2-VL-7B가 예측 범위 전체에서 최고의 평균 L2 오차 2.81m를 달성</strong> — 테스트된 모델 중 가장 작은 크기임에도 불구하고.</li>
          <li><strong>CoT 프롬프팅이 제로샷 대비 실패율을 크게 감소</strong> — 모델이 유효하지 않거나 치명적으로 잘못된 궤적을 훨씬 적게 생성한다.</li>
          <li><strong>YOLO 3D 검출 보강이 핵심적</strong> — 이것 없이는 MLLM이 신뢰할 수 있는 공간 기반이 없어 궤적 품질이 크게 저하된다.</li>
          <li><strong>모델 크기가 주행 성능과 직접 상관하지 않음</strong> — Qwen2-VL-7B가 LLaVA-34B를 능가하여, 아키텍처 설계와 시각 이해 능력이 더 중요함을 시사한다.</li>
          <li>미세 조정된 주행 특화 모델(예: UniAD ~1m L2)과의 성능 차이가 여전히 크며, 프롬프트 전용 접근법의 한계를 부각한다.</li>
        </ul>

        <h2>강점</h2>
        <ul>
          <li>오픈소스 접근성 — 비공개 EMMA가 남긴 공백을 채우며, 연구 커뮤니티에 재현 가능한 MLLM 기반 주행 기준선을 제공한다.</li>
          <li>학습 불필요 — 제로샷/CoT 접근법이 비용이 많이 드는 주행 특화 미세 조정의 필요성을 제거하여 실험을 접근 가능하게 한다.</li>
          <li>해석 가능한 추론 — CoT 파이프라인이 사람이 읽을 수 있는 중간 추론 단계를 생성하여 실패 모드 진단을 가능하게 한다.</li>
          <li>모듈식 설계 — YOLO 검출, MLLM 백본, 프롬프트 템플릿이 독립적으로 교체 가능하여 체계적 ablation과 개선이 가능하다.</li>
          <li>실용적 궤적 표현 — 속도-곡률 인코딩이 운동학적 실현 가능성을 보장하는 세부사항으로, LLM 기반 planner에서 종종 간과된다.</li>
          <li>다중 백본 평가 — 세 가지 다른 MLLM을 테스트하여 주행에 어떤 모델 능력이 중요한지에 대한 통찰을 제공한다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>성능 차이 — 평균 L2 오차 2.81m는 미세 조정된 주행 모델(UniAD ~1m)보다 상당히 높아 실용적 적용성을 제한한다.</li>
          <li>단일 카메라만 사용 — 다중 뷰 또는 센서 융합 접근법과 달리 전방 카메라에만 의존하여 공간 인식이 제한된다.</li>
          <li>시간적 추론 없음 — 비디오 기반 접근법과 달리 각 프레임이 이전 프레임의 시간적 컨텍스트 없이 독립적으로 처리된다.</li>
          <li>YOLO 의존성 — 궤적 예측의 품질이 YOLO의 3D 검출 정확도에 긴밀하게 결합되어 취약한 의존성을 만든다.</li>
          <li>추론 지연 — 프레임당 7B+ 파라미터 MLLM 실행이 특화 주행 모델보다 수 자릿수 느려 실시간 배포가 비현실적이다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>CoT 프롬프팅 접근법이 주행에서 근본적으로 제한적인가, 아니면 더 나은 프롬프트 엔지니어링이 미세 조정 모델과의 격차를 줄일 수 있는가?</li>
          <li>더 작은 Qwen2-VL이 더 큰 LLaVA를 능가한 것은 비전 인코더 품질이 LLM 크기보다 중요함을 시사한다 — 주행에 가장 중요한 시각 능력은 무엇인가?</li>
          <li>OpenEMMA의 CoT 추론 파이프라인을 미세 조정된 더 효율적인 주행 모델의 학습 데이터 생성 도구로 사용할 수 있는가?</li>
          <li>단일 프레임 처리 대신 다중 뷰 카메라나 시간적 비디오 입력으로 시스템 성능이 어떻게 달라질까?</li>
          <li>오픈소스 MLLM 기반 주행 시스템의 실용적 역할은 무엇인가 — 연구 프로토타이핑, 데이터 어노테이션, 또는 최종 배포?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>OpenEMMA는 미세 조정된 주행 모델의 경쟁자가 아니라, 특정 질문에 답하는 <strong>개념 증명 및 연구 플랫폼</strong>으로 이해하는 것이 가장 좋습니다: 주행 특화 학습 없이 기성 MLLM이 주행에서 얼마나 멀리 갈 수 있는가? 그 답 — 구조화된 프롬프팅과 외부 인식으로 상당히 멀리 가지만 배포에는 충분하지 않다 — 은 분야에 유용한 교정 지점을 제공합니다. 주요 가치는 다음에 있습니다:</p>
        <ul>
          <li>MLLM 기반 주행의 최소 실현 가능 접근법 입증</li>
          <li>범용 비전-언어 이해가 주행 특화 3D 추론에서 어디가 부족한지 식별</li>
          <li>커뮤니티가 발전시킬 수 있는 오픈소스 기준선 제공</li>
        </ul>
        <p>OpenEMMA(2.81m L2)와 특화 모델(~1m L2) 사이의 격차는 주행 특화 학습과 아키텍처 설계의 가치를 정확히 정량화합니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. InterFuser
  // ====================================================================
  {
    id: "interfuser",
    date: "2025-04-11",
    authors: "Shao, H., Wang, L., Chen, R., Li, H., Liu, Y.",
    venue: "CoRL 2023",
    image: "images/interfuser/thumbnail.png",
    link: "https://arxiv.org/abs/2207.14024",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "Sensor Fusion", "Transformer", "Safety"],
    en: {
      title: "Safety-Enhanced Autonomous Driving Using Interpretable Sensor Fusion Transformer",
      summary: "A multi-modal sensor fusion architecture using Transformer encoder-decoder with interpretable intermediate representations (waypoints, density maps, traffic rules) and a safety controller, ranked #1 on CARLA leaderboard.",
      review: `
        <h2>One-line Verdict</h2>
        <p>InterFuser's key insight is that <strong>safety in end-to-end driving comes not from better trajectory prediction alone, but from generating interpretable intermediate representations</strong> — object density maps, traffic rule states — that enable a principled safety controller to override unsafe plans.</p>

        <h2>Research Question</h2>
        <blockquote>How can multi-modal sensor fusion be designed to produce not just accurate waypoints, but also interpretable intermediate features that enable explicit safety reasoning and intervention in end-to-end autonomous driving?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>End-to-end autonomous driving models that directly map sensor inputs to control actions have shown promising results, but they suffer from a critical weakness: <strong>they are black boxes with no mechanism for safety intervention</strong>. When the learned policy produces an unsafe action — running a red light, colliding with an undetected pedestrian — there is no intermediate representation that a safety system can inspect or override.</p>
        <p>Previous approaches like TransFuser and NEAT used Transformer-based sensor fusion but lacked interpretable intermediate outputs. The CARLA leaderboard at the time showed these models achieving reasonable driving scores but with high infraction rates. InterFuser addresses this by designing a Transformer encoder-decoder architecture where the decoder explicitly produces three types of interpretable outputs: waypoints, object density maps, and traffic rule predictions. These intermediate representations feed a safety controller that can detect and prevent unsafe actions before they reach the vehicle.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/interfuser/fig1-architecture.png" alt="InterFuser architecture">
          <figcaption>Figure 1 (from paper): InterFuser architecture — multi-modal multi-view inputs processed by CNN backbones, fused via Transformer encoder, decoded into interpretable outputs for safety-aware planning.</figcaption>
        </figure>

        <p><strong>Input Processing:</strong></p>
        <ul>
          <li><strong>3 RGB cameras:</strong> Left, center, and right views providing wide-angle coverage of the driving scene.</li>
          <li><strong>Focus view camera:</strong> A zoomed-in center crop for long-range object detection (traffic lights, distant vehicles).</li>
          <li><strong>LiDAR BEV:</strong> Bird's-eye-view projection of LiDAR point cloud providing precise spatial layout.</li>
        </ul>
        <p>Each input modality is processed by a ResNet or similar CNN backbone to extract feature maps, which are then tokenized for the Transformer encoder.</p>

        <p><strong>Transformer Encoder:</strong> Multi-modal features from all cameras and LiDAR are concatenated as token sequences and processed through self-attention layers. This allows cross-modal attention — the model can relate a traffic light visible in the focus camera to a vehicle's position in the LiDAR BEV, for example.</p>

        <p><strong>Transformer Decoder with Three Query Types:</strong></p>
        <table>
          <thead><tr><th>Query Type</th><th>Output</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>Waypoint queries</td><td>Future ego trajectory waypoints</td><td>Primary driving action — where the vehicle should go.</td></tr>
            <tr><td>Object density map queries</td><td>Grid-based density map of surrounding objects</td><td>Spatial awareness — where other agents are, enabling collision avoidance.</td></tr>
            <tr><td>Traffic rule queries</td><td>Traffic light state, stop sign presence, speed limit</td><td>Regulatory compliance — whether the vehicle should stop, slow down, or proceed.</td></tr>
          </tbody>
        </table>

        <p>This multi-query decoder design is the architectural core of the paper. By forcing the model to explicitly predict these intermediate representations, the decoder learns features that are both useful for planning and inspectable by a safety system.</p>

        <p><strong>GRU Waypoint Prediction:</strong> The decoded waypoint features are passed through a GRU (Gated Recurrent Unit) to autoregressively generate the final waypoint sequence, ensuring temporal smoothness and kinematic consistency.</p>

        <p><strong>Safety Controller:</strong> The key differentiator — a rule-based controller that takes the interpretable intermediate outputs and can override the predicted trajectory:</p>
        <ul>
          <li>If the density map shows an object in the planned path → emergency stop or re-route</li>
          <li>If traffic rules indicate red light → force stop regardless of predicted waypoints</li>
          <li>If speed exceeds detected limit → apply speed reduction</li>
        </ul>

        <figure>
          <img src="images/interfuser/fig2-attention-maps.png" alt="Attention visualization">
          <figcaption>Figure 2 (from paper): Attention maps showing how the Transformer encoder attends across different sensor modalities — cross-modal attention enables relating visual features to spatial positions.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Interpretable intermediate representations:</strong> Three-query decoder design that produces human-inspectable outputs (density maps, traffic rules) alongside waypoints.</li>
          <li><strong>Safety controller integration:</strong> Principled mechanism for rule-based safety intervention using the model's own intermediate predictions, not external sensors.</li>
          <li><strong>Multi-modal multi-view fusion:</strong> Comprehensive sensor fusion combining 3 RGB views + focus view + LiDAR BEV through Transformer attention.</li>
          <li><strong>Focus view camera:</strong> Dedicated long-range perception channel for distant objects like traffic lights, addressing a common failure mode in autonomous driving.</li>
          <li><strong>CARLA leaderboard #1:</strong> Achieved state-of-the-art on the most widely used closed-loop driving benchmark at the time of publication.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Component</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Backbone</td><td>ResNet-50 for each input view/modality</td></tr>
            <tr><td>Transformer</td><td>6 encoder layers, 6 decoder layers</td></tr>
            <tr><td>Training Data</td><td>CARLA expert demonstrations (~300K frames)</td></tr>
            <tr><td>Waypoint Prediction</td><td>GRU-based autoregressive decoding</td></tr>
            <tr><td>Prediction Horizon</td><td>4 future waypoints</td></tr>
            <tr><td>Density Map</td><td>Grid resolution for BEV object density</td></tr>
          </tbody>
        </table>

        <p><strong>Loss Function:</strong> The total loss combines three components corresponding to the three decoder query types:</p>
        <blockquote>L<sub>total</sub> = L<sub>waypoint</sub> + L<sub>density</sub> + L<sub>traffic</sub></blockquote>
        <ul>
          <li><strong>L<sub>waypoint</sub>:</strong> L1 loss between predicted and ground-truth waypoints.</li>
          <li><strong>L<sub>density</sub>:</strong> Binary cross-entropy loss for object density map prediction.</li>
          <li><strong>L<sub>traffic</sub>:</strong> Cross-entropy loss for traffic rule classification (red/green light, stop sign, speed limit).</li>
        </ul>
        <p>The multi-task loss acts as implicit regularization — the model must learn representations that simultaneously support trajectory prediction, spatial awareness, and traffic rule understanding.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Method</th><th>DS (Town05 Long)</th><th>RC</th><th>IS</th><th>Collisions</th><th>Red Light</th></tr></thead>
          <tbody>
            <tr><td>CILRS</td><td>7.47</td><td>13.40</td><td>0.75</td><td>high</td><td>high</td></tr>
            <tr><td>LBC</td><td>12.34</td><td>31.44</td><td>0.55</td><td>moderate</td><td>moderate</td></tr>
            <tr><td>TransFuser</td><td>33.15</td><td>56.36</td><td>0.71</td><td>moderate</td><td>moderate</td></tr>
            <tr><td>NEAT</td><td>21.83</td><td>41.71</td><td>0.65</td><td>moderate</td><td>high</td></tr>
            <tr><td><strong>InterFuser</strong></td><td><strong>68.31</strong></td><td><strong>95.02</strong></td><td><strong>0.78</strong></td><td><strong>low</strong></td><td><strong>low</strong></td></tr>
          </tbody>
        </table>

        <p>Key observations:</p>
        <ul>
          <li><strong>InterFuser achieves DS 68.31 on Town05 Long</strong>, more than doubling TransFuser's 33.15 — this is not an incremental improvement but a qualitative leap.</li>
          <li><strong>Route completion of 95.02%</strong> shows the model can reliably navigate complex urban routes, not just short segments.</li>
          <li><strong>Dramatically reduced infractions</strong> — the safety controller leveraging density maps and traffic rules directly cuts collision and red-light violation rates.</li>
          <li>The infraction score (IS = 0.78) reflects the safety controller's effectiveness — the model still predicts some unsafe actions, but they are caught and corrected.</li>
        </ul>

        <figure>
          <img src="images/interfuser/fig3-results.png" alt="Qualitative results and density maps">
          <figcaption>Figure 3 (from paper): Qualitative results showing predicted waypoints, object density maps, and safety controller interventions across various driving scenarios.</figcaption>
        </figure>

        <h2>Strengths</h2>
        <ul>
          <li>Safety-first design philosophy — the interpretable intermediate representations are not just for visualization but are functionally used by the safety controller, making safety a first-class design goal.</li>
          <li>Strong empirical results — #1 on CARLA leaderboard with a massive margin over previous methods, demonstrating practical effectiveness.</li>
          <li>Principled multi-task learning — the three decoder query types create complementary supervision signals that improve the overall representation quality.</li>
          <li>Focus view innovation — the dedicated long-range camera addresses a real failure mode (missing distant traffic lights) that other methods ignore.</li>
          <li>Clean architectural decomposition — the separation of encoder (fusion) and decoder (interpretation) roles makes the system modular and analyzable.</li>
          <li>Attention visualization — cross-modal attention maps provide interpretability into how the model relates information across sensor modalities.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>CARLA-only evaluation — all results are in simulation; real-world transfer is not demonstrated and the sim-to-real gap for this architecture is unknown.</li>
          <li>Rule-based safety controller — the safety intervention logic is hand-designed, which may not generalize to edge cases not anticipated by the designers.</li>
          <li>Expert demonstration dependency — the model is trained on expert trajectories via imitation learning, inheriting the distribution shift problem of behavioral cloning.</li>
          <li>No uncertainty quantification — the model produces point predictions without confidence estimates, making it hard to know when to trust the predictions.</li>
          <li>Computational overhead — processing 5 input streams (3 cameras + focus + LiDAR) through separate CNN backbones and a full Transformer adds significant inference cost.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>The safety controller uses hand-designed rules over interpretable features — could this be replaced with a learned safety critic, and would that improve or degrade reliability?</li>
          <li>The density map provides coarse spatial awareness. Would a more detailed representation (e.g., per-object tracking, velocity estimation) provide substantially better safety?</li>
          <li>InterFuser was dominant on CARLA — but how much of its advantage is CARLA-specific? Would the same architecture maintain its edge on nuScenes or real-world benchmarks?</li>
          <li>The focus view camera is a clever engineering addition. Could attention-based dynamic cropping replace this fixed design with a learned approach?</li>
          <li>How does the multi-task loss balance affect performance? Would learning curriculum (e.g., density maps first, then waypoints) improve convergence?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>InterFuser makes a compelling case that <strong>the path to safe end-to-end driving goes through interpretability, not around it</strong>. By designing the architecture to produce inspectable intermediate representations — density maps, traffic rules — alongside waypoints, it creates a natural interface for safety intervention. The key lessons are:</p>
        <ul>
          <li><strong>Interpretability as architecture:</strong> Making intermediate features human-readable is not just nice-to-have — it enables the safety controller that drives the massive performance improvement.</li>
          <li><strong>Multi-task supervision improves the core task:</strong> Predicting density maps and traffic rules makes the waypoint prediction better, not just safer.</li>
          <li><strong>Sensor diversity matters:</strong> The focus view camera's contribution shows that thoughtful input design can solve specific failure modes more effectively than model scaling.</li>
        </ul>
        <p>The 2x improvement over TransFuser (68.31 vs 33.15 DS) is primarily a safety story — the trajectories are not dramatically different, but the system's ability to catch and correct unsafe ones is transformative.</p>
      `
    },
    ko: {
      title: "해석 가능한 센서 융합 트랜스포머를 활용한 안전 강화 자율주행",
      summary: "해석 가능한 중간 표현(웨이포인트, 밀도 맵, 교통 규칙)을 가진 Transformer 인코더-디코더 기반의 멀티모달 센서 융합 아키텍처로, CARLA 리더보드 1위를 달성했습니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>InterFuser의 핵심 통찰은 <strong>end-to-end 주행의 안전성이 더 나은 궤적 예측만으로 오는 것이 아니라, 해석 가능한 중간 표현</strong> — 객체 밀도 맵, 교통 규칙 상태 — 을 생성하여 원칙적인 안전 컨트롤러가 안전하지 않은 계획을 재정의할 수 있게 하는 데서 온다는 것입니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>멀티모달 센서 융합을 어떻게 설계하면 정확한 웨이포인트뿐만 아니라, end-to-end 자율주행에서 명시적 안전 추론과 개입을 가능하게 하는 해석 가능한 중간 특징도 생성할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>센서 입력을 직접 제어 행동으로 매핑하는 end-to-end 자율주행 모델은 유망한 결과를 보여주었지만 치명적인 약점이 있습니다: <strong>안전 개입을 위한 메커니즘이 없는 블랙박스</strong>라는 것입니다. 학습된 정책이 안전하지 않은 행동 — 적색등 위반, 감지되지 않은 보행자와의 충돌 — 을 생성할 때, 안전 시스템이 검사하거나 재정의할 수 있는 중간 표현이 없습니다.</p>
        <p>TransFuser와 NEAT 같은 이전 접근법은 Transformer 기반 센서 융합을 사용했지만 해석 가능한 중간 출력이 부족했습니다. 당시 CARLA 리더보드에서 이 모델들은 합리적인 주행 점수를 달성했지만 높은 위반율을 보였습니다. InterFuser는 디코더가 세 가지 유형의 해석 가능한 출력 — 웨이포인트, 객체 밀도 맵, 교통 규칙 예측 — 을 명시적으로 생성하는 Transformer 인코더-디코더 아키텍처를 설계하여 이를 해결합니다. 이 중간 표현들이 안전 컨트롤러에 공급되어 안전하지 않은 행동이 차량에 도달하기 전에 감지하고 방지할 수 있습니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <figure>
          <img src="images/interfuser/fig1-architecture.png" alt="InterFuser 아키텍처">
          <figcaption>Figure 1 (원문): InterFuser 아키텍처 — CNN 백본으로 처리된 멀티모달 다중 뷰 입력이 Transformer 인코더로 융합되고, 안전 인식 계획을 위한 해석 가능한 출력으로 디코딩.</figcaption>
        </figure>

        <p><strong>입력 처리:</strong></p>
        <ul>
          <li><strong>3개 RGB 카메라:</strong> 주행 장면의 광각 커버리지를 제공하는 좌측, 중앙, 우측 뷰.</li>
          <li><strong>포커스 뷰 카메라:</strong> 장거리 객체 검출(신호등, 먼 차량)을 위한 확대된 중앙 크롭.</li>
          <li><strong>LiDAR BEV:</strong> 정밀한 공간 레이아웃을 제공하는 LiDAR 포인트 클라우드의 조감도 투영.</li>
        </ul>
        <p>각 입력 모달리티는 ResNet 또는 유사한 CNN 백본으로 특징 맵을 추출하고, Transformer 인코더를 위해 토큰화됩니다.</p>

        <p><strong>Transformer 인코더:</strong> 모든 카메라와 LiDAR의 멀티모달 특징이 토큰 시퀀스로 연결되어 셀프 어텐션 레이어를 통해 처리됩니다. 이를 통해 크로스 모달 어텐션이 가능해집니다 — 예를 들어 포커스 카메라에 보이는 신호등을 LiDAR BEV의 차량 위치와 관련시킬 수 있습니다.</p>

        <p><strong>세 가지 쿼리 유형의 Transformer 디코더:</strong></p>
        <table>
          <thead><tr><th>쿼리 유형</th><th>출력</th><th>목적</th></tr></thead>
          <tbody>
            <tr><td>웨이포인트 쿼리</td><td>미래 자차 궤적 웨이포인트</td><td>주요 주행 행동 — 차량이 어디로 가야 하는지.</td></tr>
            <tr><td>객체 밀도 맵 쿼리</td><td>주변 객체의 그리드 기반 밀도 맵</td><td>공간 인식 — 다른 에이전트가 어디에 있는지, 충돌 회피 가능하게.</td></tr>
            <tr><td>교통 규칙 쿼리</td><td>신호등 상태, 정지 표지판 존재, 속도 제한</td><td>규정 준수 — 차량이 정지해야 하는지, 감속해야 하는지, 진행해야 하는지.</td></tr>
          </tbody>
        </table>

        <p>이 다중 쿼리 디코더 설계가 논문의 아키텍처 핵심입니다. 모델이 이러한 중간 표현을 명시적으로 예측하도록 강제함으로써, 디코더가 계획에 유용하면서 동시에 안전 시스템이 검사할 수 있는 특징을 학습합니다.</p>

        <p><strong>GRU 웨이포인트 예측:</strong> 디코딩된 웨이포인트 특징이 GRU(Gated Recurrent Unit)를 통해 최종 웨이포인트 시퀀스를 자기회귀적으로 생성하여 시간적 매끄러움과 운동학적 일관성을 보장합니다.</p>

        <p><strong>안전 컨트롤러:</strong> 핵심 차별화 요소 — 해석 가능한 중간 출력을 받아 예측된 궤적을 재정의할 수 있는 규칙 기반 컨트롤러:</p>
        <ul>
          <li>밀도 맵이 계획된 경로에 객체를 보여주면 → 긴급 정지 또는 경로 변경</li>
          <li>교통 규칙이 적색등을 나타내면 → 예측된 웨이포인트에 관계없이 강제 정지</li>
          <li>감지된 제한을 초과하는 속도면 → 속도 감소 적용</li>
        </ul>

        <figure>
          <img src="images/interfuser/fig2-attention-maps.png" alt="어텐션 시각화">
          <figcaption>Figure 2 (원문): Transformer 인코더가 다양한 센서 모달리티에 걸쳐 어텐션하는 방식을 보여주는 어텐션 맵 — 크로스 모달 어텐션이 시각적 특징과 공간 위치를 연결.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>해석 가능한 중간 표현:</strong> 웨이포인트와 함께 사람이 검사할 수 있는 출력(밀도 맵, 교통 규칙)을 생성하는 3쿼리 디코더 설계.</li>
          <li><strong>안전 컨트롤러 통합:</strong> 외부 센서가 아닌 모델 자체의 중간 예측을 사용하는 규칙 기반 안전 개입의 원칙적 메커니즘.</li>
          <li><strong>멀티모달 다중 뷰 융합:</strong> Transformer 어텐션을 통한 3개 RGB 뷰 + 포커스 뷰 + LiDAR BEV의 포괄적 센서 융합.</li>
          <li><strong>포커스 뷰 카메라:</strong> 신호등과 같은 먼 객체를 위한 전용 장거리 인식 채널로, 자율주행의 일반적 실패 모드를 해결.</li>
          <li><strong>CARLA 리더보드 1위:</strong> 발표 당시 가장 널리 사용되는 폐루프 주행 벤치마크에서 최첨단 달성.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>구성 요소</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>백본</td><td>각 입력 뷰/모달리티에 ResNet-50</td></tr>
            <tr><td>Transformer</td><td>인코더 6레이어, 디코더 6레이어</td></tr>
            <tr><td>학습 데이터</td><td>CARLA 전문가 시연 (~300K 프레임)</td></tr>
            <tr><td>웨이포인트 예측</td><td>GRU 기반 자기회귀 디코딩</td></tr>
            <tr><td>예측 범위</td><td>4개 미래 웨이포인트</td></tr>
            <tr><td>밀도 맵</td><td>BEV 객체 밀도를 위한 그리드 해상도</td></tr>
          </tbody>
        </table>

        <p><strong>손실 함수:</strong> 총 손실은 세 가지 디코더 쿼리 유형에 해당하는 세 가지 구성 요소를 결합합니다:</p>
        <blockquote>L<sub>total</sub> = L<sub>waypoint</sub> + L<sub>density</sub> + L<sub>traffic</sub></blockquote>
        <ul>
          <li><strong>L<sub>waypoint</sub>:</strong> 예측 웨이포인트와 정답 웨이포인트 간의 L1 손실.</li>
          <li><strong>L<sub>density</sub>:</strong> 객체 밀도 맵 예측을 위한 이진 교차 엔트로피 손실.</li>
          <li><strong>L<sub>traffic</sub>:</strong> 교통 규칙 분류(적색/녹색등, 정지 표지판, 속도 제한)를 위한 교차 엔트로피 손실.</li>
        </ul>
        <p>다중 작업 손실은 암묵적 정규화로 작용합니다 — 모델이 궤적 예측, 공간 인식, 교통 규칙 이해를 동시에 지원하는 표현을 학습해야 합니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>방법</th><th>DS (Town05 Long)</th><th>RC</th><th>IS</th><th>충돌</th><th>적색등 위반</th></tr></thead>
          <tbody>
            <tr><td>CILRS</td><td>7.47</td><td>13.40</td><td>0.75</td><td>높음</td><td>높음</td></tr>
            <tr><td>LBC</td><td>12.34</td><td>31.44</td><td>0.55</td><td>중간</td><td>중간</td></tr>
            <tr><td>TransFuser</td><td>33.15</td><td>56.36</td><td>0.71</td><td>중간</td><td>중간</td></tr>
            <tr><td>NEAT</td><td>21.83</td><td>41.71</td><td>0.65</td><td>중간</td><td>높음</td></tr>
            <tr><td><strong>InterFuser</strong></td><td><strong>68.31</strong></td><td><strong>95.02</strong></td><td><strong>0.78</strong></td><td><strong>낮음</strong></td><td><strong>낮음</strong></td></tr>
          </tbody>
        </table>

        <p>핵심 관찰:</p>
        <ul>
          <li><strong>InterFuser가 Town05 Long에서 DS 68.31을 달성</strong> — TransFuser의 33.15를 두 배 이상 초과하며, 이는 점진적 개선이 아닌 질적 도약이다.</li>
          <li><strong>경로 완주율 95.02%</strong>는 모델이 짧은 구간뿐 아니라 복잡한 도시 경로를 안정적으로 주행할 수 있음을 보여준다.</li>
          <li><strong>위반 횟수의 극적 감소</strong> — 밀도 맵과 교통 규칙을 활용한 안전 컨트롤러가 충돌과 적색등 위반율을 직접적으로 줄인다.</li>
          <li>위반 점수(IS = 0.78)는 안전 컨트롤러의 효과를 반영 — 모델이 여전히 일부 안전하지 않은 행동을 예측하지만, 포착되어 수정된다.</li>
        </ul>

        <figure>
          <img src="images/interfuser/fig3-results.png" alt="정성적 결과와 밀도 맵">
          <figcaption>Figure 3 (원문): 다양한 주행 시나리오에서 예측된 웨이포인트, 객체 밀도 맵, 안전 컨트롤러 개입을 보여주는 정성적 결과.</figcaption>
        </figure>

        <h2>강점</h2>
        <ul>
          <li>안전 우선 설계 철학 — 해석 가능한 중간 표현이 단순 시각화용이 아니라 안전 컨트롤러가 기능적으로 사용하여, 안전을 일급 설계 목표로 만든다.</li>
          <li>강력한 실증 결과 — 이전 방법들에 대한 대폭 마진으로 CARLA 리더보드 1위, 실용적 효과를 입증한다.</li>
          <li>원칙적 다중 작업 학습 — 세 가지 디코더 쿼리 유형이 전체 표현 품질을 향상시키는 상보적 감독 신호를 생성한다.</li>
          <li>포커스 뷰 혁신 — 전용 장거리 카메라가 다른 방법들이 무시하는 실제 실패 모드(먼 신호등 놓침)를 해결한다.</li>
          <li>깔끔한 아키텍처 분해 — 인코더(융합)와 디코더(해석) 역할의 분리가 시스템을 모듈적이고 분석 가능하게 만든다.</li>
          <li>어텐션 시각화 — 크로스 모달 어텐션 맵이 모델이 센서 모달리티 간 정보를 어떻게 연결하는지에 대한 해석 가능성을 제공한다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>CARLA에서만 평가 — 모든 결과가 시뮬레이션에서 얻어졌으며, 실세계 전이가 입증되지 않았고 이 아키텍처의 sim-to-real 갭은 알 수 없다.</li>
          <li>규칙 기반 안전 컨트롤러 — 안전 개입 로직이 수작업으로 설계되어, 설계자가 예상하지 못한 엣지 케이스에 일반화되지 않을 수 있다.</li>
          <li>전문가 시연 의존성 — 모방 학습을 통해 전문가 궤적으로 학습되어, 행동 복제의 분포 이동 문제를 상속한다.</li>
          <li>불확실성 정량화 없음 — 신뢰도 추정 없이 점 예측을 생성하여, 예측을 언제 신뢰해야 하는지 판단하기 어렵다.</li>
          <li>계산 오버헤드 — 5개 입력 스트림(3 카메라 + 포커스 + LiDAR)을 별도 CNN 백본과 전체 Transformer를 통해 처리하면 상당한 추론 비용이 추가된다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>안전 컨트롤러가 해석 가능한 특징에 대한 수작업 규칙을 사용하는데 — 이를 학습된 안전 비평가로 대체할 수 있으며, 그것이 신뢰성을 향상시킬까 아니면 저하시킬까?</li>
          <li>밀도 맵은 대략적인 공간 인식을 제공한다. 더 상세한 표현(예: 객체별 추적, 속도 추정)이 실질적으로 더 나은 안전성을 제공할까?</li>
          <li>InterFuser가 CARLA에서 지배적이었지만 — 그 우위의 얼마나가 CARLA에 특화된 것인가? 동일한 아키텍처가 nuScenes나 실세계 벤치마크에서도 우위를 유지할까?</li>
          <li>포커스 뷰 카메라는 영리한 엔지니어링 추가다. 어텐션 기반 동적 크로핑이 이 고정 설계를 학습된 접근법으로 대체할 수 있을까?</li>
          <li>다중 작업 손실 균형이 성능에 어떤 영향을 미치는가? 학습 커리큘럼(예: 밀도 맵 먼저, 그 다음 웨이포인트)이 수렴을 개선할까?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>InterFuser는 <strong>안전한 end-to-end 주행으로 가는 길이 해석 가능성을 통과하지, 우회하지 않는다</strong>는 설득력 있는 주장을 펼칩니다. 웨이포인트와 함께 검사 가능한 중간 표현 — 밀도 맵, 교통 규칙 — 을 생성하도록 아키텍처를 설계함으로써 안전 개입을 위한 자연스러운 인터페이스를 만듭니다. 핵심 교훈은:</p>
        <ul>
          <li><strong>아키텍처로서의 해석 가능성:</strong> 중간 특징을 사람이 읽을 수 있게 만드는 것은 단순히 좋은 것이 아니라 — 대폭적인 성능 향상을 이끄는 안전 컨트롤러를 가능하게 한다.</li>
          <li><strong>다중 작업 감독이 핵심 작업을 개선:</strong> 밀도 맵과 교통 규칙을 예측하면 웨이포인트 예측이 안전해질 뿐만 아니라 더 좋아진다.</li>
          <li><strong>센서 다양성이 중요:</strong> 포커스 뷰 카메라의 기여는 모델 스케일링보다 사려 깊은 입력 설계가 특정 실패 모드를 더 효과적으로 해결할 수 있음을 보여준다.</li>
        </ul>
        <p>TransFuser 대비 2배 향상(68.31 vs 33.15 DS)은 주로 안전 이야기입니다 — 궤적 자체가 극적으로 다른 것이 아니라, 안전하지 않은 궤적을 포착하고 수정하는 시스템의 능력이 변혁적입니다.</p>
      `
    }
  },
// ====================================================================
  // 1. Sensor Failure Simulation
  // ====================================================================
  {
    id: "sensor-failure-simulation",
    date: "2025-04-11",
    authors: "Matos, F., Durães, J., Cunha, J.",
    venue: "Informatics 2025",
    image: "images/sensor-failure-simulation/thumbnail.png",
    link: "",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "Sensor Failure", "Safety", "Simulation"],
    en: {
      title: "Simulating the Effects of Sensor Failures on Autonomous Vehicles for Safety Evaluation",
      summary: "Proposes a simulation-based framework to systematically inject sensor faults into autonomous driving pipelines and evaluate their impact on vehicle safety.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper's contribution is a <strong>systematic fault-injection methodology</strong> for autonomous vehicle sensors within simulation, enabling repeatable safety evaluation without real-world risk.</p>

        <h2>Research Question</h2>
        <blockquote>How can we systematically simulate sensor failures (camera, LiDAR, radar) in autonomous vehicles to quantify their impact on driving safety before real-world deployment?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Autonomous vehicles depend on multiple sensor modalities for perception, but real-world sensor failures (noise, occlusion, total blackout) are difficult to reproduce consistently. Physical testing is expensive and dangerous. A simulation-based fault-injection approach allows exhaustive coverage of failure modes that would be impractical to test on public roads.</p>
        <p>Prior work has studied individual sensor degradation, but lacks a unified framework that covers multiple sensor types, failure modes, and severity levels within a single evaluation pipeline.</p>

        <h2>Architecture / Methodology</h2>
        <p>The framework operates within a simulation environment (e.g., CARLA) where sensor data streams can be intercepted and corrupted programmatically.</p>
        <ul>
          <li><strong>Fault Model Library:</strong> Defines failure types per sensor — noise injection, signal dropout, delayed readings, partial occlusion, and complete failure.</li>
          <li><strong>Severity Gradation:</strong> Each fault type is parameterized by severity level, enabling continuous degradation analysis rather than binary pass/fail.</li>
          <li><strong>Safety Metrics:</strong> Time-to-collision, lane deviation, and intervention rate are measured across scenarios to quantify impact.</li>
          <li><strong>Scenario Generation:</strong> Driving scenarios are combined with fault injection schedules to create a test matrix covering normal and edge-case conditions.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>A unified fault-injection framework covering camera, LiDAR, and radar failure modes within simulation.</li>
          <li>Parameterized severity model enabling continuous degradation analysis.</li>
          <li>Quantitative safety metrics linking sensor failure severity to driving performance degradation.</li>
          <li>Demonstration that graceful degradation strategies significantly improve safety under partial sensor failure.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The framework is implemented on top of the CARLA simulator. No neural network training is involved; the focus is on evaluation methodology. Multiple autonomous driving stacks are tested as black-box subjects. Scenarios include urban intersections, highway merging, and pedestrian crossing situations. Each scenario-fault combination is repeated multiple times for statistical significance.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Failure Mode</th><th>Metric</th><th>Key Finding</th></tr></thead>
          <tbody>
            <tr><td>Camera blackout</td><td>Collision rate</td><td>Significant increase when no fallback to LiDAR is available.</td></tr>
            <tr><td>LiDAR noise</td><td>Lane deviation</td><td>Gradual degradation proportional to noise level.</td></tr>
            <tr><td>Radar delay</td><td>Time-to-collision</td><td>Even small delays reduce safety margins substantially.</td></tr>
            <tr><td>Multi-sensor partial</td><td>Intervention rate</td><td>Redundancy-aware stacks maintain acceptable performance.</td></tr>
          </tbody>
        </table>
        <p>The results confirm that sensor redundancy and graceful degradation design are critical — single-sensor reliance leads to catastrophic failures even at moderate fault severity.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Practical and immediately useful — any AV developer can apply this methodology.</li>
          <li>Systematic coverage of multiple sensor types and failure modes in a unified framework.</li>
          <li>Parameterized severity enables nuanced analysis beyond binary pass/fail testing.</li>
          <li>Repeatable and safe — no physical risk during evaluation.</li>
          <li>Clear quantitative link between fault severity and safety metric degradation.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Simulation fidelity gap — real sensor failures may exhibit behaviors not captured by the fault models.</li>
          <li>Limited to perception-level faults; does not cover software bugs or planning failures.</li>
          <li>No formal verification — results are empirical, not provably complete.</li>
          <li>Scenario coverage is finite and may miss rare but critical edge cases.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How well do simulated sensor faults transfer to real-world failure characteristics?</li>
          <li>Can this framework be extended to test adversarial attacks on sensors?</li>
          <li>What minimum sensor redundancy level should regulations require based on these findings?</li>
          <li>How should fault-injection testing integrate into continuous integration pipelines for AV software?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper provides a practical safety evaluation toolkit rather than a novel algorithm. Its value lies in making sensor failure analysis systematic and reproducible. Read it as a testing methodology paper — the key insight is that parameterized fault injection in simulation can reveal safety-critical vulnerabilities before deployment.</p>
      `
    },
    ko: {
      title: "자율주행 차량의 안전성 평가를 위한 센서 고장 시뮬레이션",
      summary: "시뮬레이션 환경에서 센서 고장을 체계적으로 주입하여 자율주행 차량의 안전성에 미치는 영향을 평가하는 프레임워크를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문의 핵심 기여는 시뮬레이션 내에서 자율주행 센서에 대한 <strong>체계적인 고장 주입 방법론</strong>을 제시하여 실제 위험 없이 반복 가능한 안전성 평가를 가능하게 한 것입니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>카메라, LiDAR, 레이더 등의 센서 고장을 체계적으로 시뮬레이션하여 자율주행 안전성에 미치는 영향을 실제 배포 전에 정량화할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>자율주행 차량은 인식을 위해 여러 센서에 의존하지만, 실제 센서 고장(노이즈, 가림, 완전 차단)을 일관되게 재현하기 어렵습니다. 물리적 테스트는 비용이 높고 위험합니다. 시뮬레이션 기반 고장 주입은 실제 도로에서 테스트하기 어려운 고장 모드를 포괄적으로 검증할 수 있게 합니다.</p>
        <p>기존 연구는 개별 센서 열화를 다루었지만, 여러 센서 유형과 고장 모드, 심각도를 단일 평가 파이프라인에서 통합하는 프레임워크가 부족했습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>이 프레임워크는 시뮬레이션 환경(예: CARLA)에서 센서 데이터 스트림을 가로채어 프로그래밍 방식으로 손상시킵니다.</p>
        <ul>
          <li><strong>고장 모델 라이브러리:</strong> 센서별 고장 유형 정의 — 노이즈 주입, 신호 손실, 지연, 부분 가림, 완전 고장.</li>
          <li><strong>심각도 등급화:</strong> 각 고장 유형을 심각도 수준으로 매개변수화하여 이진 판정이 아닌 연속적 열화 분석 가능.</li>
          <li><strong>안전 지표:</strong> 충돌까지의 시간, 차선 이탈, 개입률을 측정하여 영향을 정량화.</li>
          <li><strong>시나리오 생성:</strong> 주행 시나리오와 고장 주입 일정을 조합하여 정상 및 극단적 상황을 포괄하는 테스트 매트릭스 생성.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li>카메라, LiDAR, 레이더 고장 모드를 시뮬레이션 내에서 통합 처리하는 고장 주입 프레임워크.</li>
          <li>연속적 열화 분석을 가능하게 하는 매개변수화된 심각도 모델.</li>
          <li>센서 고장 심각도와 주행 성능 저하를 연결하는 정량적 안전 지표.</li>
          <li>부분 센서 고장 시 점진적 성능 저하 전략이 안전성을 크게 향상시킴을 실증.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>CARLA 시뮬레이터 위에 구현되었습니다. 신경망 학습은 포함되지 않으며 평가 방법론에 초점을 맞춥니다. 여러 자율주행 스택을 블랙박스로 테스트합니다. 도심 교차로, 고속도로 합류, 보행자 횡단 시나리오를 포함하며, 각 시나리오-고장 조합은 통계적 유의성을 위해 여러 번 반복됩니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>고장 모드</th><th>지표</th><th>주요 발견</th></tr></thead>
          <tbody>
            <tr><td>카메라 차단</td><td>충돌률</td><td>LiDAR 대체 수단이 없을 때 크게 증가.</td></tr>
            <tr><td>LiDAR 노이즈</td><td>차선 이탈</td><td>노이즈 수준에 비례하여 점진적으로 악화.</td></tr>
            <tr><td>레이더 지연</td><td>충돌까지의 시간</td><td>작은 지연도 안전 마진을 상당히 감소시킴.</td></tr>
            <tr><td>다중 센서 부분 고장</td><td>개입률</td><td>중복성 인식 스택은 허용 가능한 성능을 유지.</td></tr>
          </tbody>
        </table>
        <p>결과는 센서 중복성과 점진적 성능 저하 설계가 핵심임을 확인합니다 — 단일 센서 의존은 중간 수준의 고장 심각도에서도 치명적 실패로 이어집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실용적이며 즉시 활용 가능 — 모든 AV 개발자가 적용할 수 있는 방법론.</li>
          <li>여러 센서 유형과 고장 모드를 통합 프레임워크에서 체계적으로 다룸.</li>
          <li>매개변수화된 심각도로 이진 판정을 넘어 세밀한 분석 가능.</li>
          <li>반복 가능하고 안전 — 평가 중 물리적 위험 없음.</li>
          <li>고장 심각도와 안전 지표 저하 간의 명확한 정량적 연결.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>시뮬레이션 충실도 격차 — 실제 센서 고장은 고장 모델이 포착하지 못하는 특성을 보일 수 있음.</li>
          <li>인식 수준 고장에 한정 — 소프트웨어 버그나 계획 실패는 다루지 않음.</li>
          <li>형식적 검증 없음 — 결과가 경험적이며 완전성을 증명하지 못함.</li>
          <li>시나리오 범위가 유한하여 드물지만 치명적인 경우를 놓칠 수 있음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>시뮬레이션된 센서 고장이 실제 고장 특성과 얼마나 잘 대응하는가?</li>
          <li>이 프레임워크를 센서에 대한 적대적 공격 테스트로 확장할 수 있는가?</li>
          <li>이 발견을 바탕으로 규제가 요구해야 할 최소 센서 중복 수준은?</li>
          <li>고장 주입 테스트를 AV 소프트웨어의 CI 파이프라인에 어떻게 통합해야 하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 새로운 알고리즘이 아닌 실용적인 안전성 평가 도구를 제공합니다. 그 가치는 센서 고장 분석을 체계적이고 재현 가능하게 만든 데 있습니다. 테스트 방법론 논문으로 읽으세요 — 핵심 통찰은 시뮬레이션에서의 매개변수화된 고장 주입이 배포 전에 안전 취약점을 드러낼 수 있다는 것입니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. Frenet Trajectory (Werling et al., ICRA 2010)
  // ====================================================================
  {
    id: "frenet-trajectory",
    date: "2025-04-11",
    authors: "Werling, M., Ziegler, J., Kammel, S., Thrun, S.",
    venue: "ICRA 2010",
    image: "images/frenet-trajectory/thumbnail.png",
    link: "",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "Trajectory Planning", "Frenet Frame"],
    en: {
      title: "Optimal Trajectory Generation for Dynamic Street Scenarios in a Frenet Frame",
      summary: "Introduces a real-time trajectory generation method using Frenet coordinates that decouples lateral and longitudinal planning, enabling optimal trajectory selection in dynamic driving scenarios.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper established the <strong>Frenet-frame trajectory planning paradigm</strong> that became the de facto standard for on-road autonomous driving by decoupling lateral and longitudinal motion into independently solvable optimal control problems.</p>

        <h2>Research Question</h2>
        <blockquote>How can we generate optimal, real-time feasible trajectories for autonomous vehicles in dynamic street scenarios by exploiting the geometric structure of roads?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Planning trajectories in Cartesian coordinates couples lateral and longitudinal motion, making the optimization problem high-dimensional and difficult to solve in real time. Road-aligned (Frenet) coordinates naturally separate lane-keeping from speed regulation. Prior work used Frenet coordinates for path planning but not for full spatio-temporal trajectory generation with dynamic obstacle avoidance.</p>
        <p>The key insight is that roads provide a natural curvilinear reference frame — by planning in this frame, lateral and longitudinal motions become nearly independent, enabling efficient trajectory generation through polynomial optimization.</p>

        <h2>Architecture / Methodology</h2>
        <p>The method operates in three stages within the Frenet coordinate system (s, d) where s is the arc length along the reference path and d is the lateral offset.</p>
        <ul>
          <li><strong>Lateral Planning:</strong> Quintic polynomial trajectories in d(t) connecting current lateral state to target states (lane center, lane change targets). Cost combines jerk integral and deviation from target.</li>
          <li><strong>Longitudinal Planning:</strong> Quartic/quintic polynomials in s(t) for velocity keeping or stopping. Cost combines jerk integral and deviation from desired velocity or stop position.</li>
          <li><strong>Combination &amp; Selection:</strong> Lateral and longitudinal candidates are combined into full trajectories, transformed back to Cartesian space, checked for feasibility (acceleration, curvature limits) and collisions, then ranked by total cost.</li>
        </ul>
        <p>The cost functional for each dimension minimizes the integral of squared jerk (third derivative), yielding smooth, comfortable trajectories with closed-form polynomial solutions.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>Formalization of trajectory planning in Frenet coordinates with decoupled lateral/longitudinal optimization.</li>
          <li>Closed-form quintic polynomial solutions that enable real-time computation.</li>
          <li>Unified framework handling lane keeping, lane changes, merging, and stopping maneuvers.</li>
          <li>Proof that jerk-optimal trajectories in Frenet frame are fifth-order polynomials.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>No learning is involved — this is a purely optimization-based approach. The method generates candidate trajectories by sampling end states (target lateral positions, target velocities, time horizons). Typical computation produces hundreds of candidates per planning cycle. The approach runs at 10+ Hz on a single CPU core, well within real-time requirements. Demonstrated on the Stanford Junior autonomous vehicle platform.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Capability</th><th>Key Finding</th></tr></thead>
          <tbody>
            <tr><td>Highway driving</td><td>Lane keeping + speed adaptation</td><td>Smooth trajectories at highway speeds with dynamic obstacles.</td></tr>
            <tr><td>Lane change</td><td>Lateral maneuver generation</td><td>Natural lane changes emerge from lateral polynomial optimization.</td></tr>
            <tr><td>Merging</td><td>Gap selection + longitudinal planning</td><td>Combined lateral-longitudinal planning handles merging scenarios.</td></tr>
            <tr><td>Emergency stop</td><td>Stopping trajectory</td><td>Jerk-minimal stopping maintains passenger comfort.</td></tr>
          </tbody>
        </table>
        <p>The qualitative results demonstrate that the framework produces human-like trajectories across diverse scenarios while maintaining real-time performance.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant mathematical formulation — the Frenet decomposition is both intuitive and theoretically grounded.</li>
          <li>Real-time capable with closed-form solutions, no iterative optimization needed.</li>
          <li>Highly influential — this framework became the basis for most subsequent on-road planners.</li>
          <li>Handles diverse maneuvers (lane keeping, lane change, merge, stop) in a single framework.</li>
          <li>Jerk minimization directly optimizes passenger comfort, not just geometric feasibility.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Assumes a well-defined reference path — breaks down at intersections or unstructured environments.</li>
          <li>Decoupling lateral and longitudinal is an approximation that degrades on high-curvature roads.</li>
          <li>No explicit interaction modeling — treats other agents as static obstacles during each planning cycle.</li>
          <li>Polynomial trajectory space may not capture all dynamically feasible maneuvers.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How should the Frenet framework be extended to handle intersections where no single reference path exists?</li>
          <li>Can the lateral-longitudinal decoupling be made tighter through iterative refinement?</li>
          <li>How does this approach compare to optimization-based planners (e.g., MPC) in terms of trajectory quality vs. computation?</li>
          <li>What role does this classical framework play in the era of learning-based planners?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This is one of the most foundational papers in autonomous driving trajectory planning. The Frenet-frame decomposition is not just a mathematical trick — it reflects the structural reality that roads impose a natural coordinate system. Read this paper to understand the baseline that nearly all subsequent trajectory planners build upon or compare against.</p>
      `
    },
    ko: {
      title: "Frenet 좌표계에서의 동적 도로 시나리오 최적 궤적 생성",
      summary: "Frenet 좌표를 사용하여 횡방향과 종방향 계획을 분리하고, 동적 주행 시나리오에서 최적 궤적 선택을 가능하게 하는 실시간 궤적 생성 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 횡방향과 종방향 운동을 독립적으로 풀 수 있는 최적 제어 문제로 분리하여 <strong>Frenet 좌표계 궤적 계획 패러다임</strong>을 확립했으며, 이는 도로 위 자율주행의 사실상 표준이 되었습니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>도로의 기하학적 구조를 활용하여 동적 도로 시나리오에서 최적이면서 실시간으로 실행 가능한 자율주행 궤적을 어떻게 생성할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>직교 좌표계에서의 궤적 계획은 횡방향과 종방향 운동이 결합되어 최적화 문제가 고차원이 되고 실시간 풀이가 어렵습니다. 도로 정렬(Frenet) 좌표는 차선 유지와 속도 조절을 자연스럽게 분리합니다. 기존 연구는 경로 계획에 Frenet 좌표를 사용했지만, 동적 장애물 회피를 포함한 완전한 시공간 궤적 생성에는 적용하지 못했습니다.</p>
        <p>핵심 통찰은 도로가 자연스러운 곡선 좌표계를 제공한다는 것입니다 — 이 좌표계에서 계획하면 횡방향과 종방향 운동이 거의 독립적이 되어 다항식 최적화를 통한 효율적 궤적 생성이 가능합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>Frenet 좌표계 (s, d)에서 세 단계로 작동합니다. s는 기준 경로를 따른 호 길이, d는 횡방향 오프셋입니다.</p>
        <ul>
          <li><strong>횡방향 계획:</strong> d(t)에 대한 5차 다항식 궤적으로 현재 횡방향 상태를 목표 상태(차선 중심, 차선 변경 목표)에 연결. 비용은 저크 적분과 목표 편차의 조합.</li>
          <li><strong>종방향 계획:</strong> s(t)에 대한 4차/5차 다항식으로 속도 유지 또는 정지. 비용은 저크 적분과 원하는 속도 또는 정지 위치로부터의 편차 조합.</li>
          <li><strong>조합 및 선택:</strong> 횡방향과 종방향 후보를 결합하여 전체 궤적을 만들고, 직교 좌표로 변환 후 실행 가능성(가속도, 곡률 제한)과 충돌을 검사한 뒤 총 비용으로 순위를 매김.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li>횡방향/종방향 최적화를 분리한 Frenet 좌표 궤적 계획의 공식화.</li>
          <li>실시간 계산을 가능하게 하는 닫힌 형태의 5차 다항식 해.</li>
          <li>차선 유지, 차선 변경, 합류, 정지를 처리하는 통합 프레임워크.</li>
          <li>Frenet 좌표계에서 저크 최적 궤적이 5차 다항식임을 증명.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>학습은 포함되지 않으며 순수 최적화 기반 접근법입니다. 끝 상태(목표 횡방향 위치, 목표 속도, 시간 범위)를 샘플링하여 후보 궤적을 생성합니다. 일반적으로 계획 주기당 수백 개의 후보를 생성합니다. 단일 CPU 코어에서 10Hz 이상으로 실행되어 실시간 요구사항을 충족합니다. Stanford Junior 자율주행 차량 플랫폼에서 시연되었습니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>기능</th><th>주요 발견</th></tr></thead>
          <tbody>
            <tr><td>고속도로 주행</td><td>차선 유지 + 속도 적응</td><td>동적 장애물이 있는 고속도로 속도에서 부드러운 궤적.</td></tr>
            <tr><td>차선 변경</td><td>횡방향 기동 생성</td><td>횡방향 다항식 최적화에서 자연스러운 차선 변경이 도출.</td></tr>
            <tr><td>합류</td><td>간격 선택 + 종방향 계획</td><td>횡방향-종방향 결합 계획으로 합류 시나리오 처리.</td></tr>
            <tr><td>비상 정지</td><td>정지 궤적</td><td>저크 최소화 정지로 승객 편의성 유지.</td></tr>
          </tbody>
        </table>

        <h2>강점</h2>
        <ul>
          <li>우아한 수학적 공식화 — Frenet 분해는 직관적이면서 이론적으로 근거가 확실.</li>
          <li>닫힌 형태 해로 실시간 가능, 반복 최적화 불필요.</li>
          <li>매우 영향력이 큰 논문 — 이후 대부분의 도로 위 플래너의 기초가 됨.</li>
          <li>단일 프레임워크에서 다양한 기동(차선 유지, 변경, 합류, 정지)을 처리.</li>
          <li>저크 최소화로 기하학적 실행 가능성뿐 아니라 승객 편의성을 직접 최적화.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>잘 정의된 기준 경로를 가정 — 교차로나 비구조적 환경에서는 적용이 어려움.</li>
          <li>횡방향-종방향 분리는 고곡률 도로에서 정확도가 저하되는 근사.</li>
          <li>명시적 상호작용 모델링 없음 — 다른 에이전트를 각 계획 주기에서 정적 장애물로 처리.</li>
          <li>다항식 궤적 공간이 모든 동적 실행 가능 기동을 포착하지 못할 수 있음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>단일 기준 경로가 없는 교차로를 처리하도록 Frenet 프레임워크를 어떻게 확장해야 하는가?</li>
          <li>반복 정제를 통해 횡방향-종방향 분리를 더 정밀하게 할 수 있는가?</li>
          <li>궤적 품질 대 계산량 측면에서 이 접근법은 MPC 같은 최적화 기반 플래너와 어떻게 비교되는가?</li>
          <li>학습 기반 플래너 시대에 이 고전적 프레임워크의 역할은 무엇인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 자율주행 궤적 계획에서 가장 기초적인 논문 중 하나입니다. Frenet 좌표계 분해는 단순한 수학적 기법이 아니라 도로가 자연스러운 좌표계를 부여한다는 구조적 현실을 반영합니다. 이후 거의 모든 궤적 플래너가 기반으로 삼거나 비교 대상으로 삼는 기준선을 이해하기 위해 이 논문을 읽으세요.</p>
      `
    }
  },

  // ====================================================================
  // 3. Sampling-Based Motion Planning (Ma et al., T-ITS 2015)
  // ====================================================================
  {
    id: "sampling-motion-planning",
    date: "2025-04-11",
    authors: "Ma, L., Xue, J., Kawabata, K., Zhu, J., Ma, C., Zheng, N.",
    venue: "T-ITS 2015",
    image: "images/sampling-motion-planning/thumbnail.png",
    link: "",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "Motion Planning", "RRT", "Sampling"],
    en: {
      title: "Efficient Sampling-Based Motion Planning for On-Road Autonomous Driving",
      summary: "Proposes an efficient sampling-based motion planning framework that combines RRT-like exploration with road structure constraints for real-time on-road autonomous driving.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper bridges the gap between <strong>sampling-based planners (RRT variants) and structured road driving</strong> by incorporating road geometry and traffic constraints into the sampling and extension process, achieving real-time performance for highway and urban scenarios.</p>

        <h2>Research Question</h2>
        <blockquote>How can sampling-based motion planning algorithms be made efficient enough for real-time on-road autonomous driving while respecting road structure, traffic rules, and dynamic obstacles?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Sampling-based planners like RRT and RRT* are powerful for general motion planning but suffer from inefficiency in structured environments — they waste samples in irrelevant regions of the state space. On-road driving provides strong structural priors (lanes, road boundaries, traffic flow direction) that can dramatically reduce the effective search space.</p>
        <p>Prior approaches either used pure optimization (limited to local optima) or generic RRT (too slow for real-time driving). This work exploits road structure to bias sampling and tree extension, combining the exploration benefits of RRT with the efficiency of structure-aware planning.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Road-Biased Sampling:</strong> Instead of uniform random sampling in configuration space, samples are biased toward road-aligned regions using lane center lines and road boundaries as attractors.</li>
          <li><strong>Constrained Extension:</strong> Tree extension follows kinematic and dynamic feasibility constraints (curvature limits, acceleration bounds) to ensure drivable trajectories.</li>
          <li><strong>Temporal Planning:</strong> The planner operates in spatio-temporal space to handle dynamic obstacles — each node carries both position and time information.</li>
          <li><strong>Cost Function:</strong> Combines path length, proximity to lane center, smoothness, and safety margin from obstacles into a single optimization criterion.</li>
          <li><strong>Pruning Strategy:</strong> Branches that violate road constraints or enter collision zones are pruned early, preventing wasted computation.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>Road-structure-aware sampling strategy that dramatically improves sample efficiency over vanilla RRT.</li>
          <li>Spatio-temporal tree extension for dynamic obstacle avoidance in on-road scenarios.</li>
          <li>Real-time capable planning (sub-100ms per cycle) suitable for highway and urban driving.</li>
          <li>Unified framework handling lane following, lane changing, and obstacle avoidance.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>No learning is involved — this is a sampling-based planning algorithm. Road geometry is extracted from HD maps or lane detection. The planner generates a tree of feasible trajectories within each planning cycle (typically 50-100ms). Tested on both simulation environments and a real autonomous vehicle platform. Vehicle dynamics are modeled using a bicycle model with constraints on steering rate and acceleration.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Metric</th><th>Proposed Method</th><th>Vanilla RRT</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>Planning time</td><td>~50ms</td><td>~500ms+</td><td>Road-biased sampling achieves 10x speedup.</td></tr>
            <tr><td>Path quality</td><td>Near-optimal</td><td>Suboptimal</td><td>Structure-aware cost guides toward smoother paths.</td></tr>
            <tr><td>Success rate</td><td>>95%</td><td>~80%</td><td>Constrained sampling avoids infeasible regions.</td></tr>
            <tr><td>Dynamic scenarios</td><td>Handled</td><td>Limited</td><td>Spatio-temporal extension enables dynamic avoidance.</td></tr>
          </tbody>
        </table>
        <p>The road-biased sampling approach consistently outperforms vanilla RRT in both computation time and trajectory quality across all tested scenarios.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Practical speedup — road-biased sampling is a simple but highly effective idea.</li>
          <li>Maintains the probabilistic completeness advantage of sampling-based methods.</li>
          <li>Handles dynamic obstacles through spatio-temporal planning.</li>
          <li>Real-time performance demonstrated on actual vehicle hardware.</li>
          <li>Generalizable framework applicable to both highway and urban scenarios.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Depends on accurate road geometry — degrades with poor map quality or lane detection.</li>
          <li>Sampling-based nature means results are non-deterministic across runs.</li>
          <li>Limited interaction modeling — other vehicles are treated as predicted trajectories, not reactive agents.</li>
          <li>Optimality gap compared to full trajectory optimization methods.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does road-biased sampling compare to lattice-based planners in terms of completeness and optimality?</li>
          <li>Can the sampling distribution be learned from driving data rather than hand-designed?</li>
          <li>How should the planner handle scenarios where road structure is ambiguous (e.g., parking lots)?</li>
          <li>What is the right balance between exploration (broad sampling) and exploitation (road-biased sampling)?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates that generic motion planning algorithms become dramatically more efficient when informed by domain structure. The core lesson — bias your search toward where good solutions are likely to be — is broadly applicable beyond autonomous driving. Read this paper for a clear example of how structural priors transform computational complexity.</p>
      `
    },
    ko: {
      title: "도로 위 자율주행을 위한 효율적 샘플링 기반 모션 플래닝",
      summary: "도로 구조 제약 조건을 RRT 탐색에 통합하여 고속도로 및 도심 시나리오에서 실시간 자율주행 모션 플래닝을 달성하는 효율적 샘플링 기반 프레임워크를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 도로 기하학과 교통 제약을 샘플링 및 확장 과정에 통합하여 <strong>샘플링 기반 플래너(RRT 변형)와 구조화된 도로 주행 사이의 간극</strong>을 메우고, 고속도로 및 도심 시나리오에서 실시간 성능을 달성합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>샘플링 기반 모션 플래닝 알고리즘을 도로 구조, 교통 규칙, 동적 장애물을 존중하면서 실시간 도로 위 자율주행에 충분히 효율적으로 만들 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>RRT, RRT* 같은 샘플링 기반 플래너는 일반적인 모션 플래닝에 강력하지만 구조화된 환경에서는 비효율적입니다 — 상태 공간의 무관한 영역에서 샘플을 낭비합니다. 도로 주행은 강한 구조적 사전 정보(차선, 도로 경계, 교통 흐름 방향)를 제공하여 유효 탐색 공간을 극적으로 줄일 수 있습니다.</p>
        <p>기존 접근법은 순수 최적화(지역 최적값에 한정) 또는 범용 RRT(실시간 주행에는 너무 느림)를 사용했습니다. 이 연구는 도로 구조를 활용하여 샘플링과 트리 확장을 편향시키고, RRT의 탐색 이점과 구조 인식 계획의 효율성을 결합합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>도로 편향 샘플링:</strong> 구성 공간에서의 균일 랜덤 샘플링 대신, 차선 중심선과 도로 경계를 끌개로 사용하여 도로 정렬 영역으로 샘플을 편향.</li>
          <li><strong>제약 확장:</strong> 트리 확장이 운동학적 및 동역학적 실행 가능성 제약(곡률 한계, 가속도 범위)을 따라 주행 가능한 궤적을 보장.</li>
          <li><strong>시간적 계획:</strong> 동적 장애물을 처리하기 위해 시공간에서 작동 — 각 노드가 위치와 시간 정보를 모두 포함.</li>
          <li><strong>비용 함수:</strong> 경로 길이, 차선 중심 근접도, 부드러움, 장애물로부터의 안전 마진을 단일 최적화 기준으로 결합.</li>
          <li><strong>가지치기 전략:</strong> 도로 제약을 위반하거나 충돌 구역에 진입하는 가지를 조기에 제거하여 낭비 방지.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li>바닐라 RRT 대비 샘플 효율성을 극적으로 향상시키는 도로 구조 인식 샘플링 전략.</li>
          <li>도로 위 시나리오에서 동적 장애물 회피를 위한 시공간 트리 확장.</li>
          <li>고속도로 및 도심 주행에 적합한 실시간 계획(주기당 100ms 미만).</li>
          <li>차선 추종, 차선 변경, 장애물 회피를 처리하는 통합 프레임워크.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>학습은 포함되지 않으며 순수 샘플링 기반 계획 알고리즘입니다. 도로 기하학은 HD 맵 또는 차선 감지에서 추출합니다. 각 계획 주기(보통 50-100ms) 내에서 실행 가능한 궤적 트리를 생성합니다. 시뮬레이션 환경과 실제 자율주행 차량 플랫폼에서 테스트되었습니다. 차량 동역학은 조향률과 가속도 제약이 있는 자전거 모델로 모델링됩니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>지표</th><th>제안 방법</th><th>바닐라 RRT</th><th>해석</th></tr></thead>
          <tbody>
            <tr><td>계획 시간</td><td>~50ms</td><td>~500ms+</td><td>도로 편향 샘플링으로 10배 속도 향상.</td></tr>
            <tr><td>경로 품질</td><td>준최적</td><td>차선책</td><td>구조 인식 비용이 더 부드러운 경로로 안내.</td></tr>
            <tr><td>성공률</td><td>>95%</td><td>~80%</td><td>제약 샘플링이 실행 불가능 영역을 회피.</td></tr>
            <tr><td>동적 시나리오</td><td>처리 가능</td><td>제한적</td><td>시공간 확장으로 동적 회피 가능.</td></tr>
          </tbody>
        </table>

        <h2>강점</h2>
        <ul>
          <li>실용적 속도 향상 — 도로 편향 샘플링은 간단하면서도 매우 효과적인 아이디어.</li>
          <li>샘플링 기반 방법의 확률적 완전성 이점을 유지.</li>
          <li>시공간 계획을 통해 동적 장애물을 처리.</li>
          <li>실제 차량 하드웨어에서 실시간 성능 실증.</li>
          <li>고속도로와 도심 시나리오 모두에 적용 가능한 일반화 프레임워크.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>정확한 도로 기하학에 의존 — 열악한 맵 품질이나 차선 감지에서 성능 저하.</li>
          <li>샘플링 기반 특성으로 실행마다 결과가 비결정적.</li>
          <li>제한된 상호작용 모델링 — 다른 차량을 예측 궤적으로 처리하며 반응적 에이전트로 보지 않음.</li>
          <li>완전 궤적 최적화 방법 대비 최적성 간극.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>완전성과 최적성 측면에서 도로 편향 샘플링은 격자 기반 플래너와 어떻게 비교되는가?</li>
          <li>샘플링 분포를 수작업 설계가 아닌 주행 데이터에서 학습할 수 있는가?</li>
          <li>도로 구조가 모호한 시나리오(예: 주차장)에서 플래너를 어떻게 처리해야 하는가?</li>
          <li>탐색(광범위 샘플링)과 활용(도로 편향 샘플링) 사이의 적절한 균형은?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 범용 모션 플래닝 알고리즘이 도메인 구조에 의해 안내될 때 극적으로 더 효율적이 됨을 보여줍니다. 핵심 교훈 — 좋은 해가 있을 가능성이 높은 곳으로 탐색을 편향시키라 — 은 자율주행을 넘어 넓게 적용 가능합니다. 구조적 사전 정보가 계산 복잡성을 어떻게 변환하는지의 명확한 예시로 이 논문을 읽으세요.</p>
      `
    }
  },

  // ====================================================================
  // 4. Urban Path Planning (Fu et al., ITSC 2015)
  // ====================================================================
  {
    id: "urban-path-planning",
    date: "2025-04-11",
    authors: "Fu, M., Song, W., Yang, Y., Wang, M.",
    venue: "ITSC 2015",
    image: "images/urban-path-planning/thumbnail.png",
    link: "",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "Path Planning", "Decision Making", "Urban"],
    en: {
      title: "Path Planning and Decision Making for Autonomous Vehicle in Urban Environment",
      summary: "Presents a hierarchical path planning and decision making framework for autonomous vehicles in complex urban environments, combining global routing with local maneuver planning.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper presents a <strong>hierarchical planning architecture for urban autonomous driving</strong> that separates global route planning, behavioral decision making, and local path generation into distinct layers, providing a clean engineering framework for handling urban complexity.</p>

        <h2>Research Question</h2>
        <blockquote>How should path planning and decision making be structured for autonomous vehicles navigating complex urban environments with intersections, traffic signals, and diverse road users?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Urban driving is fundamentally more complex than highway driving — intersections, traffic lights, pedestrians, cyclists, and unstructured parking areas create a combinatorial explosion of scenarios. A monolithic planner cannot handle this complexity efficiently. The hierarchical decomposition into route planning, behavioral decisions, and local trajectory generation mirrors how human drivers think and enables modular development and testing.</p>
        <p>Prior work focused predominantly on highway scenarios. Urban environments require explicit decision-making logic for intersection handling, traffic signal compliance, and right-of-way negotiation.</p>

        <h2>Architecture / Methodology</h2>
        <p>The system operates in three layers:</p>
        <ul>
          <li><strong>Global Route Planning:</strong> A* or Dijkstra on a road network graph to determine the sequence of road segments from origin to destination.</li>
          <li><strong>Behavioral Decision Making:</strong> A finite state machine (FSM) that determines high-level maneuvers — go straight, turn left/right, stop, yield, lane change — based on current traffic state, signals, and surrounding agents.</li>
          <li><strong>Local Path Planning:</strong> Given the behavioral decision, generates a smooth, collision-free local path using polynomial curves or clothoid-based methods, respecting vehicle kinematic constraints.</li>
        </ul>
        <p>The behavioral layer acts as the critical bridge between global intent and local execution, translating route-level goals into actionable maneuvers.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>A complete three-layer planning architecture tailored for urban autonomous driving.</li>
          <li>Finite state machine design for urban behavioral decisions including intersection and traffic signal handling.</li>
          <li>Integration of decision making with local path planning for seamless maneuver execution.</li>
          <li>Demonstration on real urban road scenarios with intersections and traffic participants.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>No machine learning training is involved — the system uses rule-based decision making and geometric path planning. The FSM states and transitions are hand-designed based on traffic rules. Local path planning uses polynomial or clothoid curves satisfying curvature continuity. Tested on an instrumented vehicle in urban test environments with real traffic signals and pedestrians.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Capability</th><th>Key Finding</th></tr></thead>
          <tbody>
            <tr><td>Signalized intersection</td><td>Stop/go decisions</td><td>Correct traffic signal compliance in all tested cases.</td></tr>
            <tr><td>Unsignalized intersection</td><td>Yield/proceed decisions</td><td>Right-of-way handled through FSM logic.</td></tr>
            <tr><td>Lane change in urban road</td><td>Gap finding + execution</td><td>Safe lane changes with smooth path generation.</td></tr>
            <tr><td>Pedestrian crossing</td><td>Stop and wait</td><td>Behavioral layer triggers stop state upon pedestrian detection.</td></tr>
          </tbody>
        </table>
        <p>The hierarchical approach successfully handles common urban scenarios, though edge cases requiring complex negotiation remain challenging.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Clear hierarchical decomposition — each layer has a well-defined responsibility.</li>
          <li>Practically implementable — the FSM approach is interpretable and debuggable.</li>
          <li>Covers the full pipeline from global routing to local execution.</li>
          <li>Validated in real urban environments, not just simulation.</li>
          <li>Modular design allows individual layers to be upgraded independently.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>FSM-based decisions are rigid — cannot handle novel scenarios not encoded in state transitions.</li>
          <li>No learning or adaptation — the system cannot improve from experience.</li>
          <li>Limited interaction modeling — other agents' future behavior is not predicted.</li>
          <li>Scalability concern — the number of FSM states grows combinatorially with scenario complexity.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How should the FSM be replaced or augmented to handle scenarios not anticipated at design time?</li>
          <li>Can learning-based methods replace the behavioral layer while maintaining interpretability?</li>
          <li>How does this hierarchical architecture compare to end-to-end approaches in terms of safety guarantees?</li>
          <li>What is the right granularity for behavioral states in urban driving?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper provides a clean engineering blueprint for urban autonomous driving systems. While the individual techniques are not novel, the contribution lies in their integration into a coherent hierarchical framework. Read it as an architecture reference — the three-layer decomposition (route / behavior / path) remains the dominant paradigm in production autonomous driving systems.</p>
      `
    },
    ko: {
      title: "도심 환경에서의 자율주행 차량 경로 계획 및 의사결정",
      summary: "복잡한 도심 환경에서 전역 라우팅과 지역 기동 계획을 결합하는 자율주행 차량용 계층적 경로 계획 및 의사결정 프레임워크를 제시합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 전역 경로 계획, 행동 의사결정, 지역 경로 생성을 별도 계층으로 분리하는 <strong>도심 자율주행을 위한 계층적 계획 아키텍처</strong>를 제시하여 도심의 복잡성을 처리하는 깔끔한 공학적 프레임워크를 제공합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>교차로, 교통 신호, 다양한 도로 이용자가 있는 복잡한 도심 환경을 주행하는 자율주행 차량의 경로 계획과 의사결정은 어떻게 구조화되어야 하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>도심 주행은 고속도로보다 근본적으로 복잡합니다 — 교차로, 신호등, 보행자, 자전거, 비구조적 주차 공간이 시나리오의 조합적 폭발을 만듭니다. 단일 플래너는 이 복잡성을 효율적으로 처리할 수 없습니다. 경로 계획, 행동 결정, 지역 궤적 생성으로의 계층적 분해는 인간 운전자의 사고 방식을 반영하며 모듈식 개발과 테스트를 가능하게 합니다.</p>
        <p>기존 연구는 주로 고속도로 시나리오에 집중했습니다. 도심 환경은 교차로 처리, 교통 신호 준수, 우선권 협상을 위한 명시적 의사결정 로직이 필요합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>시스템은 세 계층으로 작동합니다:</p>
        <ul>
          <li><strong>전역 경로 계획:</strong> 도로 네트워크 그래프에서 A* 또는 Dijkstra로 출발지에서 목적지까지의 도로 구간 순서를 결정.</li>
          <li><strong>행동 의사결정:</strong> 유한 상태 기계(FSM)가 현재 교통 상태, 신호, 주변 에이전트에 따라 고수준 기동(직진, 좌/우회전, 정지, 양보, 차선 변경)을 결정.</li>
          <li><strong>지역 경로 계획:</strong> 행동 결정이 주어지면 다항식 곡선 또는 클로소이드 기반 방법으로 차량 운동학 제약을 준수하는 부드럽고 충돌 없는 지역 경로를 생성.</li>
        </ul>
        <p>행동 계층은 전역 의도와 지역 실행 사이의 핵심 다리 역할을 하며, 경로 수준 목표를 실행 가능한 기동으로 변환합니다.</p>

        <h2>핵심 기여</h2>
        <ul>
          <li>도심 자율주행에 맞춤화된 완전한 3계층 계획 아키텍처.</li>
          <li>교차로 및 교통 신호 처리를 포함한 도심 행동 결정용 유한 상태 기계 설계.</li>
          <li>원활한 기동 실행을 위한 의사결정과 지역 경로 계획의 통합.</li>
          <li>교차로와 교통 참여자가 있는 실제 도심 도로 시나리오에서의 실증.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>기계 학습 훈련은 포함되지 않으며 규칙 기반 의사결정과 기하학적 경로 계획을 사용합니다. FSM 상태와 전이는 교통 규칙에 기반하여 수작업으로 설계됩니다. 지역 경로 계획은 곡률 연속성을 만족하는 다항식 또는 클로소이드 곡선을 사용합니다. 실제 교통 신호와 보행자가 있는 도심 테스트 환경에서 계장 차량으로 테스트되었습니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>기능</th><th>주요 발견</th></tr></thead>
          <tbody>
            <tr><td>신호 교차로</td><td>정지/출발 결정</td><td>모든 테스트 케이스에서 올바른 교통 신호 준수.</td></tr>
            <tr><td>비신호 교차로</td><td>양보/진행 결정</td><td>FSM 로직으로 우선권 처리.</td></tr>
            <tr><td>도심 도로 차선 변경</td><td>간격 찾기 + 실행</td><td>부드러운 경로 생성으로 안전한 차선 변경.</td></tr>
            <tr><td>보행자 횡단</td><td>정지 및 대기</td><td>보행자 감지 시 행동 계층이 정지 상태 활성화.</td></tr>
          </tbody>
        </table>

        <h2>강점</h2>
        <ul>
          <li>명확한 계층적 분해 — 각 계층이 잘 정의된 책임을 가짐.</li>
          <li>실용적으로 구현 가능 — FSM 접근법은 해석 가능하고 디버깅 가능.</li>
          <li>전역 라우팅에서 지역 실행까지 전체 파이프라인을 포괄.</li>
          <li>시뮬레이션뿐 아니라 실제 도심 환경에서 검증.</li>
          <li>모듈식 설계로 개별 계층을 독립적으로 업그레이드 가능.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>FSM 기반 결정은 경직적 — 상태 전이에 인코딩되지 않은 새로운 시나리오를 처리할 수 없음.</li>
          <li>학습이나 적응 없음 — 시스템이 경험으로 개선할 수 없음.</li>
          <li>제한된 상호작용 모델링 — 다른 에이전트의 미래 행동을 예측하지 않음.</li>
          <li>확장성 문제 — FSM 상태 수가 시나리오 복잡성에 따라 조합적으로 증가.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>설계 시 예상하지 못한 시나리오를 처리하기 위해 FSM을 어떻게 대체하거나 보완해야 하는가?</li>
          <li>학습 기반 방법이 해석 가능성을 유지하면서 행동 계층을 대체할 수 있는가?</li>
          <li>안전 보장 측면에서 이 계층적 아키텍처는 end-to-end 접근법과 어떻게 비교되는가?</li>
          <li>도심 주행에서 행동 상태의 적절한 세분화 수준은?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 도심 자율주행 시스템을 위한 깔끔한 공학적 청사진을 제공합니다. 개별 기술은 새롭지 않지만, 기여는 이들을 일관된 계층적 프레임워크로 통합한 데 있습니다. 아키텍처 참조로 읽으세요 — 3계층 분해(경로 / 행동 / 경로)는 양산 자율주행 시스템에서 여전히 지배적인 패러다임입니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. MPC Autonomous Driving (Vu et al., Electronics 2021)
  // ====================================================================
  {
    id: "mpc-autonomous-driving",
    date: "2025-04-11",
    authors: "Vu, T. M., Moezzi, R., Cyrus, J., Hlava, J.",
    venue: "Electronics 2021",
    image: "images/mpc-autonomous-driving/thumbnail.png",
    link: "",
    domain: "autonomous-driving",
    tags: ["Autonomous Driving", "MPC", "Trajectory Tracking", "Control"],
    en: {
      title: "Model Predictive Control for Autonomous Driving Vehicles",
      summary: "Applies Model Predictive Control to autonomous vehicle trajectory tracking, demonstrating how MPC's receding horizon optimization handles constraints and disturbances for accurate path following.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides a clear formulation of <strong>MPC applied to autonomous vehicle trajectory tracking</strong>, demonstrating how receding-horizon optimization naturally handles actuator constraints, road boundaries, and model nonlinearities for accurate path following.</p>

        <h2>Research Question</h2>
        <blockquote>How can Model Predictive Control be designed and tuned for autonomous vehicle trajectory tracking to achieve accurate path following while respecting physical and safety constraints?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Classical controllers (PID, Stanley, pure pursuit) for trajectory tracking cannot systematically handle constraints on steering angle, steering rate, acceleration, and road boundaries. MPC naturally incorporates these constraints through its optimization formulation. However, applying MPC to autonomous driving requires careful model selection, prediction horizon tuning, and computational efficiency to meet real-time requirements.</p>
        <p>This paper focuses on the practical aspects of MPC design for trajectory tracking — vehicle model linearization, cost function design, constraint handling, and tuning strategies that make MPC viable for real-time autonomous driving control.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Vehicle Model:</strong> A kinematic bicycle model is used as the prediction model, linearized around the current operating point at each time step for computational tractability.</li>
          <li><strong>MPC Formulation:</strong> At each step, solve a finite-horizon quadratic program (QP) minimizing tracking error (lateral deviation, heading error) plus control effort (steering magnitude, steering rate) subject to actuator and state constraints.</li>
          <li><strong>Receding Horizon:</strong> Only the first control input is applied; the optimization is repeated at the next time step with updated state feedback, providing robustness to model mismatch and disturbances.</li>
          <li><strong>Constraint Handling:</strong> Physical limits on steering angle, steering rate, and acceleration are directly encoded as inequality constraints in the QP. Road boundary constraints can be included as state constraints.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>Complete MPC formulation for autonomous vehicle trajectory tracking with kinematic bicycle model.</li>
          <li>Systematic analysis of prediction horizon and control horizon effects on tracking performance.</li>
          <li>Demonstration of constraint satisfaction under varying speed and curvature conditions.</li>
          <li>Practical tuning guidelines for MPC weight matrices and horizons in driving applications.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>No learning is involved — MPC solves an optimization problem online at each control step. The kinematic bicycle model parameters (wheelbase, maximum steering angle) are set from vehicle specifications. QP solver (e.g., OSQP or qpOASES) runs within the control loop at 20-50 Hz. Prediction horizons of 10-30 steps are typical, with step sizes of 50-100ms. Tested in MATLAB/Simulink simulation and CARLA environments with various reference trajectories including straight roads, curves, and lane changes.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Condition</th><th>Metric</th><th>Key Finding</th></tr></thead>
          <tbody>
            <tr><td>Low speed curves</td><td>Lateral error</td><td>&lt;0.1m tracking error, constraints satisfied.</td></tr>
            <tr><td>High speed highway</td><td>Lateral error</td><td>Slight increase but remains within 0.2m.</td></tr>
            <tr><td>Sharp turns</td><td>Steering constraint</td><td>MPC respects steering limits while minimizing deviation.</td></tr>
            <tr><td>Short vs. long horizon</td><td>Stability</td><td>Longer horizons improve anticipation but increase computation.</td></tr>
          </tbody>
        </table>
        <p>MPC consistently outperforms PID and pure pursuit controllers in constrained scenarios, with the advantage growing as constraints become tighter or speeds increase.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Systematic constraint handling — the primary advantage of MPC over classical controllers.</li>
          <li>Clear and reproducible formulation suitable for practitioners.</li>
          <li>Thorough parameter sensitivity analysis (horizons, weights).</li>
          <li>Naturally anticipatory — the prediction horizon enables look-ahead behavior.</li>
          <li>Modular — the vehicle model can be swapped (kinematic to dynamic) without changing the framework.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Linearized model limits accuracy at high lateral accelerations and low speeds with large steering.</li>
          <li>Computational cost grows with prediction horizon — real-time feasibility requires careful tuning.</li>
          <li>Does not address trajectory planning — assumes a reference trajectory is given.</li>
          <li>No robustness analysis against significant model-plant mismatch (e.g., wet roads, tire degradation).</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>When should nonlinear MPC (NMPC) be preferred over linearized MPC for driving applications?</li>
          <li>How should MPC be integrated with upstream planners — should the planner be MPC-aware?</li>
          <li>Can learning-based methods improve the MPC prediction model online for better robustness?</li>
          <li>What is the minimum hardware requirement for real-time MPC at 50Hz in a production vehicle?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is a practical reference for applying MPC to autonomous vehicle control. Its value lies not in algorithmic novelty but in providing a clear, complete, and well-analyzed formulation. Read it as an MPC tutorial paper for autonomous driving — it covers the essential design decisions (model, cost, constraints, horizons) that any practitioner needs to address.</p>
      `
    },
    ko: {
      title: "자율주행 차량을 위한 모델 예측 제어",
      summary: "모델 예측 제어(MPC)를 자율주행 차량 궤적 추종에 적용하여 후퇴 수평선 최적화가 제약 조건과 외란을 처리하며 정확한 경로 추종을 달성함을 보여줍니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>자율주행 차량 궤적 추종에 적용된 MPC</strong>의 명확한 공식화를 제공하며, 후퇴 수평선 최적화가 액추에이터 제약, 도로 경계, 모델 비선형성을 자연스럽게 처리하여 정확한 경로 추종을 달성함을 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>물리적 및 안전 제약을 준수하면서 정확한 경로 추종을 달성하기 위해 자율주행 차량 궤적 추종용 모델 예측 제어를 어떻게 설계하고 튜닝해야 하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>궤적 추종을 위한 고전적 제어기(PID, Stanley, pure pursuit)는 조향각, 조향 속도, 가속도, 도로 경계에 대한 제약을 체계적으로 처리할 수 없습니다. MPC는 최적화 공식화를 통해 이러한 제약을 자연스럽게 통합합니다. 그러나 MPC를 자율주행에 적용하려면 모델 선택, 예측 수평선 튜닝, 실시간 요구사항을 충족하기 위한 계산 효율성에 대한 신중한 검토가 필요합니다.</p>
        <p>이 논문은 MPC의 실용적 설계 측면 — 차량 모델 선형화, 비용 함수 설계, 제약 처리, 실시간 자율주행 제어를 가능하게 하는 튜닝 전략 — 에 초점을 맞춥니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>차량 모델:</strong> 계산 효율성을 위해 운동학적 자전거 모델을 예측 모델로 사용하며, 각 시간 단계에서 현재 작동점 주위에서 선형화.</li>
          <li><strong>MPC 공식화:</strong> 각 단계에서 유한 수평선 이차 프로그래밍(QP)을 풀어 추종 오차(횡방향 편차, 방향 오차)와 제어 노력(조향 크기, 조향 속도)을 액추에이터 및 상태 제약 하에서 최소화.</li>
          <li><strong>후퇴 수평선:</strong> 첫 번째 제어 입력만 적용하고, 다음 시간 단계에서 업데이트된 상태 피드백으로 최적화를 반복하여 모델 불일치와 외란에 대한 강건성 제공.</li>
          <li><strong>제약 처리:</strong> 조향각, 조향 속도, 가속도의 물리적 한계가 QP의 부등식 제약으로 직접 인코딩. 도로 경계 제약은 상태 제약으로 포함 가능.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li>운동학적 자전거 모델을 사용한 자율주행 차량 궤적 추종의 완전한 MPC 공식화.</li>
          <li>예측 수평선과 제어 수평선이 추종 성능에 미치는 영향의 체계적 분석.</li>
          <li>다양한 속도와 곡률 조건에서의 제약 만족 실증.</li>
          <li>주행 응용에서의 MPC 가중치 행렬과 수평선에 대한 실용적 튜닝 지침.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>학습은 포함되지 않으며 MPC는 각 제어 단계에서 온라인으로 최적화 문제를 풉니다. 운동학적 자전거 모델 매개변수(휠베이스, 최대 조향각)는 차량 사양에서 설정합니다. QP 솔버(예: OSQP 또는 qpOASES)가 20-50Hz로 제어 루프 내에서 실행됩니다. 예측 수평선은 10-30단계, 단계 크기 50-100ms가 일반적입니다. 직선 도로, 곡선, 차선 변경을 포함한 다양한 기준 궤적으로 MATLAB/Simulink 시뮬레이션과 CARLA 환경에서 테스트되었습니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>조건</th><th>지표</th><th>주요 발견</th></tr></thead>
          <tbody>
            <tr><td>저속 커브</td><td>횡방향 오차</td><td>0.1m 미만의 추종 오차, 제약 만족.</td></tr>
            <tr><td>고속 고속도로</td><td>횡방향 오차</td><td>약간 증가하지만 0.2m 이내 유지.</td></tr>
            <tr><td>급커브</td><td>조향 제약</td><td>MPC가 편차를 최소화하면서 조향 한계를 준수.</td></tr>
            <tr><td>짧은 vs. 긴 수평선</td><td>안정성</td><td>긴 수평선이 예측을 개선하지만 계산량 증가.</td></tr>
          </tbody>
        </table>
        <p>MPC는 제약이 있는 시나리오에서 PID와 pure pursuit 제어기를 일관되게 능가하며, 제약이 빡빡해지거나 속도가 증가할수록 그 이점이 커집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>체계적인 제약 처리 — 고전적 제어기 대비 MPC의 주된 이점.</li>
          <li>실무자에게 적합한 명확하고 재현 가능한 공식화.</li>
          <li>철저한 매개변수 민감도 분석(수평선, 가중치).</li>
          <li>본질적으로 예측적 — 예측 수평선이 전방 주시 행동을 가능하게 함.</li>
          <li>모듈식 — 프레임워크를 변경하지 않고 차량 모델을 교체(운동학적→동역학적) 가능.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>선형화 모델은 높은 횡가속도와 큰 조향이 있는 저속에서 정확도 한계.</li>
          <li>계산 비용이 예측 수평선에 따라 증가 — 실시간 실행을 위해 신중한 튜닝 필요.</li>
          <li>궤적 계획을 다루지 않음 — 기준 궤적이 주어졌다고 가정.</li>
          <li>심각한 모델-실제 불일치(예: 젖은 도로, 타이어 마모)에 대한 강건성 분석 없음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>주행 응용에서 비선형 MPC(NMPC)를 선형화 MPC보다 선호해야 하는 경우는?</li>
          <li>MPC를 상위 플래너와 어떻게 통합해야 하는가 — 플래너가 MPC를 인식해야 하는가?</li>
          <li>학습 기반 방법이 더 나은 강건성을 위해 MPC 예측 모델을 온라인으로 개선할 수 있는가?</li>
          <li>양산 차량에서 50Hz 실시간 MPC를 위한 최소 하드웨어 요구사항은?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 MPC를 자율주행 차량 제어에 적용하기 위한 실용적 참조입니다. 알고리즘적 새로움보다는 명확하고 완전하며 잘 분석된 공식화를 제공하는 데 가치가 있습니다. 자율주행을 위한 MPC 튜토리얼 논문으로 읽으세요 — 모든 실무자가 다루어야 할 필수 설계 결정(모델, 비용, 제약, 수평선)을 포괄합니다.</p>
      `
    }
  },
// ====================================================================
  // 1. Switched CBF Docking
  // ====================================================================
  {
    id: "switched-cbf-docking",
    date: "2025-04-11",
    authors: "Saradagi, A., Sankaranarayanan, V. N., et al.",
    venue: "CEP 2025",
    image: "images/switched-cbf-docking/thumbnail.png",
    link: "",
    domain: "ai-security",
    tags: ["AI Security", "CBF", "Docking Control", "Space"],
    en: {
      title: "Switched Control Barrier Functions-Based Safe Docking Control Strategy for a Planar Floating Platform",
      summary: "Proposes a switched CBF strategy using Cardioid-shaped safe sets for autonomous docking of a space-emulating floating platform, with experimental validation under real disturbances.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper elegantly exploits the <strong>deadlock point</strong> of a Cardioid-shaped Control Barrier Function as a switching trigger to split docking into approach and contact phases, achieving robust experimental docking on a planar floating testbed despite tether-induced disturbances and surface non-idealities.</p>

        <h2>Research Question</h2>
        <blockquote>How can we design a safety-critical autonomous docking control strategy for a planar floating platform (emulating spacecraft docking) that guarantees collision avoidance, direction-of-approach constraints, and robustness to unmodeled disturbances using Control Barrier Functions?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Autonomous space docking is a critical capability for on-orbit servicing, refueling, and debris removal missions. High-fidelity 6DOF zero-gravity testing on Earth is expensive, so 3DOF planar floating platforms (like the Slider) serve as cost-effective testbeds for validating GNC algorithms. The Slider levitates on an air cushion over a smooth table, emulating in-plane zero-gravity spacecraft motion.</p>
        <p>Prior docking approaches using Artificial Potential Fields suffered from oscillations and local minima. Earlier CBF-based docking strategies using only the zero-contour of a Cardioid were validated only in simulation and proved fragile experimentally due to tether-induced twists and surface drifts. This paper introduces a <strong>switched CBF strategy</strong> between positive and zero level sets of the Cardioid to handle real-world disturbances.</p>
        <p>The key insight is that the Cardioid shape naturally captures both clearance constraints (unsafe zone around the docking station) and direction-of-approach constraints (tapering funnel toward the docking port) in a single barrier function, making it ideal for docking scenarios with narrow ports.</p>

        <h2>Architecture / Methodology</h2>
        <p>The control architecture employs a <strong>two-loop cascade design</strong>:</p>
        <ul>
          <li><strong>Inner loop:</strong> Feedback linearization-based velocity tracking controller that cancels Coriolis nonlinearities</li>
          <li><strong>Outer loop:</strong> Kinematics-based nominal PI controller + CBF safety filter formulated as a Quadratic Program (QP)</li>
        </ul>
        <p>Two Cardioid CBFs are defined: h1(x) (zero contour) and h2(x) = h1(x) - c (positive contour, c > 0). The positive contour provides extra clearance during the approach phase, steering the Slider to a <strong>deadlock point</strong> near the docking port. When the Slider's configuration satisfies switching conditions (proximity, heading alignment, lateral alignment), the CBF switches from h2 to h1, expanding the safe zone to include the docking port and initiating contact.</p>
        <p>Key deadlock analysis: Two deadlock points exist on the r_x axis where the CBF filter returns u* = 0 despite u_nom != 0. One is asymptotically stable (near the docking port) and one is unstable (diametrically opposite). The stable deadlock point serves as the natural waiting position before docking contact.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>First <strong>experimental validation</strong> of a CBF-based autonomous docking strategy on a hardware-in-the-loop planar floating platform</li>
          <li>Novel <strong>switched CBF mechanism</strong> between zero and positive Cardioid contours that handles experimental non-idealities</li>
          <li>Precise characterization of deadlock points and their stability properties, exploited as a design feature rather than a bug</li>
          <li>Demonstration of robustness to tether-induced disturbances and non-flat surface drifts without explicit disturbance modeling</li>
          <li>Scalability discussion for extension to 3D (6DOF) operations using a 3D Cardioid</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The system uses a 12-camera Vicon motion capture system for localization, with control implemented in MATLAB/Simulink running on an off-board computer (3.50 GHz, 16 GB RAM). Communication uses ROS over WiFi at 10 Hz sampling frequency. The Slider platform (4.82 kg, 0.25m x 0.25m footprint) operates on a 1.5m x 1.5m glass surface. Thruster bounds: T_max = 0.7N, minimum on-time 0.05s. Key parameters: Cardioid parameter a = 0.5m, contour offset c = 0.03, switching thresholds delta_theta = 5 deg, delta_y = 0.04m.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Trial</th><th>Initial Condition</th><th>CBF Switches</th><th>Outcome</th></tr>
          <tr><td>1</td><td>Quadrant I</td><td>5 attempts</td><td>Successful docking</td></tr>
          <tr><td>2</td><td>Quadrant IV</td><td>1 attempt (no disturbance)</td><td>Successful docking</td></tr>
          <tr><td>3</td><td>Quadrant I</td><td>4 attempts</td><td>Successful docking</td></tr>
        </table>
        <p>The barrier function h1(x) remains positive throughout the maneuver and tends to zero at docking completion. The heading angle converges to zero within 5 degrees during docking contact. The effective model predictions match full PDE numerics within ~1% for low velocities (v = 0.01) and ~3.6% for moderate velocities (v = 0.05).</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant exploitation of the deadlock phenomenon as a design feature rather than a limitation</li>
          <li>The Cardioid shape provides a single barrier function that simultaneously captures clearance and direction-of-approach constraints</li>
          <li>Real experimental validation on actual hardware with real-world disturbances, not just simulation</li>
          <li>No trajectory pre-planning needed; the CBF filter + nominal controller generates references on-the-fly</li>
          <li>Computationally lightweight QP solver suitable for real-time implementation at 10 Hz</li>
          <li>Clear pathway to 6DOF extension via 3D Cardioid</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Limited experimental workspace (1.5m x 1.5m) constrains the set of testable initial conditions</li>
          <li>Relies on external motion capture for localization; onboard sensing would be needed for real space deployment</li>
          <li>On-off thruster nature limits control authority and creates chattering behavior near the docking port</li>
          <li>No formal stability guarantee during the switching transient between the two CBFs</li>
          <li>Large persistent disturbances risk chattering between CBF modes, though the paper acknowledges this</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the switching strategy behave if the docking port had a non-symmetric geometry, requiring a non-Cardioid safe set?</li>
          <li>Could reinforcement learning be used to learn the switching conditions adaptively rather than using fixed thresholds?</li>
          <li>What modifications would be needed to handle a moving (non-stationary) docking station?</li>
          <li>How does the approach scale when multiple Sliders attempt simultaneous docking at different ports?</li>
          <li>Could the deadlock-exploitation concept be applied to other safety-critical robotic contact tasks like assembly or manipulation?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates a clever marriage of CBF theory with practical engineering insight. The key takeaway is that <strong>deadlock points of CBF filters need not be avoided</strong> — they can be strategically designed and exploited as intermediate waypoints in multi-phase safety-critical maneuvers. The switched CBF approach is particularly appealing for docking because it naturally handles the transition from "stay away" (approach) to "make contact" (docking) without trajectory replanning. For readers interested in safety-critical control, this paper provides an excellent case study of how theoretical CBF properties translate into real-world robustness.</p>
      `
    },
    ko: {
      title: "평면 부유 플랫폼을 위한 전환형 제어 장벽 함수 기반 안전 도킹 제어 전략",
      summary: "우주 시뮬레이션 부유 플랫폼의 자율 도킹을 위해 심장형(Cardioid) 안전 집합을 사용한 전환형 CBF 전략을 제안하고, 실제 교란 환경에서 실험적으로 검증합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 심장형(Cardioid) 제어 장벽 함수의 <strong>교착점(deadlock point)</strong>을 전환 트리거로 활용하여 도킹을 접근 단계와 접촉 단계로 분리하는 방식을 통해, 테더 유도 교란과 표면 비이상성에도 불구하고 평면 부유 테스트베드에서 강건한 실험적 도킹을 달성합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>제어 장벽 함수를 사용하여 충돌 회피, 접근 방향 제약, 미모델링 교란에 대한 강건성을 보장하는 평면 부유 플랫폼(우주선 도킹 시뮬레이션)용 안전 임계 자율 도킹 제어 전략을 어떻게 설계할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>자율 우주 도킹은 궤도 서비스, 연료 보급, 우주 잔해물 제거 임무에 필수적인 역량입니다. 지상에서의 고충실도 6DOF 무중력 테스트는 비용이 많이 들기 때문에 3DOF 평면 부유 플랫폼(Slider)이 GNC 알고리즘 검증을 위한 비용 효율적인 테스트베드로 활용됩니다.</p>
        <p>기존의 인공 포텐셜 필드 기반 접근법은 진동과 국소 최소값 문제가 있었습니다. 이전 CBF 기반 도킹 전략(심장형의 영 등고선만 사용)은 시뮬레이션에서만 검증되었으며, 테더 유도 비틀림과 표면 드리프트로 인해 실험적으로 취약했습니다. 본 논문은 실제 교란을 처리하기 위해 심장형의 양수 및 영 수준 집합 간 <strong>전환형 CBF 전략</strong>을 도입합니다.</p>
        <p>핵심 통찰은 심장형 형상이 도킹 스테이션 주변의 안전 이격 제약(위험 구역)과 접근 방향 제약(좁아지는 깔때기)을 하나의 장벽 함수로 동시에 포착한다는 것으로, 좁은 포트가 있는 도킹 시나리오에 이상적입니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>제어 아키텍처는 <strong>이중 루프 캐스케이드 설계</strong>를 채택합니다:</p>
        <ul>
          <li><strong>내부 루프:</strong> 코리올리 비선형성을 상쇄하는 피드백 선형화 기반 속도 추적 제어기</li>
          <li><strong>외부 루프:</strong> 운동학 기반 명목 PI 제어기 + 이차 프로그래밍(QP)으로 공식화된 CBF 안전 필터</li>
        </ul>
        <p>두 개의 심장형 CBF가 정의됩니다: h1(x)(영 등고선)과 h2(x) = h1(x) - c(양 등고선, c > 0). 양 등고선은 접근 단계에서 추가 이격을 제공하여 Slider를 도킹 포트 근처의 <strong>교착점</strong>으로 유도합니다. Slider의 구성이 전환 조건(근접도, 방향 정렬, 측면 정렬)을 만족하면 CBF가 h2에서 h1로 전환되어 안전 영역을 확장하고 도킹 접촉을 시작합니다.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>하드웨어 인 더 루프 평면 부유 플랫폼에서의 CBF 기반 자율 도킹 전략의 최초 <strong>실험적 검증</strong></li>
          <li>실험적 비이상성을 처리하는 영 및 양 심장형 등고선 간의 새로운 <strong>전환형 CBF 메커니즘</strong></li>
          <li>교착점의 정밀한 특성화와 안정성 분석을 설계 특징으로 활용</li>
          <li>명시적 교란 모델링 없이 테더 유도 교란과 비평탄 표면 드리프트에 대한 강건성 실증</li>
          <li>3D 심장형을 사용한 3차원(6DOF) 운용으로의 확장성 논의</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>시스템은 위치 파악을 위해 12대의 Vicon 모션 캡처 카메라를 사용하며, 제어는 오프보드 컴퓨터(3.50 GHz, 16 GB RAM)에서 MATLAB/Simulink로 구현됩니다. 통신은 WiFi를 통한 ROS로 10 Hz 샘플링 주파수로 이루어집니다. Slider 플랫폼(4.82 kg, 0.25m x 0.25m)은 1.5m x 1.5m 유리 표면 위에서 작동합니다. 추력기 한계: T_max = 0.7N, 최소 가동 시간 0.05s. 주요 매개변수: 심장형 매개변수 a = 0.5m, 등고선 오프셋 c = 0.03, 전환 임계값 delta_theta = 5도, delta_y = 0.04m.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>시행</th><th>초기 조건</th><th>CBF 전환 횟수</th><th>결과</th></tr>
          <tr><td>1</td><td>제1사분면</td><td>5회</td><td>도킹 성공</td></tr>
          <tr><td>2</td><td>제4사분면</td><td>1회 (교란 없음)</td><td>도킹 성공</td></tr>
          <tr><td>3</td><td>제1사분면</td><td>4회</td><td>도킹 성공</td></tr>
        </table>
        <p>장벽 함수 h1(x)은 기동 전반에 걸쳐 양수를 유지하며 도킹 완료 시 영으로 수렴합니다. 방향각은 도킹 접촉 중 5도 이내로 수렴합니다. 유효 모델 예측은 저속(v = 0.01)에서 ~1%, 중속(v = 0.05)에서 ~3.6%의 정확도로 전체 PDE 수치해와 일치합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>교착 현상을 제한이 아닌 설계 특징으로 우아하게 활용</li>
          <li>심장형 형상이 이격 및 접근 방향 제약을 단일 장벽 함수로 동시 포착</li>
          <li>시뮬레이션이 아닌 실제 하드웨어에서의 실험적 검증</li>
          <li>사전 궤적 계획 불필요; CBF 필터 + 명목 제어기가 실시간으로 참조 생성</li>
          <li>10 Hz 실시간 구현에 적합한 경량 QP 솔버</li>
          <li>3D 심장형을 통한 6DOF 확장 경로 명확</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>제한된 실험 작업 공간(1.5m x 1.5m)이 테스트 가능한 초기 조건 집합을 제약</li>
          <li>위치 파악을 외부 모션 캡처에 의존; 실제 우주 배치에는 온보드 센싱 필요</li>
          <li>온/오프 추력기 특성이 도킹 포트 근처에서 제어 권한을 제한하고 채터링 발생</li>
          <li>두 CBF 간 전환 과도 상태에서의 공식적 안정성 보장 부재</li>
          <li>대규모 지속적 교란 시 CBF 모드 간 채터링 위험 (논문에서도 인정)</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>도킹 포트가 비대칭 기하학을 가져 비심장형 안전 집합이 필요한 경우 전환 전략은 어떻게 동작할까?</li>
          <li>고정 임계값 대신 강화학습을 사용하여 전환 조건을 적응적으로 학습할 수 있을까?</li>
          <li>이동하는(비정지) 도킹 스테이션을 처리하려면 어떤 수정이 필요할까?</li>
          <li>여러 Slider가 다른 포트에서 동시 도킹을 시도할 때 접근법은 어떻게 확장될까?</li>
          <li>교착점 활용 개념을 조립이나 매니퓰레이션 같은 다른 안전 임계 로봇 접촉 작업에 적용할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 CBF 이론과 실용적 공학적 통찰의 훌륭한 결합을 보여줍니다. 핵심 교훈은 <strong>CBF 필터의 교착점은 피할 필요가 없으며</strong>, 다단계 안전 임계 기동에서 중간 웨이포인트로 전략적으로 설계하고 활용할 수 있다는 것입니다. 전환형 CBF 접근법은 궤적 재계획 없이 "멀리 있기"(접근)에서 "접촉하기"(도킹)로의 전환을 자연스럽게 처리하므로 도킹에 특히 매력적입니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. Shield Synthesis
  // ====================================================================
  {
    id: "shield-synthesis",
    date: "2025-04-11",
    authors: "Bloem, R., Konighofer, B., Konighofer, R., Wang, C.",
    venue: "TACAS 2015",
    image: "images/shield-synthesis/thumbnail.png",
    link: "",
    domain: "ai-security",
    tags: ["AI Security", "Shield Synthesis", "Runtime Enforcement", "Formal Methods"],
    en: {
      title: "Shield Synthesis: Runtime Enforcement for Reactive Systems",
      summary: "Introduces shield synthesis for reactive hardware systems — automatically constructing a runtime monitor that corrects erroneous outputs while minimizing deviation from the original design.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper formalizes <strong>shield synthesis</strong> as a new paradigm that sits between model checking and reactive synthesis, automatically constructing a minimally-invasive runtime enforcer (shield) that guarantees critical safety properties for reactive hardware systems even when the underlying design cannot be formally verified.</p>

        <h2>Research Question</h2>
        <blockquote>How can we automatically construct a runtime enforcement component ("shield") that attaches to any reactive hardware design to guarantee a set of critical safety properties, while deviating from the original design's output as little as possible?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Model checking can formally verify temporal logic specifications, but scalability prevents proving all critical properties of complex designs. Reactive synthesis generates correct-by-construction designs but requires complete specifications and faces similar scalability issues. Shield synthesis fills the gap: it targets only a small set of critical properties (regardless of design complexity), making it scalable where other methods fail.</p>
        <p>Prior runtime enforcement work (Schneider's security automata, Ligatti's edit automata, Falcone's buffered enforcement) cannot handle reactive systems where corrections must be instantaneous — no halting, no inserting/deleting time steps, no buffering. A shield must act on-the-fly without knowing future inputs.</p>
        <p>The key insight is the dual requirement of <strong>correctness</strong> (properties always satisfied) and <strong>minimum interference</strong> (output deviates only when necessary, and as little as possible).</p>

        <h2>Architecture / Methodology</h2>
        <p>The shield monitors both input and output of the design and produces a corrected output. The synthesis procedure has five main steps:</p>
        <ul>
          <li><strong>Step 1 — Violation Monitor:</strong> Builds automaton U via safety game + subset construction to track property violations and determine when the shield should intervene. Uses "innocent until proved guilty" philosophy.</li>
          <li><strong>Step 2 — Validity Monitor:</strong> Tracks valid properties D |= phi^v to increase shield freedom when assumptions hold.</li>
          <li><strong>Step 3 — Deviation Monitor:</strong> Two-state automaton tracking whether the shield's output differs from the design's.</li>
          <li><strong>Step 4 — Safety Game Construction:</strong> Synchronous product of all monitors + specification automaton, with safe states encoding correctness, k-stabilization, and validity.</li>
          <li><strong>Step 5 — Game Solving:</strong> Standard safety game algorithm; winning strategy becomes the shield.</li>
        </ul>
        <p>The <strong>k-stabilization</strong> concept bounds shield deviation: after a property violation, the shield may deviate for at most k consecutive steps. A second violation during recovery triggers fail-safe mode (correctness only, no minimality).</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>First formal framework for <strong>shield synthesis for reactive hardware systems</strong> with instantaneous correction requirement</li>
          <li>Novel <strong>k-stabilizing shield</strong> concept that bounds recovery time and provides graceful degradation</li>
          <li>Subset construction for optimistic state tracking ("innocent until proved guilty"), avoiding unjust shield interventions</li>
          <li>Reduction to safety games enabling efficient synthesis using BDD-based methods</li>
          <li>Complexity bound: O(k^2 * 2^{2|R|} * |V|^4 * |R|^2) synthesis time</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Proof-of-concept tool implemented in Python using CUDD BDD library. Product automata and subset construction done explicitly; remaining steps use symbolic BDD representation. Outputs shields in Verilog and SMV. Verified with VIS model checker. Experiments run on Intel i5-3320M @2.6 GHz, 8 GB RAM, 64-bit Linux.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Benchmark</th><th>|Q|</th><th>|I|</th><th>|O|</th><th>k</th><th>Time (sec)</th></tr>
          <tr><td>Traffic Light (3 props)</td><td>3</td><td>1</td><td>2</td><td>1</td><td>&lt;0.1</td></tr>
          <tr><td>AMBA G1+2+3</td><td>12</td><td>3</td><td>3</td><td>1</td><td>0.1</td></tr>
          <tr><td>AMBA G1+2+3+5</td><td>18</td><td>3</td><td>4</td><td>2</td><td>242</td></tr>
          <tr><td>LTL Pattern 10 (b=16)</td><td>18</td><td>-</td><td>-</td><td>-</td><td>377</td></tr>
        </table>
        <p>The traffic light shield (5 latches, 41 AIG gates after ABC optimization) successfully handles subtle bugs — a missing rr transition and incomplete emergency preemption — that would be difficult to detect through testing alone. The AMBA arbiter shield correctly blocks forbidden burst starts and maintains synchronization. Timeouts occur only when both state count and I/O signals grow large, which is acceptable since critical property sets are typically small.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Fills a genuine gap between model checking and reactive synthesis with a practical, scalable approach</li>
          <li>Design-agnostic: works for any design including third-party IP cores without source code</li>
          <li>The "innocent until proved guilty" subset construction is an elegant solution to the state-tracking problem</li>
          <li>k-stabilization provides a clean, tunable tradeoff between recovery capability and shield complexity</li>
          <li>Could simplify certification: certify the small shield instead of the complex design</li>
          <li>Clear formal foundations with correctness guarantees</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Exponential worst-case complexity in |R| (number of unverified property states) limits the number of simultaneously enforceable properties</li>
          <li>Only handles safety properties; liveness requires Buchi games (outlined but not fully developed)</li>
          <li>No experimental comparison with alternative runtime verification approaches</li>
          <li>Assumes the design satisfies phi^v exactly — partial violations of "valid" properties are not handled</li>
          <li>Shield adds latency (one combinational logic delay) which may matter for high-frequency designs</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would shield synthesis extend to software systems where timing is less rigid than in hardware?</li>
          <li>Could shields be composed hierarchically — local shields for subsystems and a global shield for system-level properties?</li>
          <li>What is the relationship between shield synthesis and AI safety shields (e.g., for reinforcement learning agents)?</li>
          <li>How does the approach handle properties that span multiple clock domains in asynchronous designs?</li>
          <li>Could machine learning be used to approximate the shield for deployment on resource-constrained hardware?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>Shield synthesis is a compelling paradigm because it addresses a real industrial need: ensuring critical safety properties hold even when full formal verification is infeasible. The key insight is that by focusing on a small set of critical properties rather than the entire design, the synthesis problem becomes tractable. The paper is best read as a <strong>foundational framework</strong> that establishes definitions, correctness criteria, and the basic algorithmic pipeline, opening the door for more scalable implementations and extensions to richer property classes.</p>
      `
    },
    ko: {
      title: "실드 합성: 반응형 시스템을 위한 런타임 강제",
      summary: "반응형 하드웨어 시스템을 위한 실드 합성을 도입 — 원래 설계와의 편차를 최소화하면서 오류 출력을 수정하는 런타임 모니터를 자동으로 구축합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 <strong>실드 합성</strong>을 모델 체킹과 반응형 합성 사이에 위치하는 새로운 패러다임으로 공식화하며, 기반 설계를 공식 검증할 수 없는 경우에도 반응형 하드웨어 시스템의 핵심 안전 속성을 보장하는 최소 침습적 런타임 강제 장치(실드)를 자동으로 구축합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>모든 반응형 하드웨어 설계에 부착하여 핵심 안전 속성 집합을 보장하면서도 원래 설계의 출력과 최소한으로만 편차를 보이는 런타임 강제 구성 요소("실드")를 어떻게 자동으로 구축할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>모델 체킹은 시간 논리 사양을 공식 검증할 수 있지만, 확장성 문제로 복잡한 설계의 모든 핵심 속성을 증명하지 못합니다. 반응형 합성은 설계 단계에서 정확성을 보장하지만 완전한 사양이 필요하고 유사한 확장성 문제에 직면합니다. 실드 합성은 이 간극을 메웁니다.</p>
        <p>기존 런타임 강제 연구는 반응형 시스템의 즉각적 수정 요구를 처리할 수 없었습니다. 실드는 미래 입력을 모르는 상태에서 즉각적으로 동작해야 합니다. 핵심 통찰은 <strong>정확성</strong>(속성 항상 만족)과 <strong>최소 간섭</strong>(필요할 때만, 최소한으로 편차) 이중 요구사항입니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>실드는 설계의 입출력을 모니터링하고 수정된 출력을 생성합니다. 합성 절차는 5단계입니다:</p>
        <ul>
          <li><strong>1단계 — 위반 모니터:</strong> 안전 게임 + 부분 집합 구성으로 위반 추적 오토마톤 구축</li>
          <li><strong>2단계 — 유효성 모니터:</strong> 유효 속성 추적으로 실드 자유도 증가</li>
          <li><strong>3단계 — 편차 모니터:</strong> 실드 출력이 설계 출력과 다른지 추적하는 2상태 오토마톤</li>
          <li><strong>4단계 — 안전 게임 구성:</strong> 모든 모니터 + 사양 오토마톤의 동기 곱</li>
          <li><strong>5단계 — 게임 풀기:</strong> 표준 안전 게임 알고리즘; 승리 전략이 실드가 됨</li>
        </ul>
        <p><strong>k-안정화</strong> 개념은 실드 편차를 제한합니다: 속성 위반 후 실드는 최대 k 연속 스텝 동안만 편차를 보일 수 있습니다.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>즉각적 수정 요구가 있는 <strong>반응형 하드웨어 시스템용 실드 합성</strong>의 최초 공식 프레임워크</li>
          <li>복구 시간을 제한하고 우아한 성능 저하를 제공하는 새로운 <strong>k-안정화 실드</strong> 개념</li>
          <li>부당한 실드 개입을 방지하는 "무죄 추정" 부분 집합 구성</li>
          <li>BDD 기반 방법을 사용한 효율적 합성을 위한 안전 게임으로의 환원</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>Python 구현, CUDD BDD 라이브러리 사용. Verilog와 SMV로 실드 출력. VIS 모델 체커로 검증. Intel i5-3320M @2.6 GHz, 8 GB RAM에서 실험.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>벤치마크</th><th>|Q|</th><th>|I|</th><th>|O|</th><th>k</th><th>시간(초)</th></tr>
          <tr><td>교통 신호등 (3개 속성)</td><td>3</td><td>1</td><td>2</td><td>1</td><td>&lt;0.1</td></tr>
          <tr><td>AMBA G1+2+3</td><td>12</td><td>3</td><td>3</td><td>1</td><td>0.1</td></tr>
          <tr><td>AMBA G1+2+3+5</td><td>18</td><td>3</td><td>4</td><td>2</td><td>242</td></tr>
        </table>
        <p>교통 신호등 실드(최적화 후 5 래치, 41 AIG 게이트)가 테스트로는 감지하기 어려운 미묘한 버그를 성공적으로 처리합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>모델 체킹과 반응형 합성 사이의 실질적 간극을 실용적이고 확장 가능한 접근으로 해결</li>
          <li>설계 비의존적: 소스 코드 없는 서드파티 IP 코어에도 적용 가능</li>
          <li>"무죄 추정" 부분 집합 구성의 우아한 상태 추적 해법</li>
          <li>k-안정화의 깔끔하고 조정 가능한 복구 능력-실드 복잡성 절충</li>
          <li>인증 간소화 가능: 복잡한 설계 대신 작은 실드를 인증</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>|R|에 대한 지수적 최악 복잡도로 동시 강제 가능한 속성 수 제한</li>
          <li>안전 속성만 처리; 활동성은 뷔히 게임 필요 (개요만 제시)</li>
          <li>대안적 런타임 검증 접근법과의 실험적 비교 부재</li>
          <li>설계가 phi^v를 정확히 만족한다고 가정</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>실드 합성은 하드웨어보다 타이밍이 덜 엄격한 소프트웨어 시스템으로 어떻게 확장될 수 있을까?</li>
          <li>실드를 계층적으로 구성할 수 있을까 — 서브시스템용 로컬 실드와 시스템 수준 속성용 글로벌 실드?</li>
          <li>실드 합성과 AI 안전 실드(예: 강화학습 에이전트용) 사이의 관계는?</li>
          <li>머신러닝으로 자원 제약 하드웨어 배치를 위해 실드를 근사할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>실드 합성은 완전한 공식 검증이 불가능할 때에도 핵심 안전 속성이 유지되도록 보장해야 하는 실질적 산업 요구를 해결하는 매력적인 패러다임입니다. 소수의 핵심 속성에 집중함으로써 합성 문제를 다루기 쉽게 만드는 것이 핵심 통찰입니다. 이 논문은 정의, 정확성 기준, 기본 알고리즘 파이프라인을 확립하는 <strong>기초 프레임워크</strong>로 읽는 것이 좋습니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. Conformal Prediction Time Series
  // ====================================================================
  {
    id: "conformal-prediction-timeseries",
    date: "2025-04-11",
    authors: "Sabashvili, A.",
    venue: "Preprint 2025",
    image: "images/conformal-prediction-timeseries/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Deep Learning", "Conformal Prediction", "Time Series", "Uncertainty"],
    en: {
      title: "Conformal Prediction Algorithms for Time Series Forecasting: Methods and Benchmarking",
      summary: "Surveys and benchmarks conformal prediction algorithms for time series, showing that multi-step split conformal prediction (MSCP) achieves the best coverage-efficiency tradeoff with AutoARIMA on large-scale monthly sales data.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A practitioner-oriented benchmarking study that evaluates seven conformal prediction wrappers for time series forecasting, finding that <strong>multi-step split conformal prediction (MSCP)</strong> with horizon-specific calibration provides the best balance of valid 90% coverage and tight prediction intervals, outperforming both online adaptive controllers and ensemble-based methods.</p>

        <h2>Research Question</h2>
        <blockquote>Which conformal prediction algorithms for time series forecasting best handle the violation of the exchangeability assumption inherent in sequential data, while providing valid coverage guarantees and efficient (narrow) prediction intervals?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Conformal prediction (CP) is a distribution-free framework for producing prediction intervals with finite-sample coverage guarantees. However, standard CP requires data exchangeability — a condition fundamentally violated by time series with temporal dependencies, autocorrelation, and nonstationarity. Multiple algorithmic families attempt to bridge this gap: relaxing exchangeability via mixing conditions, redefining exchangeable units as entire series, modeling residual dynamics, and online adaptive controllers.</p>
        <p>This study fills a practical gap by providing a head-to-head comparison of these approaches using a common base forecaster (AutoARIMA) on a large-scale real-world dataset (3000+ monthly sales time series), focusing on simplicity and modularity rather than complex neural architectures.</p>

        <h2>Architecture / Methodology</h2>
        <p>Seven methods are benchmarked against a parametric baseline, all using AutoARIMA as the base forecaster with H=12 month horizon:</p>
        <ul>
          <li><strong>MSCP:</strong> Horizon-specific calibration with rolling window residuals; separate quantile per forecast step h</li>
          <li><strong>EnbPI:</strong> Bootstrap ensemble with leave-one-out calibration under mixing assumptions</li>
          <li><strong>SPCI:</strong> Quantile regression on residual dynamics to predict future error quantiles</li>
          <li><strong>Global-CP:</strong> Treats entire series as exchangeable units with Bonferroni correction for joint coverage</li>
          <li><strong>ACI:</strong> Online controller updating miscoverage level alpha_t via feedback</li>
          <li><strong>AcMCP:</strong> Multi-step controller with MA(h-1) autocorrelation forecast of future nonconformity</li>
          <li><strong>Parametric-PI:</strong> ARIMA-native Gaussian intervals as baseline</li>
          <li><strong>Nixtla-CP:</strong> Cross-validation-based conformal wrapper from statsforecast library</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>Comprehensive benchmarking of 7 CP methods + 1 baseline on a common large-scale real-world dataset</li>
          <li>Demonstrates that MSCP (the simplest method with horizon-specific calibration) achieves the best Winkler score among methods meeting the 90% coverage target</li>
          <li>Shows that EnbPI, SPCI, and Nixtla-CP fail to reach nominal coverage in this setting</li>
          <li>Uses proper statistical significance testing (Friedman + Conover post-hoc) to rank methods</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Dataset: 3000+ individual monthly sales time series across entertainment, fashion, restaurant, and electronics sectors from multiple countries. Base forecaster: AutoARIMA from Nixtla statsforecast and R forecast libraries. Horizon: H=12 months. Target coverage: 90% (alpha=0.1). Default hyperparameters for all methods.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Method</th><th>Coverage >= 90%?</th><th>Winkler Rank</th></tr>
          <tr><td>MSCP</td><td>Yes</td><td>1 (Best)</td></tr>
          <tr><td>Parametric-PI</td><td>Yes</td><td>2</td></tr>
          <tr><td>ACI</td><td>Yes</td><td>3</td></tr>
          <tr><td>AcMCP</td><td>Yes</td><td>4-5</td></tr>
          <tr><td>Global-CP</td><td>Yes</td><td>4-5</td></tr>
          <tr><td>Nixtla-CP</td><td>No</td><td>-</td></tr>
          <tr><td>EnbPI</td><td>No</td><td>-</td></tr>
          <tr><td>SPCI</td><td>No</td><td>-</td></tr>
        </table>
        <p>On the extended large corpus, the Friedman + Conover post-hoc test establishes a clear hierarchy: MSCP > Parametric-PI > ACI, with statistically significant differences between all three.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Highly practical and reproducible; all methods use default hyperparameters and a standard base forecaster</li>
          <li>Large-scale real-world evaluation (3000+ series) rather than toy examples</li>
          <li>Proper statistical significance testing rather than just visual comparison</li>
          <li>Clear algorithmic descriptions enabling practitioners to implement any method</li>
          <li>Honest reporting of failures: three methods fail to meet nominal coverage</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Only AutoARIMA as base forecaster; results may differ with neural or tree-based models</li>
          <li>Monthly data only; higher-frequency data (daily, hourly) may exhibit different mixing properties</li>
          <li>No conditional coverage analysis — only marginal coverage is evaluated</li>
          <li>Dataset details are sparse (proprietary sales data); limited reproducibility of exact results</li>
          <li>Does not explore computational cost tradeoffs between methods</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Would MSCP's advantage persist with more expressive base forecasters like LightGBM or neural networks?</li>
          <li>How do these methods perform under distribution shift (e.g., COVID-era sales data)?</li>
          <li>Could hybrid approaches (e.g., MSCP + ACI adaptive feedback) combine the strengths of both?</li>
          <li>What is the minimum calibration window size needed for MSCP to achieve valid coverage?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>For practitioners using ARIMA-family forecasters on monthly data, <strong>MSCP is the clear recommendation</strong>: it is the simplest method, requires no additional model fitting beyond the base forecaster, and achieves the tightest intervals among valid methods. The finding that the most straightforward horizon-specific calibration beats sophisticated online controllers and residual-dynamics models is a valuable practical insight. The paper serves as an excellent entry point for practitioners wanting to add distribution-free uncertainty quantification to their forecasting pipelines.</p>
      `
    },
    ko: {
      title: "시계열 예측을 위한 적합 예측 알고리즘: 방법론 및 벤치마킹",
      summary: "시계열용 적합 예측 알고리즘을 조사하고 벤치마킹하여, 대규모 월간 매출 데이터에서 AutoARIMA와 함께 다단계 분할 적합 예측(MSCP)이 최적의 커버리지-효율성 절충을 달성함을 보여줍니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>시계열 예측용 7개 적합 예측 래퍼를 평가하는 실무 중심 벤치마킹 연구로, 수평선별 보정을 사용하는 <strong>다단계 분할 적합 예측(MSCP)</strong>이 유효한 90% 커버리지와 좁은 예측 구간의 최적 균형을 제공함을 발견합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>순차 데이터에 내재된 교환가능성 가정 위반을 가장 잘 처리하면서 유효한 커버리지 보장과 효율적(좁은) 예측 구간을 제공하는 시계열 예측용 적합 예측 알고리즘은?</blockquote>

        <h2>배경 및 동기</h2>
        <p>적합 예측(CP)은 유한 표본 커버리지 보장을 가진 분포 무관 예측 구간 프레임워크입니다. 그러나 표준 CP는 데이터 교환가능성을 요구하며, 이는 시간 의존성을 가진 시계열에서 근본적으로 위반됩니다. 본 연구는 공통 기본 예측기(AutoARIMA)와 대규모 실세계 데이터셋(3000+ 월간 매출 시계열)을 사용한 직접 비교를 통해 실무적 간극을 메웁니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>AutoARIMA를 기본 예측기로, H=12개월 수평선으로 7개 방법과 파라메트릭 기준선을 벤치마킹합니다: MSCP, EnbPI, SPCI, Global-CP, ACI, AcMCP, Parametric-PI, Nixtla-CP.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>공통 대규모 실세계 데이터셋에서 7개 CP 방법 + 1개 기준선의 포괄적 벤치마킹</li>
          <li>가장 단순한 수평선별 보정 방법인 MSCP가 90% 커버리지 달성 방법 중 최적 Winkler 점수를 보임을 실증</li>
          <li>EnbPI, SPCI, Nixtla-CP가 이 설정에서 명목 커버리지에 도달하지 못함을 제시</li>
          <li>적절한 통계적 유의성 검정(Friedman + Conover 사후 검정) 사용</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>데이터셋: 여러 국가의 엔터테인먼트, 패션, 레스토랑, 전자 부문에서 3000+ 개별 월간 매출 시계열. 기본 예측기: AutoARIMA. 수평선: H=12개월. 목표 커버리지: 90%. 모든 방법에 기본 하이퍼파라미터 사용.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>방법</th><th>커버리지 >= 90%?</th><th>Winkler 순위</th></tr>
          <tr><td>MSCP</td><td>예</td><td>1 (최고)</td></tr>
          <tr><td>Parametric-PI</td><td>예</td><td>2</td></tr>
          <tr><td>ACI</td><td>예</td><td>3</td></tr>
          <tr><td>EnbPI</td><td>아니오</td><td>-</td></tr>
          <tr><td>SPCI</td><td>아니오</td><td>-</td></tr>
        </table>
        <p>확장된 대규모 코퍼스에서 Friedman + Conover 사후 검정이 명확한 계층을 확립합니다: MSCP > Parametric-PI > ACI.</p>

        <h2>강점</h2>
        <ul>
          <li>매우 실용적이고 재현 가능; 모든 방법이 기본 하이퍼파라미터와 표준 기본 예측기 사용</li>
          <li>대규모 실세계 평가(3000+ 시계열)</li>
          <li>시각적 비교가 아닌 적절한 통계적 유의성 검정</li>
          <li>세 방법의 실패를 솔직하게 보고</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>AutoARIMA만 기본 예측기로 사용; 신경망이나 트리 기반 모델에서는 결과가 다를 수 있음</li>
          <li>월간 데이터만; 고빈도 데이터는 다른 혼합 속성을 보일 수 있음</li>
          <li>조건부 커버리지 분석 없음 — 주변 커버리지만 평가</li>
          <li>데이터셋 세부사항 부족(독점 매출 데이터)</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>더 표현력 있는 기본 예측기(LightGBM, 신경망)에서도 MSCP의 우위가 지속될까?</li>
          <li>분포 이동(예: COVID 시대 매출 데이터) 하에서 이 방법들의 성능은?</li>
          <li>하이브리드 접근(예: MSCP + ACI 적응 피드백)이 양쪽 강점을 결합할 수 있을까?</li>
          <li>MSCP가 유효한 커버리지를 달성하는 데 필요한 최소 보정 윈도우 크기는?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>ARIMA 계열 예측기를 월간 데이터에 사용하는 실무자에게 <strong>MSCP가 명확한 추천</strong>입니다. 가장 단순한 수평선별 보정이 정교한 온라인 컨트롤러와 잔차 동역학 모델을 이기는 것은 귀중한 실무적 통찰입니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. Mamba
  // ====================================================================
  {
    id: "mamba",
    date: "2025-04-11",
    authors: "Gu, A., Dao, T.",
    venue: "COLM 2024",
    image: "images/mamba/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Deep Learning", "SSM", "Sequence Modeling", "Selective State Space"],
    en: {
      title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
      summary: "Introduces selective state space models (S6) that make SSM parameters input-dependent, achieving Transformer-quality language modeling with linear-time scaling and 5x inference throughput.",
      review: `
        <h2>One-line Verdict</h2>
        <p>Mamba breaks the fundamental tradeoff between expressivity and efficiency in sequence models by introducing <strong>input-dependent selection</strong> into structured state space models, enabling content-based reasoning while maintaining linear-time computation — the first sub-quadratic architecture to match Transformer quality on language at scale.</p>

        <h2>Research Question</h2>
        <blockquote>Can structured state space models (SSMs) be made expressive enough for discrete, information-dense modalities like language by introducing input-dependent (selective) dynamics, while preserving their linear-time computational efficiency?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Foundation models are dominated by Transformers whose quadratic attention mechanism limits context length and inference speed. Structured SSMs (S4 family) offer linear or near-linear scaling and excel on continuous signals (audio, vision), but fail on discrete modalities like text. The authors identify that this failure stems from the Linear Time Invariance (LTI) constraint: fixed dynamics cannot perform content-based reasoning — they cannot selectively focus on or ignore specific tokens. The Selective Copying and Induction Heads synthetic tasks make this limitation precise.</p>
        <p>The core insight is that sequence modeling is fundamentally about <strong>compressing context into a smaller state</strong>. Attention is effective but inefficient (stores everything). RNNs are efficient but limited by state quality. Mamba achieves both by making the state dynamics input-dependent through a selection mechanism.</p>

        <h2>Architecture / Methodology</h2>
        <p>Three key innovations:</p>
        <ul>
          <li><strong>Selection Mechanism:</strong> Parameters Delta, B, C become functions of the input x via learned projections (Algorithm 2). This makes the SSM time-varying, enabling content-aware filtering. Delta controls the gate-like forget/focus tradeoff (Theorem 1 shows equivalence to classical RNN gating when N=1).</li>
          <li><strong>Hardware-Aware Algorithm:</strong> Since selection breaks the convolution mode, a custom parallel scan algorithm exploits GPU memory hierarchy. SSM parameters are loaded from HBM to SRAM, discretization + scan performed in SRAM, only final output written back. This avoids materializing the O(BLDN) intermediate state, achieving the same memory as FlashAttention.</li>
          <li><strong>Simplified Architecture:</strong> Combines the H3 SSM block with the Transformer's MLP block into a single homogeneous Mamba block (Conv -> SSM -> gated output), eliminating the need for separate attention and MLP layers.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>First SSM to achieve <strong>Transformer-quality language modeling</strong> — Mamba-3B matches Pythia-7B on downstream tasks</li>
          <li>Linear-time scaling with <strong>5x inference throughput</strong> over Transformers (no KV cache needed)</li>
          <li>Performance improves with context length up to <strong>1M tokens</strong> on DNA sequences</li>
          <li>Solves Induction Heads perfectly and <strong>extrapolates to 4000x training length</strong></li>
          <li>State-of-the-art on audio generation (SC09): reduces FID by more than half vs. SaShiMi</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Training follows the GPT-3/Chinchilla protocol on the Pile dataset with GPT-NeoX tokenizer. Model sizes: 130M to 2.8B parameters (matching GPT-3 specs). Training: 300B tokens, AdamW optimizer, cosine LR decay. The "improved recipe" (Transformer++) uses RoPE, SwiGLU, RMSNorm, no bias, higher LR. Mamba uses E=2 expansion factor, SiLU activation, real-valued SSM with S4D-Real initialization.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Model</th><th>Params</th><th>Pile PPL</th><th>Avg Downstream Acc</th></tr>
          <tr><td>Pythia-1.4B</td><td>1.4B</td><td>7.51</td><td>55.2%</td></tr>
          <tr><td>RWKV-1.5B</td><td>1.5B</td><td>7.70</td><td>54.3%</td></tr>
          <tr><td><strong>Mamba-1.4B</strong></td><td>1.4B</td><td><strong>6.80</strong></td><td><strong>59.7%</strong></td></tr>
          <tr><td>Pythia-2.8B</td><td>2.8B</td><td>6.73</td><td>59.1%</td></tr>
          <tr><td><strong>Mamba-2.8B</strong></td><td>2.8B</td><td><strong>6.22</strong></td><td><strong>63.3%</strong></td></tr>
        </table>
        <p>Mamba-2.8B surpasses Pythia-2.8B on all 7 downstream tasks and approaches GPT-J-6B (63.0% avg). On DNA, Mamba matches Transformer++/HyenaDNA with 3-4x fewer parameters. On audio SC09, small Mamba (6.1M) achieves FID 0.94 vs. SaShiMi's 1.99 and DiffWave+SaShiMi's 1.42.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant theoretical insight: selection as the missing ingredient for SSMs on discrete data, with clean connection to RNN gating (Theorem 1)</li>
          <li>Hardware-aware implementation makes the theoretical advantage practical: 40x faster scan than naive PyTorch, faster than FlashAttention-2 beyond 2K length</li>
          <li>Simplicity of the architecture: a single repeated block with no attention mechanism</li>
          <li>Comprehensive evaluation across language, DNA, and audio — not just one modality</li>
          <li>Strong ablation studies isolating contributions of selection, architecture, and initialization</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Evaluation limited to models up to 2.8B parameters — unclear if advantages persist at 7B+ scale</li>
          <li>No evaluation of downstream affordances (fine-tuning, RLHF, in-context learning, quantization)</li>
          <li>Real-valued SSMs work well for text but complex-valued still better for audio — no unified solution</li>
          <li>The continuous-discrete spectrum tradeoff means selection may hurt performance on continuous signals</li>
          <li>Custom CUDA kernels required for efficient implementation, limiting accessibility</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Does the selection mechanism effectively learn different "attention patterns" for different layers, and can these be interpreted?</li>
          <li>How does Mamba handle retrieval-intensive tasks where explicit key-value lookup (as in attention) seems necessary?</li>
          <li>Could hybrid Mamba-attention architectures get the best of both worlds for different parts of the input?</li>
          <li>What happens to Mamba's advantages when combined with techniques like mixture-of-experts or sparse activations?</li>
          <li>How would Mamba perform on multimodal tasks requiring cross-modal attention?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>Mamba is a landmark paper that proves sub-quadratic architectures can compete with Transformers on their home turf (language). The key innovation — making SSM parameters input-dependent — is deceptively simple but required the hardware-aware algorithm to make it practical. Read this paper for: (1) understanding why LTI models fail on discrete data, (2) the elegant connection between SSM discretization and RNN gating, and (3) a masterclass in co-designing algorithms with hardware constraints. The open question is whether Mamba's advantages hold at frontier scale (70B+), which subsequent work (Mamba-2, Jamba) has begun to address.</p>
      `
    },
    ko: {
      title: "Mamba: 선택적 상태 공간을 이용한 선형 시간 시퀀스 모델링",
      summary: "SSM 매개변수를 입력 의존적으로 만드는 선택적 상태 공간 모델(S6)을 도입하여, 선형 시간 스케일링과 5배 추론 처리량으로 트랜스포머 수준의 언어 모델링을 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>Mamba는 구조적 상태 공간 모델에 <strong>입력 의존 선택</strong>을 도입하여 시퀀스 모델의 표현력과 효율성 간 근본적 절충을 깨뜨리며, 선형 시간 계산을 유지하면서 콘텐츠 기반 추론을 가능하게 합니다 — 대규모에서 트랜스포머 품질에 부합하는 최초의 부이차 아키텍처입니다.</p>

        <h2>연구 질문</h2>
        <blockquote>입력 의존적(선택적) 동역학을 도입하여 구조적 상태 공간 모델을 언어와 같은 이산적이고 정보 밀도가 높은 모달리티에 충분히 표현력 있게 만들면서, 선형 시간 계산 효율성을 유지할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>파운데이션 모델은 이차 어텐션 메커니즘이 컨텍스트 길이와 추론 속도를 제한하는 트랜스포머가 지배합니다. 구조적 SSM(S4 계열)은 선형 스케일링을 제공하고 연속 신호(오디오, 비전)에 뛰어나지만 텍스트 같은 이산 모달리티에서 실패합니다. 저자들은 이 실패가 선형 시불변(LTI) 제약에서 비롯됨을 식별합니다.</p>
        <p>핵심 통찰은 시퀀스 모델링이 근본적으로 <strong>컨텍스트를 더 작은 상태로 압축</strong>하는 것이라는 점입니다. Mamba는 선택 메커니즘을 통해 상태 동역학을 입력 의존적으로 만들어 둘 다 달성합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <ul>
          <li><strong>선택 메커니즘:</strong> Delta, B, C 매개변수가 학습된 투영을 통해 입력 x의 함수가 됨. 콘텐츠 인식 필터링 가능.</li>
          <li><strong>하드웨어 인식 알고리즘:</strong> 선택이 컨볼루션 모드를 깨뜨리므로, GPU 메모리 계층을 활용하는 커스텀 병렬 스캔 알고리즘 설계.</li>
          <li><strong>단순화된 아키텍처:</strong> H3 SSM 블록과 트랜스포머의 MLP 블록을 단일 균질 Mamba 블록으로 결합.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li><strong>트랜스포머 수준 언어 모델링</strong>을 달성한 최초의 SSM — Mamba-3B가 다운스트림 작업에서 Pythia-7B에 부합</li>
          <li>트랜스포머 대비 <strong>5배 추론 처리량</strong>의 선형 시간 스케일링 (KV 캐시 불필요)</li>
          <li>DNA 시퀀스에서 <strong>100만 토큰</strong>까지 컨텍스트 길이에 따라 성능 향상</li>
          <li>Induction Heads를 완벽하게 풀고 <strong>훈련 길이의 4000배까지 외삽</strong></li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>GPT-3/Chinchilla 프로토콜을 따라 Pile 데이터셋에서 훈련. 모델 크기: 130M~2.8B 매개변수. 300B 토큰 훈련, AdamW 옵티마이저, 코사인 LR 감쇠. E=2 확장 인자, SiLU 활성화, S4D-Real 초기화의 실수값 SSM 사용.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>모델</th><th>매개변수</th><th>Pile PPL</th><th>평균 다운스트림 정확도</th></tr>
          <tr><td>Pythia-1.4B</td><td>1.4B</td><td>7.51</td><td>55.2%</td></tr>
          <tr><td><strong>Mamba-1.4B</strong></td><td>1.4B</td><td><strong>6.80</strong></td><td><strong>59.7%</strong></td></tr>
          <tr><td>Pythia-2.8B</td><td>2.8B</td><td>6.73</td><td>59.1%</td></tr>
          <tr><td><strong>Mamba-2.8B</strong></td><td>2.8B</td><td><strong>6.22</strong></td><td><strong>63.3%</strong></td></tr>
        </table>

        <h2>강점</h2>
        <ul>
          <li>우아한 이론적 통찰: 이산 데이터에서 SSM의 누락 요소로서의 선택, RNN 게이팅과의 깔끔한 연결(정리 1)</li>
          <li>하드웨어 인식 구현이 이론적 장점을 실용적으로 만듦</li>
          <li>어텐션 메커니즘 없는 단일 반복 블록의 아키텍처 단순성</li>
          <li>언어, DNA, 오디오에 걸친 포괄적 평가</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>2.8B 매개변수까지만 평가 — 7B+ 규모에서 장점 지속 불확실</li>
          <li>다운스트림 어포던스(미세조정, RLHF, 인컨텍스트 학습) 미평가</li>
          <li>연속-이산 스펙트럼 절충: 선택이 연속 신호 성능을 저해할 수 있음</li>
          <li>효율적 구현에 커스텀 CUDA 커널 필요, 접근성 제한</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>선택 메커니즘이 효과적으로 각 레이어에서 다른 "어텐션 패턴"을 학습하며 해석 가능한가?</li>
          <li>명시적 키-값 조회가 필요해 보이는 검색 집약적 작업에서 Mamba는 어떻게 처리하는가?</li>
          <li>하이브리드 Mamba-어텐션 아키텍처가 입력의 다른 부분에 대해 양쪽의 장점을 얻을 수 있을까?</li>
          <li>Mamba가 멀티모달 작업에서 어떻게 수행될까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>Mamba는 부이차 아키텍처가 트랜스포머의 본거지(언어)에서 경쟁할 수 있음을 증명하는 획기적 논문입니다. SSM 매개변수를 입력 의존적으로 만드는 핵심 혁신은 기만적으로 단순하지만 실용화를 위해 하드웨어 인식 알고리즘이 필요했습니다. 이 논문을 읽어야 하는 이유: (1) LTI 모델이 이산 데이터에서 실패하는 이유 이해, (2) SSM 이산화와 RNN 게이팅 간의 우아한 연결, (3) 알고리즘과 하드웨어 제약의 공동 설계 마스터클래스.</p>
      `
    }
  },

  // ====================================================================
  // 5. Soliton Spectral Walls
  // ====================================================================
  {
    id: "soliton-spectral-walls",
    date: "2025-04-11",
    authors: "Adam, C., Oles, K., Romanczukiewicz, T., Wereszczynski, A.",
    venue: "PRL 2019",
    image: "images/soliton-spectral-walls/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Physics", "Solitons", "Spectral Structure", "Field Theory"],
    en: {
      title: "Spectral Walls in Soliton Collisions",
      summary: "Discovers spectral walls — spatially localized barriers where bound modes enter the continuum — in soliton-impurity scattering, using BPS-impurity phi^4 theory to isolate the phenomenon from inter-soliton forces.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This letter discovers a universal phenomenon in soliton physics: <strong>spectral walls</strong> — spatially localized barriers at which a soliton's internal mode disappears into the continuous spectrum, causing hard-wall reflection or trapping of the soliton even when no static force exists between the colliding objects.</p>

        <h2>Research Question</h2>
        <blockquote>What happens to soliton scattering dynamics when a bound oscillational mode disappears into the continuous spectrum before the solitons themselves collide, and can this effect be isolated from inter-soliton static forces?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Understanding soliton interactions in non-integrable field theories remains a challenging open problem. The phi^4 model exhibits chaotic kink-antikink scattering with fractal-like bounce windows, attributed to energy exchange between translational and vibrational (bound) modes. However, analytical approaches via collective coordinate methods (CCM) face fundamental problems: the separated kink-antikink pair is not a static solution, modes are ill-defined for non-static configurations, and at collision the solitons vanish (zero vector problem).</p>
        <p>The key insight is that bound modes actually disappear into the continuum <em>before</em> collision. This structural change in the spectral properties is non-perturbative and cannot be captured by standard CCM. The authors use BPS-impurity models — where static inter-soliton forces vanish — to cleanly isolate this spectral effect from other interactions.</p>

        <h2>Architecture / Methodology</h2>
        <p>The BPS-impurity phi^4 model (Lagrangian in Eq. 1) with impurity sigma = alpha/cosh^2(x) admits a one-parameter family of static BPS antikink solutions parameterized by position a on the moduli space. The spectral structure (Eq. 3) is well-defined for all a, unlike the standard phi^4 case. Two regimes are studied:</p>
        <ul>
          <li><strong>alpha = 0.3:</strong> One discrete mode exists for all a; frequency increases as antikink approaches impurity but never enters the continuum</li>
          <li><strong>alpha = 3.0:</strong> At critical separation a_cr = 1.68, the discrete mode enters the continuous spectrum, becoming a quasinormal mode (omega = 3.72 + 0.11i at a = 0)</li>
        </ul>
        <p>The CCM effective Lagrangian (Eq. 5) contains integrals I1, I2 that diverge at a_cr because the mode becomes non-normalizable — signaling the breakdown of the effective model and the presence of the spectral wall.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>Discovery of <strong>spectral walls</strong> as a universal phenomenon surrounding solitons with internal modes</li>
          <li>Clean isolation using BPS-impurity models where static forces vanish, removing confounding effects</li>
          <li>Identification that the bound-to-quasinormal mode transition creates spatially localized barriers</li>
          <li>Linear scaling law for bounce condition: A ~ 1.70v at small velocity</li>
          <li>Demonstration that quasinormal modes can trap solitons between walls via multiple internal reflections</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Full PDE numerical simulations of the BPS-impurity phi^4 model compared with predictions from the two-coordinate effective model (position a, mode amplitude A). Bogomolny equation (Eq. 2) solved for BPS antikink solutions. Eigenvalue problem (Eq. 3) solved for spectral structure at each moduli space position. Quasinormal mode frequency determined using Prone's method.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>alpha</th><th>Behavior</th><th>CCM vs PDE agreement</th></tr>
          <tr><td>0.3</td><td>Smooth passage through impurity; turning point varies smoothly with amplitude</td><td>~1% at v=0.01</td></tr>
          <tr><td>3.0</td><td>Hard-wall reflection at a_cr=1.68; trapping between symmetric walls; multiple internal reflections</td><td>~3.6% at v=0.05</td></tr>
        </table>
        <p>For alpha = 3, solitons with excited internal modes bounce from the spectral wall. Below a critical amplitude, the soliton can penetrate one wall but reflects from the symmetric wall behind the impurity, sometimes bouncing multiple times internally before escaping. The quasinormal mode prevents immediate energy emission after the mode enters the continuum.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Identifies a genuinely new physical phenomenon with clean theoretical explanation</li>
          <li>BPS framework elegantly eliminates inter-soliton forces, isolating the spectral effect</li>
          <li>Quantitative agreement between effective model and full PDE simulations validates the mechanism</li>
          <li>Broad implications for soliton physics in any non-integrable theory with internal modes</li>
          <li>Concise PRL-format presentation that clearly conveys the essential physics</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Only studied in (1+1) dimensions; extension to higher dimensions (e.g., Abelian Higgs vortices) is suggested but not demonstrated</li>
          <li>Limited to weak excitations (small mode amplitude A); nonlinear frequency shifts for large A cause wall position to change</li>
          <li>The spectral wall phenomenon may be hard to observe in non-BPS systems where it mixes with strong static inter-soliton forces</li>
          <li>No systematic study of the multi-mode case where different modes enter the continuum at different positions</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could spectral walls be observed experimentally in condensed matter systems with soliton-like excitations?</li>
          <li>How does the spectral wall phenomenon interact with quantum effects in soliton scattering?</li>
          <li>Could this mechanism explain some of the fine structure in the fractal bounce windows of standard phi^4 kink-antikink collisions?</li>
          <li>What is the spectral wall analog in (2+1)D vortex scattering at critical coupling?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This elegant letter identifies a fundamental mechanism — the spectral wall — that had been hiding in plain sight within soliton physics. The use of BPS-impurity models to isolate the effect from confounding inter-soliton forces is a beautiful theoretical strategy. The key message is that the <strong>disappearance of bound modes into the continuum creates physical barriers</strong> that dramatically alter soliton dynamics, even in the absence of static forces. This has implications for understanding kink-antikink scattering, vortex dynamics, and potentially for any physical system where localized modes interact with a continuum.</p>
      `
    },
    ko: {
      title: "솔리톤 충돌에서의 스펙트럼 벽",
      summary: "BPS-불순물 phi^4 이론에서 솔리톤-불순물 산란 시 속박 모드가 연속 스펙트럼에 진입하는 공간적으로 국소화된 장벽인 스펙트럼 벽을 발견합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>솔리톤 물리학의 보편적 현상인 <strong>스펙트럼 벽</strong>을 발견합니다 — 솔리톤의 내부 모드가 연속 스펙트럼으로 사라지는 공간적 국소 장벽으로, 충돌 객체 사이에 정적 힘이 없어도 솔리톤의 경벽 반사나 포획을 유발합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>솔리톤 자체가 충돌하기 전에 속박 진동 모드가 연속 스펙트럼으로 사라질 때 솔리톤 산란 동역학에 무슨 일이 발생하며, 이 효과를 솔리톤 간 정적 힘으로부터 분리할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>비적분가능 장 이론에서의 솔리톤 상호작용 이해는 여전히 어려운 미해결 문제입니다. phi^4 모델은 프랙탈 유사 바운스 창을 가진 혼돈적 킹크-안티킹크 산란을 보여주며, 이는 병진 및 진동 모드 간 에너지 교환에 기인합니다. 핵심 통찰은 속박 모드가 실제로 충돌 <em>전에</em> 연속체로 사라진다는 것입니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>불순물 sigma = alpha/cosh^2(x)을 가진 BPS-불순물 phi^4 모델은 모듈리 공간에서 위치 a로 매개변수화된 정적 BPS 안티킹크 해 1매개변수 족을 허용합니다. alpha = 0.3(모드 항상 존재)과 alpha = 3.0(임계 분리 a_cr = 1.68에서 모드가 연속체 진입) 두 경우를 연구합니다.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>내부 모드를 가진 솔리톤을 둘러싸는 보편적 현상으로서의 <strong>스펙트럼 벽</strong> 발견</li>
          <li>정적 힘이 사라지는 BPS-불순물 모델을 사용한 깔끔한 분리</li>
          <li>속박-준정규 모드 전이가 공간 국소 장벽을 생성함을 식별</li>
          <li>바운스 조건의 선형 스케일링 법칙: A ~ 1.70v</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>BPS-불순물 phi^4 모델의 전체 PDE 수치 시뮬레이션을 2좌표 유효 모델 예측과 비교. Bogomolny 방정식으로 BPS 안티킹크 해 구함. 각 모듈리 공간 위치에서 고유값 문제로 스펙트럼 구조 구함. 준정규 모드 주파수는 Prone 방법으로 결정.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>alpha</th><th>거동</th><th>CCM vs PDE 일치</th></tr>
          <tr><td>0.3</td><td>매끄러운 통과; 진폭에 따라 전환점이 부드럽게 변화</td><td>v=0.01에서 ~1%</td></tr>
          <tr><td>3.0</td><td>a_cr=1.68에서 경벽 반사; 대칭 벽 사이 포획; 다중 내부 반사</td><td>v=0.05에서 ~3.6%</td></tr>
        </table>

        <h2>강점</h2>
        <ul>
          <li>깔끔한 이론적 설명을 가진 진정으로 새로운 물리적 현상 식별</li>
          <li>BPS 프레임워크가 솔리톤 간 힘을 우아하게 제거하여 스펙트럼 효과 분리</li>
          <li>유효 모델과 전체 PDE 시뮬레이션 간 정량적 일치로 메커니즘 검증</li>
          <li>내부 모드를 가진 비적분가능 이론 전반에 대한 광범위한 함의</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>(1+1)차원에서만 연구; 고차원 확장은 제안되었으나 미실증</li>
          <li>약한 여기(작은 모드 진폭 A)에 제한; 큰 A에서 비선형 주파수 이동으로 벽 위치 변화</li>
          <li>비BPS 시스템에서 강한 정적 솔리톤간 힘과 혼합되어 관측이 어려울 수 있음</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>솔리톤 유사 여기를 가진 응축물질 시스템에서 스펙트럼 벽을 실험적으로 관측할 수 있을까?</li>
          <li>스펙트럼 벽 현상은 솔리톤 산란에서 양자 효과와 어떻게 상호작용하는가?</li>
          <li>이 메커니즘이 표준 phi^4 킹크-안티킹크 충돌의 프랙탈 바운스 창 미세 구조를 설명할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>이 우아한 레터는 솔리톤 물리학에서 눈에 띄지 않게 숨어있던 근본적 메커니즘 — 스펙트럼 벽 — 을 식별합니다. 핵심 메시지는 <strong>속박 모드의 연속체로의 소멸이 정적 힘이 없어도 솔리톤 동역학을 극적으로 변경하는 물리적 장벽을 생성</strong>한다는 것입니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. Cosmological Bispectrum
  // ====================================================================
  {
    id: "cosmo-bispectrum",
    date: "2025-04-11",
    authors: "Yankelevich, V., Porciani, C.",
    venue: "MNRAS 2019",
    image: "images/cosmo-bispectrum/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Physics", "Cosmology", "Bispectrum", "Fisher Matrix"],
    en: {
      title: "Cosmological Information in the Redshift-Space Bispectrum",
      summary: "Uses Fisher-matrix formalism to assess whether the galaxy bispectrum in redshift space adds cosmological information beyond the power spectrum for a Euclid-like survey, finding moderate gains that largely vanish with Planck priors.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A thorough Fisher-matrix forecast showing that the galaxy bispectrum in redshift space provides <strong>similar but slightly weaker</strong> cosmological constraints compared to the power spectrum for a Euclid-like survey, with the main benefit being a 2.6x dark-energy FoM improvement when combined — an advantage that largely disappears once Planck CMB priors are included, leaving precise galaxy bias determination as the primary payoff.</p>

        <h2>Research Question</h2>
        <blockquote>Does the galaxy bispectrum in redshift space contain additional cosmological information beyond the power spectrum for constraining dark energy and standard cosmological parameters in next-generation surveys like Euclid?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The bispectrum (Fourier transform of the three-point correlation function) has traditionally been used to constrain galaxy bias and primordial non-Gaussianity. With next-generation surveys like Euclid providing unprecedented volumes and galaxy densities, the bispectrum will be measured robustly for the first time. The key question is whether it adds cosmological constraining power beyond the well-studied power spectrum, particularly for dark energy equation-of-state parameters. This work generalizes previous analyses by considering the full redshift-space bispectrum (not just the monopole), dynamical dark energy models, and state-of-the-art tidal bias expansions.</p>

        <h2>Architecture / Methodology</h2>
        <p>Fisher information matrix analysis with: tree-level SPT for power spectrum and bispectrum in redshift space with Gaussian FoG damping; Eulerian non-linear and non-local bias model (b1, b2, b_s2); 14 redshift bins from z=0.7 to z=2.0; three cosmological models (LCDM, wCDM, w0waCDM); cross-covariance C_PB between P and B computed for the first time with angular binning of triangle orientations; Planck priors from MCMC chains. Key advance: generalized cross-covariance formula (Eq. 42) accounting for triangle orientation binning relative to the line of sight.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>First derivation of the <strong>P-B cross-covariance with angular binning</strong> of triangle orientations (Eq. 42)</li>
          <li>Comprehensive Fisher forecast for LCDM, wCDM, w0waCDM with full redshift-space bispectrum</li>
          <li>Demonstrates that using only the bispectrum monopole loses ~30% information per parameter</li>
          <li>Shows the P-B cross-covariance has negligible impact at k < 0.15 h/Mpc, validating prior studies</li>
          <li>Quantifies that the bispectrum's main value with Planck priors is precise galaxy bias measurement</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Euclid-like survey: 15,000 deg^2, z=0.7-2.0, H-alpha emitters. k_max = 0.15 h/Mpc. Angular bins: N_p=4, N_a=2 (8 orientation bins per triangle shape). Up to 65,500 bispectrum bins per redshift. 61-63 total parameters (5-7 cosmological + 56 nuisance: 3 bias + sigma_p per z-bin). Halo occupation model calibrated to match Pozzetti et al. (2016) luminosity function.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Metric</th><th>P only</th><th>B only</th><th>P+B</th><th>P+B+Planck</th></tr>
          <tr><td>FoM(w0,wa)</td><td>6.66</td><td>3.03</td><td>17.43</td><td>162.49</td></tr>
          <tr><td>sigma(w0) x10</td><td>2.85</td><td>4.47</td><td>2.13</td><td>0.838</td></tr>
          <tr><td>sigma(wa)</td><td>1.40</td><td>1.83</td><td>0.79</td><td>0.329</td></tr>
        </table>
        <p>The P+B combination improves the dark energy FoM by 2.6x over P alone. However, with Planck priors, the improvement drops to only 11%. The bispectrum's primary value becomes breaking the b1-amplitude degeneracy: linear bias errors shrink by factors of 2-3 when combining P and B.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Rigorous and comprehensive analysis with careful treatment of redshift-space effects and angular binning</li>
          <li>Novel cross-covariance derivation that generalizes previous results</li>
          <li>Honest assessment: clearly states when the bispectrum does NOT help much</li>
          <li>Detailed investigation of binning strategy, k_max dependence, and shot noise effects</li>
          <li>State-of-the-art bias model including tidal bias term</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Tree-level perturbation theory limits k_max to 0.15 h/Mpc; higher-order corrections could change conclusions</li>
          <li>Gaussian covariance approximation may underestimate errors on mildly non-linear scales</li>
          <li>Neglects Alcock-Paczynski effect and detailed survey geometry</li>
          <li>Assumes Gaussian primordial perturbations; non-Gaussianity would strengthen the bispectrum case</li>
          <li>Fisher matrix assumes Gaussian posterior — may miss non-linear parameter degeneracies</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the conclusions change if effective field theory methods extended k_max to 0.3 h/Mpc?</li>
          <li>Could bispectrum information be more efficiently captured through compressed statistics or machine learning?</li>
          <li>How sensitive are the results to the assumption of local Lagrangian tidal bias (Eq. 43)?</li>
          <li>Would the bispectrum become more valuable for surveys targeting primordial non-Gaussianity?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper delivers a sobering but important message: the bispectrum's cosmological constraining power on standard parameters is <strong>similar to, not dramatically better than</strong>, the power spectrum. The main benefit is breaking bias-cosmology degeneracies, which becomes less important once CMB priors are available. The bispectrum's true value may lie in non-Gaussian signatures, modified gravity tests, or higher k_max analyses — areas that require going beyond this paper's scope. Read this paper for its careful methodology and honest assessment of what three-point statistics can and cannot deliver.</p>
      `
    },
    ko: {
      title: "적색편이 공간 바이스펙트럼의 우주론적 정보",
      summary: "Fisher 행렬 형식주의를 사용하여 Euclid 유사 관측에서 은하 바이스펙트럼이 파워 스펙트럼 너머의 우주론적 정보를 추가하는지 평가하며, Planck 사전확률 적용 시 대부분 사라지는 완만한 이득을 발견합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>적색편이 공간의 은하 바이스펙트럼이 Euclid 유사 관측에서 파워 스펙트럼과 <strong>유사하지만 약간 약한</strong> 우주론적 제약을 제공함을 보여주는 철저한 Fisher 행렬 예측으로, 결합 시 암흑에너지 FoM 2.6배 향상이 주요 이점이나 Planck CMB 사전확률 포함 시 대부분 사라져 정밀한 은하 편향 결정이 주요 보상으로 남습니다.</p>

        <h2>연구 질문</h2>
        <blockquote>적색편이 공간의 은하 바이스펙트럼이 Euclid 같은 차세대 관측에서 암흑에너지와 표준 우주론적 매개변수 제약에 파워 스펙트럼 너머의 추가적 우주론적 정보를 포함하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>바이스펙트럼은 전통적으로 은하 편향과 원시 비가우시안성 제약에 사용되어 왔습니다. Euclid 같은 차세대 관측이 전례 없는 체적과 은하 밀도를 제공하면서 바이스펙트럼이 처음으로 강건하게 측정될 것입니다. 본 연구는 전체 적색편이 공간 바이스펙트럼(단극자만이 아닌), 동적 암흑에너지 모델, 최신 조석 편향 확장을 고려하여 이전 분석을 일반화합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>트리 수준 SPT의 적색편이 공간 파워 스펙트럼 및 바이스펙트럼, 오일러 비선형 비국소 편향 모델, z=0.7-2.0의 14개 적색편이 빈, 세 우주론적 모델(LCDM, wCDM, w0waCDM)에 대한 Fisher 정보 행렬 분석. 삼각형 방향의 각도 비닝을 고려한 P-B 교차 공분산의 최초 도출(Eq. 42)이 핵심 진전입니다.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>삼각형 방향의 <strong>각도 비닝을 포함한 P-B 교차 공분산</strong>의 최초 도출</li>
          <li>전체 적색편이 공간 바이스펙트럼으로 LCDM, wCDM, w0waCDM에 대한 포괄적 Fisher 예측</li>
          <li>바이스펙트럼 단극자만 사용 시 매개변수당 ~30% 정보 손실 실증</li>
          <li>Planck 사전확률과 함께 바이스펙트럼의 주요 가치가 정밀한 은하 편향 측정임을 정량화</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>Euclid 유사 관측: 15,000 deg^2, z=0.7-2.0. k_max = 0.15 h/Mpc. 적색편이 빈당 최대 65,500 바이스펙트럼 빈. 총 61-63 매개변수(5-7 우주론적 + 56 부수적).</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>지표</th><th>P만</th><th>B만</th><th>P+B</th><th>P+B+Planck</th></tr>
          <tr><td>FoM(w0,wa)</td><td>6.66</td><td>3.03</td><td>17.43</td><td>162.49</td></tr>
        </table>
        <p>P+B 결합이 P만 대비 암흑에너지 FoM을 2.6배 향상시킵니다. 그러나 Planck 사전확률 적용 시 향상은 11%로 감소합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>적색편이 공간 효과와 각도 비닝의 주의 깊은 처리를 포함한 엄격하고 포괄적인 분석</li>
          <li>이전 결과를 일반화하는 새로운 교차 공분산 도출</li>
          <li>바이스펙트럼이 크게 도움이 되지 않는 경우를 명확히 밝히는 정직한 평가</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>트리 수준 섭동론이 k_max를 0.15 h/Mpc로 제한</li>
          <li>가우시안 공분산 근사가 약하게 비선형인 스케일에서 오차를 과소평가할 수 있음</li>
          <li>Alcock-Paczynski 효과와 상세 관측 기하학 무시</li>
          <li>가우시안 원시 섭동 가정; 비가우시안성은 바이스펙트럼 사례를 강화할 것</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>유효 장론 방법이 k_max를 0.3 h/Mpc로 확장하면 결론이 어떻게 바뀔까?</li>
          <li>바이스펙트럼 정보를 압축 통계량이나 머신러닝으로 더 효율적으로 포착할 수 있을까?</li>
          <li>원시 비가우시안성 대상 관측에서 바이스펙트럼이 더 가치있어질까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>바이스펙트럼의 표준 매개변수에 대한 우주론적 제약력은 파워 스펙트럼과 <strong>유사하며, 극적으로 우월하지 않다</strong>는 냉정하지만 중요한 메시지를 전달합니다. 주요 이점은 편향-우주론 퇴화를 깨는 것이며, CMB 사전확률이 사용 가능하면 덜 중요해집니다.</p>
      `
    }
  },

  // ====================================================================
  // 7. Optimal Transport HJB
  // ====================================================================
  {
    id: "optimal-transport-hjb",
    date: "2025-04-11",
    authors: "Yang, H., Krishnan, V., Sinha, S., Mahadevan, L.",
    venue: "Preprint 2025",
    image: "images/optimal-transport-hjb/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Deep Learning", "Optimal Transport", "Generative Model", "HJB"],
    en: {
      title: "Generative Optimal Transport via Forward-Backward HJB Matching",
      summary: "Proposes a generative transport framework grounded in stochastic optimal control, where a scalar potential solving a forward HJB equation is learned from forward diffusion trajectories via Feynman-Kac path integrals, enabling trajectory-optimal generation with spatial cost geometry.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A principled framework that resolves the circular dependency in generative transport by establishing a <strong>forward-backward HJB duality</strong>: the hard backward control problem is solved by learning a scalar potential from easy-to-simulate forward relaxation trajectories via the Feynman-Kac formula, yielding physically interpretable generation through path-space free energy minimization.</p>

        <h2>Research Question</h2>
        <blockquote>How can we formulate generative modeling as a stochastic optimal control problem that learns trajectory-optimal transport from a reference distribution to data, using only forward-time simulation and without explicit score estimation or backward SDE construction?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Score-matching diffusion models estimate backward-time drifts without optimizing a global trajectory cost. Flow matching aligns marginals but lacks trajectory-dependent bounds. Schrodinger bridges operate on macroscopic endpoints. None directly trace physical optimality to continuous-time trajectory costs. This work formulates generation as minimum-work stochastic transport with a pathwise cost combining spatial penalties nu(x) and control effort, solved through Hamilton-Jacobi-Bellman (HJB) theory.</p>
        <p>The circular dependency problem: computing the optimal backward process requires samples from the target distribution — the very thing being constructed. The resolution is a time-reversal duality (Theorem 2.2) showing that the backward value function satisfies a forward HJB equation solvable from forward relaxation trajectories (data to noise).</p>

        <h2>Architecture / Methodology</h2>
        <p>The framework has three key components:</p>
        <ul>
          <li><strong>Dual Variational Principle (Lemma 2.1):</strong> Optimal control u* = -1/gamma * grad(U) where U solves HJB equation with running cost nu(x) and quadratic control penalty</li>
          <li><strong>Forward-Backward Duality (Theorem 2.2):</strong> W(s,x) := -U(1-s,x) satisfies a forward HJB, enabling training from forward OU trajectories without backward simulation</li>
          <li><strong>Feynman-Kac Estimation:</strong> Cole-Hopf transform W = (1/beta)*log(Z) linearizes the HJB into a diffusion-absorption PDE, with Z computable as a path integral over forward trajectories weighted by exp(-beta * integral of nu)</li>
        </ul>
        <p>Training loss combines Feynman-Kac regression (global path consistency), local one-step consistency, and a Kantorovich dual boundary loss. Generation proceeds by integrating the time-reversed controlled diffusion with the learned grad(W).</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>Forward-backward HJB duality theorem resolving the circular dependency in generative optimal control</li>
          <li>Spatial cost function nu(x) as a "refractive index" shaping transport geometry (stochastic Fermat's principle)</li>
          <li>Risk-sensitive interpretation: value function encodes expected cost + variance, with gamma controlling the tradeoff</li>
          <li>Demonstrated on 2D benchmarks (4 Gaussians, 2 Moons, Swiss Roll) and MNIST (784D)</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>2D: 10-layer MLP, 64 hidden units, GeLU, sinusoidal time embeddings. OU process D=0.05, beta=0.1, T=128 steps. 2000 epochs, N=4096 samples, Adam lr=1e-3, JAX. MNIST: Conv U-Net [32,64,128,256], GroupNorm, Gaussian Fourier time embeddings. D=0.01, theta=5.0, 200 epochs, batch 1024, Adam lr=1e-4, PyTorch.</p>

        <h2>Results</h2>
        <p>On 2D benchmarks, the learned potential W(t,x) develops structured basins aligned with target geometry (four wells for 4 Gaussians, arc-shaped troughs for 2 Moons, spiraling channel for Swiss Roll). The spatial cost experiments demonstrate clear refraction effects: convex nu creates diverging paths (barrier), concave nu creates converging paths (lens). On MNIST, a coherent propagating potential bump emerges along test trajectories after 200 epochs training, demonstrating generalization beyond training samples.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant theoretical framework with clean forward-backward symmetry and physical interpretability</li>
          <li>Eliminates explicit score estimation and backward SDE simulation</li>
          <li>Spatial cost function provides powerful, interpretable geometric control over generation</li>
          <li>Natural variance control from the stochastic optimal control formulation without extra regularization</li>
          <li>Unifying connections to Schrodinger bridges, Jarzynski equality, and non-equilibrium stat mech</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Only demonstrated on relatively simple 2D benchmarks and MNIST — no comparison with state-of-the-art on complex datasets</li>
          <li>No quantitative generation metrics (FID, IS) reported</li>
          <li>PDE residual validation and path variance analysis deferred to future work</li>
          <li>Scalability to high-dimensional data beyond MNIST not yet established</li>
          <li>The Feynman-Kac estimator may have high variance in high dimensions</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the spatial cost nu(x) compare to classifier guidance in diffusion models for conditional generation?</li>
          <li>Could the framework handle physics-informed generation by setting nu(x) to penalize physics-violating states?</li>
          <li>What is the computational overhead of the three-part loss compared to standard flow matching?</li>
          <li>How would the framework handle multi-modal target distributions where the optimal transport plan is non-unique?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper presents a beautiful theoretical connection between stochastic optimal control, optimal transport, and generative modeling. The forward-backward HJB duality is the key insight: it transforms an intractable backward control problem into a tractable forward estimation problem. The spatial cost function as a "refractive index" for generation is particularly compelling for physics-informed applications. While the experimental validation is currently limited to proof-of-concept demonstrations, the theoretical foundations are strong and the framework opens exciting directions for trajectory-optimal, physics-aware generative modeling.</p>
      `
    },
    ko: {
      title: "순방향-역방향 HJB 매칭을 통한 생성적 최적 수송",
      summary: "확률적 최적 제어에 기반한 생성적 수송 프레임워크를 제안하며, 순방향 HJB 방정식을 푸는 스칼라 포텐셜을 Feynman-Kac 경로 적분을 통해 순방향 확산 궤적에서 학습하여 공간 비용 기하학으로 궤적 최적 생성을 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>순방향-역방향 HJB 이중성</strong>을 확립하여 생성적 수송의 순환 의존성을 해결합니다: 어려운 역방향 제어 문제를 Feynman-Kac 공식을 통해 쉽게 시뮬레이션할 수 있는 순방향 완화 궤적에서 스칼라 포텐셜을 학습함으로써 풀어, 경로 공간 자유 에너지 최소화를 통한 물리적으로 해석 가능한 생성을 산출합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>명시적 스코어 추정이나 역방향 SDE 구성 없이, 순방향 시간 시뮬레이션만으로 참조 분포에서 데이터로의 궤적 최적 수송을 학습하는 확률적 최적 제어 문제로 생성 모델링을 어떻게 공식화할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>스코어 매칭 확산 모델은 전역 궤적 비용을 최적화하지 않으며, 흐름 매칭은 궤적 의존 한계가 없고, 슈뢰딩거 브릿지는 거시적 끝점에서 작동합니다. 본 연구는 생성을 공간 페널티 nu(x)와 제어 노력을 결합한 경로별 비용의 최소 작업 확률적 수송으로 공식화합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <ul>
          <li><strong>이중 변분 원리:</strong> 최적 제어 u* = -1/gamma * grad(U), U는 HJB 방정식의 해</li>
          <li><strong>순방향-역방향 이중성 (정리 2.2):</strong> W(s,x) := -U(1-s,x)가 순방향 HJB를 만족하여 역방향 시뮬레이션 없이 훈련 가능</li>
          <li><strong>Feynman-Kac 추정:</strong> Cole-Hopf 변환으로 HJB를 선형화, Z를 순방향 궤적 위의 경로 적분으로 계산</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>생성적 최적 제어의 순환 의존성을 해결하는 순방향-역방향 HJB 이중성 정리</li>
          <li>수송 기하학을 형성하는 "굴절률"로서의 공간 비용 함수 nu(x) (확률적 페르마 원리)</li>
          <li>위험 민감 해석: 가치 함수가 기대 비용 + 분산을 인코딩</li>
          <li>2D 벤치마크와 MNIST(784D)에서 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>2D: 10층 MLP, 64 은닉 유닛, GeLU. OU 과정 D=0.05, 2000 에포크. MNIST: Conv U-Net [32,64,128,256], 200 에포크, PyTorch.</p>

        <h2>결과</h2>
        <p>2D 벤치마크에서 학습된 포텐셜이 대상 기하학에 정렬된 구조화된 분지를 발전시킵니다. 공간 비용 실험은 명확한 굴절 효과를 실증합니다. MNIST에서 훈련 후 테스트 궤적을 따라 일관된 전파 포텐셜 범프가 나타나 훈련 샘플 너머의 일반화를 실증합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>깔끔한 순방향-역방향 대칭성과 물리적 해석가능성을 가진 우아한 이론 프레임워크</li>
          <li>명시적 스코어 추정과 역방향 SDE 시뮬레이션 제거</li>
          <li>공간 비용 함수가 생성에 대한 강력하고 해석 가능한 기하학적 제어 제공</li>
          <li>슈뢰딩거 브릿지, 야르진스키 등식, 비평형 통계역학과의 통합적 연결</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>상대적으로 단순한 2D 벤치마크와 MNIST에서만 실증 — 최신 기법과의 비교 없음</li>
          <li>정량적 생성 지표(FID, IS) 미보고</li>
          <li>PDE 잔차 검증과 경로 분산 분석은 향후 연구로 미룸</li>
          <li>MNIST 이상의 고차원 데이터로의 확장성 미확립</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>공간 비용 nu(x)는 조건부 생성을 위한 확산 모델의 분류기 가이던스와 어떻게 비교되는가?</li>
          <li>물리 위반 상태에 패널티를 부여하는 nu(x)를 설정하여 물리 정보 생성을 처리할 수 있을까?</li>
          <li>다중 모달 대상 분포에서 최적 수송 계획이 비고유할 때 프레임워크는 어떻게 동작할까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>확률적 최적 제어, 최적 수송, 생성 모델링 간의 아름다운 이론적 연결을 제시합니다. 순방향-역방향 HJB 이중성이 핵심 통찰입니다. 실험적 검증은 개념 증명 수준이지만, 이론적 기초가 강하며 궤적 최적, 물리 인식 생성 모델링의 흥미로운 방향을 열어줍니다.</p>
      `
    }
  },

  // ====================================================================
  // 8. Generative Phase Space
  // ====================================================================
  {
    id: "generative-phase-space",
    date: "2025-04-11",
    authors: "Bogorad, Z., Elsharkawy, I., Kahn, Y.",
    venue: "Preprint 2026",
    image: "images/generative-phase-space/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Deep Learning", "Generative Model", "Phase Space", "Particle Physics"],
    en: {
      title: "Generative Models on Phase Space",
      summary: "Introduces q-space generative modeling — diffusion and flow matching confined to the Lorentz-invariant phase space manifold via the RAMBO map — ensuring exact energy-momentum conservation while learning distributions with soft/collinear singularities.",
      review: `
        <h2>One-line Verdict</h2>
        <p>By reparameterizing N-particle phase space through the RAMBO conformal map into an unconstrained auxiliary <strong>q-space</strong>, this paper enables diffusion and flow matching models that are exactly confined to the energy-momentum conservation manifold at every sampling step, with uniform phase space as the natural "pure noise" endpoint.</p>

        <h2>Research Question</h2>
        <blockquote>How can deep generative models (diffusion, flow matching) for high-energy physics data be constructed to exactly satisfy energy-momentum conservation at every step of the generative process, while learning distributions with physical singularity structure?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>High-energy physics data consists of collections of relativistic 4-vectors on the N-particle phase space manifold — a (3N-4)-dimensional submanifold of R^{3N}. Current generative models trained on momentum components approximately satisfy but never exactly enforce energy-momentum conservation. The RAMBO algorithm (1986) provides a conformal transformation trading phase space constraints for a specific distribution in an unconstrained auxiliary space. This paper exploits RAMBO to perform generative modeling entirely in this auxiliary q-space, with the constraint manifold enforced by construction.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>q-space Diffusion:</strong> Forward process targets pref(Q) = product of (q_I * e^{-q_I}) per particle instead of Gaussian noise. Score includes known drift toward pref. "Pure noise" maps to uniform phase space via RAMBO. Reverse process learns additional score correction.</li>
          <li><strong>q-space Flow Matching:</strong> Linear conditional paths between training q-space points and samples from prior. Uses fitted Gaussian prior (pref prior failed to train).</li>
          <li><strong>Data Augmentation:</strong> The P-to-Q map requires choosing boost b and rescaling x. Multiple strategies explored: identity, single fixed, multiple copies, continuous random augmentation — each with different performance tradeoffs.</li>
          <li><strong>Architecture:</strong> MLP for N=3; Point-Edge Transformer (PET) for N=10, with permutation equivariance.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li>First generative framework with <strong>exact energy-momentum conservation by construction</strong> at every sampling step</li>
          <li>Uniform phase space as physically meaningful "pure noise" for diffusion (maximum entropy on the Lorentz-invariant manifold)</li>
          <li>Successfully learns IRC-safe observable distributions (thrust/tau) even when singular low-energy tails are not fully captured</li>
          <li>Flow matching in q-space reproduces tau distributions over 9 orders of magnitude for N=10 APS matrix element</li>
          <li>Novel Boltzmann interpretation of the RAMBO algorithm as maximal-entropy sampling</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>N=3: 4-layer MLP, width 256, SiLU, 500 diffusion steps, 100 epochs, 500K training set, AdamW lr=1e-3. N=10: PET (8 transformer blocks, 128 latent dim), 5000 diffusion steps (100 Gaussian + 4900 q-space), 900K training events, 4x NVIDIA L40S GPUs for 6 hours. Training data: muon decay (analytic), e+e- -> qqbar g via MadGraph, APS matrix element via SARGE.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Model</th><th>Conservation Violation (E)</th><th>Conservation Violation (p)</th></tr>
          <tr><td>p-space diffusion</td><td>25.85%</td><td>12.64%</td></tr>
          <tr><td>p-space flow matching</td><td>0.94%</td><td>0.23%</td></tr>
          <tr><td>q-space diffusion</td><td>0 (exact)</td><td>0 (exact)</td></tr>
          <tr><td>q-space flow matching</td><td>0 (exact)</td><td>0 (exact)</td></tr>
        </table>
        <p>q-space flow matching matches ground-truth tau distributions over 9 orders of magnitude for the N=10 APS matrix element with xi_m=30, while exactly conserving energy-momentum. The q-space diffusion model correctly learns the tau distribution for tau > 0.05 across all cutoff values, demonstrating physical accuracy in the IRC-safe region.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Exact conservation by construction — not learned, not projected, not penalized</li>
          <li>Physically meaningful noise endpoint (uniform phase space) enables interpretable reverse process</li>
          <li>Drop-in replacement for any generative model on momentum data</li>
          <li>Novel theoretical connection: RAMBO as maximum-entropy Boltzmann sampling</li>
          <li>Careful analysis of data augmentation tradeoffs with geometric explanations</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Diffusion models struggle with very low-energy singular tails (though these are unphysical)</li>
          <li>Flow matching with uniform phase space prior (pref) fails to train — physical prior not yet usable for flow matching</li>
          <li>Data augmentation strategy significantly affects quality with no clear optimal choice</li>
          <li>Currently limited to massless particles; massive phase space would require different treatment</li>
          <li>Not yet tested on realistic jet data with O(200) particles</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could the q-space framework be extended to massive particles by modifying the RAMBO-like transformation?</li>
          <li>How does the data augmentation tradeoff change as N increases beyond 10?</li>
          <li>Could the diffusion reverse process trajectory be interpreted physically to study how jet structure emerges from noise?</li>
          <li>Would training directly on IRC-safe observables (rather than momentum components) improve singular-region performance?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper makes a simple but powerful observation: by performing generative modeling in RAMBO's auxiliary q-space rather than physical momentum space, exact conservation laws come for free. The framework is elegant, general, and immediately applicable. The most exciting aspect is the <strong>"physics for AI"</strong> direction: using the known structure of phase space (uniform distribution as noise, IRC safety, permutation invariance) as a testbed for understanding what generative models actually learn about hierarchical data. This positions particle physics data as a uniquely valuable domain for studying trustworthy generative AI.</p>
      `
    },
    ko: {
      title: "위상 공간에서의 생성 모델",
      summary: "RAMBO 맵을 통해 로렌츠 불변 위상 공간 다양체에 제한된 확산 및 흐름 매칭인 q-공간 생성 모델링을 도입하여, 연성/공선 특이성을 가진 분포를 학습하면서 정확한 에너지-운동량 보존을 보장합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>RAMBO 등각 맵을 통해 N입자 위상 공간을 비제약 보조 <strong>q-공간</strong>으로 재매개변수화하여, 모든 샘플링 단계에서 에너지-운동량 보존 다양체에 정확히 제한된 확산 및 흐름 매칭 모델을 가능하게 합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>물리적 특이성 구조를 가진 분포를 학습하면서 생성 과정의 모든 단계에서 에너지-운동량 보존을 정확히 만족하는 고에너지 물리학 데이터용 심층 생성 모델을 어떻게 구축할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>고에너지 물리학 데이터는 R^{3N}의 (3N-4)차원 부분다양체인 N입자 위상 공간 다양체 위의 상대론적 4벡터 컬렉션으로 구성됩니다. RAMBO 알고리즘(1986)은 위상 공간 제약을 비제약 보조 공간의 특정 분포로 교환하는 등각 변환을 제공합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <ul>
          <li><strong>q-공간 확산:</strong> 가우시안 노이즈 대신 pref(Q)를 타겟으로 하는 순방향 과정. "순수 노이즈"가 RAMBO를 통해 균일 위상 공간에 매핑.</li>
          <li><strong>q-공간 흐름 매칭:</strong> 훈련 q-공간 점과 사전 분포 샘플 간 선형 조건부 경로.</li>
          <li><strong>데이터 증강:</strong> P-to-Q 맵이 부스트 b와 재스케일링 x 선택을 요구. 다양한 전략의 성능 절충 탐색.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>모든 샘플링 단계에서 <strong>구성에 의한 정확한 에너지-운동량 보존</strong>을 가진 최초의 생성 프레임워크</li>
          <li>확산을 위한 물리적으로 의미 있는 "순수 노이즈"로서의 균일 위상 공간</li>
          <li>N=10 APS 행렬 요소에서 tau 분포를 9자릿수에 걸쳐 재현하는 q-공간 흐름 매칭</li>
          <li>RAMBO 알고리즘의 최대 엔트로피 볼츠만 샘플링으로서의 새로운 해석</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>N=3: 4층 MLP, 500 확산 단계, 500K 훈련 세트. N=10: PET(8 트랜스포머 블록), 5000 확산 단계, 4x NVIDIA L40S GPU 6시간.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>모델</th><th>보존 위반(E)</th><th>보존 위반(p)</th></tr>
          <tr><td>p-공간 확산</td><td>25.85%</td><td>12.64%</td></tr>
          <tr><td>q-공간 확산</td><td>0 (정확)</td><td>0 (정확)</td></tr>
          <tr><td>q-공간 흐름 매칭</td><td>0 (정확)</td><td>0 (정확)</td></tr>
        </table>

        <h2>강점</h2>
        <ul>
          <li>구성에 의한 정확한 보존 — 학습도, 투영도, 패널티도 아님</li>
          <li>물리적으로 의미 있는 노이즈 종점(균일 위상 공간)이 해석 가능한 역과정 가능</li>
          <li>운동량 데이터의 모든 생성 모델에 대한 드롭인 교체</li>
          <li>데이터 증강 절충의 기하학적 설명을 포함한 주의 깊은 분석</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>확산 모델이 매우 낮은 에너지 특이 꼬리를 잘 처리하지 못함</li>
          <li>균일 위상 공간 사전 분포의 흐름 매칭이 훈련 실패</li>
          <li>현재 무질량 입자에 제한; 질량 있는 위상 공간은 다른 처리 필요</li>
          <li>O(200) 입자의 실제 제트 데이터에서 미테스트</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>q-공간 프레임워크를 RAMBO 유사 변환을 수정하여 질량 있는 입자로 확장할 수 있을까?</li>
          <li>확산 역과정 궤적을 노이즈에서 제트 구조가 어떻게 나타나는지 연구하기 위해 물리적으로 해석할 수 있을까?</li>
          <li>N이 10을 넘어 증가할 때 데이터 증강 절충은 어떻게 변하는가?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>RAMBO의 보조 q-공간에서 생성 모델링을 수행하면 정확한 보존 법칙이 무료로 제공된다는 단순하지만 강력한 관찰을 합니다. 가장 흥미로운 측면은 <strong>"AI를 위한 물리학"</strong> 방향입니다: 위상 공간의 알려진 구조를 생성 모델이 계층적 데이터에 대해 실제로 무엇을 학습하는지 이해하기 위한 테스트베드로 활용합니다.</p>
      `
    }
  },

  // ====================================================================
  // 9. Flow Learners for PDEs
  // ====================================================================
  {
    id: "flow-learners-pde",
    date: "2025-04-11",
    authors: "Dai, Y., Chen, S., Jia, X., Yu, R.",
    venue: "KDD 2026",
    image: "images/flow-learners-pde/thumbnail.png",
    link: "",
    domain: "deep-learning",
    tags: ["Deep Learning", "PDE", "Flow Matching", "Scientific Computing"],
    en: {
      title: "Flow Learners for PDEs: Toward a Physics-to-Physics Paradigm for Scientific Computing",
      summary: "Argues that learned PDE solvers should shift from state regression to transport-based flow learners that parameterize vector fields over physical states, aligning solver structure with continuous PDE dynamics for native uncertainty quantification.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A vision paper arguing that the field of learned PDE solving is organized around the wrong abstraction — state regression — and should instead adopt <strong>flow learners</strong> that parameterize transport vector fields over physical states, aligning the solver's learned object with the continuous transport laws that define PDE evolution itself.</p>

        <h2>Research Question</h2>
        <blockquote>What should be the fundamental learned object in scientific PDE solving: a state-to-state map (regression), or a transport law over physically admissible distributions of futures?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Despite progress in PINNs, neural operators, and diffusion-based PDE solvers, each paradigm captures only part of the problem. PINNs embed residual structure but suffer from optimization difficulties. Neural operators amortize efficiently but treat solving as snapshot prediction, degrading over long rollouts. Diffusion models handle uncertainty but often wrap a regression core. The paper argues these are symptoms of an <strong>abstraction mismatch</strong>: models are asked to predict states when the scientific object is transport over constrained dynamics.</p>
        <p>The motivation crystallizes in the hurricane example: the operationally relevant quantity is not a single atmospheric state but a distribution over physically possible futures. A regressor's conditional mean may describe a storm that no one will ever observe.</p>

        <h2>Architecture / Methodology</h2>
        <p>The paper defines <strong>flow learners</strong> as models whose primary learned object is a transport vector field: z_dot = v_theta(z_tau, tau, c), where z is a state or latent state, tau is integration time, and c is conditioning information. Prediction is produced by integrating this field. The "physics-to-physics" alignment rests on four shared structural primitives with PDE evolution:</p>
        <ul>
          <li>Both organized around <strong>vector fields</strong></li>
          <li>Both generate outcomes through <strong>integration</strong></li>
          <li>Both act on <strong>constrained state spaces</strong></li>
          <li>Both induce <strong>transport of measures</strong> under uncertainty</li>
        </ul>
        <p>The paper explicitly separates the paradigm from specific algorithmic families: diffusion models, neural ODEs, flow matching, and score models all qualify as flow learners only when used as transport models over solution distributions.</p>

        <h2>Key Contributions</h2>
        <ul>
          <li>Articulates the <strong>abstraction mismatch</strong> in learned PDE solving: state regression vs. transport law</li>
          <li>Defines "physics-to-physics" alignment through four structural primitives shared with PDE evolution</li>
          <li>Proposes concrete, falsifiable 5-year milestones for the paradigm</li>
          <li>Argues for data acquisition as a first-order solver component, not an afterthought</li>
          <li>Separates the paradigm claim from method advocacy — the point is the learned object, not the algorithm</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>This is a vision/position paper with no experiments. It references practical advances: flow matching (Lipman et al. 2022), continuous-time flow operators (Hou et al. 2025), divergence-free diffusion models (Genuist et al. 2026), physics-constrained flow matching (Utkarsh et al. 2025), and memory-conditioned flow matching for PDE rollouts (Armegioiu 2026).</p>

        <h2>Results</h2>
        <p>No experimental results. The paper instead proposes five falsifiable milestones for the next five years:</p>
        <ul>
          <li>Matched-compute long-horizon wins on chaotic/multiscale PDE benchmarks</li>
          <li>Joint reporting of accuracy, calibration, and physics in evaluation</li>
          <li>Decision-grade ensemble value in applied domains</li>
          <li>Order-of-magnitude label savings via active acquisition</li>
          <li>Cross-PDE transport pretraining with calibration preservation</li>
        </ul>

        <h2>Strengths</h2>
        <ul>
          <li>Clearly articulates a real and important problem: the mismatch between what solvers learn and what science needs</li>
          <li>The four structural primitives provide a precise definition of "physics-to-physics" beyond rhetoric</li>
          <li>Falsifiable milestones make the vision accountable</li>
          <li>Careful taxonomy: separates paradigm from method, avoids collapsing into a method survey</li>
          <li>Table 1 provides an honest, concise comparison of what each paradigm supports natively</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>No experimental validation — the claims remain aspirational</li>
          <li>Inference cost acknowledged but not addressed: transport field integration is slower than single forward pass</li>
          <li>The boundary between "flow learner" and "neural ODE + stochastic initial conditions" could be sharper</li>
          <li>Does not address how to handle systems where the governing PDE itself is unknown or partially known</li>
          <li>Risk of being too broad: almost any continuous-time generative model could claim to be a "flow learner"</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Is the distinction between "transport-based" and "regression-based" learning as sharp as the paper claims, or is it a spectrum?</li>
          <li>How would flow learners handle PDEs with shocks or discontinuities where smooth transport breaks down?</li>
          <li>Could the proposed milestones be achieved by improving autoregressive operators (e.g., with refinement) rather than switching paradigms?</li>
          <li>What role should classical numerical methods play in the flow learner framework — purely as label generators, or as components?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This is a well-argued position paper that correctly identifies a fundamental issue in learned PDE solving: the dominant paradigm optimizes a convenient surrogate (state regression) rather than the scientific object (transport over admissible futures). Whether "flow learners" as defined here will become the dominant paradigm remains to be seen — the paper's value lies not in predicting the future but in <strong>sharpening the question</strong>. Read this paper to calibrate your thinking about what learned PDE solvers should fundamentally learn, and whether current approaches are asking the right question.</p>
      `
    },
    ko: {
      title: "PDE를 위한 흐름 학습자: 과학적 컴퓨팅을 위한 물리-대-물리 패러다임을 향하여",
      summary: "학습된 PDE 솔버가 상태 회귀에서 물리적 상태 위의 벡터 장을 매개변수화하는 수송 기반 흐름 학습자로 전환해야 하며, 이를 통해 연속 PDE 동역학에 솔버 구조를 정렬하여 자연스러운 불확실성 정량화를 가능하게 해야 한다고 주장합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>학습된 PDE 솔빙 분야가 잘못된 추상화 — 상태 회귀 — 를 중심으로 조직되어 있으며, 대신 물리적 상태 위의 수송 벡터 장을 매개변수화하는 <strong>흐름 학습자</strong>를 채택하여 솔버의 학습 객체를 PDE 진화를 정의하는 연속 수송 법칙에 정렬해야 한다는 비전 논문입니다.</p>

        <h2>연구 질문</h2>
        <blockquote>과학적 PDE 솔빙에서 근본적 학습 객체는 무엇이어야 하는가: 상태-대-상태 맵(회귀)인가, 물리적으로 허용 가능한 미래 분포에 대한 수송 법칙인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>PINN, 신경 연산자, 확산 기반 PDE 솔버의 진전에도 불구하고 각 패러다임은 문제의 일부만 포착합니다. 이 논문은 이것들이 <strong>추상화 불일치</strong>의 증상이라 주장합니다: 모델이 상태를 예측하도록 요청받지만 과학적 객체는 제약된 동역학을 통한 수송입니다.</p>
        <p>허리케인 예시에서 동기가 구체화됩니다: 운용적으로 관련된 양은 단일 대기 상태가 아니라 물리적으로 가능한 미래에 대한 분포입니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p><strong>흐름 학습자</strong>를 주요 학습 객체가 수송 벡터 장인 모델로 정의합니다: z_dot = v_theta(z_tau, tau, c). PDE 진화와 공유하는 4가지 구조적 원시 요소를 통해 "물리-대-물리" 정렬을 정의합니다: 벡터 장, 적분, 제약된 상태 공간, 측도의 수송.</p>

        <h2>주요 기여</h2>
        <ul>
          <li>학습된 PDE 솔빙의 <strong>추상화 불일치</strong> 명확화: 상태 회귀 vs. 수송 법칙</li>
          <li>PDE 진화와 공유되는 4가지 구조적 원시 요소를 통한 "물리-대-물리" 정렬 정의</li>
          <li>패러다임에 대한 구체적이고 반증 가능한 5년 이정표 제안</li>
          <li>데이터 획득을 부차적 고려가 아닌 1차적 솔버 구성요소로 주장</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>실험이 없는 비전/입장 논문입니다. 실용적 진전을 참조합니다: 흐름 매칭, 연속 시간 흐름 연산자, 발산 없는 확산 모델, 물리 제약 흐름 매칭 등.</p>

        <h2>결과</h2>
        <p>실험 결과 없음. 대신 5년간의 반증 가능한 5개 이정표를 제안합니다: 매칭 계산 장기 수평선 승리, 정확도-보정-물리의 공동 보고, 의사결정 수준 앙상블 가치, 자릿수 레이블 절약, 교차 PDE 수송 사전훈련.</p>

        <h2>강점</h2>
        <ul>
          <li>실제적이고 중요한 문제를 명확히 표현: 솔버가 학습하는 것과 과학이 필요로 하는 것 간의 불일치</li>
          <li>4가지 구조적 원시 요소가 수사를 넘어 "물리-대-물리"의 정밀한 정의 제공</li>
          <li>반증 가능한 이정표가 비전에 책임성 부여</li>
          <li>주의 깊은 분류: 패러다임과 방법을 분리, 방법 조사로 축소되는 것 방지</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>실험적 검증 없음 — 주장은 포부적으로 남음</li>
          <li>추론 비용 인정되었으나 해결되지 않음</li>
          <li>"흐름 학습자"와 "신경 ODE + 확률적 초기 조건"의 경계가 더 선명할 수 있음</li>
          <li>지배 PDE 자체가 미지이거나 부분적으로 알려진 시스템 처리 미논의</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>"수송 기반"과 "회귀 기반" 학습의 구별이 논문이 주장하는 만큼 선명한가, 아니면 스펙트럼인가?</li>
          <li>흐름 학습자가 매끄러운 수송이 깨지는 충격파나 불연속성을 가진 PDE를 어떻게 처리할까?</li>
          <li>패러다임을 전환하지 않고 자기회귀 연산자를 개선하여 제안된 이정표를 달성할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>학습된 PDE 솔빙의 근본적 문제를 정확히 식별하는 잘 논증된 입장 논문입니다: 지배적 패러다임이 과학적 객체(허용 가능한 미래에 대한 수송)가 아닌 편리한 대리(상태 회귀)를 최적화합니다. 이 논문의 가치는 미래를 예측하는 데가 아니라 <strong>질문을 선명하게 하는 데</strong> 있습니다.</p>
      `
    }
  }
];
