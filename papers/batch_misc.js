const BATCH_MISC_PAPERS = [
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
