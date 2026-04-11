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
  }
];
