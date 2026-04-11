[
  // ====================================================================
  // 1. Sensor Failure Simulation
  // ====================================================================
  {
    id: "sensor-failure-simulation",
    date: "2025-04-11",
    domain: "autonomous-driving",
    authors: "Matos, F., Duraes, J., Cunha, J.",
    venue: "Informatics 2025",
    image: "images/sensor-failure-simulation/thumbnail.png",
    link: "",
    tags: ["Autonomous Driving", "Sensor Failure", "Safety", "Simulation"],
    en: {
      title: "Simulating the Effects of Sensor Failures on Autonomous Vehicles for Safety Evaluation",
      summary: "A systematic framework for injecting realistic sensor failures into CARLA to evaluate how autonomous vehicles degrade under camera, LiDAR, GNSS, and IMU faults.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides a much-needed systematic methodology for <strong>evaluating AV robustness under sensor degradation</strong> by injecting controlled, realistic failures into the CARLA simulator and measuring driving performance across multiple sensor modalities.</p>

        <h2>Research Question</h2>
        <blockquote>How do different types and severities of sensor failures (camera, LiDAR, GNSS, IMU) affect autonomous vehicle behavior, and can we build a simulation-based framework to systematically evaluate safety under these degraded conditions?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Autonomous vehicles rely on a complex sensor suite including cameras, LiDAR, GNSS, and IMUs. In real-world deployment, these sensors can fail due to hardware degradation, environmental factors (rain, fog, dust), electromagnetic interference, or physical damage. Understanding how AVs behave under such conditions is critical for safety certification, yet testing sensor failures on real vehicles is expensive, dangerous, and difficult to reproduce.</p>
        <p>Simulation environments like CARLA offer a controlled, repeatable testbed where sensor faults can be injected programmatically. However, prior work has largely focused on individual sensor types or limited failure modes. This paper addresses the gap by proposing a <strong>comprehensive multi-sensor failure injection framework</strong> covering four major sensor modalities with multiple failure types per sensor, enabling systematic safety evaluation across a wide range of degraded conditions.</p>
        <p>The motivation extends beyond academic curiosity: regulatory bodies and industry standards (ISO 26262, SOTIF) increasingly require evidence that AVs can handle sensor degradation gracefully. A standardized simulation-based testing methodology could accelerate safety validation.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/sensor-failure-simulation/fig1-framework.png" alt="Sensor failure injection framework overview">
          <figcaption>Figure 1: Overall framework for sensor failure injection in CARLA simulator.</figcaption>
        </figure>
        <p>The methodology centers on a modular failure injection pipeline built on top of the CARLA simulator:</p>
        <ul>
          <li><strong>Camera failures:</strong> Complete blackout, partial occlusion, noise injection (Gaussian, salt-and-pepper), blur (motion, defocus), and brightness/contrast shifts simulating overexposure or underexposure.</li>
          <li><strong>LiDAR failures:</strong> Point cloud dropout (random and sector-based), range reduction, noise injection on distance measurements, and complete sensor loss.</li>
          <li><strong>GNSS failures:</strong> Position drift (gradual and sudden), signal loss, multipath errors simulating urban canyon effects, and reduced update rate.</li>
          <li><strong>IMU failures:</strong> Bias drift on accelerometer and gyroscope readings, noise amplification, intermittent data loss, and scale factor errors.</li>
          <li><strong>Evaluation metrics:</strong> Lane keeping accuracy, collision rate, route completion percentage, lateral deviation, speed regulation, and reaction time to obstacles.</li>
          <li><strong>Scenario design:</strong> Multiple driving scenarios (highway, urban intersection, parking, curved roads) tested with varying failure severities (mild, moderate, severe, complete).</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Multi-sensor failure taxonomy:</strong> Provides a structured classification of failure modes across four major sensor types, serving as a reference for future safety evaluation work.</li>
          <li><strong>CARLA-based injection framework:</strong> Implements a modular, reproducible failure injection system that can be extended to new sensor types and failure modes.</li>
          <li><strong>Cross-sensor impact analysis:</strong> Quantifies how failures in individual sensors cascade through the perception-planning-control pipeline, identifying which sensor losses are most critical.</li>
          <li><strong>Severity-performance mapping:</strong> Establishes quantitative relationships between failure severity levels and driving performance metrics, enabling risk-based safety assessment.</li>
          <li><strong>Comprehensive 38-page evaluation:</strong> Covers a wide range of scenarios and failure combinations, providing a thorough empirical baseline for AV safety under degraded sensing.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>The study uses the <strong>CARLA 0.9.x simulator</strong> with its built-in autopilot and sensor suite. Failure injection is implemented as a middleware layer between CARLA's sensor outputs and the AV's perception stack:</p>
        <ul>
          <li><strong>Platform:</strong> CARLA simulator with Python API for sensor manipulation and failure injection.</li>
          <li><strong>Driving agent:</strong> CARLA's built-in autopilot serves as the baseline AV controller, providing a consistent reference for measuring failure impacts.</li>
          <li><strong>Failure injection:</strong> Each sensor failure is parameterized by type and severity, applied in real-time during simulation.</li>
          <li><strong>Scenarios:</strong> Multiple predefined routes covering highway, urban, intersection, and parking scenarios.</li>
          <li><strong>Repetitions:</strong> Each scenario-failure combination is repeated multiple times to ensure statistical reliability.</li>
          <li><strong>Metrics collection:</strong> Automated logging of all driving performance metrics at each simulation step.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Sensor Failure</th><th>Severity</th><th>Route Completion</th><th>Collision Rate</th><th>Key Observation</th></tr></thead>
          <tbody>
            <tr><td>Camera blackout</td><td>Complete</td><td>Severely degraded</td><td>High</td><td>Vehicle loses all visual reference; most critical single-sensor failure.</td></tr>
            <tr><td>LiDAR dropout</td><td>Severe (>70%)</td><td>Moderate degradation</td><td>Elevated</td><td>Obstacle detection degrades but partial point cloud still provides some spatial awareness.</td></tr>
            <tr><td>GNSS drift</td><td>Gradual</td><td>Near-normal</td><td>Low increase</td><td>Localization errors accumulate slowly; vehicle drifts from planned route.</td></tr>
            <tr><td>IMU bias</td><td>Moderate</td><td>Mildly degraded</td><td>Slight increase</td><td>Attitude estimation errors cause oscillatory control behavior.</td></tr>
            <tr><td>Multi-sensor</td><td>Combined mild</td><td>Significantly degraded</td><td>High</td><td>Combined mild failures can be worse than a single severe failure.</td></tr>
          </tbody>
        </table>
        <p>The results reveal that <strong>camera failures have the most immediate and severe impact</strong> on driving performance, followed by LiDAR. GNSS and IMU failures tend to cause more gradual degradation. Critically, the study shows that <strong>combinations of mild failures across multiple sensors</strong> can produce worse outcomes than a single severe failure, highlighting the importance of multi-sensor fault analysis.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Comprehensive coverage of four major sensor modalities with multiple failure types per sensor, providing a thorough taxonomy.</li>
          <li>Practical and reproducible framework built on the widely-used CARLA simulator, lowering the barrier for adoption.</li>
          <li>The finding that combined mild failures can exceed single severe failures is a valuable insight for safety engineering.</li>
          <li>Severity-performance mapping provides quantitative data that can inform safety standards and certification processes.</li>
          <li>Extensive 38-page evaluation demonstrates thoroughness and commitment to empirical rigor.</li>
          <li>Modular design allows extension to new sensor types, failure modes, and AV control algorithms.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Uses CARLA's built-in autopilot rather than a state-of-the-art learning-based driving stack, limiting generalizability to modern AV systems.</li>
          <li>Simulation-to-real gap remains unaddressed: injected failures may not perfectly replicate real-world sensor degradation patterns.</li>
          <li>No formal fault-tolerance or recovery mechanism is proposed; the study is purely diagnostic, not prescriptive.</li>
          <li>Limited exploration of temporal failure patterns (intermittent vs. persistent) and their differential impact on driving behavior.</li>
          <li>Does not consider sensor fusion algorithms' ability to compensate for individual sensor failures, which is standard in production AVs.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the results change if a modern end-to-end learning-based driving model were used instead of CARLA's rule-based autopilot?</li>
          <li>Can this framework be extended to model adversarial sensor attacks (spoofing, jamming) in addition to natural failures?</li>
          <li>What minimum sensor redundancy configuration would be needed to maintain safe driving under the worst-case single-sensor failure?</li>
          <li>How should the severity-performance curves from this study be incorporated into formal safety standards like ISO 26262 or SOTIF?</li>
          <li>Could reinforcement learning be used to train AV controllers that are specifically robust to the failure modes identified in this study?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper fills an important gap in AV safety research by providing a systematic, simulation-based methodology for evaluating sensor failure impacts. Its key insight -- that combined mild failures can be more dangerous than isolated severe ones -- has direct implications for sensor fusion design and safety certification.</p>
        <p>For researchers and practitioners in autonomous driving safety, this work serves as both a reference taxonomy of sensor failures and a practical framework for conducting failure-mode testing. The next step is to apply this methodology to modern learning-based driving stacks and to develop failure-aware training strategies that build robustness directly into the AV's perception and planning modules.</p>
      `
    },
    ko: {
      title: "자율주행 차량의 안전성 평가를 위한 센서 고장 시뮬레이션",
      summary: "CARLA 시뮬레이터에서 카메라, LiDAR, GNSS, IMU 고장을 체계적으로 주입하여 자율주행 차량의 성능 저하를 평가하는 프레임워크를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 CARLA 시뮬레이터에서 <strong>제어된 센서 고장을 주입하여 자율주행 차량의 안전성을 체계적으로 평가</strong>하는 방법론을 제시하며, 복합 경미 고장이 단일 심각 고장보다 위험할 수 있다는 중요한 발견을 보고합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>카메라, LiDAR, GNSS, IMU의 다양한 유형과 심각도의 센서 고장이 자율주행 차량 행동에 어떤 영향을 미치며, 이러한 저하 조건에서 안전성을 체계적으로 평가할 수 있는 시뮬레이션 기반 프레임워크를 구축할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>자율주행 차량은 카메라, LiDAR, GNSS, IMU를 포함한 복잡한 센서 구성에 의존합니다. 실제 배포 환경에서 이러한 센서는 하드웨어 열화, 환경 요인(비, 안개, 먼지), 전자기 간섭, 물리적 손상 등으로 고장날 수 있습니다. 이러한 조건에서 AV가 어떻게 동작하는지 이해하는 것은 안전 인증에 필수적이지만, 실제 차량에서 센서 고장을 테스트하는 것은 비용이 많이 들고 위험하며 재현이 어렵습니다.</p>
        <p>CARLA와 같은 시뮬레이션 환경은 센서 결함을 프로그래밍 방식으로 주입할 수 있는 제어되고 반복 가능한 테스트베드를 제공합니다. 그러나 기존 연구는 대부분 개별 센서 유형이나 제한된 고장 모드에 초점을 맞추었습니다. 이 논문은 센서당 여러 고장 유형을 가진 네 가지 주요 센서 모달리티를 포괄하는 <strong>종합적 다중 센서 고장 주입 프레임워크</strong>를 제안하여 이 격차를 해소합니다.</p>
        <p>학문적 관심을 넘어 규제 기관과 산업 표준(ISO 26262, SOTIF)에서 AV가 센서 저하를 우아하게 처리할 수 있다는 증거를 점점 더 요구하고 있어, 표준화된 시뮬레이션 기반 테스트 방법론이 안전 검증을 가속화할 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/sensor-failure-simulation/fig1-framework.png" alt="센서 고장 주입 프레임워크 개요">
          <figcaption>Figure 1: CARLA 시뮬레이터에서의 센서 고장 주입 프레임워크 전체 구조.</figcaption>
        </figure>
        <p>방법론은 CARLA 시뮬레이터 위에 구축된 모듈식 고장 주입 파이프라인을 중심으로 합니다:</p>
        <ul>
          <li><strong>카메라 고장:</strong> 완전 블랙아웃, 부분 차단, 노이즈 주입(가우시안, 솔트-앤-페퍼), 블러(모션, 디포커스), 밝기/대비 변화로 과노출 또는 저노출 시뮬레이션.</li>
          <li><strong>LiDAR 고장:</strong> 포인트 클라우드 드롭아웃(랜덤 및 섹터 기반), 범위 축소, 거리 측정 노이즈 주입, 완전 센서 손실.</li>
          <li><strong>GNSS 고장:</strong> 위치 드리프트(점진적 및 급격), 신호 손실, 도시 캐니언 효과를 시뮬레이션하는 다중경로 오류, 업데이트 속도 감소.</li>
          <li><strong>IMU 고장:</strong> 가속도계 및 자이로스코프 바이어스 드리프트, 노이즈 증폭, 간헐적 데이터 손실, 스케일 팩터 오류.</li>
          <li><strong>평가 지표:</strong> 차선 유지 정확도, 충돌률, 경로 완주율, 횡방향 편차, 속도 조절, 장애물 반응 시간.</li>
          <li><strong>시나리오 설계:</strong> 다양한 고장 심각도(경미, 중간, 심각, 완전)로 여러 주행 시나리오(고속도로, 도심 교차로, 주차, 곡선 도로) 테스트.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>다중 센서 고장 분류 체계:</strong> 네 가지 주요 센서 유형에 걸친 고장 모드의 구조화된 분류를 제공하여 향후 안전 평가 연구의 참조 역할.</li>
          <li><strong>CARLA 기반 주입 프레임워크:</strong> 새로운 센서 유형과 고장 모드로 확장 가능한 모듈식, 재현 가능한 고장 주입 시스템 구현.</li>
          <li><strong>교차 센서 영향 분석:</strong> 개별 센서의 고장이 인식-계획-제어 파이프라인을 통해 어떻게 연쇄적으로 영향을 미치는지 정량화하여 가장 치명적인 센서 손실 식별.</li>
          <li><strong>심각도-성능 매핑:</strong> 고장 심각도 수준과 주행 성능 지표 간의 정량적 관계를 수립하여 위험 기반 안전 평가 지원.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>이 연구는 내장 오토파일럿과 센서 스위트를 갖춘 <strong>CARLA 0.9.x 시뮬레이터</strong>를 사용합니다. 고장 주입은 CARLA의 센서 출력과 AV의 인식 스택 사이의 미들웨어 계층으로 구현됩니다:</p>
        <ul>
          <li><strong>플랫폼:</strong> 센서 조작 및 고장 주입을 위한 Python API가 포함된 CARLA 시뮬레이터.</li>
          <li><strong>주행 에이전트:</strong> CARLA의 내장 오토파일럿이 기준 AV 컨트롤러로 사용되어 고장 영향 측정을 위한 일관된 참조 제공.</li>
          <li><strong>고장 주입:</strong> 각 센서 고장은 유형과 심각도로 매개변수화되어 시뮬레이션 중 실시간으로 적용.</li>
          <li><strong>시나리오:</strong> 고속도로, 도심, 교차로, 주차 시나리오를 포함하는 여러 사전 정의된 경로.</li>
          <li><strong>반복:</strong> 통계적 신뢰성을 보장하기 위해 각 시나리오-고장 조합을 여러 번 반복.</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>센서 고장</th><th>심각도</th><th>경로 완주</th><th>충돌률</th><th>주요 관찰</th></tr></thead>
          <tbody>
            <tr><td>카메라 블랙아웃</td><td>완전</td><td>심각한 저하</td><td>높음</td><td>차량이 모든 시각적 참조를 잃음; 가장 치명적인 단일 센서 고장.</td></tr>
            <tr><td>LiDAR 드롭아웃</td><td>심각 (>70%)</td><td>중간 저하</td><td>상승</td><td>장애물 감지가 저하되지만 부분 포인트 클라우드가 일부 공간 인식 제공.</td></tr>
            <tr><td>GNSS 드리프트</td><td>점진적</td><td>거의 정상</td><td>소폭 증가</td><td>위치 추정 오류가 서서히 축적; 차량이 계획된 경로에서 이탈.</td></tr>
            <tr><td>IMU 바이어스</td><td>중간</td><td>경미한 저하</td><td>약간 증가</td><td>자세 추정 오류가 진동적 제어 행동을 유발.</td></tr>
            <tr><td>다중 센서</td><td>복합 경미</td><td>상당한 저하</td><td>높음</td><td>복합 경미 고장이 단일 심각 고장보다 나쁠 수 있음.</td></tr>
          </tbody>
        </table>
        <p>결과는 <strong>카메라 고장이 주행 성능에 가장 즉각적이고 심각한 영향</strong>을 미치며, LiDAR가 그 뒤를 잇는 것을 보여줍니다. GNSS와 IMU 고장은 더 점진적인 저하를 유발하는 경향이 있습니다. 결정적으로, <strong>여러 센서에 걸친 경미한 고장의 조합</strong>이 단일 심각 고장보다 더 나쁜 결과를 초래할 수 있다는 점이 다중 센서 결함 분석의 중요성을 부각합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>센서당 여러 고장 유형을 가진 네 가지 주요 센서 모달리티의 포괄적 커버리지로 철저한 분류 체계 제공.</li>
          <li>널리 사용되는 CARLA 시뮬레이터 위에 구축된 실용적이고 재현 가능한 프레임워크로 채택 장벽을 낮춤.</li>
          <li>복합 경미 고장이 단일 심각 고장을 초과할 수 있다는 발견은 안전 공학에 귀중한 통찰.</li>
          <li>심각도-성능 매핑이 안전 표준 및 인증 프로세스에 정보를 제공할 수 있는 정량적 데이터 제공.</li>
          <li>38페이지에 걸친 광범위한 평가가 철저함과 실증적 엄밀성에 대한 헌신을 보여줌.</li>
          <li>모듈식 설계가 새로운 센서 유형, 고장 모드, AV 제어 알고리즘으로의 확장을 허용.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>최신 학습 기반 주행 스택 대신 CARLA의 내장 오토파일럿을 사용하여 현대 AV 시스템에 대한 일반화 가능성이 제한적.</li>
          <li>시뮬레이션-실제 격차가 해결되지 않음: 주입된 고장이 실제 센서 저하 패턴을 완벽하게 복제하지 못할 수 있음.</li>
          <li>공식적인 결함 허용 또는 복구 메커니즘이 제안되지 않음; 연구가 순수하게 진단적이며 처방적이지 않음.</li>
          <li>시간적 고장 패턴(간헐적 vs. 지속적)과 주행 행동에 대한 차별적 영향의 탐색이 제한적.</li>
          <li>생산 AV에서 표준인 센서 융합 알고리즘의 개별 센서 고장 보상 능력을 고려하지 않음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>CARLA의 규칙 기반 오토파일럿 대신 최신 end-to-end 학습 기반 주행 모델을 사용하면 결과가 어떻게 달라질까?</li>
          <li>이 프레임워크를 자연적 고장 외에 적대적 센서 공격(스푸핑, 재밍) 모델링으로 확장할 수 있는가?</li>
          <li>최악의 단일 센서 고장 하에서 안전한 주행을 유지하기 위해 필요한 최소 센서 중복 구성은 무엇인가?</li>
          <li>이 연구의 심각도-성능 곡선을 ISO 26262나 SOTIF와 같은 공식 안전 표준에 어떻게 통합해야 하는가?</li>
          <li>이 연구에서 식별된 고장 모드에 특별히 강건한 AV 컨트롤러를 훈련하기 위해 강화학습을 사용할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 센서 고장 영향을 평가하기 위한 체계적이고 시뮬레이션 기반의 방법론을 제공하여 AV 안전 연구의 중요한 격차를 메웁니다. 핵심 통찰인 복합 경미 고장이 단일 심각 고장보다 더 위험할 수 있다는 점은 센서 융합 설계와 안전 인증에 직접적인 함의를 가집니다.</p>
        <p>자율주행 안전 분야의 연구자와 실무자에게 이 연구는 센서 고장의 참조 분류 체계이자 고장 모드 테스트를 수행하기 위한 실용적 프레임워크 역할을 합니다. 다음 단계는 이 방법론을 현대 학습 기반 주행 스택에 적용하고, AV의 인식 및 계획 모듈에 직접 강건성을 구축하는 고장 인식 학습 전략을 개발하는 것입니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. Frenet Trajectory
  // ====================================================================
  {
    id: "frenet-trajectory",
    date: "2025-04-11",
    domain: "autonomous-driving",
    authors: "Werling, M., Ziegler, J., Kammel, S., Thrun, S.",
    venue: "ICRA 2010",
    image: "images/frenet-trajectory/thumbnail.png",
    link: "",
    tags: ["Autonomous Driving", "Trajectory Planning", "Frenet Frame"],
    en: {
      title: "Optimal Trajectory Generation for Dynamic Street Scenarios in a Frenet Frame",
      summary: "Proposes a real-time trajectory generation method that decouples lateral and longitudinal planning in the Frenet coordinate frame using quintic and quartic polynomials.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces a <strong>foundational trajectory generation framework</strong> that leverages the Frenet coordinate system to decouple lateral and longitudinal motion planning, enabling real-time optimal trajectory selection for dynamic on-road driving scenarios through polynomial-based generation and cost-function evaluation.</p>

        <h2>Research Question</h2>
        <blockquote>How can we generate optimal, real-time feasible trajectories for autonomous vehicles in dynamic street scenarios by exploiting the geometric structure of roads through the Frenet coordinate frame?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Trajectory planning for autonomous vehicles in dynamic environments is one of the most challenging problems in robotics. The vehicle must simultaneously satisfy kinematic and dynamic constraints, avoid collisions with static and moving obstacles, maintain comfort, and do so in real-time. Traditional approaches either rely on graph-based search methods (which discretize the solution space coarsely) or optimization-based methods (which can be computationally expensive and sensitive to initialization).</p>
        <p>The key insight of this paper is that <strong>roads have natural curvilinear structure</strong>. By transforming the planning problem from Cartesian coordinates to the Frenet frame (defined along a reference path), the lateral (across-road) and longitudinal (along-road) motions can be planned semi-independently. This decomposition drastically reduces the search space while preserving the ability to generate smooth, dynamically feasible trajectories.</p>
        <p>This work was published at ICRA 2010 and has since become one of the most widely cited trajectory planning papers in the autonomous driving literature, forming the basis for many production and research-grade planning systems.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/frenet-trajectory/fig1-frenet-frame.png" alt="Frenet coordinate frame along a reference path">
          <figcaption>Figure 1: The Frenet coordinate frame transforms planning into road-aligned coordinates (s, d).</figcaption>
        </figure>
        <p>The method proceeds in several stages:</p>
        <ul>
          <li><strong>Frenet transformation:</strong> The road is represented by a reference path. Each point in space is described by (s, d) where s is the arc-length along the reference and d is the lateral offset. This naturally aligns the coordinate system with the road geometry.</li>
          <li><strong>Lateral planning:</strong> Quintic polynomials are used to generate lateral trajectories d(t) that connect the current state (position, velocity, acceleration) to a set of target lateral offsets at various time horizons. This produces a family of candidate lateral profiles.</li>
          <li><strong>Longitudinal planning:</strong> Quartic or quintic polynomials generate longitudinal trajectories s(t) for velocity-keeping (reaching a target speed) or position-keeping (following a lead vehicle). Multiple target speeds and time horizons create a family of longitudinal candidates.</li>
          <li><strong>Combination:</strong> Each lateral trajectory is combined with each longitudinal trajectory, producing a large set of candidate full trajectories in (s, d, t) space.</li>
          <li><strong>Cost evaluation:</strong> Each combined trajectory is evaluated against a cost functional that penalizes jerk (for comfort), deviation from targets (for progress), and proximity to obstacles (for safety). The lowest-cost feasible trajectory is selected.</li>
          <li><strong>Feasibility check:</strong> Maximum curvature, acceleration, and velocity constraints are enforced, discarding dynamically infeasible candidates.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Frenet-frame decomposition:</strong> Separating lateral and longitudinal planning along the road's natural coordinate system dramatically simplifies the trajectory generation problem while maintaining physical meaningfulness.</li>
          <li><strong>Polynomial trajectory generation:</strong> Using quintic (5th-order) polynomials ensures continuity up to the acceleration level, guaranteeing smooth and comfortable trajectories.</li>
          <li><strong>Real-time capability:</strong> The sampling-and-selection approach avoids expensive iterative optimization, enabling real-time execution at planning rates required for highway and urban driving.</li>
          <li><strong>Unified handling of multiple scenarios:</strong> The same framework handles lane changes, velocity keeping, following, merging, and stopping through appropriate terminal conditions and cost weights.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>This is not a learning-based method, so there is no training phase. The implementation details are as follows:</p>
        <ul>
          <li><strong>Reference path:</strong> Derived from road centerline or a previously planned global route.</li>
          <li><strong>Polynomial order:</strong> Quintic (5th degree) for lateral motion; quartic (4th degree) for velocity-keeping longitudinal motion, quintic for position-keeping.</li>
          <li><strong>Sampling resolution:</strong> Lateral targets sampled at discrete offsets (e.g., lane centers); longitudinal targets sampled at discrete velocities and time horizons.</li>
          <li><strong>Cost function:</strong> Weighted sum of jerk integral, time penalty, deviation from target lateral position, and deviation from target velocity. Weights are scenario-dependent.</li>
          <li><strong>Constraint checking:</strong> Maximum curvature, lateral/longitudinal acceleration, and velocity bounds applied as hard constraints.</li>
          <li><strong>Replanning rate:</strong> Designed for re-execution at 10-20 Hz, with each planning cycle completing in milliseconds.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Behavior</th><th>Key Result</th></tr></thead>
          <tbody>
            <tr><td>Velocity keeping</td><td>Reach and maintain target speed</td><td>Smooth acceleration profiles with minimal jerk; real-time execution.</td></tr>
            <tr><td>Following</td><td>Maintain safe distance to lead vehicle</td><td>Appropriate gap maintenance with smooth deceleration/acceleration transitions.</td></tr>
            <tr><td>Merging</td><td>Lane change with moving traffic</td><td>Generates feasible, collision-free merge trajectories considering adjacent vehicle dynamics.</td></tr>
            <tr><td>Stopping</td><td>Decelerate to stop at target</td><td>Comfort-optimal deceleration profiles satisfying position and velocity constraints.</td></tr>
            <tr><td>Reactive obstacle avoidance</td><td>Avoid sudden obstacles</td><td>Rapid replanning selects evasive lateral trajectories within the candidate set.</td></tr>
          </tbody>
        </table>
        <p>The paper demonstrates the method's effectiveness through simulation scenarios covering the major driving maneuvers. The approach consistently generates smooth, feasible trajectories in real-time, with the cost function naturally balancing comfort, progress, and safety. The polynomial generation and evaluation runs in well under the required planning cycle time.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant formulation that exploits road geometry to decompose a high-dimensional problem into manageable sub-problems.</li>
          <li>Real-time capable by design -- sampling and evaluation avoids iterative optimization bottlenecks.</li>
          <li>Polynomial trajectories guarantee smoothness up to acceleration continuity, ensuring passenger comfort.</li>
          <li>Unified framework handles diverse driving scenarios (lane keeping, lane change, following, merging, stopping) without separate planners.</li>
          <li>Highly influential -- this paper has become a standard reference and building block for trajectory planning in autonomous driving.</li>
          <li>Clean mathematical formulation that is easy to implement and extend.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Frenet frame assumes a well-defined reference path; performance degrades at intersections, parking lots, or unstructured environments where no clear reference exists.</li>
          <li>The sampling-based approach may miss optimal solutions that fall between sampled targets, especially in tight maneuvers.</li>
          <li>Obstacle avoidance is reactive (collision check after generation) rather than proactive; no prediction of other agents' future behavior is integrated.</li>
          <li>Cost function weights require manual tuning per scenario type, and the paper provides limited guidance on systematic weight selection.</li>
          <li>Frenet-to-Cartesian transformation can introduce numerical issues at high curvature points of the reference path.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the Frenet-frame approach compare to modern optimization-based planners (e.g., MPCC, iLQR) in terms of solution quality versus computation time?</li>
          <li>Can the sampling strategy be made adaptive -- denser sampling near obstacles, sparser in open road -- to improve both quality and efficiency?</li>
          <li>How should prediction of other agents' future trajectories be integrated into this framework: as dynamic obstacles in the cost function, or as constraints?</li>
          <li>What modifications are needed to extend this approach to intersection and roundabout scenarios where the Frenet reference path is ambiguous?</li>
          <li>Is there a principled way to learn cost function weights from human driving data rather than hand-tuning them?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is a foundational work in autonomous driving trajectory planning. Its core idea -- decomposing the planning problem via the Frenet coordinate frame -- is both mathematically elegant and practically effective. The method's real-time capability, smoothness guarantees, and unified handling of multiple driving scenarios have made it a standard building block in the field.</p>
        <p>For anyone entering the trajectory planning space, this paper is essential reading. It provides the conceptual foundation that many subsequent methods build upon, and its limitations (unstructured environments, reactive obstacle handling, manual weight tuning) clearly point to the directions where the field has since advanced.</p>
      `
    },
    ko: {
      title: "Frenet 좌표계에서의 동적 도로 시나리오를 위한 최적 경로 생성",
      summary: "Frenet 좌표계에서 횡방향과 종방향 계획을 분리하여 5차 및 4차 다항식을 사용한 실시간 궤적 생성 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 Frenet 좌표계를 활용하여 횡방향과 종방향 운동 계획을 분리하는 <strong>기초적인 궤적 생성 프레임워크</strong>를 도입하여, 다항식 기반 생성과 비용 함수 평가를 통해 동적 도로 주행 시나리오에서 실시간 최적 궤적 선택을 가능하게 합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>Frenet 좌표계를 통해 도로의 기하학적 구조를 활용하여 동적 도로 시나리오에서 자율주행 차량을 위한 최적의 실시간 실현 가능한 궤적을 어떻게 생성할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>동적 환경에서의 자율주행 차량 궤적 계획은 로보틱스에서 가장 도전적인 문제 중 하나입니다. 차량은 운동학적 및 동역학적 제약을 동시에 만족시키고, 정적 및 이동 장애물과의 충돌을 회피하며, 승차감을 유지하면서 이 모든 것을 실시간으로 수행해야 합니다. 기존 접근법은 그래프 기반 탐색(솔루션 공간을 거칠게 이산화) 또는 최적화 기반 방법(계산 비용이 높고 초기화에 민감)에 의존합니다.</p>
        <p>이 논문의 핵심 통찰은 <strong>도로가 자연적인 곡선 좌표 구조를 가진다</strong>는 것입니다. 계획 문제를 직교 좌표에서 Frenet 프레임(기준 경로를 따라 정의)으로 변환하면, 횡방향(도로 가로질러)과 종방향(도로를 따라) 운동을 반독립적으로 계획할 수 있습니다. 이 분해는 매끄럽고 동역학적으로 실현 가능한 궤적 생성 능력을 유지하면서 탐색 공간을 크게 줄입니다.</p>
        <p>이 논문은 ICRA 2010에서 발표되었으며, 이후 자율주행 문헌에서 가장 널리 인용되는 궤적 계획 논문 중 하나가 되어 많은 생산 및 연구 수준의 계획 시스템의 기반을 형성하고 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/frenet-trajectory/fig1-frenet-frame.png" alt="기준 경로를 따른 Frenet 좌표계">
          <figcaption>Figure 1: Frenet 좌표계는 계획을 도로 정렬 좌표 (s, d)로 변환합니다.</figcaption>
        </figure>
        <p>방법은 여러 단계로 진행됩니다:</p>
        <ul>
          <li><strong>Frenet 변환:</strong> 도로는 기준 경로로 표현됩니다. 공간의 각 점은 (s, d)로 설명되며, s는 기준을 따른 호 길이이고 d는 횡방향 오프셋입니다. 이것은 자연스럽게 좌표계를 도로 기하학에 정렬합니다.</li>
          <li><strong>횡방향 계획:</strong> 5차 다항식을 사용하여 현재 상태(위치, 속도, 가속도)를 다양한 시간 범위의 목표 횡방향 오프셋 세트에 연결하는 횡방향 궤적 d(t)를 생성합니다.</li>
          <li><strong>종방향 계획:</strong> 4차 또는 5차 다항식이 속도 유지(목표 속도 도달) 또는 위치 유지(선행 차량 추종)를 위한 종방향 궤적 s(t)를 생성합니다.</li>
          <li><strong>조합:</strong> 각 횡방향 궤적이 각 종방향 궤적과 결합되어 (s, d, t) 공간에서 대규모 후보 전체 궤적 세트를 생성합니다.</li>
          <li><strong>비용 평가:</strong> 각 결합 궤적은 저크(승차감), 목표 편차(진행), 장애물 근접성(안전)을 벌점화하는 비용 함수에 대해 평가됩니다. 가장 낮은 비용의 실현 가능한 궤적이 선택됩니다.</li>
          <li><strong>실현 가능성 검사:</strong> 최대 곡률, 가속도, 속도 제약이 적용되어 동역학적으로 실현 불가능한 후보를 제거합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>Frenet 프레임 분해:</strong> 도로의 자연 좌표계를 따라 횡방향과 종방향 계획을 분리하여 궤적 생성 문제를 물리적 의미를 유지하면서 크게 단순화.</li>
          <li><strong>다항식 궤적 생성:</strong> 5차 다항식을 사용하여 가속도 수준까지의 연속성을 보장하여 매끄럽고 편안한 궤적을 보장.</li>
          <li><strong>실시간 능력:</strong> 샘플링-선택 접근법이 비용이 많이 드는 반복적 최적화를 피하여 고속도로 및 도시 주행에 필요한 계획 속도로 실시간 실행 가능.</li>
          <li><strong>다양한 시나리오의 통합 처리:</strong> 적절한 종단 조건과 비용 가중치를 통해 동일한 프레임워크가 차선 변경, 속도 유지, 추종, 합류, 정지를 처리.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>이것은 학습 기반 방법이 아니므로 학습 단계가 없습니다. 구현 세부사항은 다음과 같습니다:</p>
        <ul>
          <li><strong>기준 경로:</strong> 도로 중심선 또는 이전에 계획된 글로벌 경로에서 도출.</li>
          <li><strong>다항식 차수:</strong> 횡방향 운동에 5차; 속도 유지 종방향 운동에 4차, 위치 유지에 5차.</li>
          <li><strong>샘플링 해상도:</strong> 횡방향 목표는 이산 오프셋(예: 차선 중심)에서 샘플링; 종방향 목표는 이산 속도와 시간 범위에서 샘플링.</li>
          <li><strong>비용 함수:</strong> 저크 적분, 시간 벌점, 목표 횡방향 위치 편차, 목표 속도 편차의 가중 합. 가중치는 시나리오에 따라 다름.</li>
          <li><strong>재계획 속도:</strong> 10-20 Hz에서 재실행하도록 설계되며, 각 계획 주기가 밀리초 내에 완료.</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>행동</th><th>주요 결과</th></tr></thead>
          <tbody>
            <tr><td>속도 유지</td><td>목표 속도 도달 및 유지</td><td>최소 저크의 매끄러운 가속 프로필; 실시간 실행.</td></tr>
            <tr><td>추종</td><td>선행 차량과 안전 거리 유지</td><td>매끄러운 감속/가속 전환으로 적절한 간격 유지.</td></tr>
            <tr><td>합류</td><td>이동 교통과 차선 변경</td><td>인접 차량 동역학을 고려한 실현 가능하고 충돌 없는 합류 궤적 생성.</td></tr>
            <tr><td>정지</td><td>목표에서 감속하여 정지</td><td>위치 및 속도 제약을 만족하는 승차감 최적 감속 프로필.</td></tr>
            <tr><td>반응적 장애물 회피</td><td>갑작스러운 장애물 회피</td><td>빠른 재계획이 후보 세트 내에서 회피 횡방향 궤적을 선택.</td></tr>
          </tbody>
        </table>
        <p>논문은 주요 주행 기동을 포괄하는 시뮬레이션 시나리오를 통해 방법의 효과를 보여줍니다. 접근법은 일관되게 매끄럽고 실현 가능한 궤적을 실시간으로 생성하며, 비용 함수가 자연스럽게 승차감, 진행, 안전의 균형을 맞춥니다.</p>

        <h2>강점</h2>
        <ul>
          <li>도로 기하학을 활용하여 고차원 문제를 관리 가능한 하위 문제로 분해하는 우아한 공식화.</li>
          <li>설계상 실시간 가능 -- 샘플링과 평가가 반복적 최적화 병목을 회피.</li>
          <li>다항식 궤적이 가속도 연속성까지 매끄러움을 보장하여 승객 승차감 확보.</li>
          <li>통합 프레임워크가 별도의 플래너 없이 다양한 주행 시나리오를 처리.</li>
          <li>매우 영향력 있는 논문 -- 자율주행 궤적 계획의 표준 참조이자 구성 요소가 됨.</li>
          <li>구현하고 확장하기 쉬운 깔끔한 수학적 공식화.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>Frenet 프레임은 잘 정의된 기준 경로를 가정; 명확한 참조가 없는 교차로, 주차장, 비구조화 환경에서 성능이 저하.</li>
          <li>샘플링 기반 접근법이 샘플링된 목표 사이에 있는 최적 솔루션을 놓칠 수 있으며, 특히 좁은 기동에서 그러함.</li>
          <li>장애물 회피가 반응적(생성 후 충돌 검사)이며 사전적이지 않음; 다른 에이전트의 미래 행동 예측이 통합되지 않음.</li>
          <li>비용 함수 가중치가 시나리오 유형별로 수동 튜닝이 필요하며, 체계적인 가중치 선택에 대한 지침이 제한적.</li>
          <li>기준 경로의 고곡률 지점에서 Frenet-직교 좌표 변환이 수치적 문제를 일으킬 수 있음.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>Frenet 프레임 접근법은 현대 최적화 기반 플래너(예: MPCC, iLQR)와 솔루션 품질 대 계산 시간 면에서 어떻게 비교되는가?</li>
          <li>샘플링 전략을 적응적으로 만들 수 있는가 -- 장애물 근처에서는 밀집, 열린 도로에서는 희소 -- 품질과 효율성을 모두 개선하기 위해?</li>
          <li>다른 에이전트의 미래 궤적 예측을 이 프레임워크에 어떻게 통합해야 하는가: 비용 함수의 동적 장애물로, 또는 제약으로?</li>
          <li>Frenet 기준 경로가 모호한 교차로와 로터리 시나리오로 이 접근법을 확장하려면 어떤 수정이 필요한가?</li>
          <li>수동 튜닝 대신 인간 주행 데이터에서 비용 함수 가중치를 학습하는 원칙적인 방법이 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 자율주행 궤적 계획의 기초적 연구입니다. 핵심 아이디어인 Frenet 좌표계를 통한 계획 문제 분해는 수학적으로 우아하면서도 실용적으로 효과적입니다. 방법의 실시간 능력, 매끄러움 보장, 다양한 주행 시나리오의 통합 처리는 이 분야의 표준 구성 요소로 만들었습니다.</p>
        <p>궤적 계획 분야에 진입하는 누구에게나 이 논문은 필수 읽기입니다. 많은 후속 방법들이 구축하는 개념적 기반을 제공하며, 그 한계(비구조화 환경, 반응적 장애물 처리, 수동 가중치 튜닝)는 이후 분야가 발전한 방향을 명확히 가리킵니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. Sampling Motion Planning
  // ====================================================================
  {
    id: "sampling-motion-planning",
    date: "2025-04-11",
    domain: "autonomous-driving",
    authors: "Ma, L., Xue, J., Kawabata, K., Zhu, J., Ma, C., Zheng, N.",
    venue: "T-ITS 2015",
    image: "images/sampling-motion-planning/thumbnail.png",
    link: "",
    tags: ["Autonomous Driving", "Motion Planning", "RRT", "Sampling"],
    en: {
      title: "Efficient Sampling-Based Motion Planning for On-Road Autonomous Driving",
      summary: "Proposes an improved RRT-based motion planning algorithm that biases sampling toward road structure for efficient, real-time trajectory generation in urban and highway scenarios.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper advances sampling-based motion planning for autonomous driving by introducing <strong>road-structure-aware sampling biases and efficient collision checking</strong> into the RRT framework, achieving practical real-time performance for on-road driving in both urban and highway environments.</p>

        <h2>Research Question</h2>
        <blockquote>How can we adapt sampling-based motion planning (specifically RRT) to exploit on-road driving structure for efficient, real-time trajectory generation that satisfies vehicle kinematic constraints and produces comfortable, collision-free paths?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Sampling-based motion planning algorithms like RRT (Rapidly-exploring Random Trees) and PRM (Probabilistic Roadmaps) have proven highly effective in general robotics for navigating high-dimensional configuration spaces. However, directly applying standard RRT to autonomous driving is inefficient because the algorithm explores the state space uniformly, wasting computation on infeasible or irrelevant regions (off-road, wrong direction, dynamically impossible states).</p>
        <p>On-road driving has strong structural priors: vehicles must stay within lanes, follow road topology, respect traffic direction, and satisfy non-holonomic constraints. Exploiting these priors to bias the sampling process can dramatically improve the efficiency of RRT-based planners. This paper proposes several key modifications to standard RRT that incorporate road structure, vehicle kinematics, and efficient collision detection to create a practical on-road motion planner.</p>
        <p>Published in IEEE Transactions on Intelligent Transportation Systems (T-ITS) in 2015, this work bridges the gap between the theoretical completeness guarantees of sampling-based methods and the practical requirements of real-time on-road driving.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/sampling-motion-planning/fig1-rrt-overview.png" alt="Modified RRT framework for on-road driving">
          <figcaption>Figure 1: Overview of the road-structure-biased RRT motion planning framework.</figcaption>
        </figure>
        <p>The key modifications to standard RRT include:</p>
        <ul>
          <li><strong>Road-biased sampling:</strong> Instead of uniform random sampling in Cartesian space, samples are drawn preferentially along the road structure using the road centerline and lane boundaries. This focuses exploration on drivable regions.</li>
          <li><strong>Goal-biased sampling:</strong> A fraction of samples are directed toward the goal configuration, accelerating convergence toward the desired destination.</li>
          <li><strong>Kinematic-aware extension:</strong> Tree extension uses vehicle kinematic models (e.g., bicycle model) to generate dynamically feasible edges, ensuring that planned paths can actually be executed by the vehicle.</li>
          <li><strong>Efficient collision checking:</strong> Hierarchical collision detection using bounding boxes and swept-volume approximations reduces the computational cost of checking each candidate edge against static and dynamic obstacles.</li>
          <li><strong>Path smoothing:</strong> Post-processing with spline fitting or shortcutting to produce smooth, comfortable trajectories from the tree solution.</li>
          <li><strong>Temporal planning:</strong> Speed profiles are computed along the geometric path to handle dynamic obstacles and traffic flow.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Road-structure sampling bias:</strong> Demonstrated that incorporating road topology into the sampling distribution yields order-of-magnitude efficiency improvements over uniform RRT for on-road scenarios.</li>
          <li><strong>Kinematic feasibility guarantee:</strong> Tree extension with vehicle models ensures all candidate paths satisfy non-holonomic constraints, eliminating post-hoc infeasibility.</li>
          <li><strong>Efficient collision detection:</strong> Hierarchical checking strategy reduces collision query time, which is typically the bottleneck in sampling-based planners.</li>
          <li><strong>Urban and highway validation:</strong> Comprehensive testing across diverse scenarios demonstrates generality beyond a single driving domain.</li>
          <li><strong>Real-time performance:</strong> Achieves planning cycle times compatible with real-time driving requirements through the combined effect of biased sampling and efficient collision checking.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <p>As a sampling-based planner, no training is required. Implementation details include:</p>
        <ul>
          <li><strong>Vehicle model:</strong> Bicycle model for kinematic extension, capturing steering and non-holonomic constraints.</li>
          <li><strong>Road representation:</strong> Lane-level road graph derived from HD maps or road detection, providing centerlines, boundaries, and connectivity.</li>
          <li><strong>Sampling distribution:</strong> Mixed strategy with road-biased (major fraction), goal-biased (smaller fraction), and uniform (small fraction for completeness) components.</li>
          <li><strong>Collision map:</strong> Occupancy grid or polygon-based representation of static obstacles; predicted trajectories for dynamic obstacles.</li>
          <li><strong>Test scenarios:</strong> Urban intersections, highway lane changes, merging, and obstacle avoidance scenarios.</li>
          <li><strong>Computation:</strong> Single-threaded C++ implementation achieving sub-100ms planning times on standard hardware.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Metric</th><th>Standard RRT</th><th>Proposed Method</th><th>Improvement</th></tr></thead>
          <tbody>
            <tr><td>Planning time (urban)</td><td>High variance, often >500ms</td><td>Consistently <100ms</td><td>5-10x faster convergence</td></tr>
            <tr><td>Planning time (highway)</td><td>Moderate, ~200ms</td><td><50ms</td><td>4x improvement</td></tr>
            <tr><td>Path quality (smoothness)</td><td>Requires heavy post-processing</td><td>Inherently smoother due to kinematic extension</td><td>Reduced post-processing need</td></tr>
            <tr><td>Success rate</td><td>High but slow</td><td>High and fast</td><td>Maintains completeness with better efficiency</td></tr>
            <tr><td>Collision-free guarantee</td><td>Yes (with checking)</td><td>Yes (with hierarchical checking)</td><td>Same safety, lower computation</td></tr>
          </tbody>
        </table>
        <p>The results show that road-structure-biased sampling provides the largest single improvement, with efficient collision checking providing additional speedup. The combined approach achieves real-time performance without sacrificing the probabilistic completeness that makes sampling-based methods attractive.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Principled integration of domain knowledge (road structure) into a theoretically grounded planning framework (RRT).</li>
          <li>Maintains the probabilistic completeness guarantee of RRT while dramatically improving practical efficiency.</li>
          <li>Vehicle kinematic constraints are enforced during tree construction rather than as post-hoc checks, ensuring all paths are feasible.</li>
          <li>Hierarchical collision checking is a practical engineering contribution that benefits any sampling-based planner.</li>
          <li>Comprehensive evaluation across urban and highway scenarios demonstrates broad applicability.</li>
          <li>Clean presentation that clearly identifies each modification's individual contribution through ablation.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Relies on accurate road structure information (HD maps or lane detection), which may not always be available or up-to-date.</li>
          <li>Dynamic obstacle handling through predicted trajectories assumes accurate short-term prediction, which is itself an open problem.</li>
          <li>Path smoothing as a separate post-processing step can alter the collision-free guarantee of the original tree solution.</li>
          <li>No formal optimality guarantee -- the method finds feasible solutions quickly but does not converge to optimal ones (unlike RRT*).</li>
          <li>Limited comparison with non-sampling-based planners (optimization-based, lattice-based) that are also commonly used in autonomous driving.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does this approach compare to lattice-based planners that also exploit road structure but with pre-computed motion primitives?</li>
          <li>Could the road-biased sampling be combined with RRT* to achieve both efficiency and asymptotic optimality?</li>
          <li>How sensitive is the planner's performance to errors in the road structure representation (noisy lane boundaries, missing connectivity)?</li>
          <li>Can the sampling bias be learned from driving data rather than hand-designed based on road topology?</li>
          <li>How would this approach handle scenarios with ambiguous road structure, such as construction zones or parking lots?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates that the gap between general-purpose sampling-based planners and practical on-road driving requirements can be bridged through intelligent use of domain structure. The road-biased sampling strategy is the key insight: by concentrating computational effort on the drivable, kinematically feasible portion of state space, RRT becomes a viable real-time planner for autonomous driving.</p>
        <p>For researchers working on motion planning for autonomous vehicles, this work provides a solid template for adapting sampling-based methods to structured environments. Its approach of encoding domain knowledge into the sampling distribution is a design pattern that extends beyond driving to any robot operating in structured environments.</p>
      `
    },
    ko: {
      title: "도로 주행 자율주행을 위한 효율적 샘플링 기반 모션 플래닝",
      summary: "도로 구조에 편향된 샘플링과 효율적인 충돌 검사를 RRT 프레임워크에 도입하여 도시 및 고속도로 시나리오에서 실시간 궤적 생성을 달성하는 개선된 RRT 기반 모션 플래닝 알고리즘을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 RRT 프레임워크에 <strong>도로 구조 인식 샘플링 편향과 효율적인 충돌 검사</strong>를 도입하여 자율주행을 위한 샘플링 기반 모션 플래닝을 발전시키며, 도시 및 고속도로 환경에서 실용적인 실시간 성능을 달성합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>차량 운동학적 제약을 만족하고 편안하며 충돌 없는 경로를 생성하는 효율적이고 실시간 궤적 생성을 위해, 도로 주행 구조를 활용하도록 샘플링 기반 모션 플래닝(특히 RRT)을 어떻게 적응시킬 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>RRT(Rapidly-exploring Random Trees)와 PRM(Probabilistic Roadmaps)과 같은 샘플링 기반 모션 플래닝 알고리즘은 일반 로보틱스에서 고차원 구성 공간 탐색에 매우 효과적임이 입증되었습니다. 그러나 표준 RRT를 자율주행에 직접 적용하면 알고리즘이 상태 공간을 균일하게 탐색하여 불가능하거나 무관한 영역(도로 밖, 잘못된 방향, 동역학적으로 불가능한 상태)에 계산을 낭비하므로 비효율적입니다.</p>
        <p>도로 주행에는 강한 구조적 사전 정보가 있습니다: 차량은 차선 내에 머물러야 하고, 도로 위상을 따르며, 교통 방향을 존중하고, 비홀로노믹 제약을 만족해야 합니다. 이러한 사전 정보를 활용하여 샘플링 과정에 편향을 주면 RRT 기반 플래너의 효율성을 크게 향상시킬 수 있습니다.</p>
        <p>2015년 IEEE T-ITS에 발표된 이 연구는 샘플링 기반 방법의 이론적 완전성 보장과 실시간 도로 주행의 실용적 요구 사이의 격차를 메웁니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/sampling-motion-planning/fig1-rrt-overview.png" alt="도로 주행을 위한 수정된 RRT 프레임워크">
          <figcaption>Figure 1: 도로 구조 편향 RRT 모션 플래닝 프레임워크 개요.</figcaption>
        </figure>
        <p>표준 RRT에 대한 주요 수정 사항은 다음과 같습니다:</p>
        <ul>
          <li><strong>도로 편향 샘플링:</strong> 직교 공간에서 균일 무작위 샘플링 대신, 도로 중심선과 차선 경계를 사용하여 도로 구조를 따라 우선적으로 샘플을 추출합니다.</li>
          <li><strong>목표 편향 샘플링:</strong> 샘플의 일부를 목표 구성으로 향하게 하여 원하는 목적지로의 수렴을 가속화합니다.</li>
          <li><strong>운동학 인식 확장:</strong> 트리 확장이 차량 운동학 모델(예: 자전거 모델)을 사용하여 동역학적으로 실현 가능한 에지를 생성합니다.</li>
          <li><strong>효율적 충돌 검사:</strong> 바운딩 박스와 스윕 볼륨 근사를 사용한 계층적 충돌 감지로 각 후보 에지를 장애물에 대해 검사하는 계산 비용을 줄입니다.</li>
          <li><strong>경로 평활화:</strong> 스플라인 피팅 또는 단축 처리로 후처리하여 트리 솔루션에서 매끄럽고 편안한 궤적을 생성합니다.</li>
          <li><strong>시간 계획:</strong> 동적 장애물과 교통 흐름을 처리하기 위해 기하학적 경로를 따라 속도 프로필을 계산합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>도로 구조 샘플링 편향:</strong> 도로 위상을 샘플링 분포에 통합하면 균일 RRT 대비 도로 시나리오에서 수 배의 효율성 향상을 달성함을 입증.</li>
          <li><strong>운동학적 실현 가능성 보장:</strong> 차량 모델을 사용한 트리 확장으로 모든 후보 경로가 비홀로노믹 제약을 만족하도록 보장.</li>
          <li><strong>효율적 충돌 감지:</strong> 계층적 검사 전략으로 샘플링 기반 플래너의 병목인 충돌 쿼리 시간을 줄임.</li>
          <li><strong>도시 및 고속도로 검증:</strong> 다양한 시나리오에 걸친 포괄적 테스트로 단일 주행 도메인을 넘어선 일반성 입증.</li>
          <li><strong>실시간 성능:</strong> 편향 샘플링과 효율적 충돌 검사의 결합 효과로 실시간 주행 요구사항과 호환되는 계획 주기 시간 달성.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <p>샘플링 기반 플래너로서 학습이 필요하지 않습니다. 구현 세부사항은 다음과 같습니다:</p>
        <ul>
          <li><strong>차량 모델:</strong> 조향 및 비홀로노믹 제약을 포착하는 운동학적 확장을 위한 자전거 모델.</li>
          <li><strong>도로 표현:</strong> HD 맵 또는 도로 감지에서 도출된 차선 수준 도로 그래프로, 중심선, 경계, 연결성 제공.</li>
          <li><strong>샘플링 분포:</strong> 도로 편향(주요 비율), 목표 편향(작은 비율), 균일(완전성을 위한 소량) 구성 요소의 혼합 전략.</li>
          <li><strong>테스트 시나리오:</strong> 도시 교차로, 고속도로 차선 변경, 합류, 장애물 회피 시나리오.</li>
          <li><strong>계산:</strong> 표준 하드웨어에서 100ms 미만의 계획 시간을 달성하는 단일 스레드 C++ 구현.</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>지표</th><th>표준 RRT</th><th>제안 방법</th><th>개선</th></tr></thead>
          <tbody>
            <tr><td>계획 시간 (도시)</td><td>높은 분산, 종종 >500ms</td><td>일관되게 <100ms</td><td>5-10배 빠른 수렴</td></tr>
            <tr><td>계획 시간 (고속도로)</td><td>중간, ~200ms</td><td><50ms</td><td>4배 개선</td></tr>
            <tr><td>경로 품질 (매끄러움)</td><td>상당한 후처리 필요</td><td>운동학 확장으로 본질적으로 더 매끄러움</td><td>후처리 필요성 감소</td></tr>
            <tr><td>성공률</td><td>높지만 느림</td><td>높고 빠름</td><td>더 나은 효율성으로 완전성 유지</td></tr>
          </tbody>
        </table>
        <p>결과는 도로 구조 편향 샘플링이 가장 큰 단일 개선을 제공하며, 효율적 충돌 검사가 추가적인 속도 향상을 제공함을 보여줍니다. 결합된 접근법은 샘플링 기반 방법을 매력적으로 만드는 확률적 완전성을 희생하지 않고 실시간 성능을 달성합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>이론적으로 근거 있는 계획 프레임워크(RRT)에 도메인 지식(도로 구조)의 원칙적 통합.</li>
          <li>실용적 효율성을 극적으로 개선하면서 RRT의 확률적 완전성 보장을 유지.</li>
          <li>트리 구성 중 차량 운동학적 제약이 적용되어 모든 경로가 실현 가능하도록 보장.</li>
          <li>계층적 충돌 검사는 모든 샘플링 기반 플래너에 도움이 되는 실용적 엔지니어링 기여.</li>
          <li>도시 및 고속도로 시나리오에 걸친 포괄적 평가로 광범위한 적용 가능성 입증.</li>
          <li>어블레이션을 통해 각 수정의 개별 기여를 명확히 식별하는 깔끔한 발표.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>정확한 도로 구조 정보(HD 맵 또는 차선 감지)에 의존하며, 항상 사용 가능하거나 최신이 아닐 수 있음.</li>
          <li>예측된 궤적을 통한 동적 장애물 처리가 정확한 단기 예측을 가정하지만, 이것 자체가 미해결 문제.</li>
          <li>별도의 후처리 단계로서의 경로 평활화가 원래 트리 솔루션의 충돌 없음 보장을 변경할 수 있음.</li>
          <li>공식적 최적성 보장이 없음 -- 방법이 실현 가능한 솔루션을 빠르게 찾지만 최적으로 수렴하지 않음(RRT*와 달리).</li>
          <li>자율주행에서 일반적으로 사용되는 비샘플링 기반 플래너(최적화 기반, 격자 기반)와의 비교가 제한적.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>이 접근법은 도로 구조를 활용하지만 사전 계산된 모션 프리미티브를 사용하는 격자 기반 플래너와 어떻게 비교되는가?</li>
          <li>효율성과 점근적 최적성을 모두 달성하기 위해 도로 편향 샘플링을 RRT*와 결합할 수 있는가?</li>
          <li>도로 구조 표현의 오류(노이즈가 있는 차선 경계, 누락된 연결성)에 대해 플래너의 성능이 얼마나 민감한가?</li>
          <li>도로 위상에 기반하여 수동 설계하는 대신 주행 데이터에서 샘플링 편향을 학습할 수 있는가?</li>
          <li>공사 구간이나 주차장과 같이 모호한 도로 구조를 가진 시나리오를 이 접근법은 어떻게 처리할 것인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 도메인 구조의 지능적 사용을 통해 범용 샘플링 기반 플래너와 실용적 도로 주행 요구 사항 사이의 격차를 메울 수 있음을 보여줍니다. 도로 편향 샘플링 전략이 핵심 통찰입니다: 주행 가능하고 운동학적으로 실현 가능한 상태 공간 부분에 계산 노력을 집중함으로써, RRT가 자율주행을 위한 실행 가능한 실시간 플래너가 됩니다.</p>
        <p>자율주행 차량을 위한 모션 플래닝을 연구하는 연구자에게, 이 연구는 구조화된 환경에 샘플링 기반 방법을 적응시키기 위한 견고한 템플릿을 제공합니다. 샘플링 분포에 도메인 지식을 인코딩하는 접근법은 주행을 넘어 구조화된 환경에서 작동하는 모든 로봇으로 확장되는 설계 패턴입니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. Urban Path Planning
  // ====================================================================
  {
    id: "urban-path-planning",
    date: "2025-04-11",
    domain: "autonomous-driving",
    authors: "Fu, M., Song, W., Yang, Y., Wang, M.",
    venue: "ITSC 2015",
    image: "images/urban-path-planning/thumbnail.png",
    link: "",
    tags: ["Autonomous Driving", "Path Planning", "Decision Making", "Urban"],
    en: {
      title: "Path Planning and Decision Making for Autonomous Vehicle in Urban Environment",
      summary: "Presents an integrated path planning and decision making system for autonomous vehicles in urban environments using lane-level planning with traffic rule compliance and multi-sensor perception.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper presents a <strong>practical, integrated system for urban autonomous driving</strong> that combines lane-level path planning with rule-based decision making, demonstrating how multi-sensor perception (Velodyne LiDAR, SICK, radar) feeds into a hierarchical planning architecture that handles real urban traffic scenarios.</p>

        <h2>Research Question</h2>
        <blockquote>How can we build an integrated path planning and decision making system for autonomous vehicles that can navigate complex urban environments while complying with traffic rules and handling diverse traffic participants?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Urban autonomous driving presents fundamentally different challenges from highway driving. Vehicles must handle complex intersections, traffic signals, pedestrians, cyclists, parked vehicles, and diverse road geometries. Unlike highway driving where the problem is largely one of lane-following and speed regulation, urban driving requires sophisticated decision making that integrates traffic rules, right-of-way logic, and interaction with diverse road users.</p>
        <p>Many prior works focus on individual components (perception, planning, or control) in isolation. However, real urban driving requires tight integration between perception, decision making, and path planning. This paper addresses the system-level integration challenge, proposing a hierarchical architecture where high-level decisions (when to turn, when to yield, which lane to use) drive low-level path generation, all informed by a rich multi-sensor perception stack.</p>
        <p>The work was presented at ITSC 2015 and reflects the practical challenges faced by teams developing autonomous vehicles for urban environments, with a focus on system design rather than algorithmic novelty in any single component.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/urban-path-planning/fig1-system-architecture.png" alt="System architecture for urban autonomous driving">
          <figcaption>Figure 1: Hierarchical system architecture integrating perception, decision making, and path planning.</figcaption>
        </figure>
        <p>The system follows a hierarchical architecture:</p>
        <ul>
          <li><strong>Perception layer:</strong> Multi-sensor fusion combining Velodyne 64-line LiDAR (3D point cloud for obstacle detection and mapping), SICK LiDAR (near-range obstacle detection), and radar (long-range moving object tracking). Camera provides lane and traffic sign detection.</li>
          <li><strong>Map and localization:</strong> Pre-built HD map with lane-level topology, traffic signs, and signal positions. GNSS/INS for localization, refined with map-matching and LiDAR-based localization.</li>
          <li><strong>Decision making:</strong> Rule-based finite state machine (FSM) that encodes traffic rules and driving behaviors. States include: lane following, lane changing, intersection approaching, turning, yielding, stopping, and emergency. Transitions are triggered by perception events and traffic rule conditions.</li>
          <li><strong>Path planning:</strong> Lane-level path planning generates reference paths aligned with the selected lane and decision. Polynomial or spline-based local paths connect the current vehicle state to target waypoints within the selected lane. Paths satisfy curvature and comfort constraints.</li>
          <li><strong>Motion control:</strong> Lateral control (steering) via Stanley or pure-pursuit controller; longitudinal control (throttle/brake) via PID with speed profiling.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Integrated urban driving system:</strong> End-to-end system design from perception through decision making to path execution, demonstrating the integration challenges specific to urban environments.</li>
          <li><strong>Lane-level decision making:</strong> FSM-based decision logic operating at the lane level, encoding traffic rules (signals, signs, right-of-way) into state transitions.</li>
          <li><strong>Multi-sensor perception stack:</strong> Practical sensor configuration combining Velodyne LiDAR, SICK, radar, and camera for comprehensive urban environment perception.</li>
          <li><strong>Real-vehicle demonstration:</strong> Tested on a real autonomous vehicle platform in urban environments, demonstrating practical feasibility beyond simulation.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Vehicle platform:</strong> Autonomous vehicle equipped with Velodyne HDL-64E LiDAR, SICK LMS-series LiDAR, millimeter-wave radar, cameras, GNSS/INS unit.</li>
          <li><strong>HD Map:</strong> Pre-built lane-level map with topology, traffic sign positions, traffic signal locations, speed limits, and connectivity information.</li>
          <li><strong>Decision FSM:</strong> Hand-designed state machine with states for each driving behavior and transitions triggered by sensor events, map information, and traffic rules.</li>
          <li><strong>Path planner:</strong> Generates smooth paths within the selected lane using polynomial fitting or cubic spline interpolation, satisfying curvature bounds.</li>
          <li><strong>Control:</strong> Stanley controller for lateral tracking; PID controller for longitudinal speed regulation with smooth acceleration/deceleration profiles.</li>
          <li><strong>Test environment:</strong> Urban streets with intersections, traffic signals, pedestrian crossings, and mixed traffic.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Capability</th><th>Outcome</th></tr></thead>
          <tbody>
            <tr><td>Signalized intersection</td><td>Traffic signal compliance</td><td>Correctly stops at red, proceeds on green with appropriate gap acceptance.</td></tr>
            <tr><td>Lane change</td><td>Decision + path execution</td><td>Smooth lane changes triggered by routing needs or obstacle avoidance.</td></tr>
            <tr><td>Pedestrian crossing</td><td>Yield to pedestrians</td><td>Detects and yields to pedestrians at crosswalks.</td></tr>
            <tr><td>Urban road following</td><td>Lane keeping</td><td>Accurate lane keeping with <0.3m lateral error on straight and curved roads.</td></tr>
            <tr><td>Mixed traffic</td><td>Multi-agent interaction</td><td>Handles cars, buses, cyclists with appropriate speed and distance regulation.</td></tr>
          </tbody>
        </table>
        <p>The system demonstrates successful autonomous navigation through urban scenarios including signalized intersections, lane changes, and interactions with pedestrians and other vehicles. The integration of decision making with path planning enables coherent, rule-compliant driving behavior that would not emerge from planning alone.</p>

        <h2>Strengths</h2>
        <ul>
          <li>System-level perspective that addresses the integration challenge rather than isolated algorithmic improvements.</li>
          <li>Practical sensor configuration that reflects real autonomous vehicle deployments.</li>
          <li>Traffic rule encoding in the decision FSM ensures legally compliant behavior, which is critical for real-world deployment.</li>
          <li>Real-vehicle testing provides credibility beyond simulation-only results.</li>
          <li>Lane-level planning naturally aligns with how roads are structured and how traffic rules operate.</li>
          <li>Clear hierarchical architecture that separates concerns (perception, decision, planning, control) while maintaining tight integration.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Rule-based FSM decision making is brittle and does not scale well to the full diversity of urban driving situations; corner cases require manual rule additions.</li>
          <li>No learning component means the system cannot improve from experience or adapt to new environments without manual engineering.</li>
          <li>Reliance on pre-built HD maps limits deployment to mapped areas and requires map maintenance.</li>
          <li>Limited handling of highly interactive scenarios (negotiation at unsignalized intersections, aggressive drivers) where rule-based logic struggles.</li>
          <li>No formal safety analysis or guarantee; correctness depends on the completeness of the rule set, which is inherently difficult to verify.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How could learning-based decision making (e.g., reinforcement learning, imitation learning) complement or replace the FSM while maintaining traffic rule compliance?</li>
          <li>What is the minimum sensor configuration needed for reliable urban autonomous driving, and how does degrading the sensor suite affect system performance?</li>
          <li>How should the system handle situations not covered by the predefined rule set (novel obstacles, unusual road configurations)?</li>
          <li>Can the lane-level planning approach extend to unstructured environments like parking lots or construction zones?</li>
          <li>What metrics should be used to evaluate the completeness and correctness of a rule-based decision making system for urban driving?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is best read as a systems engineering contribution rather than an algorithmic one. Its value lies in showing how perception, decision making, and path planning must be integrated for urban autonomous driving, and in highlighting the practical challenges that arise at the system level. The FSM-based decision making, while limited in scalability, represents the approach many early autonomous driving systems adopted.</p>
        <p>For researchers and engineers building autonomous driving systems, this paper provides a practical reference architecture for urban driving. Its limitations -- brittle rule-based decision making, HD map dependency, limited interaction handling -- clearly indicate why the field has since moved toward learning-based and prediction-aware approaches.</p>
      `
    },
    ko: {
      title: "도시 환경에서의 자율주행 차량을 위한 경로 계획 및 의사결정",
      summary: "Velodyne LiDAR, SICK, 레이더 등 다중 센서 인식을 활용하여 교통 규칙 준수와 차선 수준 계획을 결합한 도시 자율주행을 위한 통합 경로 계획 및 의사결정 시스템을 제시합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 차선 수준 경로 계획과 규칙 기반 의사결정을 결합한 <strong>도시 자율주행을 위한 실용적이고 통합된 시스템</strong>을 제시하며, 다중 센서 인식(Velodyne LiDAR, SICK, 레이더)이 계층적 계획 아키텍처에 어떻게 입력되어 실제 도시 교통 시나리오를 처리하는지 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>교통 규칙을 준수하면서 다양한 교통 참여자를 처리하며 복잡한 도시 환경을 탐색할 수 있는 자율주행 차량을 위한 통합 경로 계획 및 의사결정 시스템을 어떻게 구축할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>도시 자율주행은 고속도로 주행과 근본적으로 다른 도전을 제시합니다. 차량은 복잡한 교차로, 교통 신호, 보행자, 자전거, 주차 차량, 다양한 도로 기하학을 처리해야 합니다. 문제가 주로 차선 추종과 속도 조절인 고속도로 주행과 달리, 도시 주행은 교통 규칙, 우선권 논리, 다양한 도로 사용자와의 상호작용을 통합하는 정교한 의사결정이 필요합니다.</p>
        <p>많은 기존 연구가 개별 구성 요소(인식, 계획 또는 제어)에 독립적으로 초점을 맞추지만, 실제 도시 주행은 인식, 의사결정, 경로 계획 간의 긴밀한 통합이 필요합니다. 이 논문은 시스템 수준의 통합 도전을 다루며, 고수준 결정(언제 회전할지, 언제 양보할지, 어느 차선을 사용할지)이 저수준 경로 생성을 이끄는 계층적 아키텍처를 제안합니다.</p>
        <p>이 연구는 ITSC 2015에서 발표되었으며, 개별 구성 요소의 알고리즘적 새로움보다 시스템 설계에 초점을 맞추어 도시 환경에서 자율주행 차량을 개발하는 팀이 직면하는 실용적 도전을 반영합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/urban-path-planning/fig1-system-architecture.png" alt="도시 자율주행 시스템 아키텍처">
          <figcaption>Figure 1: 인식, 의사결정, 경로 계획을 통합하는 계층적 시스템 아키텍처.</figcaption>
        </figure>
        <p>시스템은 계층적 아키텍처를 따릅니다:</p>
        <ul>
          <li><strong>인식 계층:</strong> Velodyne 64선 LiDAR(장애물 감지 및 매핑을 위한 3D 포인트 클라우드), SICK LiDAR(근거리 장애물 감지), 레이더(장거리 이동 물체 추적)를 결합하는 다중 센서 융합. 카메라는 차선 및 교통 표지판 감지를 제공.</li>
          <li><strong>지도 및 위치 추정:</strong> 차선 수준 위상, 교통 표지판, 신호 위치가 포함된 사전 구축 HD 맵. GNSS/INS로 위치 추정, 맵 매칭 및 LiDAR 기반 위치 추정으로 정밀화.</li>
          <li><strong>의사결정:</strong> 교통 규칙과 주행 행동을 인코딩하는 규칙 기반 유한 상태 기계(FSM). 상태에는 차선 추종, 차선 변경, 교차로 접근, 회전, 양보, 정지, 비상이 포함. 전이는 인식 이벤트와 교통 규칙 조건에 의해 촉발.</li>
          <li><strong>경로 계획:</strong> 차선 수준 경로 계획이 선택된 차선과 결정에 맞춘 참조 경로를 생성. 다항식 또는 스플라인 기반 로컬 경로가 현재 차량 상태를 선택된 차선 내의 목표 웨이포인트에 연결.</li>
          <li><strong>운동 제어:</strong> Stanley 또는 pure-pursuit 컨트롤러를 통한 횡방향 제어(조향); 속도 프로파일링이 포함된 PID를 통한 종방향 제어(쓰로틀/브레이크).</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>통합 도시 주행 시스템:</strong> 인식에서 의사결정을 거쳐 경로 실행까지의 엔드투엔드 시스템 설계로, 도시 환경에 특유한 통합 도전을 보여줌.</li>
          <li><strong>차선 수준 의사결정:</strong> 교통 규칙(신호, 표지판, 우선권)을 상태 전이로 인코딩하는 차선 수준에서 작동하는 FSM 기반 결정 로직.</li>
          <li><strong>다중 센서 인식 스택:</strong> 포괄적 도시 환경 인식을 위해 Velodyne LiDAR, SICK, 레이더, 카메라를 결합하는 실용적 센서 구성.</li>
          <li><strong>실차 시연:</strong> 도시 환경에서 실제 자율주행 차량 플랫폼에서 테스트하여 시뮬레이션 전용 결과를 넘어선 실용적 실현 가능성 입증.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>차량 플랫폼:</strong> Velodyne HDL-64E LiDAR, SICK LMS 시리즈 LiDAR, 밀리미터파 레이더, 카메라, GNSS/INS 장치를 장착한 자율주행 차량.</li>
          <li><strong>HD 맵:</strong> 위상, 교통 표지판 위치, 교통 신호 위치, 속도 제한, 연결성 정보가 포함된 사전 구축 차선 수준 지도.</li>
          <li><strong>의사결정 FSM:</strong> 각 주행 행동에 대한 상태와 센서 이벤트, 지도 정보, 교통 규칙에 의해 촉발되는 전이를 가진 수동 설계 상태 기계.</li>
          <li><strong>경로 플래너:</strong> 곡률 제한을 만족하면서 다항식 피팅 또는 큐빅 스플라인 보간을 사용하여 선택된 차선 내에서 매끄러운 경로 생성.</li>
          <li><strong>테스트 환경:</strong> 교차로, 교통 신호, 보행자 횡단보도, 혼합 교통이 있는 도시 도로.</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>능력</th><th>결과</th></tr></thead>
          <tbody>
            <tr><td>신호 교차로</td><td>교통 신호 준수</td><td>빨간불에 정확히 정지하고, 녹색에 적절한 간격 수용으로 진행.</td></tr>
            <tr><td>차선 변경</td><td>결정 + 경로 실행</td><td>경로 필요 또는 장애물 회피에 의해 촉발된 매끄러운 차선 변경.</td></tr>
            <tr><td>보행자 횡단보도</td><td>보행자 양보</td><td>횡단보도에서 보행자를 감지하고 양보.</td></tr>
            <tr><td>도시 도로 추종</td><td>차선 유지</td><td>직선 및 곡선 도로에서 0.3m 미만의 횡방향 오차로 정확한 차선 유지.</td></tr>
            <tr><td>혼합 교통</td><td>다중 에이전트 상호작용</td><td>적절한 속도 및 거리 조절로 차량, 버스, 자전거를 처리.</td></tr>
          </tbody>
        </table>
        <p>시스템은 신호 교차로, 차선 변경, 보행자 및 다른 차량과의 상호작용을 포함한 도시 시나리오에서 성공적인 자율 탐색을 보여줍니다. 의사결정과 경로 계획의 통합이 계획만으로는 나타나지 않는 일관되고 규칙을 준수하는 주행 행동을 가능하게 합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>개별 알고리즘 개선이 아닌 통합 도전을 다루는 시스템 수준의 관점.</li>
          <li>실제 자율주행 차량 배포를 반영하는 실용적 센서 구성.</li>
          <li>의사결정 FSM의 교통 규칙 인코딩이 실제 배포에 중요한 법적 준수 행동을 보장.</li>
          <li>실차 테스트가 시뮬레이션 전용 결과를 넘어선 신뢰성 제공.</li>
          <li>차선 수준 계획이 도로의 구조와 교통 규칙의 작동 방식에 자연스럽게 맞춤.</li>
          <li>관심사를 분리(인식, 결정, 계획, 제어)하면서 긴밀한 통합을 유지하는 명확한 계층적 아키텍처.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>규칙 기반 FSM 의사결정이 취약하며 도시 주행 상황의 전체 다양성에 잘 확장되지 않음; 코너 케이스에 수동 규칙 추가가 필요.</li>
          <li>학습 구성 요소가 없어 시스템이 경험에서 개선하거나 수동 엔지니어링 없이 새 환경에 적응할 수 없음.</li>
          <li>사전 구축 HD 맵에 의존하여 매핑된 지역으로 배포가 제한되고 맵 유지보수가 필요.</li>
          <li>규칙 기반 로직이 어려움을 겪는 고도의 상호작용 시나리오(비신호 교차로에서의 협상, 공격적 운전자) 처리가 제한적.</li>
          <li>공식적 안전 분석이나 보장이 없음; 정확성이 본질적으로 검증하기 어려운 규칙 세트의 완전성에 의존.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>학습 기반 의사결정(예: 강화학습, 모방학습)이 교통 규칙 준수를 유지하면서 FSM을 어떻게 보완하거나 대체할 수 있는가?</li>
          <li>신뢰할 수 있는 도시 자율주행에 필요한 최소 센서 구성은 무엇이며, 센서 스위트를 줄이면 시스템 성능에 어떤 영향을 미치는가?</li>
          <li>사전 정의된 규칙 세트에 포함되지 않는 상황(새로운 장애물, 비정상적 도로 구성)을 시스템이 어떻게 처리해야 하는가?</li>
          <li>차선 수준 계획 접근법을 주차장이나 공사 구간과 같은 비구조화 환경으로 확장할 수 있는가?</li>
          <li>도시 주행을 위한 규칙 기반 의사결정 시스템의 완전성과 정확성을 평가하는 데 어떤 지표를 사용해야 하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 알고리즘적 기여보다 시스템 엔지니어링 기여로 읽는 것이 좋습니다. 그 가치는 도시 자율주행을 위해 인식, 의사결정, 경로 계획이 어떻게 통합되어야 하는지 보여주고, 시스템 수준에서 발생하는 실용적 도전을 강조하는 데 있습니다. FSM 기반 의사결정은 확장성에 한계가 있지만, 많은 초기 자율주행 시스템이 채택한 접근법을 대표합니다.</p>
        <p>자율주행 시스템을 구축하는 연구자와 엔지니어에게 이 논문은 도시 주행을 위한 실용적 참조 아키텍처를 제공합니다. 그 한계 -- 취약한 규칙 기반 의사결정, HD 맵 의존성, 제한된 상호작용 처리 -- 는 분야가 이후 학습 기반 및 예측 인식 접근법으로 이동한 이유를 명확히 나타냅니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. MPC Autonomous Driving
  // ====================================================================
  {
    id: "mpc-autonomous-driving",
    date: "2025-04-11",
    domain: "autonomous-driving",
    authors: "Vu, T. M., Moezzi, R., Cyrus, J., Hlava, J.",
    venue: "Electronics 2021",
    image: "images/mpc-autonomous-driving/thumbnail.png",
    link: "",
    tags: ["Autonomous Driving", "MPC", "Trajectory Tracking", "Control"],
    en: {
      title: "Model Predictive Control for Autonomous Driving Vehicles",
      summary: "Applies Model Predictive Control (MPC) for trajectory tracking in autonomous driving using a bicycle model, with comparisons to PID and LQR controllers in CARLA simulation.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides a <strong>clear, practical demonstration of MPC for autonomous vehicle trajectory tracking</strong>, using a bicycle model formulation and CARLA simulation to show MPC's advantages over PID and LQR controllers in handling constraints, curvature, and speed variations.</p>

        <h2>Research Question</h2>
        <blockquote>How does Model Predictive Control (MPC) perform for autonomous vehicle trajectory tracking compared to classical controllers (PID, LQR), and what are its practical advantages in handling vehicle dynamics constraints and varying driving conditions?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Trajectory tracking -- making a vehicle follow a planned path accurately -- is a fundamental control problem in autonomous driving. While the planning layer generates reference trajectories, the control layer must execute them in the presence of vehicle dynamics, actuator limits, road conditions, and disturbances. Classical controllers like PID are simple and widely used but struggle with coupled lateral-longitudinal dynamics and cannot explicitly handle constraints. LQR provides optimal control for linear systems but linearizes around an operating point and also lacks explicit constraint handling.</p>
        <p>Model Predictive Control (MPC) addresses these limitations by solving an optimization problem at each control step: it predicts the vehicle's future states over a finite horizon using a dynamic model, and selects control inputs that minimize tracking error while satisfying constraints on steering angle, acceleration, and other physical limits. This preview capability allows MPC to anticipate curves and speed changes rather than reacting to them.</p>
        <p>This paper presents a practical MPC implementation for autonomous driving using the bicycle model and validates it in the CARLA simulator, providing comparative results against PID and LQR to demonstrate MPC's advantages in realistic driving scenarios.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/mpc-autonomous-driving/fig1-mpc-framework.png" alt="MPC control framework for autonomous driving">
          <figcaption>Figure 1: MPC control framework with bicycle model and receding horizon optimization.</figcaption>
        </figure>
        <p>The MPC framework consists of the following components:</p>
        <ul>
          <li><strong>Vehicle model (bicycle model):</strong> A simplified dynamic model representing the vehicle with two wheels (front and rear), capturing lateral dynamics, heading, and longitudinal motion. State variables include position (x, y), heading angle, velocity, and steering angle. The model is linearized and discretized for the MPC optimization.</li>
          <li><strong>Prediction horizon:</strong> The MPC looks ahead N time steps (prediction horizon) using the vehicle model to predict how different control inputs will affect future states. Typical horizons are 10-30 steps at the control frequency.</li>
          <li><strong>Cost function:</strong> Minimizes weighted sum of tracking errors (lateral deviation, heading error, velocity error), control effort (steering rate, acceleration magnitude), and control smoothness (rate of change of controls). Weights balance tracking accuracy versus control effort and comfort.</li>
          <li><strong>Constraints:</strong> Hard constraints on maximum steering angle, maximum steering rate, maximum acceleration/deceleration, and velocity bounds. These ensure the controller never commands physically impossible or unsafe actions.</li>
          <li><strong>Receding horizon:</strong> At each control step, the full optimization is solved, but only the first control input is applied. The optimization is then re-solved at the next step with updated state information, creating a feedback control loop.</li>
          <li><strong>Comparison controllers:</strong> PID (separate lateral and longitudinal PID loops) and LQR (linearized around current state, infinite-horizon optimal for linear quadratic cost) serve as baselines.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Practical MPC formulation:</strong> Clear, implementable MPC design for autonomous driving using the bicycle model with explicit constraint handling.</li>
          <li><strong>Comparative evaluation:</strong> Systematic comparison of MPC, PID, and LQR on the same trajectory tracking tasks, isolating the controller's contribution.</li>
          <li><strong>CARLA-based validation:</strong> Uses a realistic driving simulator with proper vehicle dynamics, providing more credibility than simplified kinematic simulations.</li>
          <li><strong>Lateral and longitudinal control:</strong> Unified MPC formulation handles both steering and speed control simultaneously, unlike many approaches that treat them separately.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Simulator:</strong> CARLA open-source simulator providing realistic vehicle dynamics, sensor simulation, and diverse driving environments.</li>
          <li><strong>Vehicle model:</strong> Bicycle model with state vector [x, y, psi, v] and control inputs [delta (steering), a (acceleration)]. Model is linearized around the current operating point at each MPC step.</li>
          <li><strong>MPC parameters:</strong> Prediction horizon N (typically 10-20 steps), control horizon M (equal to or less than N), sampling time matching control frequency (typically 50-100ms).</li>
          <li><strong>Solver:</strong> Quadratic programming (QP) solver for the linearized MPC problem, running within the control loop time constraint.</li>
          <li><strong>Cost weights:</strong> Tuned experimentally to balance lateral tracking, heading tracking, velocity tracking, and control smoothness.</li>
          <li><strong>Test scenarios:</strong> Straight roads, curved roads with varying radii, lane change maneuvers, and speed transitions in CARLA environments.</li>
          <li><strong>Baseline controllers:</strong> PID with separately tuned P, I, D gains for lateral and longitudinal control; LQR computed from linearized bicycle model with state and control cost matrices.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Controller</th><th>Lateral Error (avg)</th><th>Heading Error (avg)</th><th>Speed Tracking</th><th>Constraint Handling</th></tr></thead>
          <tbody>
            <tr><td>PID</td><td>Moderate</td><td>Moderate-High</td><td>Good on straight, poor on curves</td><td>No explicit constraints; can overshoot</td></tr>
            <tr><td>LQR</td><td>Low-Moderate</td><td>Low-Moderate</td><td>Good overall</td><td>No explicit constraints; assumes linearity</td></tr>
            <tr><td>MPC</td><td>Low</td><td>Low</td><td>Good overall, anticipatory on curves</td><td>Explicit constraints respected; smooth control</td></tr>
          </tbody>
        </table>
        <p>MPC consistently outperforms PID and LQR in trajectory tracking accuracy, particularly on curved roads and during speed transitions. The key advantage is MPC's ability to <strong>anticipate upcoming curvature and pre-adjust steering</strong>, while PID and LQR react only to current error. Additionally, MPC's explicit constraint handling prevents actuator saturation and ensures smooth control signals, improving passenger comfort.</p>
        <p>The computational cost of MPC is higher than PID or LQR, but remains within real-time requirements when using efficient QP solvers and moderate prediction horizons.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Clear and accessible presentation of MPC for autonomous driving, suitable for both researchers and practitioners entering the field.</li>
          <li>Systematic comparison with PID and LQR provides concrete evidence of MPC's advantages rather than theoretical arguments alone.</li>
          <li>Explicit constraint handling is a fundamental advantage over unconstrained controllers, directly impacting safety and comfort.</li>
          <li>CARLA simulation provides a realistic testbed with proper vehicle dynamics, going beyond simplistic kinematic simulations.</li>
          <li>Unified lateral-longitudinal control avoids the coupling issues that arise from separate controller design.</li>
          <li>The bicycle model formulation is practical and widely applicable, not over-engineered for the problem at hand.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Bicycle model is a simplification that may not capture important dynamics (tire slip, suspension, load transfer) at higher speeds or on slippery surfaces.</li>
          <li>Linearization at each step introduces approximation errors, especially in highly nonlinear regimes (sharp turns, emergency maneuvers).</li>
          <li>Computational cost analysis is limited; real-time feasibility on embedded automotive hardware is not demonstrated.</li>
          <li>No consideration of model uncertainty or disturbance rejection; robust MPC or adaptive MPC formulations are not explored.</li>
          <li>Test scenarios are relatively benign; extreme maneuvers, adverse weather, and high-speed driving would more rigorously test the controller's limits.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would nonlinear MPC (using the full nonlinear bicycle or higher-fidelity model) compare in tracking accuracy, and is the computational overhead justified?</li>
          <li>Can the MPC formulation be extended to include obstacle avoidance constraints directly in the optimization, merging planning and control?</li>
          <li>How sensitive is MPC performance to model parameter errors (vehicle mass, tire stiffness, friction coefficient)?</li>
          <li>What is the minimum prediction horizon needed to maintain MPC's advantage over reactive controllers like PID?</li>
          <li>Could learning-based approaches be used to adapt MPC parameters (weights, horizon) online based on driving conditions?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper serves as a solid introduction to MPC for autonomous vehicle trajectory tracking. Its main value is the clear, comparative demonstration that MPC's preview capability and constraint handling provide tangible advantages over PID and LQR in realistic driving scenarios. The bicycle model formulation keeps the approach practical and implementable.</p>
        <p>For those building autonomous driving control systems, this paper provides a starting point for MPC implementation. The natural next steps -- nonlinear MPC, robust MPC, and integration with planning-level optimization -- are well-motivated by the limitations identified here. MPC has become the dominant control paradigm in autonomous driving precisely because of the advantages this paper demonstrates.</p>
      `
    },
    ko: {
      title: "자율주행 차량을 위한 모델 예측 제어",
      summary: "자전거 모델을 사용한 자율주행 궤적 추적에 MPC를 적용하고, CARLA 시뮬레이션에서 PID 및 LQR 컨트롤러와 비교합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 자전거 모델 공식화와 CARLA 시뮬레이션을 사용하여 <strong>자율주행 차량 궤적 추적을 위한 MPC의 명확하고 실용적인 시연</strong>을 제공하며, 제약 처리, 곡률, 속도 변화 처리에서 PID 및 LQR 컨트롤러 대비 MPC의 장점을 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>모델 예측 제어(MPC)는 고전적 컨트롤러(PID, LQR)와 비교하여 자율주행 차량 궤적 추적에서 어떻게 수행되며, 차량 동역학 제약과 다양한 주행 조건을 처리하는 데 있어 실용적 장점은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>궤적 추적 -- 차량이 계획된 경로를 정확히 따르게 하는 것 -- 은 자율주행의 기본적인 제어 문제입니다. 계획 계층이 참조 궤적을 생성하는 동안, 제어 계층은 차량 동역학, 액추에이터 한계, 도로 조건, 교란이 존재하는 상황에서 이를 실행해야 합니다. PID와 같은 고전적 컨트롤러는 간단하고 널리 사용되지만 결합된 횡방향-종방향 동역학을 다루기 어렵고 명시적으로 제약을 처리할 수 없습니다.</p>
        <p>모델 예측 제어(MPC)는 각 제어 단계에서 최적화 문제를 풀어 이러한 한계를 해결합니다: 동적 모델을 사용하여 유한 지평선에 걸쳐 차량의 미래 상태를 예측하고, 조향각, 가속도 및 기타 물리적 한계에 대한 제약을 만족하면서 추적 오류를 최소화하는 제어 입력을 선택합니다. 이 미리보기 능력으로 MPC는 곡선과 속도 변화에 반응하는 대신 예측할 수 있습니다.</p>
        <p>이 논문은 자전거 모델을 사용한 자율주행을 위한 실용적 MPC 구현을 제시하고 CARLA 시뮬레이터에서 검증하며, 현실적 주행 시나리오에서 MPC의 장점을 보여주기 위해 PID 및 LQR과의 비교 결과를 제공합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/mpc-autonomous-driving/fig1-mpc-framework.png" alt="자율주행을 위한 MPC 제어 프레임워크">
          <figcaption>Figure 1: 자전거 모델과 후퇴 지평선 최적화를 사용한 MPC 제어 프레임워크.</figcaption>
        </figure>
        <p>MPC 프레임워크는 다음 구성 요소로 이루어집니다:</p>
        <ul>
          <li><strong>차량 모델 (자전거 모델):</strong> 두 바퀴(전륜과 후륜)로 차량을 표현하는 단순화된 동적 모델로, 횡방향 동역학, 방향, 종방향 운동을 포착합니다. 상태 변수에는 위치(x, y), 방향각, 속도, 조향각이 포함됩니다.</li>
          <li><strong>예측 지평선:</strong> MPC는 차량 모델을 사용하여 N 시간 단계(예측 지평선) 앞을 내다보며 다른 제어 입력이 미래 상태에 어떤 영향을 미칠지 예측합니다.</li>
          <li><strong>비용 함수:</strong> 추적 오류(횡방향 편차, 방향 오류, 속도 오류), 제어 노력(조향 속도, 가속도 크기), 제어 매끄러움(제어 변화율)의 가중 합을 최소화합니다.</li>
          <li><strong>제약:</strong> 최대 조향각, 최대 조향 속도, 최대 가속도/감속도, 속도 범위에 대한 경성 제약. 이는 컨트롤러가 물리적으로 불가능하거나 안전하지 않은 동작을 명령하지 않도록 보장합니다.</li>
          <li><strong>후퇴 지평선:</strong> 각 제어 단계에서 전체 최적화가 풀리지만, 첫 번째 제어 입력만 적용됩니다. 다음 단계에서 업데이트된 상태 정보로 최적화가 다시 풀려 피드백 제어 루프를 생성합니다.</li>
          <li><strong>비교 컨트롤러:</strong> PID(별도의 횡방향 및 종방향 PID 루프)와 LQR(현재 상태 주위 선형화, 선형 이차 비용에 대한 무한 지평선 최적)이 기준선으로 사용됩니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>실용적 MPC 공식화:</strong> 명시적 제약 처리를 갖춘 자전거 모델을 사용한 자율주행을 위한 명확하고 구현 가능한 MPC 설계.</li>
          <li><strong>비교 평가:</strong> 동일한 궤적 추적 작업에서 MPC, PID, LQR의 체계적 비교로 컨트롤러의 기여를 분리.</li>
          <li><strong>CARLA 기반 검증:</strong> 적절한 차량 동역학을 갖춘 현실적 주행 시뮬레이터를 사용하여 단순화된 운동학 시뮬레이션보다 높은 신뢰성 제공.</li>
          <li><strong>횡방향 및 종방향 제어:</strong> 많은 접근법이 별도로 처리하는 것과 달리 통합 MPC 공식화가 조향과 속도 제어를 동시에 처리.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>시뮬레이터:</strong> 현실적 차량 동역학, 센서 시뮬레이션, 다양한 주행 환경을 제공하는 CARLA 오픈소스 시뮬레이터.</li>
          <li><strong>차량 모델:</strong> 상태 벡터 [x, y, psi, v]와 제어 입력 [delta(조향), a(가속도)]를 가진 자전거 모델. 각 MPC 단계에서 현재 작동점 주위로 선형화.</li>
          <li><strong>MPC 매개변수:</strong> 예측 지평선 N(일반적으로 10-20 단계), 제어 지평선 M(N 이하), 제어 주파수에 맞춘 샘플링 시간(일반적으로 50-100ms).</li>
          <li><strong>솔버:</strong> 선형화된 MPC 문제를 위한 이차 프로그래밍(QP) 솔버, 제어 루프 시간 제약 내에서 실행.</li>
          <li><strong>비용 가중치:</strong> 횡방향 추적, 방향 추적, 속도 추적, 제어 매끄러움의 균형을 맞추기 위해 실험적으로 튜닝.</li>
          <li><strong>테스트 시나리오:</strong> CARLA 환경에서 직선 도로, 다양한 반경의 곡선 도로, 차선 변경 기동, 속도 전환.</li>
          <li><strong>기준선 컨트롤러:</strong> 횡방향 및 종방향 제어를 위해 별도로 튜닝된 P, I, D 게인을 가진 PID; 선형화된 자전거 모델에서 상태 및 제어 비용 행렬로 계산된 LQR.</li>
        </ul>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>컨트롤러</th><th>횡방향 오차 (평균)</th><th>방향 오차 (평균)</th><th>속도 추적</th><th>제약 처리</th></tr></thead>
          <tbody>
            <tr><td>PID</td><td>중간</td><td>중간-높음</td><td>직선에서 양호, 곡선에서 나쁨</td><td>명시적 제약 없음; 오버슈트 가능</td></tr>
            <tr><td>LQR</td><td>낮음-중간</td><td>낮음-중간</td><td>전반적으로 양호</td><td>명시적 제약 없음; 선형성 가정</td></tr>
            <tr><td>MPC</td><td>낮음</td><td>낮음</td><td>전반적으로 양호, 곡선에서 예측적</td><td>명시적 제약 준수; 매끄러운 제어</td></tr>
          </tbody>
        </table>
        <p>MPC는 특히 곡선 도로와 속도 전환 중에 궤적 추적 정확도에서 PID와 LQR을 일관되게 능가합니다. 핵심 장점은 MPC가 <strong>다가오는 곡률을 예측하고 조향을 사전 조정</strong>하는 능력인 반면, PID와 LQR은 현재 오류에만 반응합니다. 또한 MPC의 명시적 제약 처리가 액추에이터 포화를 방지하고 매끄러운 제어 신호를 보장하여 승객 승차감을 개선합니다.</p>
        <p>MPC의 계산 비용은 PID나 LQR보다 높지만, 효율적인 QP 솔버와 적절한 예측 지평선을 사용하면 실시간 요구사항 내에 유지됩니다.</p>

        <h2>강점</h2>
        <ul>
          <li>분야에 진입하는 연구자와 실무자 모두에게 적합한 자율주행을 위한 MPC의 명확하고 접근 가능한 발표.</li>
          <li>PID 및 LQR과의 체계적 비교가 이론적 주장만이 아닌 MPC 장점의 구체적 증거 제공.</li>
          <li>명시적 제약 처리가 비제약 컨트롤러에 비해 안전과 승차감에 직접 영향을 미치는 근본적 장점.</li>
          <li>CARLA 시뮬레이션이 적절한 차량 동역학으로 현실적 테스트베드를 제공하여 단순한 운동학 시뮬레이션을 넘어섬.</li>
          <li>통합 횡방향-종방향 제어가 별도 컨트롤러 설계에서 발생하는 결합 문제를 회피.</li>
          <li>자전거 모델 공식화가 실용적이고 널리 적용 가능하며, 문제에 비해 과도하게 엔지니어링되지 않음.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>자전거 모델은 고속 또는 미끄러운 노면에서 중요한 동역학(타이어 슬립, 서스펜션, 하중 이동)을 포착하지 못할 수 있는 단순화.</li>
          <li>각 단계에서의 선형화가 특히 고도로 비선형적인 영역(급회전, 긴급 기동)에서 근사 오류를 도입.</li>
          <li>계산 비용 분석이 제한적; 임베디드 자동차 하드웨어에서의 실시간 실현 가능성이 입증되지 않음.</li>
          <li>모델 불확실성이나 교란 거부에 대한 고려가 없음; 강건 MPC나 적응 MPC 공식화가 탐색되지 않음.</li>
          <li>테스트 시나리오가 비교적 순한 편; 극단적 기동, 악천후, 고속 주행이 컨트롤러의 한계를 더 엄밀하게 테스트할 것.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>비선형 MPC(완전한 비선형 자전거 또는 더 높은 충실도 모델 사용)는 추적 정확도에서 어떻게 비교되며, 계산 오버헤드가 정당화되는가?</li>
          <li>MPC 공식화를 최적화에 직접 장애물 회피 제약을 포함하도록 확장하여 계획과 제어를 병합할 수 있는가?</li>
          <li>모델 매개변수 오류(차량 질량, 타이어 강성, 마찰 계수)에 대해 MPC 성능이 얼마나 민감한가?</li>
          <li>PID와 같은 반응적 컨트롤러 대비 MPC의 장점을 유지하기 위해 필요한 최소 예측 지평선은 무엇인가?</li>
          <li>주행 조건에 따라 MPC 매개변수(가중치, 지평선)를 온라인으로 적응시키기 위해 학습 기반 접근법을 사용할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 자율주행 차량 궤적 추적을 위한 MPC의 견고한 입문서 역할을 합니다. 주요 가치는 MPC의 미리보기 능력과 제약 처리가 현실적 주행 시나리오에서 PID 및 LQR 대비 실질적 장점을 제공한다는 명확한 비교 시연에 있습니다. 자전거 모델 공식화가 접근법을 실용적이고 구현 가능하게 유지합니다.</p>
        <p>자율주행 제어 시스템을 구축하는 사람들에게 이 논문은 MPC 구현을 위한 출발점을 제공합니다. 자연스러운 다음 단계 -- 비선형 MPC, 강건 MPC, 계획 수준 최적화와의 통합 -- 는 여기서 식별된 한계에 의해 잘 동기부여됩니다. MPC는 이 논문이 보여주는 장점 때문에 정확히 자율주행에서 지배적인 제어 패러다임이 되었습니다.</p>
      `
    }
  }
]
