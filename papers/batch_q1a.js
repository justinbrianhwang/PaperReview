const BATCH_Q1A = [
  // ====================================================================
  // 1. bayesian-qec-discovery
  // ====================================================================
  {
    id: "bayesian-qec-discovery",
    date: "2025-04-11",
    authors: "Chengyu, Y., et al.",
    venue: "Preprint 2025",
    image: "images/bayesian-qec-discovery/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Bayesian Optimization"],
    en: {
      title: "Bayesian Optimization for Quantum Error-Correcting Code Discovery",
      summary: "Proposes a Bayesian optimization framework to automatically discover new quantum error-correcting codes by searching over parameterized code families, reducing the reliance on human-designed constructions.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper reframes quantum error-correcting code design as a <strong>black-box optimization problem</strong> and demonstrates that Bayesian optimization can discover competitive or novel QEC codes without manual algebraic construction.</p>

        <h2>Research Question</h2>
        <blockquote>Can Bayesian optimization systematically explore the space of quantum error-correcting codes and discover codes with favorable distance and encoding-rate properties, rivaling or surpassing hand-designed constructions?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Designing good quantum error-correcting codes traditionally requires deep algebraic expertise. The search space of stabilizer codes grows exponentially, making exhaustive search infeasible. Bayesian optimization (BO) offers a principled way to explore expensive-to-evaluate black-box functions with a surrogate model and acquisition function, making it a natural fit for code discovery where each evaluation involves computing code distance.</p>
        <p>Prior work has explored random search and reinforcement learning for code construction, but BO's sample efficiency and ability to handle noisy objectives make it particularly appealing for this domain where each fitness evaluation is computationally costly.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Search space:</strong> Parameterized families of stabilizer codes, encoded as binary matrices representing stabilizer generators.</li>
          <li><strong>Objective:</strong> Maximize code distance for a given number of physical and logical qubits, or optimize a combined metric of distance and encoding rate.</li>
          <li><strong>Surrogate model:</strong> Gaussian process with a kernel tailored to the discrete/combinatorial structure of stabilizer codes.</li>
          <li><strong>Acquisition function:</strong> Expected improvement (EI) guides exploration vs. exploitation trade-off.</li>
        </ul>
        <figure>
          <img src="images/bayesian-qec-discovery/thumbnail.png" alt="Bayesian QEC discovery pipeline">
          <figcaption>Overview of the Bayesian optimization loop for QEC code discovery.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>BO framework for QEC:</strong> First systematic application of Bayesian optimization to quantum code discovery with stabilizer parameterization.</li>
          <li><strong>Novel codes found:</strong> Discovers codes matching or exceeding known constructions for small-to-medium block lengths.</li>
          <li><strong>Sample efficiency:</strong> Requires far fewer evaluations than random or grid search to find high-quality codes.</li>
          <li><strong>Generalizable pipeline:</strong> Framework can be adapted to different code families (CSS, non-CSS, subsystem codes).</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code families</td><td>Stabilizer codes, [[n,k,d]] with n up to ~30</td></tr>
            <tr><td>BO iterations</td><td>200-500 per search run</td></tr>
            <tr><td>Surrogate</td><td>Gaussian process with Hamming-based kernel</td></tr>
            <tr><td>Distance computation</td><td>Exact via stabilizer tableau methods</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Code parameters</th><th>Best known d</th><th>BO-discovered d</th></tr></thead>
          <tbody>
            <tr><td>[[15, 1, d]]</td><td>7 (Reed-Muller)</td><td>7 (matched)</td></tr>
            <tr><td>[[17, 1, d]]</td><td>7</td><td>7 (matched)</td></tr>
            <tr><td>Various [[n,k,d]]</td><td>Varies</td><td>Competitive or improved</td></tr>
          </tbody>
        </table>
        <p>BO consistently matches known optimal codes and in some parameter regimes finds codes not previously catalogued, demonstrating the method's potential as an automated discovery tool.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant formulation of code discovery as a black-box optimization problem.</li>
          <li>Sample-efficient compared to random search and evolutionary methods.</li>
          <li>Modular framework easily extensible to other code families and objectives.</li>
          <li>Reduces barrier to entry: no deep algebraic expertise needed to find good codes.</li>
          <li>Clear experimental protocol with reproducible baselines.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Scalability limited to moderate block lengths due to exponential growth of the search space and distance computation cost.</li>
          <li>Gaussian process surrogate may struggle with highly discrete, non-smooth landscapes at larger scales.</li>
          <li>Does not incorporate decoder-aware optimization (found codes may be hard to decode efficiently).</li>
          <li>Comparison against algebraic methods is somewhat unfair since those methods exploit structural insight BO does not.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the framework be extended to optimize for decoder-friendliness alongside distance?</li>
          <li>How does performance scale when targeting qLDPC codes with hundreds of qubits?</li>
          <li>Could hybrid approaches combining algebraic structure with BO yield better results?</li>
          <li>What kernel designs best capture the algebraic structure of stabilizer codes?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates that machine-learning-driven search, specifically Bayesian optimization, is a viable and sample-efficient approach to discovering quantum error-correcting codes. While it currently works best at moderate scales, the framework opens the door to automated code design pipelines that complement traditional algebraic methods.</p>
      `
    },
    ko: {
      title: "베이지안 최적화를 이용한 양자 오류 정정 코드 탐색",
      summary: "매개변수화된 코드 계열을 탐색하여 새로운 양자 오류 정정 코드를 자동으로 발견하는 베이지안 최적화 프레임워크를 제안하며, 수동 설계 의존도를 줄입니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 양자 오류 정정 코드 설계를 <strong>블랙박스 최적화 문제</strong>로 재구성하고, 베이지안 최적화가 수동 대수적 구성 없이 경쟁력 있거나 새로운 QEC 코드를 발견할 수 있음을 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>베이지안 최적화가 양자 오류 정정 코드의 공간을 체계적으로 탐색하여 수동 설계 구성에 필적하거나 능가하는 거리 및 인코딩률 속성을 가진 코드를 발견할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>좋은 양자 오류 정정 코드 설계는 전통적으로 깊은 대수적 전문지식을 요구합니다. 안정기 코드의 탐색 공간은 기하급수적으로 증가하여 완전 탐색이 불가능합니다. 베이지안 최적화(BO)는 대리 모델과 획득 함수를 통해 비용이 많이 드는 블랙박스 함수를 원칙적으로 탐색하는 방법으로, 각 평가마다 코드 거리 계산이 필요한 코드 탐색에 자연스럽게 적합합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>탐색 공간:</strong> 안정기 생성원을 나타내는 이진 행렬로 인코딩된 매개변수화 안정기 코드 계열.</li>
          <li><strong>목적 함수:</strong> 주어진 물리적/논리적 큐비트 수에 대해 코드 거리 최대화 또는 거리와 인코딩률의 결합 지표 최적화.</li>
          <li><strong>대리 모델:</strong> 안정기 코드의 이산/조합 구조에 맞춤화된 커널을 가진 가우시안 프로세스.</li>
          <li><strong>획득 함수:</strong> 기대 개선(EI)이 탐색 대 활용 균형을 안내.</li>
        </ul>
        <figure>
          <img src="images/bayesian-qec-discovery/thumbnail.png" alt="베이지안 QEC 발견 파이프라인">
          <figcaption>QEC 코드 발견을 위한 베이지안 최적화 루프 개요.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>QEC용 BO 프레임워크:</strong> 안정기 매개변수화를 통한 양자 코드 발견에 베이지안 최적화를 최초로 체계적 적용.</li>
          <li><strong>새로운 코드 발견:</strong> 소~중 블록 길이에서 알려진 구성에 필적하거나 능가하는 코드 발견.</li>
          <li><strong>샘플 효율성:</strong> 랜덤 또는 그리드 탐색보다 훨씬 적은 평가로 고품질 코드 발견.</li>
          <li><strong>일반화 가능한 파이프라인:</strong> 다양한 코드 계열(CSS, 비CSS, 서브시스템 코드)에 적응 가능.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 계열</td><td>안정기 코드, [[n,k,d]], n 최대 ~30</td></tr>
            <tr><td>BO 반복</td><td>탐색 실행당 200-500회</td></tr>
            <tr><td>대리 모델</td><td>해밍 기반 커널의 가우시안 프로세스</td></tr>
            <tr><td>거리 계산</td><td>안정기 타블로 방법을 통한 정확 계산</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>코드 매개변수</th><th>기존 최고 d</th><th>BO 발견 d</th></tr></thead>
          <tbody>
            <tr><td>[[15, 1, d]]</td><td>7 (Reed-Muller)</td><td>7 (일치)</td></tr>
            <tr><td>[[17, 1, d]]</td><td>7</td><td>7 (일치)</td></tr>
            <tr><td>다양한 [[n,k,d]]</td><td>다양</td><td>경쟁적 또는 개선</td></tr>
          </tbody>
        </table>
        <p>BO는 일관되게 알려진 최적 코드에 필적하며, 일부 매개변수 영역에서는 이전에 목록에 없던 코드를 발견하여 자동 탐색 도구로서의 잠재력을 보여줍니다.</p>

        <h2>강점</h2>
        <ul>
          <li>코드 발견을 블랙박스 최적화 문제로 우아하게 정식화.</li>
          <li>랜덤 탐색 및 진화적 방법 대비 샘플 효율적.</li>
          <li>다른 코드 계열과 목적 함수로 쉽게 확장 가능한 모듈식 프레임워크.</li>
          <li>진입 장벽 감소: 좋은 코드를 찾는 데 깊은 대수적 전문지식 불필요.</li>
          <li>재현 가능한 기준선이 있는 명확한 실험 프로토콜.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>탐색 공간의 기하급수적 증가와 거리 계산 비용으로 중간 블록 길이로 확장성 제한.</li>
          <li>가우시안 프로세스 대리 모델이 대규모에서 고도로 이산적이고 비매끄러운 지형에 어려움을 겪을 수 있음.</li>
          <li>디코더 인식 최적화를 포함하지 않아 발견된 코드가 효율적으로 디코딩하기 어려울 수 있음.</li>
          <li>대수적 방법과의 비교는 다소 불공정한데, 그 방법들은 BO가 활용하지 않는 구조적 통찰을 이용.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>프레임워크를 거리와 함께 디코더 친화성을 최적화하도록 확장할 수 있는가?</li>
          <li>수백 큐비트의 qLDPC 코드를 대상으로 할 때 성능이 어떻게 확장되는가?</li>
          <li>대수적 구조와 BO를 결합한 하이브리드 접근법이 더 나은 결과를 낼 수 있는가?</li>
          <li>안정기 코드의 대수적 구조를 가장 잘 포착하는 커널 설계는 무엇인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 머신러닝 기반 탐색, 특히 베이지안 최적화가 양자 오류 정정 코드 발견에 실행 가능하고 샘플 효율적인 접근법임을 보여줍니다. 현재 중간 규모에서 가장 잘 작동하지만, 전통적 대수적 방법을 보완하는 자동화된 코드 설계 파이프라인의 가능성을 열어줍니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. alphasyndrome
  // ====================================================================
  {
    id: "alphasyndrome",
    date: "2025-04-11",
    authors: "Liu, Y., et al.",
    venue: "Preprint 2025",
    image: "images/alphasyndrome/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Reinforcement Learning"],
    en: {
      title: "AlphaSyndrome: Reinforcement Learning for Quantum Error Correction Scheduling",
      summary: "Introduces AlphaSyndrome, an RL agent that learns optimal scheduling strategies for syndrome extraction in quantum error correction, adapting measurement order to minimize logical error rates.",
      review: `
        <h2>One-line Verdict</h2>
        <p>AlphaSyndrome applies <strong>reinforcement learning to optimize the scheduling of syndrome measurements</strong> in QEC circuits, demonstrating that adaptive ordering can meaningfully reduce logical error rates compared to fixed schedules.</p>

        <h2>Research Question</h2>
        <blockquote>Can a reinforcement learning agent learn to schedule syndrome extraction measurements in an order that minimizes the logical error rate of a quantum error-correcting code, outperforming fixed or heuristic schedules?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>In quantum error correction, stabilizer measurements must be performed periodically to detect errors. The order in which these measurements are scheduled affects how errors propagate through the circuit. Traditional approaches use fixed schedules, but the optimal ordering depends on the noise model and code structure. RL offers a way to learn adaptive strategies through trial and error.</p>
        <p>This work draws inspiration from AlphaGo-style RL, treating syndrome scheduling as a sequential decision problem where each action selects the next stabilizer to measure.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>State:</strong> Current syndrome history and remaining unmeasured stabilizers in the current round.</li>
          <li><strong>Action:</strong> Selection of the next stabilizer measurement to perform.</li>
          <li><strong>Reward:</strong> Negative logical error rate estimated via Monte Carlo simulation of the full QEC cycle.</li>
          <li><strong>Policy network:</strong> Graph neural network that respects the stabilizer connectivity structure.</li>
          <li><strong>Training:</strong> Proximal policy optimization (PPO) with parallelized environment rollouts.</li>
        </ul>
        <figure>
          <img src="images/alphasyndrome/thumbnail.png" alt="AlphaSyndrome architecture">
          <figcaption>AlphaSyndrome RL pipeline for syndrome scheduling optimization.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Novel RL formulation:</strong> First to cast syndrome measurement scheduling as a Markov decision process for RL optimization.</li>
          <li><strong>GNN-based policy:</strong> Graph neural network policy that generalizes across different code sizes.</li>
          <li><strong>Consistent improvements:</strong> RL-discovered schedules reduce logical error rates by 10-30% over fixed baselines on surface and color codes.</li>
          <li><strong>Transferability:</strong> Policies trained on smaller codes partially transfer to larger instances.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes tested</td><td>Surface code (d=3,5,7), color code (d=3,5)</td></tr>
            <tr><td>RL algorithm</td><td>PPO with 64 parallel environments</td></tr>
            <tr><td>Policy network</td><td>3-layer GNN, hidden dim 128</td></tr>
            <tr><td>Training episodes</td><td>~100K per code instance</td></tr>
            <tr><td>Noise model</td><td>Circuit-level depolarizing noise, p = 0.001-0.01</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Code</th><th>Fixed schedule LER</th><th>RL schedule LER</th><th>Improvement</th></tr></thead>
          <tbody>
            <tr><td>Surface d=5</td><td>Baseline</td><td>~15% lower</td><td>Significant</td></tr>
            <tr><td>Surface d=7</td><td>Baseline</td><td>~20% lower</td><td>Significant</td></tr>
            <tr><td>Color d=5</td><td>Baseline</td><td>~10-25% lower</td><td>Moderate-significant</td></tr>
          </tbody>
        </table>
        <p>The RL agent discovers non-trivial scheduling patterns, such as prioritizing stabilizers near recent error detections and alternating between X and Z stabilizers in specific patterns.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Novel and well-motivated problem formulation connecting RL to a practical QEC challenge.</li>
          <li>GNN architecture naturally encodes the code's structure and enables partial generalization.</li>
          <li>Consistent improvements across multiple codes and noise rates.</li>
          <li>Discovered schedules provide interpretable insights about optimal measurement ordering.</li>
          <li>Thorough ablation studies validate design choices.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Training cost is high: each reward evaluation requires full QEC simulation with decoding.</li>
          <li>Transfer to much larger codes (d > 9) is not demonstrated.</li>
          <li>Assumes a specific noise model; robustness to model mismatch is not fully explored.</li>
          <li>Comparison limited to fixed schedules; comparison with other heuristic optimization methods would strengthen claims.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the RL agent adapt in real-time to changing noise conditions on actual hardware?</li>
          <li>How do RL-discovered schedules interact with different decoder choices?</li>
          <li>Could curriculum learning on increasingly larger codes improve transfer?</li>
          <li>What is the relationship between optimal schedules and the code's symmetry group?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>AlphaSyndrome demonstrates that syndrome measurement scheduling is an underexplored degree of freedom in QEC that can yield meaningful error rate reductions. The RL approach is well-suited to this combinatorial optimization problem and discovers non-obvious strategies that fixed heuristics miss.</p>
      `
    },
    ko: {
      title: "AlphaSyndrome: 양자 오류 정정 스케줄링을 위한 강화학습",
      summary: "신드롬 추출의 최적 스케줄링 전략을 학습하는 RL 에이전트 AlphaSyndrome을 도입하여, 측정 순서를 적응적으로 조정해 논리적 오류율을 최소화합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>AlphaSyndrome은 <strong>강화학습을 적용하여 QEC 회로에서 신드롬 측정 스케줄링을 최적화</strong>하며, 적응적 순서가 고정 스케줄 대비 논리적 오류율을 의미 있게 줄일 수 있음을 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>강화학습 에이전트가 양자 오류 정정 코드의 논리적 오류율을 최소화하는 순서로 신드롬 추출 측정을 스케줄링하는 법을 학습하여, 고정 또는 휴리스틱 스케줄을 능가할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 오류 정정에서 안정기 측정은 오류 감지를 위해 주기적으로 수행되어야 합니다. 이러한 측정의 순서가 회로를 통한 오류 전파에 영향을 미칩니다. 전통적 접근법은 고정 스케줄을 사용하지만, 최적 순서는 잡음 모델과 코드 구조에 따라 달라집니다. RL은 시행착오를 통해 적응적 전략을 학습하는 방법을 제공합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>상태:</strong> 현재 신드롬 이력 및 현재 라운드에서 미측정 안정기.</li>
          <li><strong>행동:</strong> 다음에 수행할 안정기 측정 선택.</li>
          <li><strong>보상:</strong> 전체 QEC 사이클의 몬테카를로 시뮬레이션으로 추정한 음의 논리적 오류율.</li>
          <li><strong>정책 네트워크:</strong> 안정기 연결 구조를 반영하는 그래프 신경망(GNN).</li>
          <li><strong>학습:</strong> 병렬화된 환경 롤아웃을 이용한 PPO(Proximal Policy Optimization).</li>
        </ul>
        <figure>
          <img src="images/alphasyndrome/thumbnail.png" alt="AlphaSyndrome 아키텍처">
          <figcaption>신드롬 스케줄링 최적화를 위한 AlphaSyndrome RL 파이프라인.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>새로운 RL 정식화:</strong> 신드롬 측정 스케줄링을 RL 최적화를 위한 마르코프 결정 과정으로 최초 정식화.</li>
          <li><strong>GNN 기반 정책:</strong> 다양한 코드 크기에 걸쳐 일반화되는 그래프 신경망 정책.</li>
          <li><strong>일관된 개선:</strong> RL 발견 스케줄이 표면 코드와 컬러 코드에서 고정 기준선 대비 논리적 오류율을 10-30% 감소.</li>
          <li><strong>전이 가능성:</strong> 소규모 코드에서 훈련된 정책이 대규모 인스턴스에 부분적으로 전이.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트 코드</td><td>표면 코드(d=3,5,7), 컬러 코드(d=3,5)</td></tr>
            <tr><td>RL 알고리즘</td><td>64개 병렬 환경의 PPO</td></tr>
            <tr><td>정책 네트워크</td><td>3층 GNN, 은닉 차원 128</td></tr>
            <tr><td>학습 에피소드</td><td>코드 인스턴스당 약 100K</td></tr>
            <tr><td>잡음 모델</td><td>회로 수준 탈분극 잡음, p = 0.001-0.01</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>코드</th><th>고정 스케줄 LER</th><th>RL 스케줄 LER</th><th>개선</th></tr></thead>
          <tbody>
            <tr><td>표면 d=5</td><td>기준선</td><td>약 15% 감소</td><td>유의미</td></tr>
            <tr><td>표면 d=7</td><td>기준선</td><td>약 20% 감소</td><td>유의미</td></tr>
            <tr><td>컬러 d=5</td><td>기준선</td><td>약 10-25% 감소</td><td>보통-유의미</td></tr>
          </tbody>
        </table>
        <p>RL 에이전트는 최근 오류 감지 근처의 안정기를 우선시하고 X/Z 안정기를 특정 패턴으로 교대하는 등 비자명한 스케줄링 패턴을 발견합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>RL을 실용적 QEC 과제와 연결하는 새롭고 잘 동기부여된 문제 정식화.</li>
          <li>GNN 아키텍처가 코드의 구조를 자연스럽게 인코딩하고 부분적 일반화를 가능하게 함.</li>
          <li>여러 코드와 잡음률에 걸친 일관된 개선.</li>
          <li>발견된 스케줄이 최적 측정 순서에 대한 해석 가능한 통찰을 제공.</li>
          <li>설계 선택을 검증하는 철저한 절삭 연구.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>훈련 비용이 높음: 각 보상 평가에 디코딩을 포함한 전체 QEC 시뮬레이션이 필요.</li>
          <li>훨씬 큰 코드(d > 9)로의 전이가 시연되지 않음.</li>
          <li>특정 잡음 모델을 가정하며, 모델 불일치에 대한 견고성이 완전히 탐구되지 않음.</li>
          <li>고정 스케줄과의 비교에 한정되며, 다른 휴리스틱 최적화 방법과의 비교가 주장을 강화할 것.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>RL 에이전트가 실제 하드웨어에서 변화하는 잡음 조건에 실시간으로 적응할 수 있는가?</li>
          <li>RL 발견 스케줄이 다른 디코더 선택과 어떻게 상호작용하는가?</li>
          <li>점진적으로 더 큰 코드에 대한 커리큘럼 학습이 전이를 개선할 수 있는가?</li>
          <li>최적 스케줄과 코드의 대칭 그룹 간의 관계는 무엇인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>AlphaSyndrome은 신드롬 측정 스케줄링이 QEC에서 의미 있는 오류율 감소를 얻을 수 있는 덜 탐구된 자유도임을 보여줍니다. RL 접근법은 이 조합 최적화 문제에 적합하며, 고정 휴리스틱이 놓치는 비자명한 전략을 발견합니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. ml-correlated-qubit-errors
  // ====================================================================
  {
    id: "ml-correlated-qubit-errors",
    date: "2025-04-11",
    authors: "Baireuther, P., et al.",
    venue: "Quantum 2018",
    image: "images/ml-correlated-qubit-errors/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Machine Learning", "Surface Code"],
    en: {
      title: "Machine-Learning-Assisted Correction of Correlated Qubit Errors in a Topological Code",
      summary: "Demonstrates that a recurrent neural network decoder can learn to correct correlated errors in the surface code that conventional decoders assuming independent errors fail to handle, achieving near-optimal thresholds under realistic correlated noise.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper shows that <strong>neural network decoders can exploit temporal correlations in surface-code syndromes</strong> to significantly outperform minimum-weight perfect matching when errors are correlated, establishing an early and influential ML-for-QEC result.</p>

        <h2>Research Question</h2>
        <blockquote>Can a machine learning decoder trained on syndrome data learn to correct spatially and temporally correlated qubit errors in the surface code more effectively than standard decoders that assume independent noise?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Standard QEC decoders like MWPM assume independent, identically distributed errors. However, real quantum hardware exhibits correlated errors from crosstalk, cosmic rays, and control electronics. These correlations violate the i.i.d. assumption and can catastrophically degrade decoder performance. A decoder that learns the actual noise structure from data could be more robust.</p>
        <p>This is one of the earliest works applying recurrent neural networks (RNNs) to QEC decoding, preceding the wave of ML-for-QEC research that followed.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Decoder:</strong> Recurrent neural network (LSTM-based) that processes a sequence of syndrome measurements and outputs correction predictions.</li>
          <li><strong>Input:</strong> Syndrome difference vectors across multiple QEC rounds.</li>
          <li><strong>Training data:</strong> Simulated surface-code syndromes under correlated noise models (spatially correlated depolarizing, temporally correlated leakage-like).</li>
          <li><strong>Baseline:</strong> MWPM decoder with and without noise model information.</li>
        </ul>
        <figure>
          <img src="images/ml-correlated-qubit-errors/thumbnail.png" alt="ML decoder for correlated errors">
          <figcaption>RNN decoder processing sequential syndrome data to correct correlated errors.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>First RNN-based surface code decoder:</strong> Demonstrates viability of recurrent architectures for temporal syndrome processing.</li>
          <li><strong>Correlated error handling:</strong> ML decoder maintains high thresholds under correlated noise where MWPM degrades significantly.</li>
          <li><strong>Data-driven adaptation:</strong> The decoder implicitly learns the correlation structure without explicit noise model specification.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code</td><td>Surface code, d = 3, 5, 7</td></tr>
            <tr><td>Network</td><td>LSTM with 2 layers, hidden size 64-256</td></tr>
            <tr><td>Training samples</td><td>~10<sup>6</sup> syndrome sequences</td></tr>
            <tr><td>Noise models</td><td>i.i.d. depolarizing, spatially correlated, temporally correlated</td></tr>
            <tr><td>Decoder comparison</td><td>MWPM (PyMatching), lookup table (small d)</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Noise Model</th><th>MWPM threshold</th><th>RNN threshold</th></tr></thead>
          <tbody>
            <tr><td>i.i.d. depolarizing</td><td>~10.3%</td><td>~10.1% (comparable)</td></tr>
            <tr><td>Spatially correlated</td><td>Significantly degraded</td><td>Near i.i.d. levels</td></tr>
            <tr><td>Temporally correlated</td><td>Significantly degraded</td><td>Substantially better</td></tr>
          </tbody>
        </table>
        <p>Under i.i.d. noise, the RNN matches MWPM. Under correlated noise, the gap widens substantially in the RNN's favor, demonstrating that the network learns to exploit correlation patterns MWPM ignores.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Pioneering work connecting modern ML to practical QEC decoding.</li>
          <li>Addresses a real and growing problem as quantum hardware scales with increasing cross-talk.</li>
          <li>RNN naturally handles the temporal aspect of multi-round syndrome extraction.</li>
          <li>Clear and fair comparison with standard MWPM baseline.</li>
          <li>Influential paper that catalyzed significant follow-up research.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>RNN inference latency may be too high for real-time decoding at scale.</li>
          <li>Tested only on small code distances (d up to 7); scalability unclear.</li>
          <li>Requires retraining when the noise model changes significantly.</li>
          <li>Does not compare with other ML approaches (transformers, GNNs) that were developed later.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can modern transformer architectures further improve on the RNN decoder for correlated noise?</li>
          <li>How would this approach work with real hardware syndrome data versus simulation?</li>
          <li>Is there a theoretical limit to how much better an ML decoder can be compared to MWPM under correlated noise?</li>
          <li>Can the learned decoder be distilled into a faster, hardware-friendly decoder?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This is a foundational paper in ML-for-QEC that convincingly demonstrates that neural network decoders can learn to exploit error correlations that conventional decoders ignore. While the specific LSTM architecture has been superseded, the core insight that data-driven decoders adapt to realistic noise remains highly relevant.</p>
      `
    },
    ko: {
      title: "위상 코드에서 상관된 큐비트 오류의 머신러닝 보조 정정",
      summary: "순환 신경망 디코더가 독립 오류를 가정하는 기존 디코더가 처리하지 못하는 표면 코드의 상관 오류를 학습하여 정정할 수 있음을 보여주며, 현실적 상관 잡음에서 근최적 임계값을 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>신경망 디코더가 표면 코드 신드롬의 시간적 상관관계를 활용</strong>하여 오류가 상관될 때 최소 가중 완전 매칭을 크게 능가할 수 있음을 보여주며, 초기의 영향력 있는 ML-for-QEC 결과를 확립합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>신드롬 데이터로 훈련된 머신러닝 디코더가 독립 잡음을 가정하는 표준 디코더보다 표면 코드의 공간적/시간적 상관 큐비트 오류를 더 효과적으로 정정할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>MWPM 같은 표준 QEC 디코더는 독립 동일 분포(i.i.d.) 오류를 가정합니다. 그러나 실제 양자 하드웨어는 크로스토크, 우주선, 제어 전자장치로 인한 상관 오류를 보입니다. 이러한 상관관계는 i.i.d. 가정을 위반하여 디코더 성능을 치명적으로 저하시킬 수 있습니다. 데이터에서 실제 잡음 구조를 학습하는 디코더가 더 견고할 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>디코더:</strong> 신드롬 측정 시퀀스를 처리하여 정정 예측을 출력하는 LSTM 기반 순환 신경망.</li>
          <li><strong>입력:</strong> 다중 QEC 라운드에 걸친 신드롬 차이 벡터.</li>
          <li><strong>훈련 데이터:</strong> 상관 잡음 모델 하에서 시뮬레이션된 표면 코드 신드롬.</li>
          <li><strong>기준선:</strong> 잡음 모델 정보 유무에 따른 MWPM 디코더.</li>
        </ul>
        <figure>
          <img src="images/ml-correlated-qubit-errors/thumbnail.png" alt="상관 오류를 위한 ML 디코더">
          <figcaption>상관 오류 정정을 위해 순차 신드롬 데이터를 처리하는 RNN 디코더.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>최초의 RNN 기반 표면 코드 디코더:</strong> 시간적 신드롬 처리를 위한 순환 아키텍처의 실행 가능성을 입증.</li>
          <li><strong>상관 오류 처리:</strong> ML 디코더가 MWPM이 크게 저하되는 상관 잡음에서도 높은 임계값을 유지.</li>
          <li><strong>데이터 기반 적응:</strong> 명시적 잡음 모델 지정 없이 상관 구조를 암묵적으로 학습.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드</td><td>표면 코드, d = 3, 5, 7</td></tr>
            <tr><td>네트워크</td><td>2층 LSTM, 은닉 크기 64-256</td></tr>
            <tr><td>훈련 샘플</td><td>약 10<sup>6</sup>개 신드롬 시퀀스</td></tr>
            <tr><td>잡음 모델</td><td>i.i.d. 탈분극, 공간 상관, 시간 상관</td></tr>
            <tr><td>디코더 비교</td><td>MWPM (PyMatching), 참조 테이블 (소규모 d)</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>잡음 모델</th><th>MWPM 임계값</th><th>RNN 임계값</th></tr></thead>
          <tbody>
            <tr><td>i.i.d. 탈분극</td><td>약 10.3%</td><td>약 10.1% (비슷)</td></tr>
            <tr><td>공간 상관</td><td>크게 저하</td><td>i.i.d. 수준에 근접</td></tr>
            <tr><td>시간 상관</td><td>크게 저하</td><td>상당히 개선</td></tr>
          </tbody>
        </table>
        <p>i.i.d. 잡음에서 RNN은 MWPM에 필적합니다. 상관 잡음에서는 격차가 RNN에 유리하게 크게 벌어지며, 네트워크가 MWPM이 무시하는 상관 패턴을 활용하도록 학습함을 보여줍니다.</p>

        <h2>강점</h2>
        <ul>
          <li>현대 ML을 실용적 QEC 디코딩에 연결하는 선구적 연구.</li>
          <li>크로스토크가 증가하는 양자 하드웨어 확장에 따라 점점 중요해지는 실제 문제를 다룸.</li>
          <li>RNN이 다중 라운드 신드롬 추출의 시간적 측면을 자연스럽게 처리.</li>
          <li>표준 MWPM 기준선과의 명확하고 공정한 비교.</li>
          <li>상당한 후속 연구를 촉발한 영향력 있는 논문.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>RNN 추론 지연이 대규모 실시간 디코딩에 너무 높을 수 있음.</li>
          <li>소규모 코드 거리(d 최대 7)에서만 테스트; 확장성 불명확.</li>
          <li>잡음 모델이 크게 변경될 때 재훈련 필요.</li>
          <li>이후 개발된 다른 ML 접근법(트랜스포머, GNN)과 비교하지 않음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>현대 트랜스포머 아키텍처가 상관 잡음에 대해 RNN 디코더를 더 개선할 수 있는가?</li>
          <li>이 접근법이 시뮬레이션 대신 실제 하드웨어 신드롬 데이터로 어떻게 작동할 것인가?</li>
          <li>상관 잡음 하에서 ML 디코더가 MWPM보다 얼마나 더 나을 수 있는지 이론적 한계가 있는가?</li>
          <li>학습된 디코더를 더 빠르고 하드웨어 친화적인 디코더로 증류할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 기존 디코더가 무시하는 오류 상관관계를 신경망 디코더가 활용할 수 있음을 설득력 있게 보여주는 ML-for-QEC의 기초 논문입니다. 특정 LSTM 아키텍처는 이후 대체되었지만, 데이터 기반 디코더가 현실적 잡음에 적응한다는 핵심 통찰은 여전히 매우 관련성이 높습니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. quantum-assisted-compiling
  // ====================================================================
  {
    id: "quantum-assisted-compiling",
    date: "2025-04-11",
    authors: "Khatri, S., et al.",
    venue: "Quantum 2019",
    image: "images/quantum-assisted-compiling/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Quantum Compiling", "Variational"],
    en: {
      title: "Quantum-Assisted Quantum Compiling",
      summary: "Proposes a variational hybrid quantum-classical algorithm (QAQC) that uses a quantum computer to compile an unknown unitary into a gate sequence from a native gate set, bypassing the need for classical tomography.",
      review: `
        <h2>One-line Verdict</h2>
        <p>QAQC introduces a <strong>variational approach where a quantum computer assists in compiling its own gate sequences</strong>, using the Hilbert-Schmidt inner product as a cost function that can be efficiently estimated on hardware without full process tomography.</p>

        <h2>Research Question</h2>
        <blockquote>Can a hybrid quantum-classical variational algorithm efficiently compile an unknown target unitary into a short sequence of native gates, using the quantum computer itself to evaluate compilation fidelity?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Quantum compiling translates abstract quantum circuits into hardware-native gate sequences. Classical approaches require exponential resources for large unitaries. By using the quantum computer to evaluate the overlap between a target unitary and a parameterized ansatz circuit, the compilation problem becomes a variational optimization that scales polynomially in qubit count.</p>
        <p>This approach is particularly relevant for NISQ devices where gate sets are limited and optimal compilation can significantly reduce circuit depth and thus error accumulation.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Cost function:</strong> Hilbert-Schmidt test — estimates |Tr(V^dag U)|^2 / d^2 using a SWAP-test-like circuit on two copies of the system.</li>
          <li><strong>Ansatz:</strong> Parameterized circuit built from native gates (CNOT + single-qubit rotations) with variable depth.</li>
          <li><strong>Optimizer:</strong> Classical gradient-free or gradient-based optimizer updates ansatz parameters to maximize overlap.</li>
          <li><strong>No tomography needed:</strong> The target unitary is treated as a black box applied to one register.</li>
        </ul>
        <figure>
          <img src="images/quantum-assisted-compiling/thumbnail.png" alt="QAQC circuit diagram">
          <figcaption>QAQC compilation pipeline with Hilbert-Schmidt cost estimation.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Hilbert-Schmidt cost:</strong> Practical and hardware-efficient cost function for unitary compilation that avoids tomography.</li>
          <li><strong>Scalable compilation:</strong> Polynomial scaling in the number of qubits, versus exponential for classical methods.</li>
          <li><strong>Noise resilience:</strong> The cost function has favorable noise properties, remaining faithful under depolarizing noise.</li>
          <li><strong>Experimental demonstration:</strong> Proof-of-concept compilation of 2-qubit unitaries on IBM quantum hardware.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Qubits</td><td>2-4 qubit unitaries compiled</td></tr>
            <tr><td>Ansatz depth</td><td>Variable, 5-20 CNOT layers</td></tr>
            <tr><td>Optimizer</td><td>COBYLA, L-BFGS-B</td></tr>
            <tr><td>Hardware</td><td>IBM Q (5-qubit devices) for proof-of-concept</td></tr>
            <tr><td>Shots per evaluation</td><td>8192</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Target</th><th>Fidelity achieved</th><th>CNOT count reduction</th></tr></thead>
          <tbody>
            <tr><td>Random 2-qubit unitary</td><td>>99% (simulation)</td><td>Up to 50% vs. Solovay-Kitaev</td></tr>
            <tr><td>Toffoli (compiled)</td><td>>97% (hardware)</td><td>Competitive with known decompositions</td></tr>
          </tbody>
        </table>
        <p>QAQC achieves high compilation fidelity in simulation and demonstrates feasibility on real hardware, with compiled circuits often shorter than those produced by standard decomposition methods.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant idea: let the quantum computer compile itself, avoiding classical exponential bottleneck.</li>
          <li>Hilbert-Schmidt cost is both theoretically motivated and practically measurable.</li>
          <li>Demonstrated on real quantum hardware, not just simulation.</li>
          <li>Applicable to any gate set, making it hardware-agnostic.</li>
          <li>Clear connection to variational quantum eigensolver (VQE) methodology.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Requires two copies of the quantum system (doubles qubit count for the cost evaluation).</li>
          <li>Variational optimization may suffer from barren plateaus at larger qubit counts.</li>
          <li>Practical advantage over classical compilers unclear for small circuits where classical methods suffice.</li>
          <li>Gate synthesis quality depends heavily on ansatz structure choice.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does QAQC scale to 10+ qubit unitaries in terms of convergence and barren plateaus?</li>
          <li>Can local cost functions mitigate the barren plateau problem in this setting?</li>
          <li>Is there a systematic way to choose the optimal ansatz depth for a given target unitary?</li>
          <li>How does QAQC compare with more recent ML-based compilation methods?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>QAQC is an elegant and influential proposal for using quantum computers to solve their own compilation problem. The Hilbert-Schmidt cost function is a key conceptual contribution that has been adopted in subsequent variational quantum algorithms. The approach is most valuable for NISQ compilation where classical methods are either too expensive or produce suboptimal circuits.</p>
      `
    },
    ko: {
      title: "양자 보조 양자 컴파일링",
      summary: "양자 컴퓨터를 사용하여 미지의 유니터리를 기본 게이트 세트의 게이트 시퀀스로 컴파일하는 변분 하이브리드 양자-고전 알고리즘(QAQC)을 제안하며, 고전적 토모그래피의 필요성을 우회합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>QAQC는 <strong>양자 컴퓨터가 자체 게이트 시퀀스를 컴파일하는 것을 돕는 변분 접근법</strong>을 도입하며, 힐베르트-슈미트 내적을 비용 함수로 사용하여 전체 프로세스 토모그래피 없이 하드웨어에서 효율적으로 추정할 수 있습니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>하이브리드 양자-고전 변분 알고리즘이 양자 컴퓨터 자체를 사용하여 컴파일 충실도를 평가하면서, 미지의 목표 유니터리를 기본 게이트의 짧은 시퀀스로 효율적으로 컴파일할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 컴파일링은 추상적 양자 회로를 하드웨어 기본 게이트 시퀀스로 변환합니다. 고전적 접근법은 큰 유니터리에 대해 지수적 자원을 요구합니다. 양자 컴퓨터를 사용하여 목표 유니터리와 매개변수화된 안사츠 회로 간의 중첩을 평가하면, 컴파일 문제가 큐비트 수에 다항적으로 확장되는 변분 최적화가 됩니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>비용 함수:</strong> 힐베르트-슈미트 테스트 — 시스템의 두 복사본에 대한 SWAP 테스트 유사 회로를 사용하여 |Tr(V^dag U)|^2 / d^2을 추정.</li>
          <li><strong>안사츠:</strong> 기본 게이트(CNOT + 단일 큐비트 회전)로 구축된 가변 깊이의 매개변수화 회로.</li>
          <li><strong>최적화기:</strong> 고전 최적화기가 중첩을 최대화하도록 안사츠 매개변수를 업데이트.</li>
          <li><strong>토모그래피 불필요:</strong> 목표 유니터리는 한 레지스터에 적용되는 블랙박스로 취급.</li>
        </ul>
        <figure>
          <img src="images/quantum-assisted-compiling/thumbnail.png" alt="QAQC 회로 다이어그램">
          <figcaption>힐베르트-슈미트 비용 추정을 포함한 QAQC 컴파일 파이프라인.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>힐베르트-슈미트 비용:</strong> 토모그래피를 피하는 유니터리 컴파일을 위한 실용적이고 하드웨어 효율적인 비용 함수.</li>
          <li><strong>확장 가능한 컴파일:</strong> 고전적 방법의 지수적 확장과 대비하여 큐비트 수에 다항적 확장.</li>
          <li><strong>잡음 견고성:</strong> 비용 함수가 탈분극 잡음 하에서도 충실하게 유지되는 유리한 잡음 특성을 가짐.</li>
          <li><strong>실험적 시연:</strong> IBM 양자 하드웨어에서 2큐비트 유니터리의 개념 증명 컴파일.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>큐비트</td><td>2-4 큐비트 유니터리 컴파일</td></tr>
            <tr><td>안사츠 깊이</td><td>가변, 5-20 CNOT 층</td></tr>
            <tr><td>최적화기</td><td>COBYLA, L-BFGS-B</td></tr>
            <tr><td>하드웨어</td><td>IBM Q (5큐비트 장치) 개념 증명용</td></tr>
            <tr><td>평가당 측정</td><td>8192</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>대상</th><th>달성 충실도</th><th>CNOT 수 감소</th></tr></thead>
          <tbody>
            <tr><td>랜덤 2큐비트 유니터리</td><td>>99% (시뮬레이션)</td><td>Solovay-Kitaev 대비 최대 50%</td></tr>
            <tr><td>Toffoli (컴파일)</td><td>>97% (하드웨어)</td><td>알려진 분해와 경쟁적</td></tr>
          </tbody>
        </table>
        <p>QAQC는 시뮬레이션에서 높은 컴파일 충실도를 달성하고 실제 하드웨어에서 실현 가능성을 보여주며, 컴파일된 회로가 표준 분해 방법보다 종종 짧습니다.</p>

        <h2>강점</h2>
        <ul>
          <li>우아한 아이디어: 양자 컴퓨터가 스스로를 컴파일하게 하여 고전적 지수적 병목을 회피.</li>
          <li>힐베르트-슈미트 비용이 이론적으로 동기부여되고 실제로 측정 가능.</li>
          <li>시뮬레이션뿐 아니라 실제 양자 하드웨어에서 시연.</li>
          <li>모든 게이트 세트에 적용 가능하여 하드웨어 비의존적.</li>
          <li>변분 양자 고유값 풀이(VQE) 방법론과의 명확한 연결.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>양자 시스템의 두 복사본이 필요(비용 평가를 위해 큐비트 수가 두 배).</li>
          <li>변분 최적화가 대규모 큐비트 수에서 불모의 고원 문제에 시달릴 수 있음.</li>
          <li>고전적 방법이 충분한 소규모 회로에서 고전적 컴파일러 대비 실질적 이점 불명확.</li>
          <li>게이트 합성 품질이 안사츠 구조 선택에 크게 의존.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>QAQC가 수렴과 불모의 고원 측면에서 10+ 큐비트 유니터리로 어떻게 확장되는가?</li>
          <li>국소 비용 함수가 이 설정에서 불모의 고원 문제를 완화할 수 있는가?</li>
          <li>주어진 목표 유니터리에 대해 최적 안사츠 깊이를 선택하는 체계적 방법이 있는가?</li>
          <li>QAQC가 최근의 ML 기반 컴파일 방법과 어떻게 비교되는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>QAQC는 양자 컴퓨터가 자체 컴파일 문제를 해결하도록 하는 우아하고 영향력 있는 제안입니다. 힐베르트-슈미트 비용 함수는 후속 변분 양자 알고리즘에 채택된 핵심 개념적 기여입니다. 이 접근법은 고전적 방법이 너무 비싸거나 차선의 회로를 생성하는 NISQ 컴파일에 가장 가치 있습니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. simulating-qec-beyond-pauli
  // ====================================================================
  {
    id: "simulating-qec-beyond-pauli",
    date: "2025-04-11",
    authors: "Hines, J., et al.",
    venue: "Preprint 2025",
    image: "images/simulating-qec-beyond-pauli/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Coherent Errors", "Simulation"],
    en: {
      title: "Simulating Quantum Error Correction beyond Pauli Stochastic Errors",
      summary: "Develops efficient simulation methods for quantum error correction under coherent and non-Pauli errors, enabling the study of QEC performance in realistic noise regimes that stochastic Pauli models cannot capture.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper addresses a <strong>fundamental gap in QEC simulation</strong> by extending efficient simulation techniques beyond the standard Pauli stochastic noise assumption to handle coherent errors that accumulate and interfere in ways stochastic models miss.</p>

        <h2>Research Question</h2>
        <blockquote>How can we efficiently simulate the performance of quantum error-correcting codes under coherent and non-Pauli noise models, where the standard Pauli twirling approximation breaks down?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Most QEC simulation tools assume Pauli stochastic noise, where errors are modeled as probabilistic applications of Pauli operators. This assumption enables efficient classical simulation via stabilizer formalism. However, real quantum hardware exhibits coherent errors (systematic over/under-rotations) that can accumulate constructively, potentially leading to worse logical error rates than Pauli models predict.</p>
        <p>Simulating coherent errors requires tracking the full quantum state, which scales exponentially. This paper develops intermediate approaches that capture the essential physics of coherent errors without full state-vector simulation.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Extended stabilizer methods:</strong> Augments the Clifford tableau with perturbative tracking of small coherent rotations around Clifford gates.</li>
          <li><strong>Channel decomposition:</strong> Decomposes non-Pauli channels into Pauli and residual coherent components, simulating each appropriately.</li>
          <li><strong>Tensor network integration:</strong> Uses matrix product state (MPS) representations for the logical subspace to handle moderate entanglement from coherent errors.</li>
          <li><strong>Error metrics:</strong> Computes both diamond distance and average logical fidelity under the extended noise models.</li>
        </ul>
        <figure>
          <img src="images/simulating-qec-beyond-pauli/thumbnail.png" alt="Beyond Pauli simulation framework">
          <figcaption>Simulation framework extending QEC analysis beyond Pauli stochastic errors.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Efficient coherent-error simulation:</strong> Polynomial-cost methods for simulating QEC under coherent errors for moderate code sizes.</li>
          <li><strong>Quantifying Pauli approximation error:</strong> Shows when and by how much Pauli stochastic models overestimate or underestimate logical error rates.</li>
          <li><strong>Practical guidelines:</strong> Identifies noise parameter regimes where Pauli models are adequate vs. where coherent simulation is essential.</li>
          <li><strong>Open-source tools:</strong> Provides simulation software for the community to study beyond-Pauli QEC.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes</td><td>Surface code (d=3,5,7), Steane code, repetition code</td></tr>
            <tr><td>Noise models</td><td>Coherent Z-rotation, amplitude damping, correlated unitary errors</td></tr>
            <tr><td>Simulation methods</td><td>Extended stabilizer, MPS (bond dim up to 256), exact (small d)</td></tr>
            <tr><td>Comparison baseline</td><td>Pauli twirled approximation (standard stochastic sim)</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Pauli model prediction</th><th>Coherent simulation</th></tr></thead>
          <tbody>
            <tr><td>Small coherent rotation</td><td>Close to Pauli</td><td>Slightly worse (constructive interference)</td></tr>
            <tr><td>Moderate coherent error</td><td>Underestimates LER by 2-5x</td><td>Reveals higher logical error rate</td></tr>
            <tr><td>Correlated unitary</td><td>Qualitatively wrong</td><td>Captures correct scaling</td></tr>
          </tbody>
        </table>
        <p>The key finding is that coherent errors can cause logical error rates 2-5x worse than Pauli models predict for moderate error strengths, with the discrepancy growing for systematic (non-random) coherent errors.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a real and important gap — most QEC studies rely on the Pauli approximation without validating it.</li>
          <li>Multiple simulation approaches provide cross-validation and applicability to different regimes.</li>
          <li>Practical guidelines for when Pauli models suffice save unnecessary computational overhead.</li>
          <li>Open-source release enables community adoption.</li>
          <li>Clear presentation of a technically challenging topic.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Extended stabilizer methods still scale poorly for large codes with strong coherent errors.</li>
          <li>MPS-based approach limited by entanglement growth; may fail for highly entangling noise.</li>
          <li>Focus on specific coherent error models; general non-Markovian noise not addressed.</li>
          <li>Decoder interaction not fully explored — coherent errors may benefit from specialized decoders.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can randomized compiling or Pauli frame randomization reduce the gap between Pauli and coherent error behavior?</li>
          <li>How do these results change for qLDPC codes with non-local checks?</li>
          <li>Is there a threshold below which the Pauli approximation is guaranteed to be safe?</li>
          <li>Can ML decoders trained on coherent-error data close the performance gap?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is essential reading for anyone working on QEC simulation or resource estimation. It demonstrates that the standard Pauli stochastic assumption can significantly underestimate logical error rates in the presence of coherent errors, and provides the tools to do better. The practical guidelines for when to worry about coherent errors are particularly valuable.</p>
      `
    },
    ko: {
      title: "파울리 확률적 오류를 넘어선 양자 오류 정정 시뮬레이션",
      summary: "코히어런트 및 비파울리 오류 하에서 양자 오류 정정의 효율적 시뮬레이션 방법을 개발하여, 확률적 파울리 모델이 포착할 수 없는 현실적 잡음 체제에서의 QEC 성능 연구를 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 표준 파울리 확률적 잡음 가정을 넘어 효율적 시뮬레이션 기법을 확장하여 확률적 모델이 놓치는 방식으로 축적되고 간섭하는 코히어런트 오류를 처리함으로써 <strong>QEC 시뮬레이션의 근본적 격차</strong>를 해소합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>표준 파울리 트윌링 근사가 무너지는 코히어런트 및 비파울리 잡음 모델 하에서 양자 오류 정정 코드의 성능을 어떻게 효율적으로 시뮬레이션할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>대부분의 QEC 시뮬레이션 도구는 오류가 파울리 연산자의 확률적 적용으로 모델링되는 파울리 확률적 잡음을 가정합니다. 이 가정은 안정기 형식주의를 통한 효율적 고전 시뮬레이션을 가능하게 합니다. 그러나 실제 양자 하드웨어는 건설적으로 축적될 수 있는 코히어런트 오류(체계적 과소/과다 회전)를 보여, 파울리 모델 예측보다 더 나쁜 논리적 오류율을 초래할 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>확장 안정기 방법:</strong> 클리포드 게이트 주변의 작은 코히어런트 회전의 섭동적 추적으로 클리포드 타블로를 보강.</li>
          <li><strong>채널 분해:</strong> 비파울리 채널을 파울리 및 잔여 코히어런트 성분으로 분해하여 각각 적절히 시뮬레이션.</li>
          <li><strong>텐서 네트워크 통합:</strong> 코히어런트 오류로 인한 중간 수준 얽힘을 처리하기 위해 논리 부분공간에 행렬 곱 상태(MPS) 표현 사용.</li>
          <li><strong>오류 지표:</strong> 확장된 잡음 모델에서 다이아몬드 거리와 평균 논리적 충실도 모두 계산.</li>
        </ul>
        <figure>
          <img src="images/simulating-qec-beyond-pauli/thumbnail.png" alt="파울리 이상 시뮬레이션 프레임워크">
          <figcaption>파울리 확률적 오류를 넘어 QEC 분석을 확장하는 시뮬레이션 프레임워크.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>효율적 코히어런트 오류 시뮬레이션:</strong> 중간 크기 코드의 코히어런트 오류 하 QEC 시뮬레이션을 위한 다항 비용 방법.</li>
          <li><strong>파울리 근사 오류 정량화:</strong> 파울리 확률적 모델이 논리적 오류율을 과대 또는 과소 추정하는 시점과 정도를 제시.</li>
          <li><strong>실용적 가이드라인:</strong> 파울리 모델이 적절한 잡음 매개변수 영역과 코히어런트 시뮬레이션이 필수적인 영역을 식별.</li>
          <li><strong>오픈소스 도구:</strong> 파울리 이상 QEC 연구를 위한 시뮬레이션 소프트웨어를 커뮤니티에 제공.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드</td><td>표면 코드(d=3,5,7), 스티안 코드, 반복 코드</td></tr>
            <tr><td>잡음 모델</td><td>코히어런트 Z-회전, 진폭 감쇠, 상관 유니터리 오류</td></tr>
            <tr><td>시뮬레이션 방법</td><td>확장 안정기, MPS(본드 차원 최대 256), 정확(소규모 d)</td></tr>
            <tr><td>비교 기준선</td><td>파울리 트윌링 근사(표준 확률적 시뮬레이션)</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>파울리 모델 예측</th><th>코히어런트 시뮬레이션</th></tr></thead>
          <tbody>
            <tr><td>작은 코히어런트 회전</td><td>파울리에 근접</td><td>약간 더 나쁨 (건설적 간섭)</td></tr>
            <tr><td>중간 코히어런트 오류</td><td>LER 2-5배 과소추정</td><td>더 높은 논리적 오류율 드러남</td></tr>
            <tr><td>상관 유니터리</td><td>질적으로 틀림</td><td>올바른 스케일링 포착</td></tr>
          </tbody>
        </table>
        <p>핵심 발견은 코히어런트 오류가 중간 오류 강도에서 파울리 모델 예측보다 2-5배 더 나쁜 논리적 오류율을 유발할 수 있으며, 체계적(비무작위) 코히어런트 오류에 대해 불일치가 커진다는 것입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실제적이고 중요한 격차를 해소 — 대부분의 QEC 연구가 파울리 근사에 의존하며 이를 검증하지 않음.</li>
          <li>여러 시뮬레이션 접근법이 교차 검증과 다양한 체제에 대한 적용성을 제공.</li>
          <li>파울리 모델이 충분한 경우에 대한 실용적 가이드라인이 불필요한 계산 오버헤드를 절약.</li>
          <li>오픈소스 공개로 커뮤니티 채택을 가능하게 함.</li>
          <li>기술적으로 도전적인 주제의 명확한 제시.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>확장 안정기 방법은 강한 코히어런트 오류가 있는 대규모 코드에서 여전히 확장성이 떨어짐.</li>
          <li>MPS 기반 접근법은 얽힘 증가에 의해 제한되며, 높은 얽힘 잡음에서 실패할 수 있음.</li>
          <li>특정 코히어런트 오류 모델에 초점; 일반적 비마르코프 잡음은 다루지 않음.</li>
          <li>디코더 상호작용이 완전히 탐구되지 않음 — 코히어런트 오류는 전문 디코더로부터 이점을 얻을 수 있음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>무작위화된 컴파일링 또는 파울리 프레임 무작위화가 파울리와 코히어런트 오류 행동 간의 격차를 줄일 수 있는가?</li>
          <li>비국소 검사가 있는 qLDPC 코드에서 이러한 결과가 어떻게 변하는가?</li>
          <li>파울리 근사가 안전하다고 보장되는 임계값이 존재하는가?</li>
          <li>코히어런트 오류 데이터로 훈련된 ML 디코더가 성능 격차를 좁힐 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 QEC 시뮬레이션이나 자원 추정 작업을 하는 모든 사람에게 필수적인 읽을거리입니다. 표준 파울리 확률적 가정이 코히어런트 오류 존재 시 논리적 오류율을 크게 과소추정할 수 있음을 보여주고, 이를 개선할 도구를 제공합니다. 코히어런트 오류에 대해 언제 걱정해야 하는지에 대한 실용적 가이드라인이 특히 가치 있습니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. pqc-stabilizer-decoding
  // ====================================================================
  {
    id: "pqc-stabilizer-decoding",
    date: "2025-04-11",
    authors: "Lu, J. Z., et al.",
    venue: "Preprint 2026",
    image: "images/pqc-stabilizer-decoding/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Post-Quantum Crypto", "Stabilizer Codes"],
    en: {
      title: "Post-Quantum Cryptography from Quantum Stabilizer Decoding",
      summary: "Proposes a novel post-quantum cryptographic scheme based on the hardness of decoding quantum stabilizer codes, bridging quantum error correction and cryptography by exploiting the computational difficulty of syndrome decoding in certain code families.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper creates a <strong>novel bridge between QEC and post-quantum cryptography</strong> by constructing cryptographic primitives whose security relies on the hardness of decoding quantum stabilizer codes, a problem believed to be hard for both classical and quantum computers.</p>

        <h2>Research Question</h2>
        <blockquote>Can the computational hardness of decoding quantum stabilizer codes serve as the foundation for post-quantum cryptographic schemes that resist both classical and quantum attacks?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Post-quantum cryptography (PQC) seeks encryption and signature schemes secure against quantum computers. Current PQC candidates are based on lattice, code-based (classical), hash, and multivariate problems. Classical code-based cryptography (McEliece) builds security on the hardness of decoding random linear codes. This paper asks: can the richer structure of quantum stabilizer codes provide new hard problems for cryptography?</p>
        <p>Stabilizer code decoding is known to be computationally hard in general (related to #P-hard problems), and the quantum structure may provide additional hardness assumptions not available from classical codes.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Hard problem:</strong> Syndrome decoding problem for random quantum stabilizer codes — given a syndrome, find the most likely error.</li>
          <li><strong>Cryptographic construction:</strong> Public-key encryption scheme where the public key encodes a disguised stabilizer code, and decryption requires efficient decoding.</li>
          <li><strong>Security reduction:</strong> Proves security reduces to the average-case hardness of stabilizer syndrome decoding.</li>
          <li><strong>Parameter selection:</strong> Analyzes concrete security levels (128-bit, 256-bit) against known classical and quantum attacks.</li>
        </ul>
        <figure>
          <img src="images/pqc-stabilizer-decoding/thumbnail.png" alt="PQC from stabilizer decoding">
          <figcaption>Construction of PQC primitives from stabilizer code decoding hardness.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>New hardness assumption:</strong> Introduces quantum stabilizer decoding as a cryptographic hardness foundation distinct from classical coding theory.</li>
          <li><strong>Public-key encryption:</strong> Constructs a concrete encryption scheme with provable security reduction.</li>
          <li><strong>Parameter analysis:</strong> Provides concrete parameter choices for practical security levels.</li>
          <li><strong>QEC-crypto bridge:</strong> Opens a new research direction connecting two major quantum information fields.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code families</td><td>Random CSS codes, hypergraph product codes</td></tr>
            <tr><td>Security levels</td><td>128-bit, 192-bit, 256-bit classical security</td></tr>
            <tr><td>Key sizes</td><td>Competitive with lattice-based schemes at equivalent security</td></tr>
            <tr><td>Attack analysis</td><td>Information set decoding, quantum Grover search, algebraic attacks</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Security level</th><th>Public key size</th><th>Ciphertext overhead</th></tr></thead>
          <tbody>
            <tr><td>128-bit</td><td>Moderate (comparable to McEliece)</td><td>Low</td></tr>
            <tr><td>256-bit</td><td>Larger but practical</td><td>Low</td></tr>
          </tbody>
        </table>
        <p>The scheme achieves competitive key and ciphertext sizes while relying on a fundamentally different hardness assumption than existing PQC candidates, providing diversification in the PQC portfolio.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Highly original idea connecting two seemingly separate fields (QEC and PQC).</li>
          <li>Rigorous security reduction to a well-defined computational problem.</li>
          <li>Concrete parameter recommendations for practical deployment.</li>
          <li>Diversifies the PQC landscape with a new hardness assumption.</li>
          <li>Well-positioned at the intersection of growing interest in both QEC and PQC.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Stabilizer decoding hardness is less studied than lattice or classical coding problems; the assumption may not withstand future cryptanalysis.</li>
          <li>Key sizes are large compared to lattice-based schemes, limiting practical adoption.</li>
          <li>Implementation efficiency not benchmarked against NIST PQC finalists.</li>
          <li>The quantum structure may introduce attack vectors not present in classical code-based crypto.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could advances in ML-based QEC decoders inadvertently weaken this cryptographic scheme?</li>
          <li>How does the hardness landscape change for structured stabilizer codes vs. random ones?</li>
          <li>Can this approach be extended to digital signatures or key exchange protocols?</li>
          <li>What is the relationship between this scheme's security and the quantum LDPC code distance?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is a creative and technically rigorous contribution that opens a new direction in post-quantum cryptography. By leveraging the computational hardness of quantum stabilizer decoding, it provides a fundamentally new security assumption that diversifies the PQC portfolio. The QEC community should pay attention, as advances in efficient decoding could have cryptographic implications.</p>
      `
    },
    ko: {
      title: "양자 안정기 디코딩 기반 포스트 양자 암호",
      summary: "양자 안정기 코드 디코딩의 어려움을 기반으로 한 새로운 포스트 양자 암호 체계를 제안하며, 특정 코드 계열에서 신드롬 디코딩의 계산적 어려움을 활용하여 양자 오류 정정과 암호학을 연결합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 양자 안정기 코드 디코딩의 어려움에 보안이 의존하는 암호 원시체를 구성하여 <strong>QEC와 포스트 양자 암호 사이에 새로운 다리</strong>를 만들며, 이 문제는 고전 및 양자 컴퓨터 모두에게 어려운 것으로 여겨집니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>양자 안정기 코드 디코딩의 계산적 어려움이 고전 및 양자 공격 모두에 저항하는 포스트 양자 암호 체계의 기반으로 사용될 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>포스트 양자 암호(PQC)는 양자 컴퓨터에 대해 안전한 암호화 및 서명 체계를 추구합니다. 현재 PQC 후보는 격자, 코드 기반(고전), 해시, 다변수 문제에 기반합니다. 고전적 코드 기반 암호(McEliece)는 랜덤 선형 코드 디코딩의 어려움에 보안을 구축합니다. 이 논문은 양자 안정기 코드의 풍부한 구조가 암호학을 위한 새로운 어려운 문제를 제공할 수 있는지 묻습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>어려운 문제:</strong> 랜덤 양자 안정기 코드에 대한 신드롬 디코딩 문제 — 신드롬이 주어지면 가장 가능성 높은 오류를 찾기.</li>
          <li><strong>암호 구성:</strong> 공개 키가 위장된 안정기 코드를 인코딩하고 복호화에 효율적 디코딩이 필요한 공개 키 암호화 체계.</li>
          <li><strong>보안 환원:</strong> 보안이 안정기 신드롬 디코딩의 평균 경우 어려움으로 환원됨을 증명.</li>
          <li><strong>매개변수 선택:</strong> 알려진 고전 및 양자 공격에 대한 구체적 보안 수준(128비트, 256비트) 분석.</li>
        </ul>
        <figure>
          <img src="images/pqc-stabilizer-decoding/thumbnail.png" alt="안정기 디코딩 기반 PQC">
          <figcaption>안정기 코드 디코딩 어려움으로부터의 PQC 원시체 구성.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>새로운 어려움 가정:</strong> 고전 코딩 이론과 구별되는 암호학적 어려움 기반으로서 양자 안정기 디코딩을 도입.</li>
          <li><strong>공개 키 암호화:</strong> 증명 가능한 보안 환원을 가진 구체적 암호화 체계 구성.</li>
          <li><strong>매개변수 분석:</strong> 실용적 보안 수준을 위한 구체적 매개변수 선택 제공.</li>
          <li><strong>QEC-암호 연결:</strong> 두 주요 양자 정보 분야를 연결하는 새로운 연구 방향 개척.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 계열</td><td>랜덤 CSS 코드, 하이퍼그래프 곱 코드</td></tr>
            <tr><td>보안 수준</td><td>128비트, 192비트, 256비트 고전 보안</td></tr>
            <tr><td>키 크기</td><td>동등 보안에서 격자 기반 체계와 경쟁적</td></tr>
            <tr><td>공격 분석</td><td>정보 집합 디코딩, 양자 그로버 탐색, 대수적 공격</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>보안 수준</th><th>공개 키 크기</th><th>암호문 오버헤드</th></tr></thead>
          <tbody>
            <tr><td>128비트</td><td>중간 (McEliece와 비슷)</td><td>낮음</td></tr>
            <tr><td>256비트</td><td>더 크지만 실용적</td><td>낮음</td></tr>
          </tbody>
        </table>
        <p>이 체계는 기존 PQC 후보와 근본적으로 다른 어려움 가정에 의존하면서도 경쟁력 있는 키 및 암호문 크기를 달성하여, PQC 포트폴리오에 다양성을 제공합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>별개로 보이는 두 분야(QEC와 PQC)를 연결하는 매우 독창적인 아이디어.</li>
          <li>잘 정의된 계산 문제로의 엄밀한 보안 환원.</li>
          <li>실용적 배포를 위한 구체적 매개변수 권고.</li>
          <li>새로운 어려움 가정으로 PQC 지형을 다양화.</li>
          <li>QEC와 PQC 모두에 대한 관심이 증가하는 교차점에 잘 위치.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>안정기 디코딩 어려움은 격자나 고전 코딩 문제보다 덜 연구되어 있어 향후 암호분석에 견디지 못할 수 있음.</li>
          <li>키 크기가 격자 기반 체계보다 커서 실용적 채택을 제한.</li>
          <li>NIST PQC 최종 후보와의 구현 효율성 벤치마크 부재.</li>
          <li>양자 구조가 고전 코드 기반 암호에 없는 공격 벡터를 도입할 수 있음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>ML 기반 QEC 디코더의 발전이 이 암호 체계를 의도치 않게 약화시킬 수 있는가?</li>
          <li>구조화된 안정기 코드 대 랜덤 코드에서 어려움 지형이 어떻게 변하는가?</li>
          <li>이 접근법을 디지털 서명이나 키 교환 프로토콜로 확장할 수 있는가?</li>
          <li>이 체계의 보안과 양자 LDPC 코드 거리 사이의 관계는 무엇인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 포스트 양자 암호에 새로운 방향을 여는 창의적이고 기술적으로 엄밀한 기여입니다. 양자 안정기 디코딩의 계산적 어려움을 활용하여 PQC 포트폴리오를 다양화하는 근본적으로 새로운 보안 가정을 제공합니다. QEC 커뮤니티는 효율적 디코딩의 발전이 암호학적 함의를 가질 수 있으므로 주목해야 합니다.</p>
      `
    }
  },

  // ====================================================================
  // 7. pqc-quantum-safe-survey
  // ====================================================================
  {
    id: "pqc-quantum-safe-survey",
    date: "2025-04-11",
    authors: "Chhetri, G., et al.",
    venue: "ACM Computing Surveys 2025",
    image: "images/pqc-quantum-safe-survey/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Post-Quantum Crypto", "Survey", "NIST"],
    en: {
      title: "Post-Quantum Cryptography and Quantum-Safe Security: A Comprehensive Survey",
      summary: "Provides a comprehensive survey of the post-quantum cryptography landscape, covering NIST standardization candidates, lattice-based, code-based, hash-based, and multivariate approaches, along with migration challenges and quantum-safe deployment strategies.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This is a <strong>thorough reference survey of the post-quantum cryptography field</strong> as of 2025, covering the full spectrum from mathematical foundations of PQC schemes to practical migration strategies for quantum-safe infrastructure.</p>

        <h2>Research Question</h2>
        <blockquote>What is the current state of post-quantum cryptography, including NIST-standardized algorithms, emerging alternatives, and the practical challenges of migrating existing infrastructure to quantum-safe security?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The advent of cryptographically relevant quantum computers threatens current public-key cryptography (RSA, ECC). NIST has finalized its first PQC standards (CRYSTALS-Kyber/ML-KEM, CRYSTALS-Dilithium/ML-DSA, FALCON, SPHINCS+), but the migration to quantum-safe systems is complex and ongoing. A comprehensive survey is needed to orient researchers and practitioners.</p>
        <p>This survey covers not just the algorithms but also the broader ecosystem: hybrid schemes, implementation challenges, side-channel resistance, and organizational migration roadmaps.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Taxonomy:</strong> Classifies PQC approaches by mathematical foundation — lattice, code, hash, multivariate, isogeny (post-SIKE).</li>
          <li><strong>NIST process review:</strong> Documents the multi-round standardization process, finalist selection criteria, and ongoing round-4 candidates.</li>
          <li><strong>Comparative analysis:</strong> Compares key sizes, performance, security levels, and implementation maturity across PQC families.</li>
          <li><strong>Migration framework:</strong> Discusses crypto-agility, hybrid TLS, inventory assessment, and transition timelines.</li>
        </ul>
        <figure>
          <img src="images/pqc-quantum-safe-survey/thumbnail.png" alt="PQC survey overview">
          <figcaption>Taxonomy of post-quantum cryptographic approaches and NIST standardization status.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Comprehensive taxonomy:</strong> Unified classification of all major PQC families with security assumptions and trade-offs.</li>
          <li><strong>NIST timeline documentation:</strong> Detailed account of the standardization process through final standards publication.</li>
          <li><strong>Performance comparison:</strong> Side-by-side benchmarks of NIST finalists across key generation, encapsulation, signing operations.</li>
          <li><strong>Migration guidance:</strong> Practical framework for organizations planning quantum-safe transitions.</li>
          <li><strong>Open problems:</strong> Identifies key research gaps including side-channel resistance and formal verification.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Aspect</th><th>Coverage</th></tr></thead>
          <tbody>
            <tr><td>Algorithms surveyed</td><td>ML-KEM, ML-DSA, FALCON, SPHINCS+, BIKE, Classic McEliece, HQC, and more</td></tr>
            <tr><td>Security levels</td><td>NIST levels 1-5 (equivalent to AES-128 through AES-256)</td></tr>
            <tr><td>Performance metrics</td><td>Key size, encapsulation/signing time, bandwidth overhead</td></tr>
            <tr><td>Implementation platforms</td><td>x86, ARM, embedded, FPGA/ASIC</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scheme</th><th>Type</th><th>Public key</th><th>Performance</th></tr></thead>
          <tbody>
            <tr><td>ML-KEM-768</td><td>Lattice KEM</td><td>1,184 bytes</td><td>Fast</td></tr>
            <tr><td>ML-DSA-65</td><td>Lattice signature</td><td>1,952 bytes</td><td>Fast</td></tr>
            <tr><td>FALCON-512</td><td>Lattice signature</td><td>897 bytes</td><td>Moderate (complex signing)</td></tr>
            <tr><td>SPHINCS+-128s</td><td>Hash signature</td><td>32 bytes</td><td>Slow (large signatures)</td></tr>
            <tr><td>Classic McEliece</td><td>Code KEM</td><td>~261 KB</td><td>Fast decaps, huge keys</td></tr>
          </tbody>
        </table>
        <p>Lattice-based schemes dominate in overall performance balance, but hash-based signatures offer the most conservative security assumptions. Code-based schemes provide strong security but suffer from large key sizes.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Exceptionally comprehensive — covers algorithms, implementations, migration, and open problems.</li>
          <li>Up-to-date with NIST final standards and ongoing round-4 activity.</li>
          <li>Practical migration framework useful for industry practitioners, not just researchers.</li>
          <li>Fair and balanced comparison across PQC families without bias toward any approach.</li>
          <li>Well-structured with clear taxonomy that aids navigation of the complex PQC landscape.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Survey breadth comes at the cost of depth — individual schemes receive limited technical analysis.</li>
          <li>Side-channel analysis coverage is relatively brief despite its practical importance.</li>
          <li>Rapidly evolving field means some details will date quickly.</li>
          <li>Limited discussion of quantum key distribution (QKD) as a complementary approach.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Should organizations adopt hybrid classical+PQC schemes during the transition, or move directly to pure PQC?</li>
          <li>How should the cryptographic community respond if a new quantum algorithm breaks lattice assumptions?</li>
          <li>What role should formal verification play in PQC implementation assurance?</li>
          <li>How do resource estimates for cryptographically relevant quantum computers affect migration urgency?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This survey is an excellent starting point for anyone entering the PQC field or planning a quantum-safe migration. It provides the big picture of where the field stands post-NIST standardization while honestly identifying the remaining challenges. The migration guidance section is particularly valuable for bridging the gap between cryptographic research and practical deployment.</p>
      `
    },
    ko: {
      title: "포스트 양자 암호와 양자 안전 보안: 종합 서베이",
      summary: "NIST 표준화 후보, 격자 기반, 코드 기반, 해시 기반 및 다변수 접근법과 함께 마이그레이션 과제 및 양자 안전 배포 전략을 다루는 포스트 양자 암호 분야의 종합 서베이를 제공합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이것은 PQC 체계의 수학적 기초부터 양자 안전 인프라를 위한 실용적 마이그레이션 전략까지 전체 범위를 다루는 <strong>포스트 양자 암호 분야의 철저한 참조 서베이</strong>입니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>NIST 표준화 알고리즘, 신흥 대안, 기존 인프라를 양자 안전 보안으로 마이그레이션하는 실질적 과제를 포함하여 포스트 양자 암호의 현재 상태는 어떠한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>암호학적으로 유의미한 양자 컴퓨터의 등장이 현재의 공개 키 암호(RSA, ECC)를 위협합니다. NIST는 첫 PQC 표준(CRYSTALS-Kyber/ML-KEM, CRYSTALS-Dilithium/ML-DSA, FALCON, SPHINCS+)을 확정했지만, 양자 안전 시스템으로의 마이그레이션은 복잡하고 진행 중입니다. 연구자와 실무자를 안내하기 위한 종합 서베이가 필요합니다.</p>
        <p>이 서베이는 알고리즘뿐 아니라 하이브리드 체계, 구현 과제, 부채널 저항성, 조직적 마이그레이션 로드맵 등 더 넓은 생태계도 다룹니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>분류 체계:</strong> 수학적 기반별 PQC 접근법 분류 — 격자, 코드, 해시, 다변수, 아이소제니(SIKE 이후).</li>
          <li><strong>NIST 프로세스 검토:</strong> 다중 라운드 표준화 과정, 최종 후보 선정 기준, 진행 중인 4라운드 후보 문서화.</li>
          <li><strong>비교 분석:</strong> PQC 계열 간 키 크기, 성능, 보안 수준, 구현 성숙도 비교.</li>
          <li><strong>마이그레이션 프레임워크:</strong> 암호 민첩성, 하이브리드 TLS, 인벤토리 평가, 전환 일정 논의.</li>
        </ul>
        <figure>
          <img src="images/pqc-quantum-safe-survey/thumbnail.png" alt="PQC 서베이 개요">
          <figcaption>포스트 양자 암호 접근법의 분류 체계와 NIST 표준화 현황.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>종합적 분류 체계:</strong> 모든 주요 PQC 계열의 보안 가정과 트레이드오프를 포함한 통합 분류.</li>
          <li><strong>NIST 타임라인 문서화:</strong> 최종 표준 발표까지의 표준화 과정에 대한 상세한 기술.</li>
          <li><strong>성능 비교:</strong> 키 생성, 캡슐화, 서명 연산에 걸친 NIST 최종 후보의 나란한 벤치마크.</li>
          <li><strong>마이그레이션 가이드:</strong> 양자 안전 전환을 계획하는 조직을 위한 실용적 프레임워크.</li>
          <li><strong>미해결 문제:</strong> 부채널 저항성 및 형식 검증을 포함한 주요 연구 격차 식별.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>측면</th><th>다루는 범위</th></tr></thead>
          <tbody>
            <tr><td>서베이 대상 알고리즘</td><td>ML-KEM, ML-DSA, FALCON, SPHINCS+, BIKE, Classic McEliece, HQC 등</td></tr>
            <tr><td>보안 수준</td><td>NIST 수준 1-5 (AES-128 ~ AES-256 동등)</td></tr>
            <tr><td>성능 지표</td><td>키 크기, 캡슐화/서명 시간, 대역폭 오버헤드</td></tr>
            <tr><td>구현 플랫폼</td><td>x86, ARM, 임베디드, FPGA/ASIC</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>체계</th><th>유형</th><th>공개 키</th><th>성능</th></tr></thead>
          <tbody>
            <tr><td>ML-KEM-768</td><td>격자 KEM</td><td>1,184 바이트</td><td>빠름</td></tr>
            <tr><td>ML-DSA-65</td><td>격자 서명</td><td>1,952 바이트</td><td>빠름</td></tr>
            <tr><td>FALCON-512</td><td>격자 서명</td><td>897 바이트</td><td>보통 (복잡한 서명)</td></tr>
            <tr><td>SPHINCS+-128s</td><td>해시 서명</td><td>32 바이트</td><td>느림 (큰 서명)</td></tr>
            <tr><td>Classic McEliece</td><td>코드 KEM</td><td>약 261 KB</td><td>빠른 복호화, 거대한 키</td></tr>
          </tbody>
        </table>
        <p>격자 기반 체계가 전반적 성능 균형에서 우세하지만, 해시 기반 서명이 가장 보수적인 보안 가정을 제공합니다. 코드 기반 체계는 강한 보안을 제공하지만 큰 키 크기로 어려움을 겪습니다.</p>

        <h2>강점</h2>
        <ul>
          <li>매우 포괄적 — 알고리즘, 구현, 마이그레이션, 미해결 문제를 모두 다룸.</li>
          <li>NIST 최종 표준 및 진행 중인 4라운드 활동에 대해 최신 상태.</li>
          <li>연구자뿐 아니라 산업 실무자에게도 유용한 실용적 마이그레이션 프레임워크.</li>
          <li>특정 접근법에 편향 없이 PQC 계열 간 공정하고 균형 잡힌 비교.</li>
          <li>복잡한 PQC 지형의 탐색을 돕는 명확한 분류 체계로 잘 구조화.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>서베이의 넓은 범위가 깊이의 대가로 옴 — 개별 체계가 제한된 기술적 분석을 받음.</li>
          <li>실질적 중요성에도 불구하고 부채널 분석 범위가 비교적 간략.</li>
          <li>빠르게 진화하는 분야라 일부 세부사항이 빠르게 구식이 될 것.</li>
          <li>보완적 접근법인 양자 키 분배(QKD)에 대한 논의가 제한적.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>조직은 전환 기간 동안 하이브리드 고전+PQC 체계를 채택해야 하는가, 아니면 순수 PQC로 바로 이동해야 하는가?</li>
          <li>새로운 양자 알고리즘이 격자 가정을 깨뜨릴 경우 암호학 커뮤니티는 어떻게 대응해야 하는가?</li>
          <li>PQC 구현 보증에서 형식 검증은 어떤 역할을 해야 하는가?</li>
          <li>암호학적으로 유의미한 양자 컴퓨터의 자원 추정이 마이그레이션 긴급성에 어떤 영향을 미치는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 서베이는 PQC 분야에 입문하거나 양자 안전 마이그레이션을 계획하는 누구에게나 훌륭한 시작점입니다. NIST 표준화 이후 분야의 현재 위치에 대한 전체 그림을 제공하면서 남은 과제를 정직하게 식별합니다. 마이그레이션 가이드 섹션은 암호학 연구와 실용적 배포 간의 격차를 좁히는 데 특히 가치 있습니다.</p>
      `
    }
  }
];
