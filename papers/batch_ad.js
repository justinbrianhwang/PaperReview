const BATCH_AD = [
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
  }
];
