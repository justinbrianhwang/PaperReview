const BATCH_SECURITY2 = [
  // ====================================================================
  // 1. V-OCBF
  // ====================================================================
  {
    id: "v-ocbf",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Tayal, M., Tayal, M., Prakash, R.",
    venue: "Preprint 2025",
    image: "images/v-ocbf/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Offline Learning", "Safety Filter"],
    en: {
      title: "V-OCBF: Learning Safety Filters from Offline Data via Value-Guided Offline Control Barrier Functions",
      summary: "Proposes a value-guided approach for learning Control Barrier Functions from offline datasets, enabling safety filter construction without online environment interaction by leveraging value functions to guide CBF synthesis.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper bridges the gap between <strong>offline reinforcement learning and safety-critical control</strong> by proposing Value-guided Offline Control Barrier Functions (V-OCBF), which learn valid CBF safety filters entirely from pre-collected offline data using value function estimates to overcome the distribution shift problem inherent in offline CBF learning.</p>

        <h2>Research Question</h2>
        <blockquote>How can we learn valid Control Barrier Functions from offline datasets without any online interaction with the environment, and can value functions from offline RL guide the CBF synthesis to produce effective safety filters for deployment?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Control Barrier Functions have emerged as a principled framework for guaranteeing safety in dynamical systems by defining forward-invariant safe sets. However, constructing valid CBFs typically requires either hand-crafted design by domain experts or online learning through environment interaction. In many safety-critical domains (autonomous driving, medical robotics, industrial control), online learning is infeasible because failures during training can be catastrophic.</p>
        <p>Offline reinforcement learning has shown promise for learning policies from pre-collected datasets, but directly applying offline RL to CBF synthesis faces the distribution shift problem: the learned CBF must certify safety for states that may not appear in the offline data. The paper addresses this challenge by using value functions as a guiding signal to extrapolate safety information beyond the data support.</p>
        <p>The key motivation is practical: many real-world systems already have large datasets of operational data (e.g., driving logs, flight recorders) that could be leveraged to construct safety filters without additional risky data collection.</p>

        <h2>Architecture / Methodology</h2>
        <p>The V-OCBF framework consists of three main components:</p>
        <ul>
          <li><strong>Offline value function learning:</strong> A conservative value function is learned from the offline dataset using techniques from offline RL (e.g., Conservative Q-Learning). This value function captures the long-term safety cost of states and actions.</li>
          <li><strong>Value-guided CBF synthesis:</strong> The learned value function is used to guide the CBF training process. States with low value (high future safety cost) are treated as unsafe, providing supervisory signal beyond the explicit safe/unsafe labels in the data.</li>
          <li><strong>Safety filter construction:</strong> The learned CBF is deployed as a QP-based safety filter that modifies a nominal controller's actions minimally to maintain forward invariance of the safe set defined by h(x) &ge; 0.</li>
          <li><strong>Distribution shift mitigation:</strong> Pessimistic value estimates ensure that out-of-distribution states are treated conservatively, preventing the CBF from falsely certifying unsafe states as safe.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>First value-guided offline CBF learning framework</strong> that eliminates the need for online environment interaction during CBF synthesis</li>
          <li>Novel integration of <strong>conservative value estimation</strong> with CBF training to handle distribution shift in safety certification</li>
          <li>Theoretical analysis showing that pessimistic value guidance provides a valid lower bound on the true safe set</li>
          <li>Demonstration that offline data can yield CBFs competitive with online-learned alternatives across multiple control benchmarks</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The offline datasets are collected from mixed-quality policies (including both safe and unsafe trajectories) to ensure coverage of the state space near safety boundaries. The value function is parameterized as a neural network trained with conservative Q-learning objectives. The CBF is a separate neural network trained to satisfy the CBF decrease condition using the value function as a guide. Both networks use standard MLP architectures. Experiments are conducted on continuous control benchmarks including inverted pendulum, obstacle avoidance, and navigation tasks.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Environment</th><th>Method</th><th>Safety Rate (%)</th><th>Task Performance</th></tr>
          <tr><td>Inverted Pendulum</td><td>V-OCBF</td><td>98.5</td><td>High</td></tr>
          <tr><td>Inverted Pendulum</td><td>Naive Offline CBF</td><td>82.3</td><td>High</td></tr>
          <tr><td>Navigation</td><td>V-OCBF</td><td>96.2</td><td>Moderate</td></tr>
          <tr><td>Navigation</td><td>Online CBF (Oracle)</td><td>99.1</td><td>High</td></tr>
        </table>
        <p>V-OCBF significantly outperforms naive offline CBF baselines that do not use value guidance, achieving safety rates close to online-learned CBFs. The value-guided approach is particularly effective in regions near the safety boundary where the offline data is sparse, confirming that value functions provide meaningful extrapolation of safety information.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a critical practical need: learning safety filters without dangerous online exploration</li>
          <li>The value-function guidance is a principled way to handle distribution shift, grounded in offline RL theory</li>
          <li>Conservative value estimates provide a safety-aware inductive bias that prevents overconfident CBF certification</li>
          <li>Modular design allows plugging in different offline RL algorithms for the value function component</li>
          <li>Achieves near-online performance from purely offline data, demonstrating the viability of the approach</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Performance depends heavily on the quality and coverage of the offline dataset, particularly near safety boundaries</li>
          <li>Conservative value estimates may lead to overly restrictive safe sets, reducing task performance in benign regions</li>
          <li>Theoretical guarantees assume access to a good dynamics model for the CBF decrease condition</li>
          <li>Scalability to high-dimensional state spaces (e.g., image observations) remains unaddressed</li>
          <li>No comparison with other offline safe RL methods such as constrained offline policy optimization</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the ratio of safe vs. unsafe trajectories in the offline dataset affect the quality of the learned CBF?</li>
          <li>Could active data selection or prioritized replay improve data efficiency in the offline setting?</li>
          <li>How would V-OCBF handle environments where the dynamics change between data collection and deployment?</li>
          <li>Can the framework be extended to multi-agent settings where each agent learns a CBF from shared offline data?</li>
          <li>What is the minimum dataset size needed for V-OCBF to match online CBF performance within a given tolerance?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>V-OCBF presents a compelling solution to one of the key practical barriers in deploying CBF-based safety filters: the need for online data collection. By leveraging value functions from offline RL as a guiding signal, the method achieves robust CBF learning from static datasets. This opens the door to constructing safety filters from existing operational logs in domains where online experimentation is prohibitive.</p>
        <p>For practitioners with access to historical operational data, V-OCBF provides a principled pipeline to extract safety guarantees without additional deployment risk. The key limitation to watch is dataset quality -- garbage in, garbage out remains a fundamental constraint of any offline learning approach.</p>
      `
    },
    ko: {
      title: "V-OCBF: 가치 함수 기반 오프라인 데이터로부터의 안전 필터 학습",
      summary: "오프라인 데이터셋에서 가치 함수를 활용하여 제어 장벽 함수를 학습하는 프레임워크를 제안하며, 온라인 환경 상호작용 없이 안전 필터를 구축할 수 있게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 가치 함수 추정치를 활용하여 오프라인 CBF 학습에 내재된 분포 이동 문제를 극복함으로써, 사전 수집된 오프라인 데이터만으로 유효한 CBF 안전 필터를 학습하는 <strong>가치 기반 오프라인 제어 장벽 함수(V-OCBF)</strong>를 제안하여 오프라인 강화학습과 안전 임계 제어 사이의 간극을 연결합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>환경과의 온라인 상호작용 없이 오프라인 데이터셋에서 유효한 제어 장벽 함수를 학습할 수 있으며, 오프라인 RL의 가치 함수가 배포를 위한 효과적인 안전 필터를 생성하도록 CBF 합성을 안내할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>제어 장벽 함수(CBF)는 순방향 불변 안전 집합을 정의하여 동적 시스템의 안전을 보장하는 원칙적 프레임워크로 부상했습니다. 그러나 유효한 CBF를 구성하려면 일반적으로 도메인 전문가의 수작업 설계 또는 환경 상호작용을 통한 온라인 학습이 필요합니다. 자율주행, 의료 로봇, 산업 제어 등 많은 안전 임계 분야에서는 훈련 중 실패가 치명적일 수 있어 온라인 학습이 불가능합니다.</p>
        <p>오프라인 강화학습은 사전 수집된 데이터셋에서 정책을 학습하는 데 가능성을 보여주었지만, 오프라인 RL을 CBF 합성에 직접 적용하면 분포 이동 문제에 직면합니다. 본 논문은 가치 함수를 안내 신호로 사용하여 데이터 지원 범위를 넘어 안전 정보를 외삽하는 방식으로 이 문제를 해결합니다.</p>
        <p>핵심 동기는 실용적입니다: 많은 실제 시스템에는 추가적인 위험한 데이터 수집 없이 안전 필터를 구축하는 데 활용할 수 있는 대규모 운영 데이터(예: 주행 로그, 비행 기록기)가 이미 존재합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>V-OCBF 프레임워크는 세 가지 주요 구성요소로 이루어집니다:</p>
        <ul>
          <li><strong>오프라인 가치 함수 학습:</strong> 오프라인 RL 기법(예: Conservative Q-Learning)을 사용하여 보수적 가치 함수를 학습합니다. 이 가치 함수는 상태와 행동의 장기 안전 비용을 포착합니다.</li>
          <li><strong>가치 기반 CBF 합성:</strong> 학습된 가치 함수가 CBF 훈련 과정을 안내합니다. 낮은 가치(높은 미래 안전 비용)를 가진 상태는 안전하지 않은 것으로 처리됩니다.</li>
          <li><strong>안전 필터 구축:</strong> 학습된 CBF는 h(x) &ge; 0으로 정의된 안전 집합의 순방향 불변성을 유지하기 위해 명목 제어기의 행동을 최소한으로 수정하는 QP 기반 안전 필터로 배포됩니다.</li>
          <li><strong>분포 이동 완화:</strong> 비관적 가치 추정은 분포 외 상태를 보수적으로 처리하여 CBF가 안전하지 않은 상태를 안전하다고 잘못 인증하는 것을 방지합니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>CBF 합성 중 온라인 환경 상호작용의 필요성을 제거하는 <strong>최초의 가치 기반 오프라인 CBF 학습 프레임워크</strong></li>
          <li>안전 인증에서 분포 이동을 처리하기 위한 <strong>보수적 가치 추정</strong>과 CBF 훈련의 새로운 통합</li>
          <li>비관적 가치 안내가 실제 안전 집합의 유효한 하한을 제공한다는 이론적 분석</li>
          <li>오프라인 데이터가 여러 제어 벤치마크에서 온라인 학습 대안과 경쟁력 있는 CBF를 생성할 수 있음을 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>오프라인 데이터셋은 안전 경계 근처의 상태 공간 커버리지를 보장하기 위해 혼합 품질 정책(안전 및 비안전 궤적 모두 포함)에서 수집됩니다. 가치 함수는 보수적 Q-학습 목적으로 훈련된 신경망으로 매개변수화됩니다. CBF는 가치 함수를 안내로 사용하여 CBF 감소 조건을 만족하도록 훈련된 별도의 신경망입니다. 역진자, 장애물 회피, 내비게이션 작업 등 연속 제어 벤치마크에서 실험을 수행합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>환경</th><th>방법</th><th>안전률 (%)</th><th>작업 성능</th></tr>
          <tr><td>역진자</td><td>V-OCBF</td><td>98.5</td><td>높음</td></tr>
          <tr><td>역진자</td><td>순수 오프라인 CBF</td><td>82.3</td><td>높음</td></tr>
          <tr><td>내비게이션</td><td>V-OCBF</td><td>96.2</td><td>보통</td></tr>
          <tr><td>내비게이션</td><td>온라인 CBF (오라클)</td><td>99.1</td><td>높음</td></tr>
        </table>
        <p>V-OCBF는 가치 안내를 사용하지 않는 순수 오프라인 CBF 기준선을 크게 능가하며, 온라인 학습 CBF에 근접한 안전률을 달성합니다. 가치 기반 접근법은 오프라인 데이터가 희소한 안전 경계 근처 영역에서 특히 효과적입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>위험한 온라인 탐색 없이 안전 필터를 학습하는 핵심 실용적 필요를 해결</li>
          <li>가치 함수 안내는 오프라인 RL 이론에 기반한 분포 이동 처리의 원칙적 방법</li>
          <li>보수적 가치 추정이 과도하게 확신하는 CBF 인증을 방지하는 안전 인식 귀납적 편향 제공</li>
          <li>모듈식 설계로 가치 함수 구성요소에 다양한 오프라인 RL 알고리즘 적용 가능</li>
          <li>순수 오프라인 데이터에서 온라인 수준에 근접한 성능 달성으로 접근법의 실행 가능성 입증</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>성능이 오프라인 데이터셋의 품질과 커버리지, 특히 안전 경계 근처에 크게 의존</li>
          <li>보수적 가치 추정이 과도하게 제한적인 안전 집합으로 이어져 양성 영역에서 작업 성능 저하 가능</li>
          <li>이론적 보장이 CBF 감소 조건을 위한 좋은 동역학 모델 접근을 가정</li>
          <li>고차원 상태 공간(예: 이미지 관측)으로의 확장성이 미해결</li>
          <li>제약 오프라인 정책 최적화 같은 다른 오프라인 안전 RL 방법과의 비교 부재</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>오프라인 데이터셋에서 안전 vs. 비안전 궤적의 비율이 학습된 CBF의 품질에 어떤 영향을 미치는가?</li>
          <li>능동적 데이터 선택 또는 우선순위 리플레이가 오프라인 설정에서 데이터 효율성을 향상시킬 수 있는가?</li>
          <li>데이터 수집과 배포 사이에 동역학이 변경되는 환경에서 V-OCBF는 어떻게 처리하는가?</li>
          <li>공유 오프라인 데이터에서 각 에이전트가 CBF를 학습하는 다중 에이전트 설정으로 확장 가능한가?</li>
          <li>V-OCBF가 주어진 허용 범위 내에서 온라인 CBF 성능에 근접하기 위해 필요한 최소 데이터셋 크기는?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>V-OCBF는 CBF 기반 안전 필터 배포의 핵심 실용적 장벽인 온라인 데이터 수집 필요성에 대한 설득력 있는 해결책을 제시합니다. 오프라인 RL의 가치 함수를 안내 신호로 활용하여 정적 데이터셋에서 강건한 CBF 학습을 달성합니다.</p>
        <p>기존 운영 데이터에 접근할 수 있는 실무자에게 V-OCBF는 추가 배포 위험 없이 안전 보장을 추출하는 원칙적 파이프라인을 제공합니다. 주의할 핵심 한계는 데이터 품질입니다 -- 모든 오프라인 학습 접근법의 근본적 제약인 "쓰레기 입력, 쓰레기 출력"이 여전히 적용됩니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. CN-CBF
  // ====================================================================
  {
    id: "cn-cbf",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Derajic, B., Bernhard, S., Hoenig, W.",
    venue: "Preprint 2025",
    image: "images/cn-cbf/thumbnail.png",
    link: "",
    tags: ["AI Security", "Neural CBF", "Robot Navigation", "Dynamic Environment"],
    en: {
      title: "CN-CBF: Composite Neural Control Barrier Function for Safe Robot Navigation in Dynamic Environments",
      summary: "Introduces Composite Neural CBFs that decompose complex dynamic environments into individual obstacle-level neural barrier functions, composing them for scalable, safe robot navigation without retraining when obstacles change.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper proposes <strong>Composite Neural Control Barrier Functions (CN-CBF)</strong> that achieve scalable safe navigation in dynamic environments by learning individual neural CBFs per obstacle type and composing them at runtime, avoiding the need to retrain a monolithic CBF whenever the environment configuration changes.</p>

        <h2>Research Question</h2>
        <blockquote>How can we construct neural Control Barrier Functions that scale to dynamic environments with varying numbers and types of obstacles, without requiring retraining when the environment configuration changes?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Neural Control Barrier Functions (NCBFs) have shown promise for learning safe sets in complex systems where analytical CBF construction is difficult. However, standard NCBFs are trained for a specific environment configuration — a fixed number and arrangement of obstacles. When new obstacles appear or existing ones move, the entire NCBF must be retrained, which is computationally expensive and impractical for real-time deployment in dynamic environments.</p>
        <p>The composition of multiple CBFs is a well-studied problem in the analytical setting (e.g., taking the minimum of individual CBFs), but composing neural CBFs introduces additional challenges: individual neural CBFs may have incompatible safe sets, the composed CBF may lose differentiability, and the QP-based safety filter may become infeasible when multiple CBF constraints conflict.</p>
        <p>This paper addresses these challenges by training individual neural CBFs in a standardized, obstacle-centric coordinate frame and composing them using principled operations that preserve CBF validity. This modular approach enables plug-and-play safety for dynamic environments.</p>

        <h2>Architecture / Methodology</h2>
        <p>The CN-CBF framework operates in three stages:</p>
        <ul>
          <li><strong>Individual NCBF training:</strong> For each obstacle type (e.g., circular, rectangular, moving), a neural CBF is trained in a canonical coordinate frame centered on the obstacle. The training uses a self-supervised loss combining the CBF decrease condition, boundary condition, and safe/unsafe classification.</li>
          <li><strong>Coordinate transformation:</strong> At runtime, each obstacle's neural CBF is evaluated by transforming the robot's state into the obstacle-centric coordinate frame, enabling the same trained network to handle obstacles at any position and orientation.</li>
          <li><strong>Composition:</strong> The individual CBF values are composed using a smooth minimum operation (log-sum-exp approximation) to produce a single composite barrier value. This preserves differentiability while approximating the conservative intersection of safe sets.</li>
          <li><strong>QP-based safety filter:</strong> The composite CBF is used in a standard QP safety filter that minimally modifies a nominal controller to satisfy the composite CBF decrease condition.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Modular neural CBF architecture</strong> that trains per-obstacle-type networks and composes them at runtime for arbitrary environment configurations</li>
          <li><strong>Coordinate-frame canonicalization</strong> enabling a single network to handle obstacles at any pose without retraining</li>
          <li><strong>Smooth composition operator</strong> (log-sum-exp) that preserves differentiability and CBF validity of the composed function</li>
          <li>Demonstrated scalability to environments with varying numbers of static and dynamic obstacles</li>
          <li>Zero-shot generalization to unseen environment configurations without any fine-tuning</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>Individual NCBFs are parameterized as 3-layer MLPs with 256 hidden units and tanh activations. Training uses a dataset of sampled states labeled as safe/unsafe based on distance to the obstacle. The CBF decrease condition is enforced via a penalty term in the loss. Training uses Adam optimizer with learning rate 1e-3 for 500 epochs per obstacle type. The QP safety filter is solved using OSQP at 100 Hz. Experiments use a unicycle robot model and a double-integrator model in 2D environments with up to 20 obstacles.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Method</th><th># Obstacles</th><th>Safety Rate (%)</th><th>Goal Reach (%)</th><th>Retrain?</th></tr>
          <tr><td>CN-CBF (Ours)</td><td>5</td><td>99.2</td><td>95.8</td><td>No</td></tr>
          <tr><td>CN-CBF (Ours)</td><td>15</td><td>97.8</td><td>89.3</td><td>No</td></tr>
          <tr><td>Monolithic NCBF</td><td>5</td><td>99.5</td><td>96.1</td><td>Yes</td></tr>
          <tr><td>Monolithic NCBF</td><td>15</td><td>N/A (retrain)</td><td>N/A</td><td>Yes</td></tr>
          <tr><td>APF Baseline</td><td>5</td><td>91.2</td><td>88.5</td><td>No</td></tr>
        </table>
        <p>CN-CBF achieves safety rates comparable to monolithic NCBFs trained specifically for each configuration, while generalizing to unseen obstacle counts without retraining. Performance degrades gracefully as the number of obstacles increases, with the smooth composition maintaining feasibility of the QP filter in most scenarios. The approach significantly outperforms Artificial Potential Field baselines, especially in cluttered dynamic environments.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Modular design provides true scalability: train once per obstacle type, deploy in any configuration</li>
          <li>Coordinate-frame canonicalization is elegant and eliminates the need for position-specific training</li>
          <li>The smooth minimum composition preserves differentiability, avoiding gradient issues in the QP filter</li>
          <li>Naturally handles dynamic obstacles by re-evaluating transformed states at each timestep</li>
          <li>Practical and deployable: no online retraining required when the environment changes</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>The smooth minimum composition is conservative: the composed safe set is smaller than necessary, potentially causing unnecessary detours</li>
          <li>Composition of many CBF constraints may lead to QP infeasibility in highly cluttered environments</li>
          <li>Individual NCBFs assume known obstacle geometry; uncertain or partially observed obstacles are not handled</li>
          <li>Dynamic obstacles require accurate velocity estimation, which is assumed but not addressed</li>
          <li>Limited to 2D environments; extension to 3D with complex obstacle shapes would increase network complexity</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the choice of smooth minimum temperature parameter affect the tradeoff between conservatism and safety?</li>
          <li>Could attention mechanisms be used to prioritize nearby obstacles and ignore distant ones for computational efficiency?</li>
          <li>How would CN-CBF perform with uncertain obstacle shapes, e.g., when only partial point cloud observations are available?</li>
          <li>Can the framework handle cooperative multi-robot scenarios where each robot is an obstacle to the others?</li>
          <li>What theoretical guarantees can be provided for the safety of the composed CBF beyond empirical validation?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>CN-CBF offers a practical and principled approach to scaling neural CBFs for dynamic environments. The key insight — decomposing the safety problem into per-obstacle modules and composing them at runtime — mirrors the modularity that has proven successful in other areas of robotics (e.g., modular perception pipelines). This work makes neural CBFs viable for real-world deployment where the environment is not known a priori.</p>
        <p>The main open challenge is tightening the conservatism of the composition operator without sacrificing safety guarantees. For readers interested in safe robot navigation, this paper provides an excellent template for building scalable, modular safety systems.</p>
      `
    },
    ko: {
      title: "CN-CBF: 동적 환경에서의 안전한 로봇 내비게이션을 위한 복합 신경 제어 장벽 함수",
      summary: "복잡한 동적 환경을 개별 장애물 수준의 신경 장벽 함수로 분해하고 이를 합성하여, 장애물이 변경될 때 재훈련 없이 확장 가능한 안전 로봇 내비게이션을 달성하는 복합 신경 CBF를 소개합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 장애물 유형별 개별 신경 CBF를 학습하고 런타임에 합성하여, 환경 구성이 변경될 때마다 단일체 CBF를 재훈련할 필요 없이 동적 환경에서 확장 가능한 안전 내비게이션을 달성하는 <strong>복합 신경 제어 장벽 함수(CN-CBF)</strong>를 제안합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>환경 구성이 변경될 때 재훈련 없이 다양한 수와 유형의 장애물이 있는 동적 환경으로 확장되는 신경 제어 장벽 함수를 어떻게 구성할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>신경 제어 장벽 함수(NCBF)는 분석적 CBF 구성이 어려운 복잡한 시스템에서 안전 집합을 학습하는 데 가능성을 보여주었습니다. 그러나 표준 NCBF는 특정 환경 구성(고정된 수와 배치의 장애물)에 대해 훈련됩니다. 새로운 장애물이 나타나거나 기존 장애물이 이동하면 전체 NCBF를 재훈련해야 하며, 이는 동적 환경에서의 실시간 배포에 비실용적입니다.</p>
        <p>여러 CBF의 합성은 분석적 설정에서 잘 연구된 문제이지만, 신경 CBF의 합성은 추가적인 도전을 제기합니다. 본 논문은 표준화된 장애물 중심 좌표계에서 개별 신경 CBF를 훈련하고 CBF 유효성을 보존하는 원칙적 연산으로 합성하여 이러한 도전을 해결합니다.</p>
        <p>이 모듈식 접근법은 동적 환경을 위한 플러그 앤 플레이 안전을 가능하게 합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>CN-CBF 프레임워크는 세 단계로 작동합니다:</p>
        <ul>
          <li><strong>개별 NCBF 훈련:</strong> 각 장애물 유형(원형, 직사각형, 이동형)에 대해 장애물 중심의 정준 좌표계에서 신경 CBF를 훈련합니다.</li>
          <li><strong>좌표 변환:</strong> 런타임에 로봇의 상태를 장애물 중심 좌표계로 변환하여 각 장애물의 신경 CBF를 평가합니다.</li>
          <li><strong>합성:</strong> 개별 CBF 값을 부드러운 최소 연산(log-sum-exp 근사)으로 합성하여 단일 복합 장벽 값을 생성합니다.</li>
          <li><strong>QP 기반 안전 필터:</strong> 복합 CBF를 표준 QP 안전 필터에 사용하여 명목 제어기를 최소한으로 수정합니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>장애물 유형별 네트워크를 훈련하고 런타임에 임의 환경 구성을 위해 합성하는 <strong>모듈식 신경 CBF 아키텍처</strong></li>
          <li>재훈련 없이 임의 위치의 장애물을 처리할 수 있는 <strong>좌표계 정준화</strong></li>
          <li>미분 가능성과 CBF 유효성을 보존하는 <strong>부드러운 합성 연산자</strong>(log-sum-exp)</li>
          <li>다양한 수의 정적 및 동적 장애물이 있는 환경으로의 확장성 실증</li>
          <li>미세 조정 없이 보지 못한 환경 구성에 대한 제로샷 일반화</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>개별 NCBF는 256개 은닉 유닛과 tanh 활성화를 가진 3층 MLP로 매개변수화됩니다. 장애물까지의 거리를 기반으로 안전/비안전으로 레이블링된 샘플링 상태 데이터셋으로 훈련합니다. CBF 감소 조건은 손실의 페널티 항으로 적용됩니다. Adam 옵티마이저, 학습률 1e-3, 장애물 유형당 500 에포크 훈련. QP 안전 필터는 OSQP로 100 Hz에서 풉니다. 최대 20개 장애물이 있는 2D 환경에서 유니사이클 및 이중 적분기 모델로 실험합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>방법</th><th>장애물 수</th><th>안전률 (%)</th><th>목표 도달 (%)</th><th>재훈련?</th></tr>
          <tr><td>CN-CBF (제안)</td><td>5</td><td>99.2</td><td>95.8</td><td>아니오</td></tr>
          <tr><td>CN-CBF (제안)</td><td>15</td><td>97.8</td><td>89.3</td><td>아니오</td></tr>
          <tr><td>단일체 NCBF</td><td>5</td><td>99.5</td><td>96.1</td><td>예</td></tr>
          <tr><td>APF 기준선</td><td>5</td><td>91.2</td><td>88.5</td><td>아니오</td></tr>
        </table>
        <p>CN-CBF는 각 구성에 특화되어 훈련된 단일체 NCBF와 비슷한 안전률을 달성하면서, 재훈련 없이 보지 못한 장애물 수에 일반화합니다. 장애물 수가 증가함에 따라 성능이 우아하게 저하되며, 인공 포텐셜 필드 기준선을 상당히 능가합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>모듈식 설계가 진정한 확장성 제공: 장애물 유형당 한 번 훈련, 임의 구성에 배포</li>
          <li>좌표계 정준화가 위치별 훈련의 필요성을 우아하게 제거</li>
          <li>부드러운 최소 합성이 미분 가능성을 보존하여 QP 필터의 기울기 문제 방지</li>
          <li>각 타임스텝에서 변환된 상태를 재평가하여 동적 장애물을 자연스럽게 처리</li>
          <li>실용적이고 배포 가능: 환경 변경 시 온라인 재훈련 불필요</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>부드러운 최소 합성이 보수적: 합성된 안전 집합이 필요 이상으로 작아 불필요한 우회 유발 가능</li>
          <li>많은 CBF 제약의 합성이 고밀도 환경에서 QP 비실행 가능성으로 이어질 수 있음</li>
          <li>개별 NCBF가 알려진 장애물 기하학을 가정; 불확실하거나 부분 관측 장애물 미처리</li>
          <li>동적 장애물은 정확한 속도 추정 필요, 이는 가정되지만 다루지 않음</li>
          <li>2D 환경으로 제한; 복잡한 장애물 형상의 3D 확장은 네트워크 복잡도 증가</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>부드러운 최소 온도 매개변수의 선택이 보수성과 안전 사이의 절충에 어떤 영향을 미치는가?</li>
          <li>계산 효율성을 위해 가까운 장애물을 우선하고 먼 장애물을 무시하는 어텐션 메커니즘을 사용할 수 있는가?</li>
          <li>부분 포인트 클라우드 관측만 가능한 불확실한 장애물 형상에서 CN-CBF는 어떻게 동작하는가?</li>
          <li>각 로봇이 다른 로봇의 장애물인 협력적 다중 로봇 시나리오를 처리할 수 있는가?</li>
          <li>합성된 CBF의 안전에 대해 경험적 검증을 넘어 어떤 이론적 보장을 제공할 수 있는가?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>CN-CBF는 동적 환경을 위한 신경 CBF 확장에 대한 실용적이고 원칙적인 접근법을 제공합니다. 핵심 통찰인 안전 문제를 장애물별 모듈로 분해하고 런타임에 합성하는 것은 로봇공학의 다른 영역에서 성공적임이 입증된 모듈성을 반영합니다.</p>
        <p>주요 미해결 과제는 안전 보장을 희생하지 않고 합성 연산자의 보수성을 줄이는 것입니다. 안전한 로봇 내비게이션에 관심 있는 독자에게 이 논문은 확장 가능하고 모듈식인 안전 시스템 구축을 위한 훌륭한 템플릿을 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. CBF Obstacle Avoidance
  // ====================================================================
  {
    id: "cbf-obstacle-avoidance",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Liu, S., Huang, Z., Belta, C. A.",
    venue: "Preprint 2025",
    image: "images/cbf-obstacle-avoidance/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Obstacle Avoidance", "SDF"],
    en: {
      title: "Learning Safety for Obstacle Avoidance via Control Barrier Functions",
      summary: "Proposes using Signed Distance Functions (SDFs) as Control Barrier Functions for obstacle avoidance, enabling safety guarantees for robots navigating around obstacles with complex geometries without manual CBF design.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper demonstrates that <strong>Signed Distance Functions (SDFs) can serve directly as Control Barrier Functions</strong> for obstacle avoidance, unifying geometric distance computation with safety-critical control theory to provide provable collision avoidance for robots navigating complex obstacle geometries.</p>

        <h2>Research Question</h2>
        <blockquote>Can Signed Distance Functions be used as valid Control Barrier Functions for obstacle avoidance, and how can we learn SDFs from data to enable CBF-based safety for obstacles with arbitrary geometries?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Designing Control Barrier Functions for obstacle avoidance is traditionally a manual process that requires significant domain expertise. For simple obstacles (circles, ellipses), analytical CBFs can be derived from distance functions, but real-world obstacles have complex, non-convex geometries that defy simple analytical descriptions.</p>
        <p>Signed Distance Functions (SDFs) provide a natural geometric description of obstacle boundaries: they return positive values outside the obstacle, zero on the boundary, and negative values inside. This property aligns perfectly with the CBF requirement that h(x) > 0 for safe states. However, using SDFs as CBFs requires careful analysis of their gradient properties and the satisfaction of the CBF decrease condition.</p>
        <p>The paper bridges these two fields by establishing formal conditions under which learned SDFs serve as valid CBFs, and proposes a learning pipeline for constructing SDF-based CBFs from obstacle point cloud data.</p>

        <h2>Architecture / Methodology</h2>
        <p>The methodology combines SDF learning with CBF-based safety filtering:</p>
        <ul>
          <li><strong>SDF representation:</strong> The obstacle geometry is encoded via a neural network that maps spatial coordinates to signed distance values. The network is trained on point samples with known distance labels (computed from mesh data or point clouds).</li>
          <li><strong>CBF validity analysis:</strong> The paper establishes conditions under which the SDF satisfies the CBF decrease condition. Key requirement: the SDF gradient must have unit norm (the Eikonal equation |nabla h| = 1), which is naturally satisfied by true SDFs but must be enforced during neural network training.</li>
          <li><strong>Eikonal regularization:</strong> A penalty term is added to the training loss to enforce the Eikonal equation, ensuring the learned SDF has valid gradient properties for CBF usage.</li>
          <li><strong>QP-based safety filter:</strong> The learned SDF-CBF is deployed in a quadratic program that minimally modifies a nominal controller to maintain h(x) &ge; 0, using the analytically computed gradient of the neural SDF.</li>
          <li><strong>Multi-obstacle handling:</strong> For environments with multiple obstacles, individual SDF-CBFs are constructed per obstacle and composed via minimum operations or multiple QP constraints.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Formal bridge between SDFs and CBFs:</strong> Establishes necessary and sufficient conditions for SDFs to serve as valid CBFs, grounded in the Eikonal equation</li>
          <li><strong>Neural SDF learning pipeline</strong> with Eikonal regularization that produces CBF-ready distance functions from point cloud data</li>
          <li>Elimination of manual CBF design for obstacle avoidance, enabling safety for <strong>arbitrary obstacle geometries</strong></li>
          <li>Theoretical analysis of the relative degree condition between the SDF-CBF and common robot dynamics models</li>
          <li>Demonstration on both simple (2D) and complex (3D mesh) obstacle geometries with various robot dynamics</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The neural SDF is a 4-layer MLP with 128 hidden units and sine activations (SIREN architecture), trained on 50K point samples per obstacle with Adam optimizer (lr=1e-4, 2000 epochs). The Eikonal loss weight is set to 0.1. The QP safety filter uses OSQP with a warm-start strategy for real-time performance. Experiments include a planar robot navigating around 2D polygonal obstacles and a 3D manipulator avoiding mesh obstacles. The CBF class-K function alpha(h) = h is used throughout.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Scenario</th><th>Obstacle Type</th><th>CBF Method</th><th>Min Distance (m)</th><th>Collision?</th></tr>
          <tr><td>2D Navigation</td><td>Convex polygon</td><td>SDF-CBF</td><td>0.02</td><td>No</td></tr>
          <tr><td>2D Navigation</td><td>Non-convex shape</td><td>SDF-CBF</td><td>0.01</td><td>No</td></tr>
          <tr><td>2D Navigation</td><td>Non-convex shape</td><td>Ellipse CBF</td><td>-0.03</td><td>Yes</td></tr>
          <tr><td>3D Manipulation</td><td>Mesh object</td><td>SDF-CBF</td><td>0.005</td><td>No</td></tr>
        </table>
        <p>The SDF-CBF consistently maintains positive distances to obstacles across all tested scenarios, while traditional ellipsoidal CBF approximations fail for non-convex geometries. The Eikonal regularization is critical: without it, the learned SDF has non-unit gradients that cause the CBF filter to either over-constrain (far from obstacles) or under-constrain (near concavities). The QP solver runs within 1ms per step, enabling real-time deployment.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant theoretical connection between SDFs and CBFs through the Eikonal equation, providing solid mathematical foundations</li>
          <li>Practical pipeline from point cloud data to deployable safety filter, requiring minimal human intervention</li>
          <li>Handles non-convex obstacles where traditional CBF approaches fail or require overly conservative approximations</li>
          <li>SIREN architecture with sine activations naturally produces smooth, differentiable SDFs suitable for gradient-based QP</li>
          <li>Computationally efficient: neural SDF evaluation and gradient computation are fast forward passes</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>The Eikonal equation |nabla h| = 1 is only approximately enforced by the regularization, leading to small gradient errors near obstacle concavities</li>
          <li>Does not handle deformable or articulated obstacles whose SDF changes over time</li>
          <li>The neural SDF requires offline training per obstacle; online SDF learning from streaming data is not addressed</li>
          <li>Relative degree analysis assumes specific robot dynamics models; extending to general nonlinear systems requires case-by-case analysis</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could DeepSDF-style latent codes enable a single network to represent SDFs for a family of obstacle shapes?</li>
          <li>How does SDF approximation error propagate through the CBF filter, and can we bound the resulting safety margin?</li>
          <li>Can the Eikonal regularization be replaced with hard constraints during training (e.g., via spectral normalization)?</li>
          <li>How would this approach integrate with real-time SLAM systems that reconstruct obstacle geometry on-the-fly?</li>
          <li>What is the minimum point cloud density required for the learned SDF to produce a valid CBF?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper establishes a clean and practically useful connection between two previously separate fields: neural implicit representations (SDFs) and safety-critical control (CBFs). The Eikonal equation serves as the mathematical glue, ensuring that geometric distance information translates directly into control-theoretic safety guarantees.</p>
        <p>For roboticists working on obstacle avoidance in complex environments, this paper provides an actionable recipe: learn an SDF from obstacle data, regularize with the Eikonal loss, and plug into a standard QP safety filter. The approach is particularly compelling for manipulation tasks where obstacle geometries are complex and non-convex.</p>
      `
    },
    ko: {
      title: "제어 장벽 함수를 통한 장애물 회피 안전 학습",
      summary: "부호 거리 함수(SDF)를 제어 장벽 함수로 직접 사용하여 복잡한 기하학적 형상을 가진 장애물에 대해 수동 CBF 설계 없이 안전 보장을 가능하게 하는 장애물 회피 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 <strong>부호 거리 함수(SDF)가 장애물 회피를 위한 제어 장벽 함수로 직접 사용</strong>될 수 있음을 보여주며, 기하학적 거리 계산과 안전 임계 제어 이론을 통합하여 복잡한 장애물 기하학을 탐색하는 로봇에 대한 증명 가능한 충돌 회피를 제공합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>부호 거리 함수를 장애물 회피를 위한 유효한 제어 장벽 함수로 사용할 수 있으며, 임의 기하학의 장애물에 대해 CBF 기반 안전을 가능하게 하기 위해 데이터에서 SDF를 학습할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>장애물 회피를 위한 제어 장벽 함수 설계는 전통적으로 상당한 도메인 전문성을 요구하는 수작업 과정입니다. 단순한 장애물(원, 타원)의 경우 거리 함수에서 분석적 CBF를 유도할 수 있지만, 실세계 장애물은 단순한 분석적 기술을 허용하지 않는 복잡하고 비볼록한 기하학을 가집니다.</p>
        <p>부호 거리 함수(SDF)는 장애물 경계의 자연스러운 기하학적 기술을 제공합니다: 장애물 외부에서 양수, 경계에서 0, 내부에서 음수 값을 반환합니다. 이 속성은 안전 상태에서 h(x) > 0이라는 CBF 요구사항과 완벽하게 일치합니다.</p>
        <p>본 논문은 학습된 SDF가 유효한 CBF로 작용하는 형식적 조건을 수립하고, 장애물 포인트 클라우드 데이터에서 SDF 기반 CBF를 구성하는 학습 파이프라인을 제안하여 이 두 분야를 연결합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>방법론은 SDF 학습과 CBF 기반 안전 필터링을 결합합니다:</p>
        <ul>
          <li><strong>SDF 표현:</strong> 장애물 기하학이 공간 좌표를 부호 거리 값으로 매핑하는 신경망으로 인코딩됩니다.</li>
          <li><strong>CBF 유효성 분석:</strong> SDF가 CBF 감소 조건을 만족하는 조건을 수립합니다. 핵심 요구사항: SDF 기울기가 단위 노름을 가져야 합니다(아이코날 방정식 |nabla h| = 1).</li>
          <li><strong>아이코날 정규화:</strong> 아이코날 방정식을 적용하여 학습된 SDF가 CBF 사용에 유효한 기울기 속성을 갖도록 훈련 손실에 페널티 항을 추가합니다.</li>
          <li><strong>QP 기반 안전 필터:</strong> 학습된 SDF-CBF를 사용하여 h(x) &ge; 0을 유지하도록 명목 제어기를 최소한으로 수정하는 이차 프로그램에 배포합니다.</li>
          <li><strong>다중 장애물 처리:</strong> 여러 장애물이 있는 환경에서 개별 SDF-CBF를 장애물별로 구성하고 최소 연산 또는 다중 QP 제약으로 합성합니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>아이코날 방정식을 통한 <strong>SDF와 CBF 사이의 형식적 연결</strong> 수립</li>
          <li>포인트 클라우드 데이터에서 CBF 준비된 거리 함수를 생성하는 아이코날 정규화 포함 <strong>신경 SDF 학습 파이프라인</strong></li>
          <li>장애물 회피를 위한 수동 CBF 설계 제거, <strong>임의 장애물 기하학</strong>에 대한 안전 보장</li>
          <li>SDF-CBF와 일반적인 로봇 동역학 모델 사이의 상대 차수 조건에 대한 이론적 분석</li>
          <li>단순(2D)부터 복잡(3D 메쉬) 장애물 기하학까지 다양한 로봇 동역학으로 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>신경 SDF는 128개 은닉 유닛과 사인 활성화(SIREN 아키텍처)를 가진 4층 MLP로, 장애물당 5만 개 포인트 샘플로 Adam 옵티마이저(lr=1e-4, 2000 에포크) 사용하여 훈련합니다. 아이코날 손실 가중치는 0.1로 설정합니다. QP 안전 필터는 실시간 성능을 위한 웜스타트 전략으로 OSQP를 사용합니다. 2D 다각형 장애물 주변의 평면 로봇과 메쉬 장애물을 회피하는 3D 매니퓰레이터를 포함하는 실험을 수행합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>시나리오</th><th>장애물 유형</th><th>CBF 방법</th><th>최소 거리 (m)</th><th>충돌?</th></tr>
          <tr><td>2D 내비게이션</td><td>볼록 다각형</td><td>SDF-CBF</td><td>0.02</td><td>아니오</td></tr>
          <tr><td>2D 내비게이션</td><td>비볼록 형상</td><td>SDF-CBF</td><td>0.01</td><td>아니오</td></tr>
          <tr><td>2D 내비게이션</td><td>비볼록 형상</td><td>타원 CBF</td><td>-0.03</td><td>예</td></tr>
          <tr><td>3D 매니퓰레이션</td><td>메쉬 객체</td><td>SDF-CBF</td><td>0.005</td><td>아니오</td></tr>
        </table>
        <p>SDF-CBF는 모든 테스트 시나리오에서 장애물까지의 양의 거리를 일관되게 유지하는 반면, 전통적인 타원체 CBF 근사는 비볼록 기하학에서 실패합니다. 아이코날 정규화가 핵심적입니다: 이것이 없으면 학습된 SDF가 비단위 기울기를 가져 CBF 필터가 과도하게 제약하거나 과소하게 제약합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>아이코날 방정식을 통한 SDF와 CBF 사이의 우아한 이론적 연결, 견고한 수학적 기초 제공</li>
          <li>포인트 클라우드 데이터에서 배포 가능한 안전 필터까지의 실용적 파이프라인</li>
          <li>전통적 CBF 접근법이 실패하는 비볼록 장애물 처리</li>
          <li>사인 활성화의 SIREN 아키텍처가 기울기 기반 QP에 적합한 매끄럽고 미분 가능한 SDF를 자연스럽게 생성</li>
          <li>계산 효율적: 신경 SDF 평가와 기울기 계산이 빠른 순전파</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>아이코날 방정식이 정규화로만 근사적으로 적용되어 장애물 오목부 근처에서 작은 기울기 오류 발생</li>
          <li>SDF가 시간에 따라 변하는 변형 가능하거나 관절형 장애물 미처리</li>
          <li>신경 SDF가 장애물당 오프라인 훈련 필요; 스트리밍 데이터에서의 온라인 SDF 학습 미해결</li>
          <li>상대 차수 분석이 특정 로봇 동역학 모델 가정; 일반 비선형 시스템 확장에 사례별 분석 필요</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>DeepSDF 스타일의 잠재 코드가 단일 네트워크로 장애물 형상 계열의 SDF를 표현할 수 있게 할 수 있는가?</li>
          <li>SDF 근사 오류가 CBF 필터를 통해 어떻게 전파되며, 결과적인 안전 마진을 한정할 수 있는가?</li>
          <li>아이코날 정규화를 훈련 중 경성 제약(예: 스펙트럴 정규화)으로 대체할 수 있는가?</li>
          <li>이 접근법을 장애물 기하학을 실시간으로 재구성하는 SLAM 시스템과 어떻게 통합하는가?</li>
          <li>학습된 SDF가 유효한 CBF를 생성하기 위해 필요한 최소 포인트 클라우드 밀도는?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 이전에 별개였던 두 분야인 신경 암시적 표현(SDF)과 안전 임계 제어(CBF) 사이의 깔끔하고 실용적으로 유용한 연결을 수립합니다. 아이코날 방정식이 수학적 접착제 역할을 하여 기하학적 거리 정보가 제어 이론적 안전 보장으로 직접 변환되도록 합니다.</p>
        <p>복잡한 환경에서 장애물 회피를 연구하는 로봇공학자에게 이 논문은 실행 가능한 레시피를 제공합니다: 장애물 데이터에서 SDF를 학습하고, 아이코날 손실로 정규화하고, 표준 QP 안전 필터에 연결합니다. 이 접근법은 장애물 기하학이 복잡하고 비볼록한 매니퓰레이션 작업에 특히 매력적입니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. Point Cloud CBF-MPC
  // ====================================================================
  {
    id: "pointcloud-cbf-mpc",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Liang, F., Yang, Y., Dai, S.-L.",
    venue: "Preprint 2025",
    image: "images/pointcloud-cbf-mpc/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "MPC", "Point Cloud", "Mobile Robot"],
    en: {
      title: "Point Cloud-Based Control Barrier Functions for Model Predictive Control in Safety-Critical Navigation of Autonomous Mobile Robots",
      summary: "Integrates point cloud perception directly into a CBF-MPC framework for mobile robot navigation, constructing barrier functions from raw sensor data without pre-built obstacle maps.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper proposes a <strong>perception-to-control pipeline</strong> that constructs Control Barrier Functions directly from point cloud sensor data and integrates them into a Model Predictive Control framework, enabling safety-critical mobile robot navigation in unmapped environments without the need for explicit obstacle reconstruction.</p>

        <h2>Research Question</h2>
        <blockquote>How can we construct valid Control Barrier Functions directly from raw point cloud data (e.g., LiDAR) and integrate them into an MPC framework for real-time safety-critical navigation of autonomous mobile robots?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Traditional CBF-based safety filters assume that obstacle locations and geometries are known a priori, allowing analytical CBF construction. In practice, mobile robots perceive their environment through sensors (LiDAR, depth cameras) that produce point clouds — raw 3D coordinates with no explicit geometric model. The gap between sensor data and CBF construction is typically bridged by first building an occupancy map or reconstructing obstacle meshes, introducing computational overhead and potential reconstruction errors.</p>
        <p>Model Predictive Control (MPC) offers a natural integration point for safety constraints through its optimization-based formulation. However, incorporating CBF constraints into MPC requires the barrier function to be defined over the prediction horizon, where future obstacle positions must be estimated.</p>
        <p>This paper eliminates the intermediate mapping step by constructing CBFs directly from point cloud data, and integrates these perception-derived CBFs into an MPC framework that jointly optimizes trajectory tracking and safety over a finite horizon.</p>

        <h2>Architecture / Methodology</h2>
        <p>The framework consists of three integrated modules:</p>
        <ul>
          <li><strong>Point cloud processing:</strong> Raw LiDAR scans are downsampled and clustered to identify obstacle regions. For each cluster, a local convex hull or bounding region is computed to define the obstacle boundary.</li>
          <li><strong>CBF construction from point clouds:</strong> For each obstacle cluster, a CBF is constructed based on the minimum distance from the robot to the convex hull boundary. The distance function is formulated as a differentiable operation over the point set, enabling gradient computation for the MPC optimizer.</li>
          <li><strong>CBF-MPC integration:</strong> The MPC problem is formulated with CBF decrease conditions as inequality constraints at each prediction step. The cost function balances trajectory tracking performance with control effort, while CBF constraints ensure safety throughout the prediction horizon.</li>
          <li><strong>Prediction with persistence:</strong> Since future point clouds are unavailable during the prediction horizon, the current point cloud is propagated forward using simple velocity estimates of detected obstacles, providing conservative safety constraints over the planning window.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Direct point-cloud-to-CBF pipeline</strong> that eliminates the need for explicit obstacle mapping or mesh reconstruction</li>
          <li><strong>Differentiable distance formulation</strong> from point sets that enables gradient-based optimization in the MPC framework</li>
          <li>Integration of perception-derived CBFs into a <strong>finite-horizon MPC</strong> with safety guarantees over the planning window</li>
          <li>Point cloud persistence model for propagating safety constraints through the MPC prediction horizon</li>
          <li>Real-time capable implementation demonstrated on a mobile robot with LiDAR sensing</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The system uses a 2D LiDAR scanner with 360-degree coverage and 0.5-degree angular resolution. Point cloud downsampling reduces each scan to ~500 points. Obstacle clustering uses DBSCAN with eps=0.3m and min_samples=5. The MPC prediction horizon is N=20 steps at 0.1s intervals (2s lookahead). The optimization problem is solved using CasADi with IPOPT as the nonlinear solver. The mobile robot is modeled as a unicycle with maximum linear velocity 1.0 m/s and maximum angular velocity 1.5 rad/s. Experiments are conducted both in Gazebo simulation and on a TurtleBot3 platform.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Method</th><th>Static Obstacles</th><th>Dynamic Obstacles</th><th>Min Clearance (m)</th><th>Avg. Solve Time (ms)</th></tr>
          <tr><td>PC-CBF-MPC (Ours)</td><td>0/50 collisions</td><td>0/50 collisions</td><td>0.12</td><td>18.3</td></tr>
          <tr><td>Standard MPC</td><td>0/50 collisions</td><td>3/50 collisions</td><td>0.05</td><td>15.1</td></tr>
          <tr><td>DWA</td><td>0/50 collisions</td><td>7/50 collisions</td><td>0.03</td><td>2.1</td></tr>
          <tr><td>Reactive CBF-QP</td><td>0/50 collisions</td><td>1/50 collisions</td><td>0.15</td><td>1.2</td></tr>
        </table>
        <p>The PC-CBF-MPC achieves zero collisions across all test scenarios while maintaining reasonable computational overhead. The MPC lookahead provides significant advantage in dynamic obstacle scenarios, where reactive methods (DWA, CBF-QP) occasionally fail due to delayed response. The minimum clearance of 0.12m demonstrates that the point-cloud-derived CBFs provide a practical safety margin without excessive conservatism. The 18.3ms average solve time is within the 100ms real-time budget for the 10 Hz control loop.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Eliminates the mapping/reconstruction bottleneck, enabling direct perception-to-control safety</li>
          <li>MPC integration provides anticipatory behavior that purely reactive CBF-QP filters lack</li>
          <li>Point cloud persistence model is simple yet effective for short prediction horizons</li>
          <li>Demonstrated on real hardware (TurtleBot3), not just simulation</li>
          <li>Differentiable distance formulation is compatible with modern automatic differentiation frameworks</li>
          <li>Computational cost is practical for real-time deployment on modest hardware</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Point cloud persistence assumes constant obstacle velocity, which fails for accelerating or turning obstacles</li>
          <li>Convex hull approximation of obstacle clusters can be overly conservative for concave obstacles</li>
          <li>2D LiDAR limits the approach to planar navigation; 3D point clouds would significantly increase computational cost</li>
          <li>DBSCAN clustering may merge nearby obstacles or split a single obstacle, affecting CBF construction</li>
          <li>No formal recursive feasibility guarantee for the MPC with time-varying CBF constraints</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the approach scale to 3D point clouds from depth cameras, and what compression techniques could maintain real-time performance?</li>
          <li>Could learned obstacle motion prediction replace the constant-velocity persistence model for better dynamic obstacle handling?</li>
          <li>What happens when the LiDAR has occlusions — can the framework handle partially observed obstacles safely?</li>
          <li>How does clustering quality affect safety, and could a learned clustering method improve robustness?</li>
          <li>Can recursive feasibility be guaranteed by restricting the terminal set of the MPC to a known safe configuration?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper addresses a genuine practical gap: most CBF literature assumes known obstacle models, while most robot perception produces point clouds. By directly constructing CBFs from point cloud data and integrating them into MPC, the work provides an end-to-end pipeline from perception to safety-critical control.</p>
        <p>The approach is particularly relevant for mobile robots operating in unknown or changing environments where pre-built maps are unavailable. The key challenge going forward is improving the point cloud prediction model for dynamic environments, where simple persistence assumptions break down over longer horizons.</p>
      `
    },
    ko: {
      title: "자율 이동 로봇의 안전 임계 내비게이션을 위한 포인트 클라우드 기반 제어 장벽 함수-모델 예측 제어",
      summary: "포인트 클라우드 인식을 CBF-MPC 프레임워크에 직접 통합하여, 사전 구축된 장애물 맵 없이 원시 센서 데이터에서 장벽 함수를 구성하는 이동 로봇 내비게이션 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 포인트 클라우드 센서 데이터에서 직접 제어 장벽 함수를 구성하고 이를 모델 예측 제어 프레임워크에 통합하는 <strong>인식-제어 파이프라인</strong>을 제안하여, 명시적 장애물 재구성 없이 매핑되지 않은 환경에서의 안전 임계 이동 로봇 내비게이션을 가능하게 합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>원시 포인트 클라우드 데이터(예: LiDAR)에서 직접 유효한 제어 장벽 함수를 구성하고, 자율 이동 로봇의 실시간 안전 임계 내비게이션을 위한 MPC 프레임워크에 통합할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>전통적인 CBF 기반 안전 필터는 장애물 위치와 기하학이 사전에 알려져 있다고 가정하여 분석적 CBF 구성을 허용합니다. 실제로 이동 로봇은 포인트 클라우드를 생성하는 센서(LiDAR, 깊이 카메라)를 통해 환경을 인식합니다. 센서 데이터와 CBF 구성 사이의 간극은 일반적으로 먼저 점유 맵을 구축하거나 장애물 메쉬를 재구성하여 연결되며, 이는 계산 오버헤드와 잠재적 재구성 오류를 유발합니다.</p>
        <p>모델 예측 제어(MPC)는 최적화 기반 공식을 통해 안전 제약의 자연스러운 통합 지점을 제공합니다. 그러나 CBF 제약을 MPC에 통합하려면 예측 구간 동안 장벽 함수가 정의되어야 합니다.</p>
        <p>본 논문은 포인트 클라우드 데이터에서 직접 CBF를 구성하여 중간 매핑 단계를 제거하고, 유한 구간에 걸쳐 궤적 추적과 안전을 공동 최적화하는 MPC 프레임워크에 이러한 인식 유래 CBF를 통합합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>프레임워크는 세 가지 통합 모듈로 구성됩니다:</p>
        <ul>
          <li><strong>포인트 클라우드 처리:</strong> 원시 LiDAR 스캔을 다운샘플링하고 클러스터링하여 장애물 영역을 식별합니다. 각 클러스터에 대해 지역 볼록 껍질 또는 바운딩 영역을 계산합니다.</li>
          <li><strong>포인트 클라우드에서 CBF 구성:</strong> 각 장애물 클러스터에 대해 로봇에서 볼록 껍질 경계까지의 최소 거리를 기반으로 CBF를 구성합니다.</li>
          <li><strong>CBF-MPC 통합:</strong> 각 예측 단계에서 CBF 감소 조건을 부등식 제약으로 하는 MPC 문제를 공식화합니다.</li>
          <li><strong>지속성 기반 예측:</strong> 예측 구간 동안 미래 포인트 클라우드를 사용할 수 없으므로, 현재 포인트 클라우드를 간단한 속도 추정을 사용하여 전방으로 전파합니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>명시적 장애물 매핑이나 메쉬 재구성의 필요성을 제거하는 <strong>포인트 클라우드-CBF 직접 파이프라인</strong></li>
          <li>MPC 프레임워크에서 기울기 기반 최적화를 가능하게 하는 포인트 집합의 <strong>미분 가능한 거리 공식</strong></li>
          <li>계획 창에 걸쳐 안전 보장이 있는 <strong>유한 구간 MPC</strong>에 인식 유래 CBF 통합</li>
          <li>MPC 예측 구간을 통한 안전 제약 전파를 위한 포인트 클라우드 지속성 모델</li>
          <li>LiDAR 센싱이 있는 이동 로봇에서 실시간 가능한 구현 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>시스템은 360도 커버리지와 0.5도 각도 해상도의 2D LiDAR 스캐너를 사용합니다. 포인트 클라우드 다운샘플링은 각 스캔을 ~500 포인트로 줄입니다. 장애물 클러스터링은 eps=0.3m, min_samples=5의 DBSCAN을 사용합니다. MPC 예측 구간은 0.1초 간격의 N=20 단계(2초 미리보기)입니다. CasADi와 IPOPT를 비선형 솔버로 사용하여 최적화 문제를 풉니다. 유니사이클 모델, 최대 선속도 1.0 m/s, 최대 각속도 1.5 rad/s. Gazebo 시뮬레이션과 TurtleBot3 플랫폼에서 실험을 수행합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>방법</th><th>정적 장애물</th><th>동적 장애물</th><th>최소 간격 (m)</th><th>평균 풀이 시간 (ms)</th></tr>
          <tr><td>PC-CBF-MPC (제안)</td><td>0/50 충돌</td><td>0/50 충돌</td><td>0.12</td><td>18.3</td></tr>
          <tr><td>표준 MPC</td><td>0/50 충돌</td><td>3/50 충돌</td><td>0.05</td><td>15.1</td></tr>
          <tr><td>DWA</td><td>0/50 충돌</td><td>7/50 충돌</td><td>0.03</td><td>2.1</td></tr>
          <tr><td>반응형 CBF-QP</td><td>0/50 충돌</td><td>1/50 충돌</td><td>0.15</td><td>1.2</td></tr>
        </table>
        <p>PC-CBF-MPC는 모든 테스트 시나리오에서 충돌 없이 합리적인 계산 오버헤드를 유지합니다. MPC 미리보기는 동적 장애물 시나리오에서 상당한 이점을 제공하며, 반응형 방법(DWA, CBF-QP)은 지연된 응답으로 간혹 실패합니다. 18.3ms 평균 풀이 시간은 10 Hz 제어 루프의 100ms 실시간 예산 이내입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>매핑/재구성 병목을 제거하여 직접적인 인식-제어 안전 실현</li>
          <li>MPC 통합이 순수 반응형 CBF-QP 필터에 부족한 예측적 행동 제공</li>
          <li>포인트 클라우드 지속성 모델이 짧은 예측 구간에서 단순하지만 효과적</li>
          <li>시뮬레이션뿐만 아니라 실제 하드웨어(TurtleBot3)에서 실증</li>
          <li>미분 가능한 거리 공식이 현대 자동 미분 프레임워크와 호환</li>
          <li>실시간 배포에 실용적인 계산 비용</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>포인트 클라우드 지속성이 일정 장애물 속도를 가정, 가속하거나 회전하는 장애물에서 실패</li>
          <li>장애물 클러스터의 볼록 껍질 근사가 오목 장애물에 대해 과도하게 보수적</li>
          <li>2D LiDAR가 접근법을 평면 내비게이션으로 제한; 3D 포인트 클라우드는 계산 비용 크게 증가</li>
          <li>DBSCAN 클러스터링이 인접 장애물을 병합하거나 단일 장애물을 분할할 수 있어 CBF 구성에 영향</li>
          <li>시변 CBF 제약이 있는 MPC의 공식적 재귀적 실행 가능성 보장 부재</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>깊이 카메라의 3D 포인트 클라우드로 접근법이 어떻게 확장되며, 실시간 성능을 유지할 수 있는 압축 기법은?</li>
          <li>학습된 장애물 운동 예측이 더 나은 동적 장애물 처리를 위해 일정 속도 지속성 모델을 대체할 수 있는가?</li>
          <li>LiDAR에 가림이 있을 때 프레임워크가 부분 관측 장애물을 안전하게 처리할 수 있는가?</li>
          <li>클러스터링 품질이 안전에 어떤 영향을 미치며, 학습된 클러스터링 방법이 강건성을 향상시킬 수 있는가?</li>
          <li>MPC의 종단 집합을 알려진 안전 구성으로 제한하여 재귀적 실행 가능성을 보장할 수 있는가?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 실질적인 실용적 간극을 해결합니다: 대부분의 CBF 문헌은 알려진 장애물 모델을 가정하는 반면, 대부분의 로봇 인식은 포인트 클라우드를 생성합니다. 포인트 클라우드 데이터에서 직접 CBF를 구성하고 MPC에 통합하여 인식에서 안전 임계 제어까지의 종단간 파이프라인을 제공합니다.</p>
        <p>이 접근법은 사전 구축 맵이 불가능한 미지의 또는 변화하는 환경에서 작동하는 이동 로봇에 특히 관련이 있습니다. 향후 핵심 과제는 더 긴 구간에서 단순 지속성 가정이 실패하는 동적 환경을 위한 포인트 클라우드 예측 모델 개선입니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. Log-GP-CBF
  // ====================================================================
  {
    id: "log-gp-cbf",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Yin, X., Liang, C., Guo, Y., Mei, J.",
    venue: "Preprint 2025",
    image: "images/log-gp-cbf/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Gaussian Process", "Dynamic Environment"],
    en: {
      title: "Dynamic Log-Gaussian Process Control Barrier Function for Safe Robotic Navigation in Dynamic Environments",
      summary: "Combines logarithmic barrier functions with Gaussian Process models to create adaptive CBFs that account for obstacle motion uncertainty, providing probabilistic safety guarantees in dynamic environments.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces <strong>Log-Gaussian Process CBFs (Log-GP-CBFs)</strong> that combine logarithmic barrier function formulations with Gaussian Process regression to model obstacle motion uncertainty, providing probabilistic safety guarantees that adapt in real-time to observed dynamic obstacle behavior.</p>

        <h2>Research Question</h2>
        <blockquote>How can we design Control Barrier Functions that provide probabilistic safety guarantees in dynamic environments where obstacle motion is uncertain, by combining logarithmic barrier formulations with Gaussian Process models of obstacle dynamics?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Standard CBFs assume deterministic knowledge of obstacle positions and dynamics. In real dynamic environments, obstacle motion is inherently uncertain — pedestrians may change direction unpredictably, vehicles may accelerate or brake, and sensor measurements are noisy. Ignoring this uncertainty can lead to either unsafe behavior (underestimating risk) or overly conservative behavior (treating worst-case bounds as certain).</p>
        <p>Gaussian Processes (GPs) provide a principled Bayesian framework for modeling uncertainty: they produce not just point predictions of obstacle positions but also confidence intervals that quantify prediction uncertainty. However, integrating GP uncertainty into CBF frameworks is non-trivial because the CBF decrease condition must hold probabilistically, and the GP posterior changes as new observations arrive.</p>
        <p>Logarithmic barrier functions offer an advantage over standard polynomial barriers: they provide infinite penalty as the system approaches the unsafe boundary, creating a natural "soft wall" effect. The log formulation also interacts favorably with GP uncertainty bounds, enabling tractable probabilistic safety conditions.</p>

        <h2>Architecture / Methodology</h2>
        <p>The Log-GP-CBF framework operates as follows:</p>
        <ul>
          <li><strong>Gaussian Process obstacle model:</strong> A GP is trained online to model the obstacle's trajectory. The GP posterior provides mean predictions (expected obstacle position) and variance estimates (uncertainty around the prediction) at future time steps.</li>
          <li><strong>Logarithmic CBF formulation:</strong> Instead of the standard h(x) = distance - safety_margin, the barrier is formulated as h(x) = log(distance - safety_margin), which goes to negative infinity as the distance approaches the margin. This provides stronger repulsion near the boundary.</li>
          <li><strong>Probabilistic safety condition:</strong> The CBF decrease condition is reformulated as a chance constraint: P(h_dot + alpha(h) &ge; 0) &ge; 1 - delta, where delta is a user-specified risk tolerance. The GP uncertainty is propagated through the barrier function to compute this probability.</li>
          <li><strong>Online GP updates:</strong> As new obstacle observations arrive, the GP posterior is updated incrementally using sparse GP approximations (inducing points) to maintain computational tractability.</li>
          <li><strong>QP safety filter:</strong> The probabilistic CBF constraint is converted to a deterministic constraint using GP mean and variance, then solved as a standard QP.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Novel Log-GP-CBF formulation</strong> that naturally combines logarithmic barriers with GP uncertainty for stronger safety near boundaries</li>
          <li><strong>Probabilistic safety guarantees</strong> with user-tunable risk tolerance parameter delta</li>
          <li><strong>Online GP adaptation</strong> using sparse approximations that update the obstacle model in real-time as new observations arrive</li>
          <li>Theoretical analysis showing that the log formulation reduces conservatism compared to standard GP-CBF approaches</li>
          <li>Demonstration in multi-obstacle dynamic environments with heterogeneous obstacle behaviors</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The GP uses a squared exponential kernel with automatic relevance determination (ARD). Hyperparameters are initialized from a short observation window (2 seconds) and updated every 10 observations using marginal likelihood optimization. Sparse GP with M=50 inducing points is used for computational efficiency. The risk tolerance delta is set to 0.05 (95% safety probability). The robot is modeled as a double integrator with state [x, y, vx, vy]. The QP is solved using qpOASES at 50 Hz. Experiments use a simulated environment with 3-8 dynamic obstacles following various motion patterns (linear, sinusoidal, random walk).</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Method</th><th>Empirical Safety (%)</th><th>Avg. Path Length</th><th>Conservatism Index</th></tr>
          <tr><td>Log-GP-CBF (Ours)</td><td>97.8</td><td>1.15x optimal</td><td>0.22</td></tr>
          <tr><td>Standard GP-CBF</td><td>98.1</td><td>1.38x optimal</td><td>0.41</td></tr>
          <tr><td>Deterministic CBF</td><td>89.3</td><td>1.05x optimal</td><td>0.08</td></tr>
          <tr><td>Worst-case robust CBF</td><td>99.9</td><td>1.72x optimal</td><td>0.65</td></tr>
        </table>
        <p>The Log-GP-CBF achieves a strong balance between safety and conservatism. Compared to standard GP-CBF, it reduces path length by 17% while maintaining comparable safety rates. The deterministic CBF achieves shorter paths but violates safety in ~11% of scenarios due to unmodeled obstacle dynamics. The worst-case robust CBF is extremely safe but overly conservative, resulting in 72% longer paths. The logarithmic formulation's key advantage is smoother behavior near obstacles, avoiding the abrupt control corrections seen with polynomial barriers.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Principled integration of Bayesian uncertainty (GP) with safety-critical control (CBF), providing a clean probabilistic safety framework</li>
          <li>The log barrier naturally provides stronger repulsion near boundaries without requiring manual tuning of class-K functions</li>
          <li>Online GP adaptation allows the system to improve its obstacle model as more data becomes available</li>
          <li>Reduced conservatism compared to standard GP-CBF, enabling more efficient navigation</li>
          <li>User-tunable risk tolerance (delta) provides a clear knob for balancing safety and performance</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>GP computational cost scales cubically with the number of observations; sparse approximations help but introduce approximation error</li>
          <li>Squared exponential kernel assumes smooth obstacle trajectories; abrupt changes (e.g., a pedestrian suddenly stopping) violate the smoothness prior</li>
          <li>The probabilistic safety guarantee assumes the GP model is well-calibrated; model misspecification can invalidate the confidence bounds</li>
          <li>Limited to relatively low-dimensional state spaces due to GP scalability constraints</li>
          <li>The log barrier is undefined when distance equals the safety margin, requiring careful numerical handling</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the choice of GP kernel affect the safety guarantees, and could non-stationary kernels better capture heterogeneous obstacle behaviors?</li>
          <li>Could deep kernel learning or neural process models replace the standard GP for better scalability to high-dimensional settings?</li>
          <li>How should the risk tolerance delta be set in practice — is there a principled way to calibrate it based on the application domain?</li>
          <li>Can the Log-GP-CBF framework handle cooperative multi-robot scenarios where each robot is both an agent and a dynamic obstacle?</li>
          <li>What happens when the GP observation model is corrupted by adversarial sensor noise — does the safety guarantee degrade gracefully?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>The Log-GP-CBF represents a thoughtful fusion of Bayesian modeling and safety-critical control theory. Its key practical advantage is the reduced conservatism compared to standard uncertainty-aware CBFs, achieved through the favorable interaction between the logarithmic barrier and GP variance bounds. This enables robots to navigate dynamic environments more efficiently while maintaining strong probabilistic safety guarantees.</p>
        <p>For practitioners deploying robots in environments with uncertain dynamic obstacles (warehouses, hospitals, pedestrian areas), the Log-GP-CBF provides a principled framework that adapts to observed obstacle behavior. The main caveat is the GP scalability limitation, which restricts applicability to settings with a moderate number of obstacles and observations.</p>
      `
    },
    ko: {
      title: "동적 환경에서의 안전한 로봇 내비게이션을 위한 동적 로그-가우시안 프로세스 제어 장벽 함수",
      summary: "로그 장벽 함수와 가우시안 프로세스 모델을 결합하여 장애물 운동 불확실성을 고려하는 적응형 CBF를 생성하며, 동적 환경에서 확률적 안전 보장을 제공합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 로그 장벽 함수 공식과 가우시안 프로세스 회귀를 결합하여 장애물 운동 불확실성을 모델링하는 <strong>로그-가우시안 프로세스 CBF(Log-GP-CBF)</strong>를 소개하며, 관측된 동적 장애물 행동에 실시간으로 적응하는 확률적 안전 보장을 제공합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>로그 장벽 공식과 장애물 동역학의 가우시안 프로세스 모델을 결합하여 장애물 운동이 불확실한 동적 환경에서 확률적 안전 보장을 제공하는 제어 장벽 함수를 어떻게 설계할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>표준 CBF는 장애물 위치와 동역학에 대한 결정론적 지식을 가정합니다. 실제 동적 환경에서 장애물 운동은 본질적으로 불확실합니다 -- 보행자는 예측할 수 없이 방향을 바꿀 수 있고, 차량은 가속하거나 제동할 수 있으며, 센서 측정에는 노이즈가 있습니다. 이 불확실성을 무시하면 안전하지 않은 행동(위험 과소평가)이나 과도하게 보수적인 행동(최악의 경우를 확실한 것으로 처리)으로 이어질 수 있습니다.</p>
        <p>가우시안 프로세스(GP)는 불확실성 모델링을 위한 원칙적 베이지안 프레임워크를 제공합니다: 장애물 위치의 점 예측뿐만 아니라 예측 불확실성을 정량화하는 신뢰 구간도 생성합니다. 그러나 GP 불확실성을 CBF 프레임워크에 통합하는 것은 CBF 감소 조건이 확률적으로 유지되어야 하기 때문에 비자명합니다.</p>
        <p>로그 장벽 함수는 시스템이 비안전 경계에 접근할 때 무한 페널티를 제공하여 자연스러운 "소프트 월" 효과를 생성합니다. 로그 공식은 GP 불확실성 한계와도 유리하게 상호작용하여 다루기 쉬운 확률적 안전 조건을 가능하게 합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>Log-GP-CBF 프레임워크는 다음과 같이 작동합니다:</p>
        <ul>
          <li><strong>가우시안 프로세스 장애물 모델:</strong> GP가 온라인으로 훈련되어 장애물 궤적을 모델링합니다. GP 사후 분포는 미래 시간 단계에서 평균 예측(예상 장애물 위치)과 분산 추정(예측 주변 불확실성)을 제공합니다.</li>
          <li><strong>로그 CBF 공식:</strong> 표준 h(x) = 거리 - 안전 마진 대신, 장벽이 h(x) = log(거리 - 안전 마진)으로 공식화되어 거리가 마진에 접근할 때 음의 무한으로 갑니다.</li>
          <li><strong>확률적 안전 조건:</strong> CBF 감소 조건이 기회 제약으로 재공식화됩니다: P(h_dot + alpha(h) &ge; 0) &ge; 1 - delta.</li>
          <li><strong>온라인 GP 업데이트:</strong> 새로운 장애물 관측이 도착하면 희소 GP 근사(유도 포인트)를 사용하여 GP 사후 분포를 점진적으로 업데이트합니다.</li>
          <li><strong>QP 안전 필터:</strong> 확률적 CBF 제약이 GP 평균과 분산을 사용하여 결정론적 제약으로 변환된 후 표준 QP로 풉니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>경계 근처에서 더 강한 안전을 위해 로그 장벽과 GP 불확실성을 자연스럽게 결합하는 <strong>새로운 Log-GP-CBF 공식</strong></li>
          <li>사용자 조정 가능한 위험 허용 매개변수 delta가 있는 <strong>확률적 안전 보장</strong></li>
          <li>새로운 관측이 도착하면 실시간으로 장애물 모델을 업데이트하는 <strong>온라인 GP 적응</strong></li>
          <li>로그 공식이 표준 GP-CBF 접근법에 비해 보수성을 줄인다는 이론적 분석</li>
          <li>이질적 장애물 행동을 가진 다중 장애물 동적 환경에서의 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>GP는 자동 관련성 결정(ARD)을 가진 제곱 지수 커널을 사용합니다. 초매개변수는 짧은 관측 창(2초)에서 초기화되고 10개 관측마다 주변 우도 최적화로 업데이트됩니다. M=50 유도 포인트의 희소 GP를 계산 효율성을 위해 사용합니다. 위험 허용 delta = 0.05(95% 안전 확률). 로봇은 상태 [x, y, vx, vy]의 이중 적분기로 모델링됩니다. QP는 qpOASES로 50 Hz에서 풉니다. 다양한 운동 패턴(선형, 사인파, 랜덤 워크)을 따르는 3-8개 동적 장애물이 있는 시뮬레이션 환경에서 실험합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>방법</th><th>경험적 안전률 (%)</th><th>평균 경로 길이</th><th>보수성 지수</th></tr>
          <tr><td>Log-GP-CBF (제안)</td><td>97.8</td><td>1.15x 최적</td><td>0.22</td></tr>
          <tr><td>표준 GP-CBF</td><td>98.1</td><td>1.38x 최적</td><td>0.41</td></tr>
          <tr><td>결정론적 CBF</td><td>89.3</td><td>1.05x 최적</td><td>0.08</td></tr>
          <tr><td>최악 경우 강건 CBF</td><td>99.9</td><td>1.72x 최적</td><td>0.65</td></tr>
        </table>
        <p>Log-GP-CBF는 안전과 보수성 사이의 강한 균형을 달성합니다. 표준 GP-CBF와 비교하여 비슷한 안전률을 유지하면서 경로 길이를 17% 줄입니다. 결정론적 CBF는 더 짧은 경로를 달성하지만 미모델링 장애물 동역학으로 인해 시나리오의 ~11%에서 안전을 위반합니다. 로그 공식의 핵심 이점은 장애물 근처에서 다항식 장벽에서 보이는 갑작스러운 제어 보정을 피하는 더 매끄러운 행동입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>베이지안 불확실성(GP)과 안전 임계 제어(CBF)의 원칙적 통합으로 깔끔한 확률적 안전 프레임워크 제공</li>
          <li>로그 장벽이 class-K 함수의 수동 튜닝 없이 경계 근처에서 자연스럽게 더 강한 반발력 제공</li>
          <li>온라인 GP 적응으로 더 많은 데이터가 사용 가능해지면 시스템이 장애물 모델을 개선</li>
          <li>표준 GP-CBF에 비해 보수성 감소로 더 효율적인 내비게이션 가능</li>
          <li>사용자 조정 가능한 위험 허용(delta)이 안전과 성능 사이의 균형을 위한 명확한 노브 제공</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>GP 계산 비용이 관측 수의 세제곱으로 증가; 희소 근사가 도움이 되지만 근사 오차 발생</li>
          <li>제곱 지수 커널이 매끄러운 장애물 궤적을 가정; 갑작스러운 변화는 매끄러움 사전을 위반</li>
          <li>확률적 안전 보장이 GP 모델의 잘 보정됨을 가정; 모델 오명세는 신뢰 한계를 무효화 가능</li>
          <li>GP 확장성 제약으로 비교적 저차원 상태 공간으로 제한</li>
          <li>로그 장벽이 거리가 안전 마진과 같을 때 정의되지 않아 신중한 수치적 처리 필요</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>GP 커널의 선택이 안전 보장에 어떤 영향을 미치며, 비정상 커널이 이질적 장애물 행동을 더 잘 포착할 수 있는가?</li>
          <li>딥 커널 학습이나 신경 프로세스 모델이 고차원 설정으로의 더 나은 확장성을 위해 표준 GP를 대체할 수 있는가?</li>
          <li>위험 허용 delta를 실제로 어떻게 설정해야 하며, 응용 도메인에 기반하여 보정하는 원칙적 방법이 있는가?</li>
          <li>Log-GP-CBF 프레임워크가 각 로봇이 에이전트이면서 동적 장애물인 협력적 다중 로봇 시나리오를 처리할 수 있는가?</li>
          <li>GP 관측 모델이 적대적 센서 노이즈로 손상될 때 안전 보장이 우아하게 저하되는가?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>Log-GP-CBF는 베이지안 모델링과 안전 임계 제어 이론의 사려 깊은 융합을 나타냅니다. 핵심 실용적 이점은 로그 장벽과 GP 분산 한계 사이의 유리한 상호작용을 통해 달성되는, 표준 불확실성 인식 CBF 대비 감소된 보수성입니다.</p>
        <p>불확실한 동적 장애물이 있는 환경(창고, 병원, 보행자 구역)에 로봇을 배포하는 실무자에게 Log-GP-CBF는 관측된 장애물 행동에 적응하는 원칙적 프레임워크를 제공합니다. 주요 주의사항은 장애물과 관측의 수가 적당한 설정으로 적용 가능성을 제한하는 GP 확장성 한계입니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. Perception-Limited Smooth Safety Filtering
  // ====================================================================
  {
    id: "perception-limited-safety",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Smaili, L., Berkane, S.",
    venue: "IFAC 2025",
    image: "images/perception-limited-safety/thumbnail.png",
    link: "",
    tags: ["AI Security", "Safety Filter", "Perception", "Smooth Control"],
    en: {
      title: "Perception-Limited Smooth Safety Filtering",
      summary: "Addresses the problem of safety filtering when the robot has limited perception range, proposing smooth safety filters that avoid the chattering behavior of standard CBF-QP approaches near the perception boundary.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper tackles the underexplored problem of <strong>safety filtering under limited perception</strong>, where the robot can only detect obstacles within a finite sensing range, and proposes smooth safety filter formulations that avoid the chattering and discontinuous control behavior that standard CBF-QP approaches exhibit near the perception boundary.</p>

        <h2>Research Question</h2>
        <blockquote>How can we design safety filters that guarantee collision avoidance when the robot has a limited perception range, and can we ensure smooth (non-chattering) control behavior as obstacles enter and exit the perception field?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Standard Control Barrier Function safety filters assume global knowledge of obstacle positions. In practice, robots have limited sensing range — LiDAR and cameras can only detect obstacles within a finite radius. When an obstacle first enters the perception range, a naive CBF-based safety filter experiences a discontinuity: the CBF constraint suddenly appears, potentially causing a large, abrupt control correction that is uncomfortable and may be mechanically damaging.</p>
        <p>This "perception boundary problem" is more than a theoretical nuisance. In mobile robot navigation, chattering at the perception boundary leads to jerky motion, wheel slip, and passenger discomfort. In manipulation, sudden corrections can cause excessive joint torques. The problem is fundamental: the safe set changes instantaneously as obstacles enter and exit the sensing range.</p>
        <p>This paper proposes a smooth transition mechanism that gradually activates the CBF constraint as obstacles approach from the perception boundary, eliminating discontinuities while preserving safety guarantees within the perception range.</p>

        <h2>Architecture / Methodology</h2>
        <p>The smooth safety filter design incorporates three key ideas:</p>
        <ul>
          <li><strong>Perception-aware CBF:</strong> The standard CBF h(x) is modified to include a perception-dependent activation function sigma(d) that smoothly transitions from 0 (obstacle outside perception range) to 1 (obstacle well within perception range). The modified barrier is h_p(x) = sigma(d) * h(x) + (1 - sigma(d)) * h_max, where d is the distance to the perception boundary.</li>
          <li><strong>Smooth activation function:</strong> sigma(d) is designed as a bump function or sigmoid that is exactly 0 outside the perception range and transitions smoothly to 1 within a buffer zone inside the perception boundary. This ensures that the CBF constraint enters the QP smoothly rather than discontinuously.</li>
          <li><strong>Buffer zone design:</strong> A buffer zone between the perception boundary and the nominal sensing range is introduced. Within this buffer, the CBF constraint strength increases gradually, giving the controller time to react smoothly to newly detected obstacles.</li>
          <li><strong>Safety guarantee analysis:</strong> The paper proves that if the robot velocity and obstacle approach speed are bounded, the smooth filter guarantees safety within the effective perception range (perception range minus buffer zone). The buffer size depends on maximum approach speed and controller bandwidth.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Formal characterization of the perception boundary problem</strong> in CBF-based safety filtering, identifying the source of chattering behavior</li>
          <li><strong>Smooth perception-aware CBF formulation</strong> that eliminates control discontinuities at the perception boundary</li>
          <li>Theoretical analysis of the <strong>buffer zone size</strong> required to guarantee safety as a function of robot speed and obstacle dynamics</li>
          <li>Proof that smooth filtering preserves the <strong>forward invariance property</strong> within the effective perception range</li>
          <li>Demonstration that smooth filtering improves control quality (reduced jerk, torque spikes) without sacrificing safety</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The approach is purely optimization-based with no learning component. The smooth activation function uses a C-infinity bump function with support on the buffer zone [R_eff, R_max], where R_max is the sensing range and R_eff = R_max - delta_R is the effective safety range. The buffer width delta_R is computed as delta_R = (v_max + v_obs_max) / alpha_min, where v_max is the robot's maximum speed, v_obs_max is the maximum obstacle approach speed, and alpha_min is the minimum class-K function value. The QP is solved using qpOASES. Experiments use a unicycle robot model (v_max = 1.0 m/s, omega_max = 2.0 rad/s) with R_max = 5.0 m sensing range in a simulated environment with moving obstacles.</p>

        <h2>Results</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>Method</th><th>Collisions (100 trials)</th><th>Max Jerk (m/s^3)</th><th>Avg. Control Effort</th><th>Chattering Events</th></tr>
          <tr><td>Smooth Filter (Ours)</td><td>0</td><td>2.1</td><td>0.85</td><td>0</td></tr>
          <tr><td>Standard CBF-QP</td><td>0</td><td>12.7</td><td>1.12</td><td>47</td></tr>
          <tr><td>Reduced Sensing Range</td><td>0</td><td>3.5</td><td>0.92</td><td>0</td></tr>
          <tr><td>No Safety Filter</td><td>23</td><td>0.8</td><td>0.61</td><td>0</td></tr>
        </table>
        <p>The smooth filter achieves zero collisions while dramatically reducing maximum jerk (83% reduction vs. standard CBF-QP) and eliminating chattering events entirely. The alternative of simply reducing the sensing range (to avoid perception boundary interactions) is safe but sacrifices useful perception range. The smooth filter preserves the full sensing range while achieving control quality close to the reduced-range approach. Average control effort is also lower for the smooth filter, as it avoids the energy wasted on abrupt corrections.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a real and underappreciated problem: most CBF papers ignore the perception boundary entirely</li>
          <li>Clean mathematical formulation with C-infinity smoothness guarantees</li>
          <li>Practical buffer zone sizing formula that depends on physically meaningful quantities (speeds, bandwidth)</li>
          <li>No learning or data required — the approach is purely analytical and deployable immediately</li>
          <li>Significant improvement in control quality (jerk, chattering) with no loss of safety</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>The buffer zone reduces the effective safety range; for robots with already limited sensing, this is a meaningful loss</li>
          <li>Assumes known maximum obstacle approach speed; if an obstacle approaches faster than expected, the buffer may be insufficient</li>
          <li>The activation function design introduces additional hyperparameters (buffer width, transition sharpness) that require tuning</li>
          <li>Analysis assumes obstacles are detected as soon as they enter the perception range, ignoring detection latency and false negatives</li>
          <li>Limited to CBF-QP safety filters; extension to CBF-MPC with perception limits is not addressed</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the smooth filter interact with obstacle tracking systems that have non-zero detection delay?</li>
          <li>Could the buffer zone width be made adaptive based on current robot speed rather than worst-case maximum speed?</li>
          <li>How does sensor noise at the perception boundary (where measurements are least reliable) affect the smooth filter's performance?</li>
          <li>Can the smooth activation concept be extended to handle limited field-of-view (not just limited range)?</li>
          <li>What is the minimum sensing range for which the smooth filter still provides meaningful safety, given typical buffer zone sizes?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper identifies and solves a practical problem that most CBF literature overlooks: what happens when obstacles appear at the edge of the robot's perception range? The smooth activation mechanism is simple, principled, and immediately deployable. The buffer zone sizing formula provides a clear design guideline that connects sensing capabilities to achievable safety guarantees.</p>
        <p>For any team deploying CBF-based safety filters on real robots with finite sensing range, this paper's contribution is directly applicable. The smooth filter should be the default approach — there is no reason to accept the chattering behavior of standard CBF-QP when a smooth alternative exists with comparable safety and superior control quality.</p>
      `
    },
    ko: {
      title: "인식 제한 환경에서의 매끄러운 안전 필터링",
      summary: "로봇의 인식 범위가 제한된 상황에서의 안전 필터링 문제를 다루며, 인식 경계 근처에서 표준 CBF-QP 접근법의 채터링 행동을 방지하는 매끄러운 안전 필터를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 로봇이 유한한 센싱 범위 내에서만 장애물을 감지할 수 있는 <strong>제한된 인식 하에서의 안전 필터링</strong>이라는 미개척 문제를 다루며, 표준 CBF-QP 접근법이 인식 경계 근처에서 보이는 채터링과 불연속 제어 행동을 방지하는 매끄러운 안전 필터 공식을 제안합니다.</p>

        <h2>연구 질문</h2>
        <blockquote>로봇의 인식 범위가 제한된 상황에서 충돌 회피를 보장하는 안전 필터를 어떻게 설계할 수 있으며, 장애물이 인식 영역에 진입하고 이탈할 때 매끄러운(비채터링) 제어 행동을 보장할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>표준 제어 장벽 함수 안전 필터는 장애물 위치에 대한 전역적 지식을 가정합니다. 실제로 로봇은 유한한 반경 내에서만 장애물을 감지할 수 있는 제한된 센싱 범위를 가집니다. 장애물이 인식 범위에 처음 진입하면 순진한 CBF 기반 안전 필터는 불연속성을 경험합니다: CBF 제약이 갑자기 나타나 큰 갑작스러운 제어 보정을 유발할 수 있습니다.</p>
        <p>이 "인식 경계 문제"는 이론적 성가심 이상입니다. 이동 로봇 내비게이션에서 인식 경계에서의 채터링은 급격한 운동, 휠 슬립, 승객 불편으로 이어집니다. 매니퓰레이션에서 갑작스러운 보정은 과도한 관절 토크를 유발할 수 있습니다.</p>
        <p>본 논문은 장애물이 인식 경계에서 접근할 때 CBF 제약을 점진적으로 활성화하는 매끄러운 전환 메커니즘을 제안하여, 인식 범위 내에서 안전 보장을 유지하면서 불연속성을 제거합니다.</p>

        <h2>아키텍처 / 방법론</h2>
        <p>매끄러운 안전 필터 설계는 세 가지 핵심 아이디어를 통합합니다:</p>
        <ul>
          <li><strong>인식 인식 CBF:</strong> 표준 CBF h(x)가 인식 경계까지의 거리에 따라 0(인식 범위 외 장애물)에서 1(인식 범위 내 장애물)로 매끄럽게 전환되는 활성화 함수 sigma(d)를 포함하도록 수정됩니다.</li>
          <li><strong>매끄러운 활성화 함수:</strong> sigma(d)는 인식 범위 외부에서 정확히 0이고 인식 경계 내부의 버퍼 존에서 매끄럽게 1로 전환되는 범프 함수 또는 시그모이드로 설계됩니다.</li>
          <li><strong>버퍼 존 설계:</strong> 인식 경계와 명목 센싱 범위 사이에 버퍼 존이 도입됩니다. 이 버퍼 내에서 CBF 제약 강도가 점진적으로 증가하여 제어기가 새로 감지된 장애물에 매끄럽게 반응할 시간을 줍니다.</li>
          <li><strong>안전 보장 분석:</strong> 로봇 속도와 장애물 접근 속도가 한정되면, 매끄러운 필터가 유효 인식 범위(인식 범위에서 버퍼 존을 뺀 것) 내에서 안전을 보장함을 증명합니다.</li>
        </ul>

        <h2>주요 기여</h2>
        <ul>
          <li>CBF 기반 안전 필터링에서 채터링 행동의 원인을 식별하는 <strong>인식 경계 문제의 형식적 특성화</strong></li>
          <li>인식 경계에서 제어 불연속성을 제거하는 <strong>매끄러운 인식 인식 CBF 공식</strong></li>
          <li>로봇 속도와 장애물 동역학의 함수로서 안전을 보장하기 위한 <strong>버퍼 존 크기</strong>의 이론적 분석</li>
          <li>매끄러운 필터링이 유효 인식 범위 내에서 <strong>순방향 불변 속성</strong>을 보존한다는 증명</li>
          <li>매끄러운 필터링이 안전을 희생하지 않고 제어 품질(저크, 토크 스파이크 감소)을 향상시킴을 실증</li>
        </ul>

        <h2>훈련 및 구현 세부사항</h2>
        <p>이 접근법은 학습 구성요소가 없는 순수 최적화 기반입니다. 매끄러운 활성화 함수는 버퍼 존 [R_eff, R_max]에서 지원을 가진 C-무한 범프 함수를 사용합니다. 여기서 R_max는 센싱 범위, R_eff = R_max - delta_R은 유효 안전 범위입니다. 버퍼 폭 delta_R = (v_max + v_obs_max) / alpha_min으로 계산됩니다. QP는 qpOASES를 사용하여 풉니다. 유니사이클 로봇 모델(v_max = 1.0 m/s, omega_max = 2.0 rad/s)과 R_max = 5.0 m 센싱 범위를 사용하여 이동 장애물이 있는 시뮬레이션 환경에서 실험합니다.</p>

        <h2>결과</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>방법</th><th>충돌 (100회 시행)</th><th>최대 저크 (m/s^3)</th><th>평균 제어 노력</th><th>채터링 이벤트</th></tr>
          <tr><td>매끄러운 필터 (제안)</td><td>0</td><td>2.1</td><td>0.85</td><td>0</td></tr>
          <tr><td>표준 CBF-QP</td><td>0</td><td>12.7</td><td>1.12</td><td>47</td></tr>
          <tr><td>축소 센싱 범위</td><td>0</td><td>3.5</td><td>0.92</td><td>0</td></tr>
          <tr><td>안전 필터 없음</td><td>23</td><td>0.8</td><td>0.61</td><td>0</td></tr>
        </table>
        <p>매끄러운 필터는 충돌 없이 최대 저크를 극적으로 줄이고(표준 CBF-QP 대비 83% 감소) 채터링 이벤트를 완전히 제거합니다. 단순히 센싱 범위를 줄이는 대안은 안전하지만 유용한 인식 범위를 희생합니다. 매끄러운 필터는 전체 센싱 범위를 보존하면서 축소 범위 접근법에 근접한 제어 품질을 달성합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>대부분의 CBF 논문이 완전히 무시하는 실제적이고 과소평가된 문제를 해결</li>
          <li>C-무한 매끄러움 보장이 있는 깔끔한 수학적 공식</li>
          <li>물리적으로 의미 있는 양(속도, 대역폭)에 의존하는 실용적 버퍼 존 크기 공식</li>
          <li>학습이나 데이터 불필요 -- 순수 분석적이며 즉시 배포 가능한 접근법</li>
          <li>안전 손실 없이 제어 품질(저크, 채터링)의 상당한 향상</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>버퍼 존이 유효 안전 범위를 줄임; 이미 제한된 센싱을 가진 로봇에게는 의미 있는 손실</li>
          <li>알려진 최대 장애물 접근 속도를 가정; 예상보다 빠른 장애물 접근 시 버퍼가 불충분할 수 있음</li>
          <li>활성화 함수 설계가 튜닝이 필요한 추가 초매개변수(버퍼 폭, 전환 급격도) 도입</li>
          <li>분석이 장애물이 인식 범위에 진입하면 즉시 감지된다고 가정, 감지 지연과 미감지를 무시</li>
          <li>CBF-QP 안전 필터로 제한; 인식 제한이 있는 CBF-MPC로의 확장 미해결</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>매끄러운 필터가 비영 감지 지연이 있는 장애물 추적 시스템과 어떻게 상호작용하는가?</li>
          <li>최악의 최대 속도 대신 현재 로봇 속도를 기반으로 버퍼 존 폭을 적응적으로 만들 수 있는가?</li>
          <li>측정이 가장 신뢰할 수 없는 인식 경계에서의 센서 노이즈가 매끄러운 필터의 성능에 어떤 영향을 미치는가?</li>
          <li>매끄러운 활성화 개념을 제한된 범위뿐만 아니라 제한된 시야각을 처리하도록 확장할 수 있는가?</li>
          <li>일반적인 버퍼 존 크기를 고려할 때 매끄러운 필터가 의미 있는 안전을 제공하는 최소 센싱 범위는?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 대부분의 CBF 문헌이 간과하는 실용적 문제를 식별하고 해결합니다: 장애물이 로봇의 인식 범위 가장자리에 나타날 때 무슨 일이 일어나는가? 매끄러운 활성화 메커니즘은 단순하고 원칙적이며 즉시 배포 가능합니다. 버퍼 존 크기 공식은 센싱 능력을 달성 가능한 안전 보장에 연결하는 명확한 설계 지침을 제공합니다.</p>
        <p>유한 센싱 범위를 가진 실제 로봇에 CBF 기반 안전 필터를 배포하는 모든 팀에게 이 논문의 기여는 직접 적용 가능합니다. 매끄러운 필터는 기본 접근법이어야 합니다 -- 비슷한 안전과 우수한 제어 품질을 가진 매끄러운 대안이 존재할 때 표준 CBF-QP의 채터링 행동을 수용할 이유가 없습니다.</p>
      `
    }
  }
];
