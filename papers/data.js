// ============================================================
// Paper Data
// ============================================================
// To add a new paper review, add an object to the PAPERS array.
// Each paper needs both English (en) and Korean (ko) fields.
//
// Folder structure:
//   images/
//     {id}/
//       thumbnail.png      ← card thumbnail
//       figure1.png        ← figures used in review
//       my-diagram.png     ← your own diagrams
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
  {
    id: "opendrivevla",
    date: "2025-04-11",
    authors: "Zhou, X., Han, X., Yang, F., Ma, Y., Tresp, V., Knoll, A.",
    venue: "AAAI 2026",
    image: "images/opendrivevla/thumbnail.png",
    link: "https://arxiv.org/abs/2503.23463",
    tags: ["Autonomous Driving", "VLM", "End-to-End", "LLM", "Planning"],
    en: {
      title: "OpenDriveVLA: Towards End-to-End Autonomous Driving with Large Vision Language Action Model",
      summary: "Proposes a 3D-aware VLA architecture that enables LLMs to serve as autonomous driving planners through structured 3D token design and staged training.",
      review: `
        <h2>One-line Verdict</h2>
        <p>The core novelty is not "using an LLM as a planner" itself, but showing <strong>how to inject 3D grounding and interaction priors</strong> into an LLM so it can actually function as a planner — through architecture and training curriculum design.</p>

        <h2>Research Question</h2>
        <blockquote>To bring the semantic reasoning capability of general-purpose VLM/LLMs into real autonomous driving planning, what form of 3D perception and training stages are needed?</blockquote>

        <h2>Where This Paper Sits</h2>
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

        <h2>Architecture</h2>
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

        <p>Key architectural novelties:</p>
        <ul>
          <li><strong>Scene/agent/map separation:</strong> Unlike general VLMs that pass the entire scene as one image token set, this model separates tokens by semantic role.</li>
          <li><strong>Token-specific projectors:</strong> Dedicated projectors for each token type enable fine-grained alignment to language space.</li>
          <li><strong>Ego + driver command injection:</strong> The planner sees both the driving intent and vehicle state alongside perception.</li>
        </ul>

        <h2>Staged Training Strategy</h2>
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

        <h2>이 논문의 위치</h2>
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

        <h2>전체 구조</h2>
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

        <p>핵심 구조적 차별점:</p>
        <ul>
          <li><strong>Scene/agent/map 분리:</strong> 일반 VLM처럼 장면 전체를 하나의 이미지 token 집합으로 넘기지 않는다.</li>
          <li><strong>Token-specific projector:</strong> 각 의미 단위별로 projector를 따로 둬서, 언어 공간으로 들어가는 정합 방식을 세분화한다.</li>
          <li><strong>Ego + driver command 주입:</strong> Perception만으로 끝나지 않고, planner가 따라야 할 intent와 상태를 동시에 본다.</li>
        </ul>

        <h2>다단계 학습 전략</h2>
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
  }
];
