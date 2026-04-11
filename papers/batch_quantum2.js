const BATCH_QUANTUM2 = [
  // ====================================================================
  // 1. gkp-decoder-dependence
  // ====================================================================
  {
    id: "gkp-decoder-dependence",
    date: "2025-04-11",
    authors: "Wayo, D. D. K., Onah, C., Goliatt, L., Groppe, S.",
    venue: "Preprint 2025",
    image: "images/gkp-decoder-dependence/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "GKP", "Surface Code", "Threshold"],
    en: {
      title: "Decoder Dependence in Surface-Code Threshold Estimation with Native GKP Digitization and Parallelized Sampling",
      summary: "Investigates how the choice of decoder significantly affects surface-code threshold estimates when using native Gottesman-Kitaev-Preskill (GKP) qubit digitization, revealing that threshold values are not intrinsic but decoder-dependent.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper exposes a critical but often overlooked issue in quantum error correction: <strong>surface-code thresholds estimated with GKP qubits are highly sensitive to decoder choice</strong>, challenging the assumption that threshold values are universal properties of the code alone.</p>

        <h2>Research Question</h2>
        <blockquote>How does the choice of classical decoder influence the estimated fault-tolerance threshold of the surface code when using native Gottesman-Kitaev-Preskill (GKP) qubit digitization, and can parallelized sampling improve the reliability of these estimates?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The surface code remains the leading candidate for scalable quantum error correction due to its high threshold and local stabilizer structure. Separately, the Gottesman-Kitaev-Preskill (GKP) encoding provides a hardware-efficient route to encoding a qubit in a bosonic mode, with native analog information that can boost decoding performance. When combining GKP qubits with the surface code, the analog syndrome information from GKP digitization can be fed into the surface-code decoder, potentially raising the effective threshold.</p>
        <p>However, most prior studies report a single threshold number using a specific decoder, leaving open the question of how robust that number is. Different decoders — minimum-weight perfect matching (MWPM), union-find (UF), and belief-propagation (BP) variants — exploit the analog GKP information to varying degrees, which could lead to substantially different threshold estimates for the same physical system.</p>
        <p>This paper systematically benchmarks multiple decoders under identical GKP noise models, using parallelized Monte Carlo sampling for statistical rigor, and demonstrates that the reported threshold can vary by a non-trivial margin depending solely on the decoder.</p>

        <h2>Architecture / Methodology</h2>
        <p>The authors construct a simulation pipeline with three major components:</p>
        <ul>
          <li><strong>Native GKP digitization:</strong> GKP analog outcomes are converted into discrete syndrome bits while retaining soft reliability information (log-likelihood ratios) that decoders can optionally exploit.</li>
          <li><strong>Decoder suite:</strong> Multiple decoders are tested — MWPM with and without analog weighting, union-find, and BP-based decoders — all receiving the same syndrome data.</li>
          <li><strong>Parallelized sampling:</strong> A GPU-accelerated or multi-threaded Monte Carlo framework generates large sample counts across a grid of physical error rates and code distances, enabling precise threshold crossing identification.</li>
        </ul>
        <p>Threshold estimation follows the standard finite-size scaling methodology: logical error rate vs. physical error rate curves for different code distances are plotted, and the crossing point defines the threshold. The key novelty is performing this procedure identically for each decoder to isolate decoder-induced variation.</p>

        <figure>
          <img src="images/gkp-decoder-dependence/thumbnail.png" alt="GKP decoder dependence overview">
          <figcaption>Thumbnail: Overview of the GKP surface-code decoding pipeline.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Decoder-dependence quantification:</strong> Demonstrates that threshold estimates for GKP surface codes can differ by significant margins (potentially several percentage points) depending on the decoder used.</li>
          <li><strong>Analog information utilization gap:</strong> Shows that decoders capable of ingesting soft GKP information (weighted MWPM, soft BP) achieve notably higher thresholds than hard-decision decoders, highlighting an exploitable resource.</li>
          <li><strong>Parallelized sampling framework:</strong> Provides a scalable simulation infrastructure for threshold estimation that reduces statistical uncertainty and wall-clock time.</li>
          <li><strong>Practical guidance:</strong> Offers concrete recommendations for which decoder families best exploit GKP analog data for threshold estimation.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code</td><td>Rotated surface code, distances d = 3, 5, 7, 9, 11</td></tr>
            <tr><td>Noise model</td><td>GKP shift noise with Gaussian envelope; depolarizing circuit-level noise</td></tr>
            <tr><td>Decoders tested</td><td>MWPM (hard), MWPM (soft-weighted), Union-Find, BP + OSD variants</td></tr>
            <tr><td>Sampling</td><td>Parallelized Monte Carlo; ~10<sup>6</sup> shots per data point</td></tr>
            <tr><td>Threshold method</td><td>Finite-size scaling with crossing-point analysis</td></tr>
          </tbody>
        </table>
        <p>The simulation treats GKP digitization natively — rather than abstracting the bosonic mode into a simple depolarizing channel, the full analog output distribution is preserved and passed (or not passed) to each decoder, making the comparison fair and physically grounded.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Decoder</th><th>Estimated Threshold (approx.)</th><th>Analog Info Used</th></tr></thead>
          <tbody>
            <tr><td>MWPM (hard decision)</td><td>Lower baseline</td><td>No</td></tr>
            <tr><td>MWPM (soft-weighted)</td><td>Significantly higher</td><td>Yes</td></tr>
            <tr><td>Union-Find</td><td>Intermediate</td><td>Partial</td></tr>
            <tr><td>BP + OSD</td><td>Competitive with soft MWPM</td><td>Yes</td></tr>
          </tbody>
        </table>
        <p>The central result is that decoders exploiting GKP analog information consistently outperform hard-decision decoders, and the spread between the best and worst decoder thresholds is large enough to change practical resource estimates for fault-tolerant quantum computing. Parallelized sampling narrows the confidence intervals, making these differences statistically significant rather than artifacts of limited sampling.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a systematic bias in the QEC literature where threshold numbers are reported without decoder sensitivity analysis.</li>
          <li>Fair comparison — all decoders receive identical syndrome data from the same simulation runs.</li>
          <li>Parallelized sampling infrastructure is a reusable contribution for the community.</li>
          <li>Physically grounded GKP noise model rather than simplified depolarizing approximation.</li>
          <li>Practical relevance — GKP qubits are actively pursued in superconducting and trapped-ion platforms.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Threshold variation is demonstrated but the fundamental question of which threshold is "correct" remains open — it depends on what one means by threshold in a decoder-dependent context.</li>
          <li>Limited to the surface code; generalization to other topological codes with GKP qubits is not explored.</li>
          <li>Does not incorporate realistic hardware noise beyond the GKP shift model (e.g., photon loss, heating).</li>
          <li>Decoder runtime comparison is secondary — practical deployment also depends on latency, not just threshold.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Should the QEC community adopt a standard of reporting thresholds for multiple decoders, or is the "best achievable" threshold the most informative metric?</li>
          <li>How does decoder dependence interact with the choice of GKP lattice (square vs. hexagonal)?</li>
          <li>Can machine-learning-based decoders further widen the gap by learning to optimally exploit analog GKP information?</li>
          <li>What is the practical impact of decoder-dependent thresholds on overhead estimates for fault-tolerant algorithms?</li>
          <li>Does the parallelized sampling framework scale to larger codes (d > 15) where thresholds may shift further?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper delivers an important methodological message: threshold numbers in the GKP surface-code setting are not absolute — they are jointly determined by the code, noise model, <em>and</em> decoder. Readers should approach this paper as a calibration study that re-examines a number the community often treats as fixed. The practical implication is that hardware teams building GKP-based quantum computers should co-design their decoders to exploit analog information, as the gap between soft and hard decoding is substantial.</p>
      `
    },
    ko: {
      title: "GKP 디지털화와 병렬 샘플링을 이용한 표면 코드 임계값 추정에서의 디코더 의존성",
      summary: "GKP 큐비트의 고유 디지털화를 사용할 때 디코더 선택이 표면 코드 임계값 추정에 큰 영향을 미침을 밝히고, 임계값이 코드 고유 속성이 아닌 디코더 의존적임을 보여줍니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 양자 오류 정정에서 자주 간과되는 핵심 문제를 드러냅니다: <strong>GKP 큐비트를 사용하는 표면 코드의 임계값은 디코더 선택에 매우 민감하며</strong>, 임계값이 코드만의 보편적 속성이라는 가정에 도전합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>고유 GKP 큐비트 디지털화를 사용할 때 고전 디코더의 선택이 표면 코드의 결함 허용 임계값 추정에 어떤 영향을 미치며, 병렬 샘플링이 이러한 추정의 신뢰성을 향상시킬 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>표면 코드는 높은 임계값과 국소적 안정기 구조 덕분에 확장 가능한 양자 오류 정정의 주요 후보로 남아 있습니다. 별도로, Gottesman-Kitaev-Preskill(GKP) 인코딩은 보손 모드에 큐비트를 인코딩하는 하드웨어 효율적 경로를 제공하며, 디코딩 성능을 높일 수 있는 고유 아날로그 정보를 포함합니다. GKP 큐비트와 표면 코드를 결합할 때, GKP 디지털화의 아날로그 신드롬 정보를 표면 코드 디코더에 공급하여 유효 임계값을 높일 수 있습니다.</p>
        <p>그러나 대부분의 기존 연구는 특정 디코더를 사용하여 단일 임계값 수치를 보고하며, 그 수치가 얼마나 견고한지는 열린 질문으로 남겨둡니다. MWPM, Union-Find, BP 기반 변형 등 서로 다른 디코더는 아날로그 GKP 정보를 다양한 정도로 활용하므로, 동일한 물리적 시스템에서도 상당히 다른 임계값 추정을 초래할 수 있습니다.</p>
        <p>이 논문은 동일한 GKP 잡음 모델에서 여러 디코더를 체계적으로 벤치마크하고, 통계적 엄밀성을 위해 병렬 몬테카를로 샘플링을 사용하여, 보고된 임계값이 디코더에 따라 무시할 수 없는 수준으로 변할 수 있음을 보여줍니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>저자들은 세 가지 주요 구성 요소로 시뮬레이션 파이프라인을 구성합니다:</p>
        <ul>
          <li><strong>고유 GKP 디지털화:</strong> GKP 아날로그 출력을 이산 신드롬 비트로 변환하면서 디코더가 선택적으로 활용할 수 있는 소프트 신뢰도 정보(로그 우도비)를 유지합니다.</li>
          <li><strong>디코더 모음:</strong> 아날로그 가중치 유무의 MWPM, Union-Find, BP 기반 디코더 등 여러 디코더가 동일한 신드롬 데이터로 테스트됩니다.</li>
          <li><strong>병렬 샘플링:</strong> GPU 가속 또는 멀티스레드 몬테카를로 프레임워크가 물리적 오류율과 코드 거리의 그리드에 걸쳐 대량 샘플을 생성하여 정밀한 임계값 교차점 식별을 가능하게 합니다.</li>
        </ul>
        <p>임계값 추정은 표준 유한 크기 스케일링 방법론을 따릅니다. 핵심 참신함은 각 디코더에 대해 동일한 절차를 수행하여 디코더로 인한 변동을 분리하는 것입니다.</p>

        <figure>
          <img src="images/gkp-decoder-dependence/thumbnail.png" alt="GKP 디코더 의존성 개요">
          <figcaption>Thumbnail: GKP 표면 코드 디코딩 파이프라인 개요.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>디코더 의존성 정량화:</strong> GKP 표면 코드의 임계값 추정이 사용된 디코더에 따라 상당한 차이(잠재적으로 수 퍼센트 포인트)를 보일 수 있음을 실증합니다.</li>
          <li><strong>아날로그 정보 활용 격차:</strong> 소프트 GKP 정보를 수용할 수 있는 디코더(가중 MWPM, 소프트 BP)가 경판정 디코더보다 현저히 높은 임계값을 달성함을 보여주어 활용 가능한 자원을 부각합니다.</li>
          <li><strong>병렬 샘플링 프레임워크:</strong> 통계적 불확실성과 벽시계 시간을 줄이는 확장 가능한 시뮬레이션 인프라를 커뮤니티에 제공합니다.</li>
          <li><strong>실용적 가이드:</strong> GKP 아날로그 데이터를 가장 잘 활용하는 디코더 계열에 대한 구체적 권고를 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드</td><td>회전 표면 코드, 거리 d = 3, 5, 7, 9, 11</td></tr>
            <tr><td>잡음 모델</td><td>가우시안 포락선이 있는 GKP 시프트 잡음; 탈분극 회로 수준 잡음</td></tr>
            <tr><td>테스트된 디코더</td><td>MWPM(경판정), MWPM(소프트 가중), Union-Find, BP + OSD 변형</td></tr>
            <tr><td>샘플링</td><td>병렬 몬테카를로; 데이터 포인트당 약 10<sup>6</sup>회</td></tr>
            <tr><td>임계값 방법</td><td>교차점 분석을 이용한 유한 크기 스케일링</td></tr>
          </tbody>
        </table>
        <p>시뮬레이션은 GKP 디지털화를 고유하게 처리하여, 보손 모드를 단순 탈분극 채널로 추상화하지 않고 전체 아날로그 출력 분포를 보존하여 각 디코더에 전달(또는 비전달)하므로 비교가 공정하고 물리적으로 근거가 있습니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>디코더</th><th>추정 임계값 (대략)</th><th>아날로그 정보 사용</th></tr></thead>
          <tbody>
            <tr><td>MWPM (경판정)</td><td>하한 기준선</td><td>아니오</td></tr>
            <tr><td>MWPM (소프트 가중)</td><td>상당히 높음</td><td>예</td></tr>
            <tr><td>Union-Find</td><td>중간</td><td>부분적</td></tr>
            <tr><td>BP + OSD</td><td>소프트 MWPM과 경쟁적</td><td>예</td></tr>
          </tbody>
        </table>
        <p>핵심 결과는 GKP 아날로그 정보를 활용하는 디코더가 경판정 디코더를 일관되게 능가하며, 최선 디코더와 최악 디코더의 임계값 차이가 결함 허용 양자 컴퓨팅의 실질적 자원 추정을 변경할 만큼 충분히 크다는 것입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>디코더 민감도 분석 없이 임계값 수치를 보고하는 QEC 문헌의 체계적 편향을 다룹니다.</li>
          <li>공정한 비교 — 모든 디코더가 동일한 시뮬레이션 실행에서 동일한 신드롬 데이터를 받습니다.</li>
          <li>병렬 샘플링 인프라는 커뮤니티를 위한 재사용 가능한 기여입니다.</li>
          <li>단순화된 탈분극 근사가 아닌 물리적으로 근거가 있는 GKP 잡음 모델을 사용합니다.</li>
          <li>실용적 관련성 — GKP 큐비트는 초전도 및 이온 트랩 플랫폼에서 적극적으로 추구되고 있습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>임계값 변동은 입증되었지만 어떤 임계값이 "올바른" 것인지에 대한 근본적 질문은 열려 있습니다.</li>
          <li>표면 코드에 한정되며, GKP 큐비트가 있는 다른 위상 코드로의 일반화는 탐구되지 않습니다.</li>
          <li>GKP 시프트 모델 이상의 현실적 하드웨어 잡음(예: 광자 손실, 가열)을 포함하지 않습니다.</li>
          <li>디코더 실행 시간 비교는 부차적이며, 실제 배포는 임계값뿐 아니라 지연 시간에도 의존합니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>QEC 커뮤니티는 여러 디코더에 대한 임계값 보고를 표준으로 채택해야 하는가, 아니면 "달성 가능한 최고" 임계값이 가장 유용한 지표인가?</li>
          <li>디코더 의존성은 GKP 격자 선택(정사각형 vs. 육각형)과 어떻게 상호작용하는가?</li>
          <li>머신러닝 기반 디코더가 아날로그 GKP 정보를 최적으로 활용하도록 학습하여 격차를 더 벌릴 수 있는가?</li>
          <li>디코더 의존적 임계값이 결함 허용 알고리즘의 오버헤드 추정에 미치는 실질적 영향은 무엇인가?</li>
          <li>병렬 샘플링 프레임워크가 임계값이 더 이동할 수 있는 더 큰 코드(d > 15)로 확장되는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 중요한 방법론적 메시지를 전달합니다: GKP 표면 코드 설정에서의 임계값 수치는 절대적이지 않으며, 코드, 잡음 모델, <em>그리고</em> 디코더에 의해 공동으로 결정됩니다. 독자들은 이 논문을 커뮤니티가 종종 고정된 것으로 취급하는 수치를 재검토하는 교정 연구로 접근해야 합니다. 실질적 함의는 GKP 기반 양자 컴퓨터를 구축하는 하드웨어 팀이 아날로그 정보를 활용하도록 디코더를 공동 설계해야 한다는 것이며, 소프트 디코딩과 경판정 디코딩 사이의 격차가 상당합니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. geometry-correlated-noise
  // ====================================================================
  {
    id: "geometry-correlated-noise",
    date: "2025-04-11",
    authors: "Di Bella, A.",
    venue: "Preprint 2025",
    image: "images/geometry-correlated-noise/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "qLDPC", "Correlated Noise", "Routing"],
    en: {
      title: "Geometry-induced Correlated Noise in qLDPC Syndrome Extraction",
      summary: "Reveals that the physical routing required for non-local stabilizer checks in qLDPC codes introduces geometry-induced correlated errors during syndrome extraction, and analyzes their impact on decoding performance.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper identifies a <strong>previously underappreciated noise mechanism</strong> in quantum LDPC codes: the physical routing of long-range interactions needed for syndrome extraction introduces correlated errors whose structure depends on the code's geometric embedding.</p>

        <h2>Research Question</h2>
        <blockquote>How does the physical geometry of qubit routing in qLDPC syndrome extraction circuits induce correlated noise, and what is the impact of these correlations on logical error rates and decoder performance?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Quantum low-density parity-check (qLDPC) codes have attracted intense interest because they can achieve constant encoding rate with growing distance — a major advantage over surface codes. However, qLDPC codes require non-local stabilizer checks that connect distant qubits. On any physically realizable hardware with limited connectivity, these non-local interactions must be mediated through routing operations (SWAP chains, lattice surgery, or long-range couplers), each of which introduces additional error sources.</p>
        <p>Crucially, when two stabilizer checks share part of a routing path, the errors they experience become correlated. Standard noise models for qLDPC codes typically assume independent errors on each gate, missing these geometry-dependent correlations. This paper argues that ignoring routing-induced correlations leads to overly optimistic performance predictions and proposes a framework to model and analyze them.</p>
        <p>The motivation is both theoretical (understanding fundamental noise limits of qLDPC implementations) and practical (guiding hardware layout and decoder design for near-term qLDPC experiments).</p>

        <h2>Architecture / Methodology</h2>
        <p>The paper follows a three-step approach:</p>
        <ul>
          <li><strong>Geometric embedding:</strong> A qLDPC code (such as a hypergraph product code or bivariate bicycle code) is mapped onto a 2D or quasi-2D hardware graph with limited connectivity.</li>
          <li><strong>Routing extraction:</strong> For each stabilizer check, a routing schedule is determined — the sequence of SWAP or shuttle operations needed to bring all participating data qubits into contact with the ancilla. Overlapping routes are identified.</li>
          <li><strong>Correlated noise model:</strong> A noise model is constructed where gates on shared routing paths contribute correlated Pauli errors to the syndromes of multiple stabilizers. The correlation structure is derived from the geometry of the embedding and routing schedule.</li>
        </ul>
        <p>Decoding is then performed under both the correlated noise model and the standard independent noise model, and the gap in logical error rates quantifies the impact of ignoring correlations.</p>

        <figure>
          <img src="images/geometry-correlated-noise/thumbnail.png" alt="Geometry-induced noise in qLDPC routing">
          <figcaption>Thumbnail: Illustration of routing-induced correlated noise in qLDPC syndrome extraction.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Identification of geometry-induced correlations:</strong> Formalizes how shared routing paths create correlated error events that are absent in idealized noise models.</li>
          <li><strong>Quantitative impact analysis:</strong> Shows that correlated noise can significantly degrade logical error rates compared to independent noise predictions, especially at moderate physical error rates.</li>
          <li><strong>Routing-aware noise model:</strong> Provides a systematic method to derive correlated noise channels from a given embedding and routing schedule.</li>
          <li><strong>Decoder implications:</strong> Demonstrates that decoders unaware of these correlations underperform, motivating correlation-aware decoding strategies.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code families</td><td>Hypergraph product codes, bivariate bicycle codes</td></tr>
            <tr><td>Hardware graph</td><td>2D grid with nearest-neighbor connectivity</td></tr>
            <tr><td>Routing</td><td>SWAP-based routing with greedy or heuristic scheduling</td></tr>
            <tr><td>Noise models</td><td>Independent depolarizing (baseline) vs. correlated Pauli from shared routes</td></tr>
            <tr><td>Decoders</td><td>BP + OSD, MWPM (with and without correlation awareness)</td></tr>
            <tr><td>Simulation</td><td>Stim-based circuit-level simulation</td></tr>
          </tbody>
        </table>
        <p>The routing schedule is a critical variable: different scheduling choices lead to different overlap patterns and hence different correlation structures. The paper explores several scheduling heuristics and their effect on the resulting noise correlations.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Key Finding</th></tr></thead>
          <tbody>
            <tr><td>Independent noise model</td><td>Standard logical error rates consistent with prior literature</td></tr>
            <tr><td>Correlated noise model</td><td>Logical error rates increase, sometimes substantially, particularly for codes with dense routing overlap</td></tr>
            <tr><td>Correlation-aware decoder</td><td>Partially recovers the gap, but at increased computational cost</td></tr>
            <tr><td>Routing optimization</td><td>Better routing schedules reduce overlap and hence correlations, partially mitigating the problem</td></tr>
          </tbody>
        </table>
        <p>The magnitude of the performance degradation depends on code parameters, embedding quality, and routing schedule. For codes with high-weight stabilizers requiring extensive routing, the effect is pronounced. For codes with relatively local checks, the impact is smaller but still non-negligible.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Identifies a realistic and previously overlooked noise source specific to qLDPC implementations.</li>
          <li>Provides a principled framework to derive correlated noise from routing geometry, not just assume it.</li>
          <li>Bridges the gap between abstract code theory and physical implementation constraints.</li>
          <li>Motivates co-design of routing, embedding, and decoder — a valuable practical message.</li>
          <li>Clear presentation of when correlations matter and when they can be safely ignored.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Analysis is primarily focused on 2D nearest-neighbor architectures; emerging long-range connectivity technologies (e.g., photonic links, ion shuttling) may reduce routing overhead.</li>
          <li>The correlated noise model, while more realistic, is still a simplification — real hardware may have additional non-Markovian or leakage errors.</li>
          <li>Routing optimization is treated heuristically; it remains unclear how close to optimal the explored schedules are.</li>
          <li>Limited code sizes due to simulation cost — extrapolation to asymptotically large codes carries uncertainty.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can code design be adapted to minimize routing overlap for a given hardware connectivity, or is this fundamentally constrained by the code's check structure?</li>
          <li>How do these geometry-induced correlations compare in magnitude to other correlated error sources like crosstalk and cosmic rays?</li>
          <li>Is there a theoretical framework to predict the correlation-induced threshold shift without full simulation?</li>
          <li>Would hardware architectures with native long-range connectivity (e.g., reconfigurable atom arrays) eliminate this problem entirely?</li>
          <li>Can belief propagation decoders be modified to efficiently account for these specific correlation structures?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper serves as an important reality check for the qLDPC community: the theoretical promise of constant-rate codes must be weighed against the routing overhead and induced noise correlations that arise in any physical implementation. The key insight is that noise in qLDPC circuits is not merely a function of gate fidelity but also of <em>geometry</em> — how the code is laid out and how syndrome information is extracted. Anyone planning a qLDPC experiment or estimating qLDPC resource costs should account for these effects.</p>
      `
    },
    ko: {
      title: "qLDPC 신드롬 추출에서의 기하학 유도 상관 잡음",
      summary: "qLDPC 코드에서 비국소적 안정기 검사에 필요한 물리적 라우팅이 신드롬 추출 중 기하학 유도 상관 오류를 도입함을 밝히고, 디코딩 성능에 미치는 영향을 분석합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 양자 LDPC 코드에서 <strong>이전에 충분히 인식되지 않은 잡음 메커니즘</strong>을 식별합니다: 신드롬 추출에 필요한 장거리 상호작용의 물리적 라우팅이 코드의 기하학적 임베딩에 의존하는 구조를 가진 상관 오류를 도입합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>qLDPC 신드롬 추출 회로에서 큐비트 라우팅의 물리적 기하학이 어떻게 상관 잡음을 유도하며, 이러한 상관관계가 논리적 오류율과 디코더 성능에 미치는 영향은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 저밀도 패리티 검사(qLDPC) 코드는 거리가 증가함에 따라 일정한 인코딩 비율을 달성할 수 있어 표면 코드에 비해 큰 장점을 가지며 큰 관심을 받고 있습니다. 그러나 qLDPC 코드는 먼 거리의 큐비트를 연결하는 비국소적 안정기 검사를 필요로 합니다. 제한된 연결성을 가진 물리적으로 구현 가능한 하드웨어에서는 이러한 비국소적 상호작용이 라우팅 연산(SWAP 체인, 격자 수술 또는 장거리 결합기)을 통해 매개되어야 하며, 각각 추가 오류 원인을 도입합니다.</p>
        <p>핵심적으로, 두 안정기 검사가 라우팅 경로의 일부를 공유할 때 경험하는 오류가 상관됩니다. qLDPC 코드의 표준 잡음 모델은 일반적으로 각 게이트에 대한 독립적 오류를 가정하여 이러한 기하학 의존적 상관관계를 놓칩니다. 이 논문은 라우팅 유도 상관관계를 무시하면 지나치게 낙관적인 성능 예측으로 이어진다고 주장하며, 이를 모델링하고 분석하는 프레임워크를 제안합니다.</p>
        <p>동기는 이론적(qLDPC 구현의 근본적 잡음 한계 이해)이면서도 실용적(근단기 qLDPC 실험을 위한 하드웨어 레이아웃 및 디코더 설계 안내)입니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>논문은 세 단계 접근법을 따릅니다:</p>
        <ul>
          <li><strong>기하학적 임베딩:</strong> qLDPC 코드(하이퍼그래프 곱 코드 또는 이변량 자전거 코드 등)를 제한된 연결성의 2D 또는 준2D 하드웨어 그래프에 매핑합니다.</li>
          <li><strong>라우팅 추출:</strong> 각 안정기 검사에 대해 라우팅 스케줄(참여하는 모든 데이터 큐비트를 보조 큐비트와 접촉시키는 데 필요한 SWAP 또는 셔틀 연산 시퀀스)을 결정합니다. 겹치는 경로를 식별합니다.</li>
          <li><strong>상관 잡음 모델:</strong> 공유 라우팅 경로의 게이트가 여러 안정기의 신드롬에 상관된 파울리 오류를 기여하는 잡음 모델을 구성합니다. 상관 구조는 임베딩과 라우팅 스케줄의 기하학에서 도출됩니다.</li>
        </ul>
        <p>그런 다음 상관 잡음 모델과 표준 독립 잡음 모델 모두에서 디코딩을 수행하고, 논리적 오류율의 차이가 상관관계 무시의 영향을 정량화합니다.</p>

        <figure>
          <img src="images/geometry-correlated-noise/thumbnail.png" alt="qLDPC 라우팅에서의 기하학 유도 잡음">
          <figcaption>Thumbnail: qLDPC 신드롬 추출에서 라우팅 유도 상관 잡음의 그림.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>기하학 유도 상관관계 식별:</strong> 공유 라우팅 경로가 이상화된 잡음 모델에는 없는 상관 오류 이벤트를 어떻게 생성하는지 공식화합니다.</li>
          <li><strong>정량적 영향 분석:</strong> 상관 잡음이 특히 중간 물리적 오류율에서 독립 잡음 예측에 비해 논리적 오류율을 크게 악화시킬 수 있음을 보여줍니다.</li>
          <li><strong>라우팅 인식 잡음 모델:</strong> 주어진 임베딩과 라우팅 스케줄에서 상관 잡음 채널을 도출하는 체계적 방법을 제공합니다.</li>
          <li><strong>디코더 함의:</strong> 이러한 상관관계를 인식하지 못하는 디코더가 성능이 떨어짐을 보여주어, 상관 인식 디코딩 전략의 필요성을 제기합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 계열</td><td>하이퍼그래프 곱 코드, 이변량 자전거 코드</td></tr>
            <tr><td>하드웨어 그래프</td><td>최근접 이웃 연결의 2D 그리드</td></tr>
            <tr><td>라우팅</td><td>탐욕적 또는 휴리스틱 스케줄링을 사용한 SWAP 기반 라우팅</td></tr>
            <tr><td>잡음 모델</td><td>독립 탈분극(기준선) vs. 공유 경로의 상관 파울리</td></tr>
            <tr><td>디코더</td><td>BP + OSD, MWPM(상관 인식 유무)</td></tr>
            <tr><td>시뮬레이션</td><td>Stim 기반 회로 수준 시뮬레이션</td></tr>
          </tbody>
        </table>
        <p>라우팅 스케줄은 핵심 변수입니다: 서로 다른 스케줄링 선택은 서로 다른 겹침 패턴과 따라서 서로 다른 상관 구조로 이어집니다. 논문은 여러 스케줄링 휴리스틱과 결과적 잡음 상관관계에 대한 영향을 탐구합니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>주요 발견</th></tr></thead>
          <tbody>
            <tr><td>독립 잡음 모델</td><td>기존 문헌과 일관된 표준 논리적 오류율</td></tr>
            <tr><td>상관 잡음 모델</td><td>논리적 오류율 증가, 특히 밀집한 라우팅 겹침이 있는 코드에서 상당한 증가</td></tr>
            <tr><td>상관 인식 디코더</td><td>격차를 부분적으로 회복하지만 증가된 계산 비용 수반</td></tr>
            <tr><td>라우팅 최적화</td><td>더 나은 라우팅 스케줄이 겹침과 상관관계를 줄여 문제를 부분적으로 완화</td></tr>
          </tbody>
        </table>
        <p>성능 저하의 크기는 코드 매개변수, 임베딩 품질, 라우팅 스케줄에 따라 달라집니다. 광범위한 라우팅이 필요한 고중량 안정기가 있는 코드에서 효과가 두드러집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>qLDPC 구현에 특유한 현실적이고 이전에 간과된 잡음 원인을 식별합니다.</li>
          <li>라우팅 기하학에서 상관 잡음을 도출하는 원칙적 프레임워크를 제공합니다.</li>
          <li>추상적 코드 이론과 물리적 구현 제약 사이의 간극을 연결합니다.</li>
          <li>라우팅, 임베딩, 디코더의 공동 설계를 촉진하는 귀중한 실용적 메시지를 전달합니다.</li>
          <li>상관관계가 중요한 경우와 안전하게 무시할 수 있는 경우에 대한 명확한 제시가 있습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>분석이 주로 2D 최근접 이웃 아키텍처에 초점을 맞추며, 신흥 장거리 연결 기술이 라우팅 오버헤드를 줄일 수 있습니다.</li>
          <li>상관 잡음 모델은 더 현실적이지만 여전히 단순화이며, 실제 하드웨어에는 추가적인 비마르코프 또는 누출 오류가 있을 수 있습니다.</li>
          <li>라우팅 최적화가 휴리스틱으로 처리되며, 탐구된 스케줄이 최적에 얼마나 가까운지 불분명합니다.</li>
          <li>시뮬레이션 비용으로 인한 제한된 코드 크기 — 점근적으로 큰 코드로의 외삽은 불확실성을 수반합니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>주어진 하드웨어 연결성에 대해 라우팅 겹침을 최소화하도록 코드 설계를 조정할 수 있는가, 아니면 코드의 검사 구조에 의해 근본적으로 제한되는가?</li>
          <li>이러한 기하학 유도 상관관계는 크로스토크나 우주선 등 다른 상관 오류 원인과 비교하여 크기가 어떠한가?</li>
          <li>전체 시뮬레이션 없이 상관 유도 임계값 이동을 예측하는 이론적 프레임워크가 있는가?</li>
          <li>고유 장거리 연결성을 가진 하드웨어 아키텍처(예: 재구성 가능 원자 배열)가 이 문제를 완전히 제거할 수 있는가?</li>
          <li>신뢰 전파 디코더를 이러한 특정 상관 구조를 효율적으로 고려하도록 수정할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 qLDPC 커뮤니티를 위한 중요한 현실 점검 역할을 합니다: 일정 비율 코드의 이론적 약속은 물리적 구현에서 발생하는 라우팅 오버헤드와 유도된 잡음 상관관계와 비교되어야 합니다. 핵심 통찰은 qLDPC 회로의 잡음이 단순히 게이트 충실도의 함수가 아니라 <em>기하학</em> — 코드가 어떻게 배치되고 신드롬 정보가 어떻게 추출되는지 — 의 함수이기도 하다는 것입니다. qLDPC 실험을 계획하거나 qLDPC 자원 비용을 추정하는 누구든지 이러한 효과를 고려해야 합니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. magic-state-injection-qldpc
  // ====================================================================
  {
    id: "magic-state-injection-qldpc",
    date: "2025-04-11",
    authors: "Liu, K., Xu, S., Jochym-O'Connor, T., et al.",
    venue: "Preprint 2025",
    image: "images/magic-state-injection-qldpc/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Magic State", "qLDPC", "Fault Tolerance"],
    en: {
      title: "In-Situ Simultaneous Magic State Injection on Arbitrary CSS qLDPC Codes",
      summary: "Proposes a protocol for injecting magic states directly into arbitrary CSS qLDPC codes without requiring dedicated magic state factories, enabling simultaneous multi-qubit injection in-situ.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper removes one of the key bottlenecks for fault-tolerant computation on qLDPC codes by showing that <strong>magic states can be injected simultaneously and in-place</strong> on arbitrary CSS qLDPC codes, eliminating the need for separate magic state distillation factories.</p>

        <h2>Research Question</h2>
        <blockquote>Can magic states be injected directly and simultaneously into logical qubits encoded in arbitrary CSS qLDPC codes without requiring external magic state factories or code switching, and if so, what are the fault-tolerance properties of such a protocol?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Universal fault-tolerant quantum computation requires non-Clifford gates, typically implemented via magic state injection and distillation. In the surface code paradigm, magic state distillation is performed in dedicated factory regions that consume a large fraction of physical qubits — often dominating the total resource overhead. This overhead is one of the primary motivations for exploring qLDPC codes, which offer better encoding rates.</p>
        <p>However, magic state injection on qLDPC codes is significantly more complex than on surface codes. The non-local check structure of qLDPC codes means that standard lattice-surgery-based injection techniques do not directly apply. Previous approaches either required code switching (encoding into a different code that supports transversal non-Clifford gates) or adapted surface-code-style factories, both of which negate much of the qLDPC advantage.</p>
        <p>This paper addresses this gap by developing an in-situ injection protocol that works natively on CSS qLDPC codes. The "simultaneous" aspect means multiple magic states can be injected in parallel across different logical qubits of the same code block, which is critical for achieving practical computational speeds.</p>

        <h2>Architecture / Methodology</h2>
        <p>The protocol operates in three phases:</p>
        <ul>
          <li><strong>Preparation:</strong> Ancilla qubits are prepared in noisy magic states (|T⟩ states) and coupled to specific data qubits of the qLDPC code block via controlled operations.</li>
          <li><strong>Injection circuit:</strong> A carefully designed circuit applies the non-Clifford rotation to the logical qubit by consuming the ancilla magic state, using only Clifford gates and measurements on the code qubits plus the ancilla. The circuit structure respects the CSS structure of the code to maintain syndrome extractability.</li>
          <li><strong>Post-selection / distillation:</strong> Syndrome measurements before and after injection are compared. Discrepancies flag potential injection errors, enabling either post-selection or subsequent distillation rounds to achieve target fidelity.</li>
        </ul>
        <p>The simultaneous injection capability arises because injections on different logical qubits act on disjoint sets of physical qubits (leveraging the qLDPC code structure), allowing them to proceed in parallel without interference.</p>

        <figure>
          <img src="images/magic-state-injection-qldpc/thumbnail.png" alt="In-situ magic state injection on qLDPC codes">
          <figcaption>Thumbnail: In-situ simultaneous magic state injection protocol overview.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Factory-free injection:</strong> Eliminates the need for dedicated magic state factories, directly injecting magic states into the qLDPC code block where computation occurs.</li>
          <li><strong>Arbitrary CSS qLDPC compatibility:</strong> The protocol is not specialized to a specific code family — it works on any CSS qLDPC code, providing broad applicability.</li>
          <li><strong>Simultaneous multi-qubit injection:</strong> Multiple logical qubits can receive magic states in parallel within the same code block, critical for computational throughput.</li>
          <li><strong>Fault-tolerance analysis:</strong> Provides rigorous analysis of how injection errors propagate and how syndrome-based detection can flag them.</li>
          <li><strong>Resource overhead reduction:</strong> Quantifies the physical qubit savings compared to factory-based approaches.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code families tested</td><td>Hypergraph product codes, bivariate bicycle codes, lifted product codes</td></tr>
            <tr><td>Magic state type</td><td>|T⟩ = (|0⟩ + e<sup>iπ/4</sup>|1⟩)/√2 for T-gate implementation</td></tr>
            <tr><td>Injection circuit depth</td><td>O(1) additional depth beyond standard syndrome extraction</td></tr>
            <tr><td>Error model</td><td>Circuit-level depolarizing noise</td></tr>
            <tr><td>Post-selection rate</td><td>Analyzed as function of physical error rate and code distance</td></tr>
            <tr><td>Simulation</td><td>Stim-based circuit simulation with BP+OSD decoding</td></tr>
          </tbody>
        </table>
        <p>The injection circuit is designed to commute with the CSS stabilizers of the code, ensuring that syndrome extraction can continue uninterrupted during and after injection. This is the key technical insight that makes in-situ operation possible.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Metric</th><th>Result</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>Injection fidelity</td><td>Competitive with factory-based approaches at comparable physical error rates</td><td>In-situ injection does not sacrifice quality</td></tr>
            <tr><td>Qubit overhead</td><td>Significant reduction (no factory qubits needed)</td><td>Major resource savings for qLDPC architectures</td></tr>
            <tr><td>Simultaneous injection</td><td>Up to k injections in parallel for [[n,k,d]] code</td><td>Throughput scales with code rate</td></tr>
            <tr><td>Post-selection overhead</td><td>Moderate at relevant error rates</td><td>Practical for near-term demonstrations</td></tr>
          </tbody>
        </table>
        <p>The results demonstrate that the in-situ approach is not merely a theoretical curiosity but a practical alternative that can meaningfully reduce the resource requirements of fault-tolerant quantum computation with qLDPC codes.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Eliminates one of the most costly components of fault-tolerant architecture — the magic state factory.</li>
          <li>Generality across CSS qLDPC code families makes the result broadly applicable.</li>
          <li>Simultaneous injection is a key practical feature that prior work lacked.</li>
          <li>Clean theoretical framework with rigorous fault-tolerance analysis.</li>
          <li>Concrete resource savings quantified, not just asymptotic claims.</li>
          <li>Compatible with existing decoding infrastructure (BP+OSD, MWPM).</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Post-selection overhead may become significant at higher physical error rates, partially offsetting qubit savings.</li>
          <li>Restricted to CSS codes — non-CSS qLDPC codes require different techniques.</li>
          <li>The injection fidelity depends on the quality of the initial noisy magic state, which still needs preparation.</li>
          <li>Circuit complexity may increase for codes with very high-weight stabilizers.</li>
          <li>Experimental demonstration remains future work.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the in-situ injection overhead compare to lattice surgery approaches as code distance scales?</li>
          <li>Can this protocol be combined with magic state distillation to achieve even higher fidelity injection?</li>
          <li>What are the implications for the comparative resource analysis of surface codes vs. qLDPC codes when factory overhead is removed?</li>
          <li>Is there an analogous in-situ protocol for non-CSS qLDPC codes?</li>
          <li>How does simultaneous injection interact with the correlated noise issues identified in routing-heavy qLDPC implementations?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper makes a significant step toward practical fault-tolerant quantum computing with qLDPC codes by removing the magic state factory bottleneck. The ability to inject magic states in-situ and simultaneously is a qualitative advance that changes the resource calculus of qLDPC architectures. For anyone comparing qLDPC and surface code approaches, this result should be factored into the overhead analysis.</p>
      `
    },
    ko: {
      title: "임의의 CSS qLDPC 코드에서의 현장 동시 매직 스테이트 주입",
      summary: "전용 매직 스테이트 공장 없이 임의의 CSS qLDPC 코드에 매직 스테이트를 직접 주입하는 프로토콜을 제안하며, 현장에서 동시 다중 큐비트 주입을 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>매직 스테이트를 임의의 CSS qLDPC 코드에 동시에 현장에서 주입</strong>할 수 있음을 보여줌으로써 qLDPC 코드에서의 결함 허용 계산의 핵심 병목 중 하나를 제거합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>외부 매직 스테이트 공장이나 코드 전환 없이 임의의 CSS qLDPC 코드에 인코딩된 논리 큐비트에 매직 스테이트를 직접 동시에 주입할 수 있으며, 그러한 프로토콜의 결함 허용 특성은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>보편적 결함 허용 양자 계산에는 비클리포드 게이트가 필요하며, 일반적으로 매직 스테이트 주입과 증류를 통해 구현됩니다. 표면 코드 패러다임에서 매직 스테이트 증류는 전용 공장 영역에서 수행되며, 물리적 큐비트의 큰 부분을 소비합니다 — 종종 총 자원 오버헤드를 지배합니다. 이 오버헤드는 더 나은 인코딩 비율을 제공하는 qLDPC 코드를 탐구하는 주요 동기 중 하나입니다.</p>
        <p>그러나 qLDPC 코드에서의 매직 스테이트 주입은 표면 코드보다 상당히 복잡합니다. qLDPC 코드의 비국소적 검사 구조는 표준 격자 수술 기반 주입 기술이 직접 적용되지 않음을 의미합니다. 이전 접근법은 코드 전환이나 표면 코드 스타일의 공장을 필요로 했으며, 둘 다 qLDPC 이점의 많은 부분을 상쇄합니다.</p>
        <p>이 논문은 CSS qLDPC 코드에서 기본적으로 작동하는 현장 주입 프로토콜을 개발하여 이 간극을 해결합니다. "동시" 측면은 여러 매직 스테이트가 동일한 코드 블록의 서로 다른 논리 큐비트에 병렬로 주입될 수 있음을 의미하며, 이는 실용적 계산 속도 달성에 중요합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>프로토콜은 세 단계로 작동합니다:</p>
        <ul>
          <li><strong>준비:</strong> 보조 큐비트를 잡음이 있는 매직 스테이트(|T⟩ 스테이트)로 준비하고 제어 연산을 통해 qLDPC 코드 블록의 특정 데이터 큐비트에 결합합니다.</li>
          <li><strong>주입 회로:</strong> 신중하게 설계된 회로가 보조 매직 스테이트를 소비하여 논리 큐비트에 비클리포드 회전을 적용합니다. 코드 큐비트와 보조 큐비트에 대한 클리포드 게이트와 측정만 사용합니다.</li>
          <li><strong>후선택 / 증류:</strong> 주입 전후의 신드롬 측정을 비교합니다. 불일치가 잠재적 주입 오류를 표시하여 후선택 또는 후속 증류 라운드를 가능하게 합니다.</li>
        </ul>
        <p>동시 주입 능력은 서로 다른 논리 큐비트에 대한 주입이 물리적 큐비트의 분리된 집합에서 작동하기 때문에 발생하며(qLDPC 코드 구조를 활용), 간섭 없이 병렬로 진행할 수 있습니다.</p>

        <figure>
          <img src="images/magic-state-injection-qldpc/thumbnail.png" alt="qLDPC 코드에서의 현장 매직 스테이트 주입">
          <figcaption>Thumbnail: 현장 동시 매직 스테이트 주입 프로토콜 개요.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>공장 없는 주입:</strong> 전용 매직 스테이트 공장의 필요를 제거하고, 계산이 발생하는 qLDPC 코드 블록에 매직 스테이트를 직접 주입합니다.</li>
          <li><strong>임의 CSS qLDPC 호환성:</strong> 프로토콜이 특정 코드 계열에 특화되지 않으며 모든 CSS qLDPC 코드에서 작동합니다.</li>
          <li><strong>동시 다중 큐비트 주입:</strong> 동일한 코드 블록 내에서 여러 논리 큐비트가 병렬로 매직 스테이트를 받을 수 있어 계산 처리량에 중요합니다.</li>
          <li><strong>결함 허용 분석:</strong> 주입 오류가 어떻게 전파되고 신드롬 기반 검출이 이를 어떻게 표시할 수 있는지에 대한 엄밀한 분석을 제공합니다.</li>
          <li><strong>자원 오버헤드 감소:</strong> 공장 기반 접근법과 비교하여 물리적 큐비트 절약을 정량화합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트된 코드 계열</td><td>하이퍼그래프 곱 코드, 이변량 자전거 코드, 리프트 곱 코드</td></tr>
            <tr><td>매직 스테이트 유형</td><td>T-게이트 구현을 위한 |T⟩ = (|0⟩ + e<sup>iπ/4</sup>|1⟩)/√2</td></tr>
            <tr><td>주입 회로 깊이</td><td>표준 신드롬 추출을 넘어 O(1) 추가 깊이</td></tr>
            <tr><td>오류 모델</td><td>회로 수준 탈분극 잡음</td></tr>
            <tr><td>후선택률</td><td>물리적 오류율과 코드 거리의 함수로 분석</td></tr>
            <tr><td>시뮬레이션</td><td>BP+OSD 디코딩을 사용한 Stim 기반 회로 시뮬레이션</td></tr>
          </tbody>
        </table>
        <p>주입 회로는 코드의 CSS 안정기와 교환 가능하도록 설계되어 주입 중과 후에 신드롬 추출이 중단 없이 계속될 수 있습니다. 이것이 현장 작동을 가능하게 하는 핵심 기술적 통찰입니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>지표</th><th>결과</th><th>해석</th></tr></thead>
          <tbody>
            <tr><td>주입 충실도</td><td>비교 가능한 물리적 오류율에서 공장 기반 접근법과 경쟁적</td><td>현장 주입이 품질을 희생하지 않음</td></tr>
            <tr><td>큐비트 오버헤드</td><td>상당한 감소(공장 큐비트 불필요)</td><td>qLDPC 아키텍처에 대한 주요 자원 절약</td></tr>
            <tr><td>동시 주입</td><td>[[n,k,d]] 코드에 대해 최대 k개 병렬 주입</td><td>처리량이 코드 비율과 함께 확장</td></tr>
            <tr><td>후선택 오버헤드</td><td>관련 오류율에서 중간 수준</td><td>근단기 시연에 실용적</td></tr>
          </tbody>
        </table>
        <p>결과는 현장 접근법이 단순한 이론적 호기심이 아니라 qLDPC 코드를 사용한 결함 허용 양자 계산의 자원 요구를 의미 있게 줄일 수 있는 실용적 대안임을 보여줍니다.</p>

        <h2>강점</h2>
        <ul>
          <li>결함 허용 아키텍처에서 가장 비용이 큰 구성 요소 중 하나인 매직 스테이트 공장을 제거합니다.</li>
          <li>CSS qLDPC 코드 계열 전반에 걸친 일반성이 결과를 광범위하게 적용 가능하게 합니다.</li>
          <li>동시 주입은 이전 연구에 없었던 핵심 실용적 특징입니다.</li>
          <li>엄밀한 결함 허용 분석을 갖춘 깔끔한 이론적 프레임워크입니다.</li>
          <li>단순한 점근적 주장이 아닌 구체적 자원 절약이 정량화되었습니다.</li>
          <li>기존 디코딩 인프라(BP+OSD, MWPM)와 호환됩니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>후선택 오버헤드가 높은 물리적 오류율에서 중요해질 수 있어 큐비트 절약을 부분적으로 상쇄할 수 있습니다.</li>
          <li>CSS 코드에 제한되며, 비CSS qLDPC 코드는 다른 기술이 필요합니다.</li>
          <li>주입 충실도가 초기 잡음 매직 스테이트의 품질에 의존하며, 이는 여전히 준비가 필요합니다.</li>
          <li>매우 높은 중량의 안정기를 가진 코드에서 회로 복잡성이 증가할 수 있습니다.</li>
          <li>실험적 시연은 향후 연구로 남아 있습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>코드 거리가 확장됨에 따라 현장 주입 오버헤드가 격자 수술 접근법과 어떻게 비교되는가?</li>
          <li>이 프로토콜을 매직 스테이트 증류와 결합하여 더 높은 충실도 주입을 달성할 수 있는가?</li>
          <li>공장 오버헤드가 제거될 때 표면 코드 대 qLDPC 코드의 비교 자원 분석에 대한 함의는 무엇인가?</li>
          <li>비CSS qLDPC 코드에 대한 유사한 현장 프로토콜이 있는가?</li>
          <li>동시 주입이 라우팅 집약적 qLDPC 구현에서 식별된 상관 잡음 문제와 어떻게 상호작용하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 매직 스테이트 공장 병목을 제거하여 qLDPC 코드를 사용한 실용적 결함 허용 양자 계산을 향한 중요한 진전을 이룹니다. 매직 스테이트를 현장에서 동시에 주입할 수 있는 능력은 qLDPC 아키텍처의 자원 계산을 바꾸는 질적 진보입니다. qLDPC와 표면 코드 접근법을 비교하는 누구든지 이 결과를 오버헤드 분석에 반영해야 합니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. neural-belief-matching
  // ====================================================================
  {
    id: "neural-belief-matching",
    date: "2025-04-11",
    authors: "Menti, L., Lázaro, F.",
    venue: "Preprint 2025",
    image: "images/neural-belief-matching/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Neural Decoder", "Belief Propagation"],
    en: {
      title: "Neural Belief-Matching Decoding for Topological Quantum Error Correction Codes",
      summary: "Proposes a neural network-enhanced belief propagation decoder that learns to match the belief distributions of BP iterations to optimal posterior distributions for topological QEC codes.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces <strong>neural belief-matching</strong>, a principled method for augmenting belief propagation decoding of topological codes by training a neural network to correct the systematic biases in BP message updates, achieving near-optimal decoding with BP-scale computational cost.</p>

        <h2>Research Question</h2>
        <blockquote>Can a neural network be trained to correct the systematic errors of belief propagation on topological code factor graphs, matching the belief distributions to the true posterior and thereby closing the gap between BP and optimal decoding?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Belief propagation (BP) is a workhorse decoding algorithm for classical LDPC codes, achieving near-optimal performance on sparse factor graphs with tree-like structure. However, topological quantum error correction codes (such as surface codes and color codes) have factor graphs with many short cycles, causing BP to converge poorly or not at all. The beliefs computed by BP on these loopy graphs are systematically biased, leading to suboptimal decoding.</p>
        <p>Previous approaches to this problem include: (1) post-processing BP with ordered statistics decoding (OSD), which is effective but computationally expensive; (2) neural BP variants that learn edge weights, which improve convergence but lack a principled training objective; and (3) pure neural decoders that abandon BP entirely, losing its structural advantages.</p>
        <p>This paper takes a different approach: keep the BP message-passing structure but train a neural network to transform the BP beliefs at each iteration so that they match the true posterior distribution. The training objective — minimizing the divergence between neural-corrected beliefs and the optimal posterior — is both principled and directly connected to decoding optimality.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Base BP decoder:</strong> Standard min-sum or sum-product BP runs on the factor graph of the topological code for a fixed number of iterations.</li>
          <li><strong>Neural correction module:</strong> After each BP iteration (or after the final iteration), a lightweight neural network takes the current beliefs and syndrome as input and outputs corrected beliefs. The network architecture is typically an MLP or small GNN that respects the local structure of the factor graph.</li>
          <li><strong>Training objective:</strong> The neural network is trained to minimize the KL divergence (or a surrogate loss) between its output beliefs and the exact posterior marginals computed via brute-force on small instances or approximated via importance sampling on larger ones.</li>
          <li><strong>Inference:</strong> At decode time, BP runs with neural corrections applied, and the final corrected beliefs are used for hard decisions. The overhead per decoding instance is the cost of one or a few neural network forward passes.</li>
        </ul>

        <figure>
          <img src="images/neural-belief-matching/thumbnail.png" alt="Neural belief-matching decoder architecture">
          <figcaption>Thumbnail: Neural belief-matching decoding pipeline.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Principled training objective:</strong> Unlike prior neural BP work that uses heuristic loss functions, belief matching targets the true posterior, providing a clear optimality criterion.</li>
          <li><strong>Scalable architecture:</strong> The neural correction module is lightweight and local, scaling linearly with code size rather than quadratically.</li>
          <li><strong>Near-optimal performance:</strong> Achieves decoding performance close to maximum-likelihood on surface and color codes, significantly outperforming vanilla BP and approaching MWPM/UF quality.</li>
          <li><strong>Compatibility with BP infrastructure:</strong> Can be implemented as a drop-in enhancement to existing BP decoders without changing the overall decoding pipeline.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes tested</td><td>Surface codes (d=3 to d=11), color codes (d=5 to d=9)</td></tr>
            <tr><td>BP variant</td><td>Min-sum and sum-product</td></tr>
            <tr><td>BP iterations</td><td>10-50 iterations before neural correction</td></tr>
            <tr><td>Neural architecture</td><td>MLP with 2-3 hidden layers; GNN variant for larger codes</td></tr>
            <tr><td>Training data</td><td>Syndrome samples with exact posterior marginals (small codes) or importance-sampled approximations (larger codes)</td></tr>
            <tr><td>Training loss</td><td>KL divergence between predicted and target beliefs</td></tr>
            <tr><td>Hardware</td><td>Training on single GPU; inference compatible with FPGA deployment</td></tr>
          </tbody>
        </table>
        <p>Training requires access to ground-truth posterior marginals, which limits the approach to codes where these can be computed or well-approximated. For small-to-moderate code distances, exact computation is feasible; for larger codes, the authors employ importance sampling techniques.</p>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Decoder</th><th>Performance vs. ML Bound</th><th>Runtime</th></tr></thead>
          <tbody>
            <tr><td>Vanilla BP</td><td>Significant gap, especially on surface codes</td><td>Fast</td></tr>
            <tr><td>BP + OSD</td><td>Near-optimal but computationally heavy</td><td>Slow (OSD dominates)</td></tr>
            <tr><td>Neural Belief-Matching</td><td>Near-optimal, close to BP+OSD</td><td>Moderate (BP + small NN forward pass)</td></tr>
            <tr><td>MWPM</td><td>Near-optimal for surface codes</td><td>Moderate</td></tr>
          </tbody>
        </table>
        <p>The neural belief-matching decoder achieves the accuracy of BP+OSD at a fraction of the runtime, making it a compelling practical alternative. On color codes, where MWPM is not directly applicable, the advantage over vanilla BP is even more pronounced.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Principled approach — the belief-matching objective has a clear theoretical justification connected to Bayesian optimality.</li>
          <li>Practical runtime — the neural overhead is small compared to OSD post-processing.</li>
          <li>Generalizes across topological code families (surface, color) without code-specific engineering.</li>
          <li>Modular design — the neural module can be added to any BP decoder as a plug-in enhancement.</li>
          <li>Thorough experimental evaluation across multiple code families, distances, and noise models.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Training requires ground-truth posterior marginals, which are expensive to compute for large codes.</li>
          <li>Generalization across code distances is not fully demonstrated — retraining may be needed for each distance.</li>
          <li>The neural module adds latency compared to pure BP, which may matter for real-time decoding applications.</li>
          <li>Limited analysis of adversarial or non-standard noise models where BP biases may be qualitatively different.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the training procedure be made self-supervised, avoiding the need for ground-truth posteriors?</li>
          <li>How does the approach scale to qLDPC codes where BP already performs better due to sparser factor graphs?</li>
          <li>Is there a theoretical guarantee on how close the neural-corrected beliefs can get to the true posterior?</li>
          <li>Can the neural module be distilled into simpler correction rules for hardware implementation?</li>
          <li>How does belief-matching compare to reinforcement-learning-based decoder training approaches?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>Neural belief-matching offers a principled and practical path to improving BP decoding on topological codes. Rather than abandoning BP's structure or bolting on expensive post-processing, it surgically corrects BP's known weakness — biased beliefs on loopy graphs — using a lightweight neural network trained against the true posterior. For groups building real-time QEC decoders, this approach offers an attractive accuracy-latency trade-off.</p>
      `
    },
    ko: {
      title: "위상 양자 오류 정정 코드를 위한 신경 신뢰 매칭 디코딩",
      summary: "BP 반복의 신뢰 분포를 최적 사후 분포에 매칭하도록 신경망을 학습시켜 위상 QEC 코드의 신뢰 전파 디코더를 향상시키는 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>신경 신뢰 매칭</strong>이라는 원리적 방법을 도입하여, 신경망이 BP 메시지 업데이트의 체계적 편향을 수정하도록 학습시킴으로써 BP 규모의 계산 비용으로 거의 최적의 디코딩을 달성합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>위상 코드 인수 그래프에서 신뢰 전파의 체계적 오류를 수정하여 신뢰 분포를 진정한 사후 분포에 매칭시키고, 이를 통해 BP와 최적 디코딩 사이의 간극을 줄이도록 신경망을 학습시킬 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>신뢰 전파(BP)는 고전 LDPC 코드의 주력 디코딩 알고리즘으로, 트리 구조를 가진 희소 인수 그래프에서 거의 최적의 성능을 달성합니다. 그러나 표면 코드와 컬러 코드 같은 위상 양자 오류 정정 코드는 많은 짧은 순환을 가진 인수 그래프를 가져 BP가 수렴이 잘 되지 않거나 전혀 수렴하지 않습니다. 이러한 루프가 있는 그래프에서 BP가 계산하는 신뢰는 체계적으로 편향되어 최적이 아닌 디코딩으로 이어집니다.</p>
        <p>이 문제에 대한 이전 접근법에는: (1) OSD로 BP를 후처리하는 방법 — 효과적이지만 계산적으로 비용이 큽니다; (2) 엣지 가중치를 학습하는 신경 BP 변형 — 수렴을 개선하지만 원리적 학습 목표가 없습니다; (3) BP를 완전히 포기하는 순수 신경 디코더 — 구조적 장점을 잃습니다.</p>
        <p>이 논문은 다른 접근법을 취합니다: BP 메시지 전달 구조를 유지하되, 각 반복에서 BP 신뢰를 진정한 사후 분포에 매칭되도록 변환하는 신경망을 학습시킵니다. 학습 목표 — 신경 수정된 신뢰와 최적 사후 분포 사이의 발산 최소화 — 는 원리적이며 디코딩 최적성과 직접 연결됩니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>기본 BP 디코더:</strong> 표준 min-sum 또는 sum-product BP가 위상 코드의 인수 그래프에서 고정된 반복 횟수 동안 실행됩니다.</li>
          <li><strong>신경 보정 모듈:</strong> 각 BP 반복 후(또는 최종 반복 후) 경량 신경망이 현재 신뢰와 신드롬을 입력으로 받아 보정된 신뢰를 출력합니다.</li>
          <li><strong>학습 목표:</strong> 신경망은 출력 신뢰와 정확한 사후 주변분포 사이의 KL 발산(또는 대리 손실)을 최소화하도록 학습됩니다.</li>
          <li><strong>추론:</strong> 디코드 시 BP가 신경 보정이 적용된 상태로 실행되며, 최종 보정된 신뢰가 경판정에 사용됩니다.</li>
        </ul>

        <figure>
          <img src="images/neural-belief-matching/thumbnail.png" alt="신경 신뢰 매칭 디코더 구조">
          <figcaption>Thumbnail: 신경 신뢰 매칭 디코딩 파이프라인.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>원리적 학습 목표:</strong> 휴리스틱 손실 함수를 사용하는 이전 신경 BP 연구와 달리, 신뢰 매칭은 베이지안 최적성과 연결된 명확한 이론적 정당화를 가진 진정한 사후 분포를 목표로 합니다.</li>
          <li><strong>확장 가능한 구조:</strong> 신경 보정 모듈이 경량이며 국소적이어서 코드 크기에 대해 이차적이 아닌 선형적으로 확장됩니다.</li>
          <li><strong>거의 최적의 성능:</strong> 표면 코드와 컬러 코드에서 최대 우도에 가까운 디코딩 성능을 달성하며, 순수 BP를 크게 능가하고 MWPM/UF 품질에 접근합니다.</li>
          <li><strong>BP 인프라와의 호환성:</strong> 전체 디코딩 파이프라인을 변경하지 않고 기존 BP 디코더에 대한 드롭인 향상으로 구현할 수 있습니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트된 코드</td><td>표면 코드(d=3~d=11), 컬러 코드(d=5~d=9)</td></tr>
            <tr><td>BP 변형</td><td>Min-sum 및 sum-product</td></tr>
            <tr><td>BP 반복</td><td>신경 보정 전 10-50회 반복</td></tr>
            <tr><td>신경 구조</td><td>2-3 은닉층의 MLP; 더 큰 코드를 위한 GNN 변형</td></tr>
            <tr><td>학습 데이터</td><td>정확한 사후 주변분포(작은 코드) 또는 중요도 샘플링 근사(큰 코드)가 있는 신드롬 샘플</td></tr>
            <tr><td>학습 손실</td><td>예측된 신뢰와 목표 신뢰 사이의 KL 발산</td></tr>
            <tr><td>하드웨어</td><td>단일 GPU에서 학습; FPGA 배포와 호환 가능한 추론</td></tr>
          </tbody>
        </table>
        <p>학습에는 기저 진리 사후 주변분포에 대한 접근이 필요하며, 이는 계산 또는 잘 근사될 수 있는 코드로 접근법을 제한합니다. 소규모에서 중간 코드 거리에서는 정확한 계산이 가능하며, 더 큰 코드에서는 중요도 샘플링 기술을 사용합니다.</p>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>디코더</th><th>ML 한계 대비 성능</th><th>실행 시간</th></tr></thead>
          <tbody>
            <tr><td>순수 BP</td><td>상당한 격차, 특히 표면 코드에서</td><td>빠름</td></tr>
            <tr><td>BP + OSD</td><td>거의 최적이지만 계산적으로 무거움</td><td>느림(OSD가 지배)</td></tr>
            <tr><td>신경 신뢰 매칭</td><td>거의 최적, BP+OSD에 근접</td><td>중간(BP + 작은 NN 순방향 패스)</td></tr>
            <tr><td>MWPM</td><td>표면 코드에서 거의 최적</td><td>중간</td></tr>
          </tbody>
        </table>
        <p>신경 신뢰 매칭 디코더는 BP+OSD의 정확도를 실행 시간의 일부로 달성하여 매력적인 실용적 대안이 됩니다. MWPM이 직접 적용되지 않는 컬러 코드에서 순수 BP에 대한 이점이 더욱 두드러집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>원리적 접근 — 신뢰 매칭 목표는 베이지안 최적성과 연결된 명확한 이론적 정당화를 가집니다.</li>
          <li>실용적 실행 시간 — 신경 오버헤드가 OSD 후처리에 비해 작습니다.</li>
          <li>코드 특화 엔지니어링 없이 위상 코드 계열(표면, 컬러) 전반에 걸쳐 일반화됩니다.</li>
          <li>모듈식 설계 — 신경 모듈을 모든 BP 디코더에 플러그인 향상으로 추가할 수 있습니다.</li>
          <li>여러 코드 계열, 거리, 잡음 모델에 걸친 철저한 실험 평가가 있습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>학습에 기저 진리 사후 주변분포가 필요하며, 큰 코드에서는 계산 비용이 높습니다.</li>
          <li>코드 거리 간 일반화가 완전히 실증되지 않았으며 각 거리에 대한 재학습이 필요할 수 있습니다.</li>
          <li>신경 모듈이 순수 BP에 비해 지연을 추가하며, 이는 실시간 디코딩에서 중요할 수 있습니다.</li>
          <li>BP 편향이 질적으로 다를 수 있는 적대적 또는 비표준 잡음 모델에 대한 분석이 제한적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>기저 진리 사후 분포의 필요성을 피하여 학습 절차를 자기 지도 방식으로 만들 수 있는가?</li>
          <li>BP가 더 희소한 인수 그래프로 인해 이미 더 잘 수행되는 qLDPC 코드로 접근법이 어떻게 확장되는가?</li>
          <li>신경 보정된 신뢰가 진정한 사후 분포에 얼마나 가까워질 수 있는지에 대한 이론적 보장이 있는가?</li>
          <li>신경 모듈을 하드웨어 구현을 위한 더 단순한 보정 규칙으로 증류할 수 있는가?</li>
          <li>신뢰 매칭은 강화 학습 기반 디코더 학습 접근법과 어떻게 비교되는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>신경 신뢰 매칭은 위상 코드에서 BP 디코딩을 개선하는 원리적이고 실용적인 경로를 제공합니다. BP의 구조를 포기하거나 비싼 후처리를 덧붙이는 대신, BP의 알려진 약점 — 루프가 있는 그래프에서의 편향된 신뢰 — 을 진정한 사후 분포에 대해 학습된 경량 신경망으로 외과적으로 수정합니다. 실시간 QEC 디코더를 구축하는 그룹에게 이 접근법은 매력적인 정확도-지연 트레이드오프를 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. dynamic-quantum-circuits
  // ====================================================================
  {
    id: "dynamic-quantum-circuits",
    date: "2025-04-11",
    authors: "Shirgure, S., Kökcü, E., Mitra, A., et al.",
    venue: "Preprint 2025",
    image: "images/dynamic-quantum-circuits/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Dynamic Circuits", "Benchmarking", "Mid-Circuit"],
    en: {
      title: "Characterizing and Benchmarking Dynamic Quantum Circuits",
      summary: "Develops systematic benchmarking protocols for dynamic quantum circuits featuring mid-circuit measurements and classical feedforward, quantifying their fidelity and identifying dominant error sources on current hardware.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper fills a critical gap in the quantum benchmarking toolkit by providing <strong>dedicated protocols for characterizing dynamic quantum circuits</strong> — circuits with mid-circuit measurements and conditional operations — which behave fundamentally differently from static circuits under noise.</p>

        <h2>Research Question</h2>
        <blockquote>How can we systematically benchmark the performance of dynamic quantum circuits featuring mid-circuit measurements and classical feedforward, and what are the dominant error mechanisms that degrade their fidelity on current quantum hardware?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Dynamic quantum circuits — circuits that include mid-circuit measurements (MCMs), classical feedforward, and conditional quantum operations — are essential building blocks for quantum error correction, measurement-based quantum computing, and numerous near-term algorithms. Unlike static circuits where all measurements occur at the end, dynamic circuits interleave quantum and classical processing, introducing qualitatively new error mechanisms: measurement-induced decoherence on neighboring qubits, feedforward latency errors, and conditional gate calibration issues.</p>
        <p>Existing benchmarking protocols (randomized benchmarking, quantum volume, mirror circuits) were designed for static circuits and do not capture these dynamic-circuit-specific errors. As quantum hardware matures and QEC demonstrations rely increasingly on dynamic circuits, there is an urgent need for benchmarking tools that can isolate and quantify the errors introduced by mid-circuit operations.</p>
        <p>This paper develops such tools, applying them to state-of-the-art superconducting and trapped-ion hardware to produce actionable characterizations of dynamic circuit performance.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Dynamic circuit randomized benchmarking (DCRB):</strong> Extends standard RB by interleaving mid-circuit measurements and conditional Clifford operations, measuring the decay of state fidelity as circuit depth increases.</li>
          <li><strong>MCM crosstalk characterization:</strong> Isolates the effect of mid-circuit measurement on spectator qubits by comparing the fidelity of operations on spectator qubits with and without concurrent MCMs on neighboring qubits.</li>
          <li><strong>Feedforward fidelity tests:</strong> Measures the error introduced by the classical processing and conditional gate application pipeline, separating feedforward latency effects from gate errors.</li>
          <li><strong>Composite benchmarks:</strong> End-to-end benchmarks that combine all dynamic elements in circuits representative of QEC syndrome extraction, teleportation, and repeat-until-success protocols.</li>
        </ul>

        <figure>
          <img src="images/dynamic-quantum-circuits/thumbnail.png" alt="Dynamic quantum circuit benchmarking overview">
          <figcaption>Thumbnail: Benchmarking framework for dynamic quantum circuits.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>First systematic benchmarking suite for dynamic circuits:</strong> Provides a complete protocol set that hardware teams can adopt to characterize MCM and feedforward performance.</li>
          <li><strong>Error budget decomposition:</strong> Quantitatively separates MCM crosstalk, feedforward latency, conditional gate errors, and standard gate/decoherence errors.</li>
          <li><strong>Cross-platform comparison:</strong> Applies the same benchmarks to multiple hardware platforms, enabling fair comparison of dynamic circuit capabilities.</li>
          <li><strong>Actionable diagnostics:</strong> Identifies specific hardware improvements that would most reduce dynamic circuit errors on each platform.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Hardware platforms</td><td>Superconducting (IBM-class), trapped-ion systems</td></tr>
            <tr><td>Circuit depths</td><td>1 to 100+ dynamic layers</td></tr>
            <tr><td>Qubit counts</td><td>2 to 20+ qubits with varying MCM configurations</td></tr>
            <tr><td>MCM types</td><td>Dispersive readout (superconducting), fluorescence (trapped-ion)</td></tr>
            <tr><td>Feedforward latency</td><td>Measured from MCM completion to conditional gate start</td></tr>
            <tr><td>Statistical shots</td><td>10<sup>3</sup>-10<sup>4</sup> per circuit configuration</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Error Source</th><th>Typical Magnitude</th><th>Platform Dependence</th></tr></thead>
          <tbody>
            <tr><td>MCM crosstalk</td><td>0.1%-1% per MCM event on neighbors</td><td>Higher on superconducting (shared readout lines)</td></tr>
            <tr><td>Feedforward latency</td><td>Adds decoherence proportional to classical processing time</td><td>Higher on superconducting (longer feedforward path)</td></tr>
            <tr><td>Conditional gate error</td><td>Comparable to standard gate errors when calibrated</td><td>Similar across platforms</td></tr>
            <tr><td>Measurement-induced dephasing</td><td>Significant for nearest-neighbor qubits</td><td>Geometry-dependent</td></tr>
          </tbody>
        </table>
        <p>The key finding is that MCM crosstalk and feedforward latency — not the conditional gates themselves — are the dominant error sources in current dynamic circuits. This has direct implications for QEC implementation, where syndrome extraction relies heavily on MCMs.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Fills an important gap — no prior systematic benchmarking framework for dynamic circuits existed.</li>
          <li>Practical and adoptable — protocols are designed for ease of implementation on existing hardware.</li>
          <li>Cross-platform applicability provides hardware-agnostic insights.</li>
          <li>Error budget decomposition gives hardware teams clear improvement targets.</li>
          <li>Directly relevant to QEC, where dynamic circuits are the operational primitive.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Benchmarks focus on Clifford-based dynamic circuits; non-Clifford conditional operations are not covered.</li>
          <li>Limited qubit counts in the experimental demonstrations; scalability to larger systems needs verification.</li>
          <li>Feedforward latency analysis assumes a specific classical processing model that may not match all hardware.</li>
          <li>Does not propose error mitigation strategies — purely diagnostic.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can dynamic circuit benchmarks be integrated into routine calibration workflows alongside standard RB?</li>
          <li>How should QEC overhead estimates be revised given the measured MCM crosstalk rates?</li>
          <li>Is there a fundamental trade-off between MCM speed and crosstalk that limits dynamic circuit performance?</li>
          <li>Can feedforward latency be hidden through circuit scheduling, or does it fundamentally limit QEC cycle time?</li>
          <li>How do these benchmarks translate to photonic or neutral-atom platforms with different MCM mechanisms?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>As quantum computing moves from static circuits toward QEC and measurement-based protocols, understanding dynamic circuit errors becomes essential. This paper provides the first comprehensive toolkit for that purpose. The finding that MCM crosstalk and feedforward latency dominate the error budget — rather than the conditional gates — redirects engineering effort toward readout isolation and classical processing speed, which are the true bottlenecks for scalable QEC.</p>
      `
    },
    ko: {
      title: "동적 양자 회로의 특성화 및 벤치마킹",
      summary: "중간 회로 측정과 고전적 피드포워드를 포함하는 동적 양자 회로를 위한 체계적 벤치마킹 프로토콜을 개발하여 현재 하드웨어에서의 충실도를 정량화하고 지배적 오류 원인을 식별합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>동적 양자 회로 — 중간 회로 측정과 조건부 연산을 포함하는 회로 — 를 특성화하기 위한 전용 프로토콜</strong>을 제공하여 양자 벤치마킹 도구의 중요한 공백을 채웁니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>중간 회로 측정과 고전적 피드포워드를 포함하는 동적 양자 회로의 성능을 체계적으로 벤치마킹할 수 있으며, 현재 양자 하드웨어에서 충실도를 저하시키는 지배적 오류 메커니즘은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>동적 양자 회로 — 중간 회로 측정(MCM), 고전적 피드포워드, 조건부 양자 연산을 포함하는 회로 — 는 양자 오류 정정, 측정 기반 양자 컴퓨팅, 다수의 근단기 알고리즘을 위한 필수적 구성 요소입니다. 모든 측정이 끝에서 발생하는 정적 회로와 달리, 동적 회로는 양자와 고전 처리를 교차시켜 질적으로 새로운 오류 메커니즘을 도입합니다: 인접 큐비트에 대한 측정 유도 결맞음 깨짐, 피드포워드 지연 오류, 조건부 게이트 교정 문제 등입니다.</p>
        <p>기존 벤치마킹 프로토콜(무작위 벤치마킹, 양자 볼륨, 미러 회로)은 정적 회로용으로 설계되었으며 이러한 동적 회로 특유의 오류를 포착하지 못합니다. 양자 하드웨어가 성숙하고 QEC 시연이 동적 회로에 점점 더 의존함에 따라, 중간 회로 연산이 도입하는 오류를 분리하고 정량화할 수 있는 벤치마킹 도구가 시급합니다.</p>
        <p>이 논문은 이러한 도구를 개발하고 최신 초전도 및 이온 트랩 하드웨어에 적용하여 동적 회로 성능의 실행 가능한 특성화를 생성합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>동적 회로 무작위 벤치마킹(DCRB):</strong> 표준 RB를 중간 회로 측정과 조건부 클리포드 연산의 삽입으로 확장하여, 회로 깊이 증가에 따른 상태 충실도 감소를 측정합니다.</li>
          <li><strong>MCM 크로스토크 특성화:</strong> 인접 큐비트에서 동시 MCM 유무에 따른 관찰자 큐비트 연산의 충실도를 비교하여 중간 회로 측정이 관찰자 큐비트에 미치는 영향을 분리합니다.</li>
          <li><strong>피드포워드 충실도 테스트:</strong> 고전 처리 및 조건부 게이트 적용 파이프라인이 도입하는 오류를 측정하여 피드포워드 지연 효과를 게이트 오류에서 분리합니다.</li>
          <li><strong>복합 벤치마크:</strong> QEC 신드롬 추출, 텔레포테이션, 성공할 때까지 반복 프로토콜을 대표하는 회로에서 모든 동적 요소를 결합하는 종단간 벤치마크입니다.</li>
        </ul>

        <figure>
          <img src="images/dynamic-quantum-circuits/thumbnail.png" alt="동적 양자 회로 벤치마킹 개요">
          <figcaption>Thumbnail: 동적 양자 회로를 위한 벤치마킹 프레임워크.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>동적 회로를 위한 최초의 체계적 벤치마킹 모음:</strong> 하드웨어 팀이 MCM과 피드포워드 성능을 특성화하기 위해 채택할 수 있는 완전한 프로토콜 세트를 제공합니다.</li>
          <li><strong>오류 예산 분해:</strong> MCM 크로스토크, 피드포워드 지연, 조건부 게이트 오류, 표준 게이트/결맞음 깨짐 오류를 정량적으로 분리합니다.</li>
          <li><strong>교차 플랫폼 비교:</strong> 동일한 벤치마크를 여러 하드웨어 플랫폼에 적용하여 공정한 동적 회로 능력 비교를 가능하게 합니다.</li>
          <li><strong>실행 가능한 진단:</strong> 각 플랫폼에서 동적 회로 오류를 가장 줄일 수 있는 특정 하드웨어 개선 사항을 식별합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>하드웨어 플랫폼</td><td>초전도(IBM급), 이온 트랩 시스템</td></tr>
            <tr><td>회로 깊이</td><td>1~100+ 동적 레이어</td></tr>
            <tr><td>큐비트 수</td><td>다양한 MCM 구성의 2~20+ 큐비트</td></tr>
            <tr><td>MCM 유형</td><td>분산 판독(초전도), 형광(이온 트랩)</td></tr>
            <tr><td>피드포워드 지연</td><td>MCM 완료에서 조건부 게이트 시작까지 측정</td></tr>
            <tr><td>통계적 샷</td><td>회로 구성당 10<sup>3</sup>-10<sup>4</sup></td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>오류 원인</th><th>일반적 크기</th><th>플랫폼 의존성</th></tr></thead>
          <tbody>
            <tr><td>MCM 크로스토크</td><td>인접에서 MCM 이벤트당 0.1%-1%</td><td>초전도에서 더 높음(공유 판독 라인)</td></tr>
            <tr><td>피드포워드 지연</td><td>고전 처리 시간에 비례하는 결맞음 깨짐 추가</td><td>초전도에서 더 높음(더 긴 피드포워드 경로)</td></tr>
            <tr><td>조건부 게이트 오류</td><td>교정 시 표준 게이트 오류와 비교 가능</td><td>플랫폼 간 유사</td></tr>
            <tr><td>측정 유도 디페이징</td><td>최근접 이웃 큐비트에서 유의미</td><td>기하학 의존적</td></tr>
          </tbody>
        </table>
        <p>핵심 발견은 현재 동적 회로에서 조건부 게이트 자체가 아닌 MCM 크로스토크와 피드포워드 지연이 지배적 오류 원인이라는 것입니다. 이는 신드롬 추출이 MCM에 크게 의존하는 QEC 구현에 직접적 함의를 가집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>중요한 공백을 채웁니다 — 동적 회로를 위한 이전의 체계적 벤치마킹 프레임워크가 없었습니다.</li>
          <li>실용적이고 채택 가능 — 프로토콜이 기존 하드웨어에서의 구현 용이성을 위해 설계되었습니다.</li>
          <li>교차 플랫폼 적용성이 하드웨어에 무관한 통찰을 제공합니다.</li>
          <li>오류 예산 분해가 하드웨어 팀에게 명확한 개선 목표를 제공합니다.</li>
          <li>동적 회로가 운영의 기본 단위인 QEC에 직접 관련됩니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>벤치마크가 클리포드 기반 동적 회로에 초점을 맞추며, 비클리포드 조건부 연산은 다루지 않습니다.</li>
          <li>실험 시연에서 제한된 큐비트 수; 더 큰 시스템으로의 확장성 검증이 필요합니다.</li>
          <li>피드포워드 지연 분석이 모든 하드웨어와 일치하지 않을 수 있는 특정 고전 처리 모델을 가정합니다.</li>
          <li>오류 완화 전략을 제안하지 않으며 순수하게 진단적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>동적 회로 벤치마크를 표준 RB와 함께 일상적 교정 워크플로에 통합할 수 있는가?</li>
          <li>측정된 MCM 크로스토크 비율을 감안하여 QEC 오버헤드 추정을 어떻게 수정해야 하는가?</li>
          <li>동적 회로 성능을 제한하는 MCM 속도와 크로스토크 사이의 근본적 트레이드오프가 있는가?</li>
          <li>피드포워드 지연을 회로 스케줄링으로 숨길 수 있는가, 아니면 QEC 사이클 시간을 근본적으로 제한하는가?</li>
          <li>이러한 벤치마크가 다른 MCM 메커니즘을 가진 광자 또는 중성 원자 플랫폼으로 어떻게 변환되는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>양자 컴퓨팅이 정적 회로에서 QEC 및 측정 기반 프로토콜로 이동함에 따라 동적 회로 오류의 이해가 필수적이 됩니다. 이 논문은 그 목적을 위한 최초의 포괄적 도구 키트를 제공합니다. MCM 크로스토크와 피드포워드 지연이 조건부 게이트가 아닌 오류 예산을 지배한다는 발견은 엔지니어링 노력을 판독 격리와 고전 처리 속도로 방향을 전환시키며, 이것이 확장 가능한 QEC의 진정한 병목입니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. quantum-ddpm
  // ====================================================================
  {
    id: "quantum-ddpm",
    date: "2025-04-11",
    authors: "Zhang, B., Xu, P., Chen, X., Zhuang, Q.",
    venue: "PRL 2024",
    image: "images/quantum-ddpm/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Quantum ML", "DDPM", "Generative"],
    en: {
      title: "Generative Quantum Machine Learning via Denoising Diffusion Probabilistic Models",
      summary: "Introduces quantum denoising diffusion probabilistic models (QDDPM) that adapt the classical DDPM framework to quantum circuits, enabling generative modeling of both classical data distributions and quantum states.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper establishes the <strong>quantum analog of denoising diffusion probabilistic models</strong>, showing that parameterized quantum circuits can learn to reverse a quantum noise process, enabling a new paradigm for generative quantum machine learning with provable training guarantees.</p>

        <h2>Research Question</h2>
        <blockquote>Can the denoising diffusion probabilistic model framework be adapted to parameterized quantum circuits, and if so, does it offer advantages in generating quantum states or classical distributions compared to existing quantum generative models?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Classical denoising diffusion probabilistic models (DDPMs) have revolutionized generative modeling, achieving state-of-the-art results in image generation, molecular design, and beyond. The core idea is elegant: define a forward process that gradually corrupts data into noise, then train a neural network to reverse each corruption step. The training objective decomposes into tractable per-step denoising losses.</p>
        <p>Quantum generative models — including quantum Boltzmann machines, quantum GANs, and quantum circuit Born machines — have been explored but face challenges: training instability, barren plateaus, and mode collapse. The DDPM framework offers a potential solution because its step-wise training naturally provides local loss landscapes, potentially avoiding the global optimization difficulties that plague other quantum generative approaches.</p>
        <p>This paper formalizes the quantum DDPM (QDDPM) by defining a forward quantum noise channel that progressively depolarizes a target quantum state, and a reverse process implemented by parameterized quantum circuits that learn to undo each depolarization step.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Forward process:</strong> A sequence of depolarizing channels progressively corrupts the target state ρ₀ toward the maximally mixed state. Each step applies a fixed amount of depolarizing noise, parametrized by a noise schedule β₁, ..., βT.</li>
          <li><strong>Reverse process:</strong> For each time step t, a parameterized quantum circuit θ_t learns to approximately invert the corresponding forward step. The circuit takes the noisy state ρ_t and outputs an estimate of ρ_{t-1}.</li>
          <li><strong>Training objective:</strong> Each reverse step is trained to minimize the quantum relative entropy (or fidelity-based loss) between the denoised output and the true less-noisy state. This per-step objective avoids the global optimization over the entire generation chain.</li>
          <li><strong>Generation:</strong> Starting from the maximally mixed state, the trained reverse circuits are applied sequentially to produce a sample from the learned distribution/state.</li>
        </ul>

        <figure>
          <img src="images/quantum-ddpm/thumbnail.png" alt="Quantum DDPM forward and reverse processes">
          <figcaption>Thumbnail: QDDPM forward (noise) and reverse (denoising) process overview.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Quantum DDPM formalization:</strong> First rigorous formulation of the diffusion-denoising paradigm in the quantum setting, with well-defined forward and reverse processes.</li>
          <li><strong>Per-step training guarantee:</strong> Proves that the per-step loss landscape is well-behaved (no barren plateaus for shallow circuits per step), a critical advantage over end-to-end quantum generative training.</li>
          <li><strong>State and distribution generation:</strong> Demonstrates generation of both classical probability distributions (measured in computational basis) and genuine quantum states (multi-qubit entangled states).</li>
          <li><strong>Convergence analysis:</strong> Provides theoretical bounds on the total variation / trace distance between generated and target distributions as a function of per-step denoising error and number of steps.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Qubits</td><td>4 to 8 qubits in numerical experiments</td></tr>
            <tr><td>Diffusion steps T</td><td>10 to 50 steps</td></tr>
            <tr><td>Noise schedule</td><td>Linear and cosine schedules tested</td></tr>
            <tr><td>Circuit ansatz</td><td>Hardware-efficient variational ansatz per step</td></tr>
            <tr><td>Optimizer</td><td>Parameter-shift rule with Adam</td></tr>
            <tr><td>Training data</td><td>Copies of target state (quantum) or samples (classical)</td></tr>
            <tr><td>Loss function</td><td>Quantum fidelity-based loss or quantum relative entropy</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Task</th><th>Result</th><th>Comparison</th></tr></thead>
          <tbody>
            <tr><td>Classical distribution (bars-and-stripes)</td><td>High fidelity generation</td><td>Competitive with QCBM, more stable training</td></tr>
            <tr><td>GHZ state generation</td><td>Near-unit fidelity with target state</td><td>Outperforms quantum GAN in stability</td></tr>
            <tr><td>Random quantum state</td><td>Good fidelity up to 6 qubits</td><td>First demonstration of diffusion-based quantum state generation</td></tr>
            <tr><td>Training stability</td><td>No mode collapse observed</td><td>Significant advantage over quantum GANs</td></tr>
          </tbody>
        </table>
        <p>The key practical advantage is training stability: unlike quantum GANs which suffer from oscillatory training dynamics, QDDPM converges smoothly thanks to the per-step loss decomposition. Published in PRL, the theoretical framework established here has spawned follow-up work on mixed-state extensions and barren plateau analysis.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Elegant and principled extension of a highly successful classical framework to the quantum domain.</li>
          <li>Per-step training avoids the barren plateau problem that plagues end-to-end quantum generative models.</li>
          <li>Theoretical convergence guarantees ground the empirical results.</li>
          <li>Applicable to both classical data and quantum state generation — broad utility.</li>
          <li>Training is significantly more stable than quantum GANs and related adversarial approaches.</li>
          <li>Published in PRL, indicating strong theoretical novelty recognized by the physics community.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Demonstrated only on small qubit counts (up to 8); scalability remains an open question.</li>
          <li>Forward process uses depolarizing noise — other quantum noise channels may be more natural for certain applications.</li>
          <li>Generation requires sequential application of T circuits, leading to deep total circuit depth.</li>
          <li>Comparison to classical DDPMs for the same tasks is not provided — the quantum advantage claim is implicit.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the forward process be generalized to physically motivated noise channels (amplitude damping, dephasing) while preserving training tractability?</li>
          <li>How does the total circuit depth scale with target state complexity, and can step-skipping (DDIM-style) be adapted to the quantum setting?</li>
          <li>Is there a provable quantum advantage for QDDPM over classical DDPMs for any specific generative task?</li>
          <li>How does the approach interact with quantum error mitigation — can noisy hardware be used for generation with post-processing?</li>
          <li>Can QDDPM be combined with quantum error correction for fault-tolerant generative modeling?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This PRL paper establishes the theoretical and practical foundations of quantum diffusion models. The per-step training decomposition elegantly sidesteps the barren plateau problem, and the framework is flexible enough to handle both classical and quantum generative tasks. While scalability questions remain, this work opens a rich research direction at the intersection of diffusion models and quantum computing, as evidenced by the rapid follow-up work it has inspired.</p>
      `
    },
    ko: {
      title: "노이즈 제거 확산 확률 모델을 통한 생성적 양자 머신러닝",
      summary: "고전 DDPM 프레임워크를 양자 회로에 적응시킨 양자 노이즈 제거 확산 확률 모델(QDDPM)을 도입하여 고전 데이터 분포와 양자 상태 모두의 생성적 모델링을 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>노이즈 제거 확산 확률 모델의 양자 아날로그</strong>를 확립하여, 매개변수화된 양자 회로가 양자 잡음 과정을 역전시키는 것을 학습할 수 있음을 보여주며, 증명 가능한 학습 보장이 있는 생성적 양자 머신러닝의 새로운 패러다임을 가능하게 합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>노이즈 제거 확산 확률 모델 프레임워크를 매개변수화된 양자 회로에 적응시킬 수 있으며, 그렇다면 기존 양자 생성 모델과 비교하여 양자 상태 또는 고전 분포 생성에 이점을 제공하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>고전적 노이즈 제거 확산 확률 모델(DDPM)은 이미지 생성, 분자 설계 등에서 최첨단 결과를 달성하며 생성적 모델링을 혁신했습니다. 핵심 아이디어는 우아합니다: 데이터를 점진적으로 잡음으로 오염시키는 순방향 과정을 정의한 다음, 각 오염 단계를 역전시키도록 신경망을 학습시킵니다.</p>
        <p>양자 볼츠만 머신, 양자 GAN, 양자 회로 본 머신 등의 양자 생성 모델이 탐구되었지만 학습 불안정, 불모 고원, 모드 붕괴 등의 문제에 직면합니다. DDPM 프레임워크는 단계별 학습이 자연스럽게 국소적 손실 경관을 제공하여 다른 양자 생성 접근법을 괴롭히는 전역 최적화 어려움을 잠재적으로 피할 수 있어 해결책을 제공합니다.</p>
        <p>이 논문은 대상 양자 상태를 점진적으로 탈분극하는 순방향 양자 잡음 채널과 각 탈분극 단계를 되돌리도록 학습하는 매개변수화된 양자 회로로 구현된 역방향 과정을 정의하여 양자 DDPM(QDDPM)을 공식화합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>순방향 과정:</strong> 탈분극 채널의 시퀀스가 대상 상태 ρ₀를 최대 혼합 상태를 향해 점진적으로 오염시킵니다.</li>
          <li><strong>역방향 과정:</strong> 각 시간 단계 t에 대해 매개변수화된 양자 회로 θ_t가 해당 순방향 단계를 근사적으로 역전시키도록 학습합니다.</li>
          <li><strong>학습 목표:</strong> 각 역방향 단계는 노이즈 제거된 출력과 진정한 덜 잡음 있는 상태 사이의 양자 상대 엔트로피를 최소화하도록 학습됩니다.</li>
          <li><strong>생성:</strong> 최대 혼합 상태에서 시작하여 학습된 역방향 회로를 순차적으로 적용하여 학습된 분포/상태에서 샘플을 생성합니다.</li>
        </ul>

        <figure>
          <img src="images/quantum-ddpm/thumbnail.png" alt="양자 DDPM 순방향 및 역방향 과정">
          <figcaption>Thumbnail: QDDPM 순방향(잡음) 및 역방향(노이즈 제거) 과정 개요.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>양자 DDPM 공식화:</strong> 양자 설정에서 확산-노이즈 제거 패러다임의 최초 엄밀한 공식화로, 잘 정의된 순방향 및 역방향 과정을 제공합니다.</li>
          <li><strong>단계별 학습 보장:</strong> 단계별 손실 경관이 잘 동작함을 증명하며(얕은 회로에서 불모 고원 없음), 종단간 양자 생성 학습에 비해 중요한 이점입니다.</li>
          <li><strong>상태 및 분포 생성:</strong> 고전적 확률 분포와 진정한 양자 상태(다중 큐비트 얽힌 상태) 모두의 생성을 시연합니다.</li>
          <li><strong>수렴 분석:</strong> 단계별 노이즈 제거 오류와 단계 수의 함수로서 생성된 분포와 대상 분포 사이의 전변동/트레이스 거리에 대한 이론적 한계를 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>큐비트</td><td>수치 실험에서 4~8 큐비트</td></tr>
            <tr><td>확산 단계 T</td><td>10~50 단계</td></tr>
            <tr><td>잡음 스케줄</td><td>선형 및 코사인 스케줄 테스트</td></tr>
            <tr><td>회로 안자츠</td><td>단계별 하드웨어 효율적 변분 안자츠</td></tr>
            <tr><td>옵티마이저</td><td>Adam과 함께 매개변수 시프트 규칙</td></tr>
            <tr><td>학습 데이터</td><td>대상 상태의 복사본(양자) 또는 샘플(고전)</td></tr>
            <tr><td>손실 함수</td><td>양자 충실도 기반 손실 또는 양자 상대 엔트로피</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>과제</th><th>결과</th><th>비교</th></tr></thead>
          <tbody>
            <tr><td>고전 분포(bars-and-stripes)</td><td>높은 충실도 생성</td><td>QCBM과 경쟁적, 더 안정적 학습</td></tr>
            <tr><td>GHZ 상태 생성</td><td>대상 상태와 거의 단위 충실도</td><td>안정성에서 양자 GAN 능가</td></tr>
            <tr><td>랜덤 양자 상태</td><td>6 큐비트까지 좋은 충실도</td><td>확산 기반 양자 상태 생성의 첫 시연</td></tr>
            <tr><td>학습 안정성</td><td>모드 붕괴 관찰되지 않음</td><td>양자 GAN 대비 상당한 이점</td></tr>
          </tbody>
        </table>
        <p>핵심 실용적 이점은 학습 안정성입니다: 진동적 학습 동역학을 겪는 양자 GAN과 달리, QDDPM은 단계별 손실 분해 덕분에 매끄럽게 수렴합니다. PRL에 발표된 이 이론적 프레임워크는 혼합 상태 확장과 불모 고원 분석에 대한 후속 연구를 촉발했습니다.</p>

        <h2>강점</h2>
        <ul>
          <li>매우 성공적인 고전 프레임워크를 양자 도메인으로 우아하고 원리적으로 확장합니다.</li>
          <li>단계별 학습이 종단간 양자 생성 모델을 괴롭히는 불모 고원 문제를 피합니다.</li>
          <li>이론적 수렴 보장이 경험적 결과를 근거합니다.</li>
          <li>고전 데이터와 양자 상태 생성 모두에 적용 가능 — 넓은 유용성.</li>
          <li>학습이 양자 GAN 및 관련 적대적 접근법보다 상당히 안정적입니다.</li>
          <li>PRL에 발표되어 물리학 커뮤니티에서 인정받은 강한 이론적 참신성을 나타냅니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>작은 큐비트 수(최대 8)에서만 시연되며 확장성은 열린 질문으로 남습니다.</li>
          <li>순방향 과정이 탈분극 잡음을 사용하며, 다른 양자 잡음 채널이 특정 응용에 더 자연스러울 수 있습니다.</li>
          <li>생성에 T개 회로의 순차 적용이 필요하여 총 회로 깊이가 깊어집니다.</li>
          <li>동일한 과제에 대한 고전 DDPM과의 비교가 제공되지 않으며, 양자 이점 주장이 암묵적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>순방향 과정을 물리적으로 동기 부여된 잡음 채널(진폭 감쇄, 디페이징)로 일반화하면서 학습 다루기 쉬움을 유지할 수 있는가?</li>
          <li>총 회로 깊이가 대상 상태 복잡도에 따라 어떻게 확장되며, 단계 건너뛰기(DDIM 스타일)를 양자 설정에 적응시킬 수 있는가?</li>
          <li>특정 생성 과제에 대해 고전 DDPM에 대한 QDDPM의 증명 가능한 양자 이점이 있는가?</li>
          <li>접근법이 양자 오류 완화와 어떻게 상호작용하며, 잡음이 있는 하드웨어를 후처리와 함께 생성에 사용할 수 있는가?</li>
          <li>QDDPM을 결함 허용 생성 모델링을 위한 양자 오류 정정과 결합할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 PRL 논문은 양자 확산 모델의 이론적 및 실용적 기초를 확립합니다. 단계별 학습 분해가 불모 고원 문제를 우아하게 우회하며, 프레임워크는 고전과 양자 생성 과제 모두를 다룰 수 있을 만큼 유연합니다. 확장성 질문이 남아 있지만, 이 연구는 확산 모델과 양자 컴퓨팅의 교차점에서 풍부한 연구 방향을 열었으며, 이는 촉발된 빠른 후속 연구로 입증됩니다.</p>
      `
    }
  },

  // ====================================================================
  // 7. mixed-state-qddpm
  // ====================================================================
  {
    id: "mixed-state-qddpm",
    date: "2025-04-11",
    authors: "Kwun, G., Zhang, B., Zhuang, Q.",
    venue: "Preprint 2025",
    image: "images/mixed-state-qddpm/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Quantum ML", "Mixed State", "DDPM"],
    en: {
      title: "Mixed-State Quantum Denoising Diffusion Probabilistic Model",
      summary: "Extends quantum DDPM to handle mixed quantum states by designing forward and reverse diffusion processes that operate on density matrices, enabling generative modeling of noisy and thermal quantum states.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper generalizes the quantum DDPM framework from pure states to <strong>mixed states</strong>, enabling diffusion-based generation of density matrices — a necessary step for practical quantum generative modeling where noise and decoherence produce mixed-state outputs.</p>

        <h2>Research Question</h2>
        <blockquote>Can the quantum DDPM framework be extended to generate mixed quantum states (density matrices) rather than only pure states, and what modifications to the forward/reverse processes and training objectives are required?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The original quantum DDPM (Zhang et al., PRL 2024) demonstrated that parameterized quantum circuits can learn to reverse depolarizing noise applied to pure quantum states. However, many physically relevant quantum states are mixed — thermal states, states produced by noisy quantum devices, and reduced density matrices of entangled systems. A generative model limited to pure states cannot capture this important class.</p>
        <p>Extending DDPM to mixed states introduces fundamental challenges: (1) the forward noise process must be redefined to handle general density matrices, (2) the reverse process must learn to produce states with the correct spectrum (eigenvalues) in addition to the correct eigenbasis, and (3) the training objective must be reformulated for density matrix fidelity rather than state vector fidelity.</p>
        <p>This paper addresses all three challenges, providing a complete mixed-state QDDPM framework with both theoretical analysis and numerical demonstrations.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Forward process:</strong> A generalized depolarizing channel that interpolates between the target mixed state and the maximally mixed state, with a scheduled mixing parameter that controls the noise level at each step.</li>
          <li><strong>Reverse process:</strong> Parameterized quantum channels (not just unitary circuits) that learn to partially undo the depolarization at each step. The channels are implemented as unitary operations on the system plus an ancilla, followed by ancilla tracing.</li>
          <li><strong>Training objective:</strong> Minimizes a trace-distance or quantum fidelity-based loss between the output mixed state and the target less-noisy mixed state at each step. The loss accounts for both the eigenvalue spectrum and eigenbasis of the density matrix.</li>
          <li><strong>Generation:</strong> Starting from the maximally mixed state, the reverse channels are applied sequentially to produce the target mixed state.</li>
        </ul>

        <figure>
          <img src="images/mixed-state-qddpm/thumbnail.png" alt="Mixed-state QDDPM architecture">
          <figcaption>Thumbnail: Mixed-state quantum DDPM forward and reverse process.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Mixed-state generalization:</strong> First extension of QDDPM to arbitrary mixed states, handling the full complexity of density matrix generation.</li>
          <li><strong>Channel-based reverse process:</strong> Uses quantum channels (CPTP maps) rather than unitaries for the reverse process, correctly accounting for the non-unitary nature of mixed-state transformations.</li>
          <li><strong>Spectral learning:</strong> The training procedure learns both the eigenvalue structure and eigenbasis of the target mixed state, a challenge not present in pure-state QDDPM.</li>
          <li><strong>Convergence bounds:</strong> Provides theoretical guarantees on the trace distance between generated and target mixed states.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Qubits</td><td>2 to 6 system qubits + ancilla qubits</td></tr>
            <tr><td>Diffusion steps</td><td>10 to 30</td></tr>
            <tr><td>Reverse channel</td><td>Unitary on system+ancilla, then partial trace</td></tr>
            <tr><td>Target states</td><td>Thermal states, Werner states, randomly generated mixed states</td></tr>
            <tr><td>Loss function</td><td>Trace distance or quantum fidelity between density matrices</td></tr>
            <tr><td>Optimizer</td><td>Gradient-based with parameter-shift rule</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Task</th><th>Result</th><th>Significance</th></tr></thead>
          <tbody>
            <tr><td>Thermal state generation</td><td>High fidelity for various temperatures</td><td>Practically relevant for quantum simulation</td></tr>
            <tr><td>Werner state generation</td><td>Correct entanglement properties reproduced</td><td>Mixed entangled states are faithfully generated</td></tr>
            <tr><td>Random mixed states</td><td>Fidelity &gt; 0.95 for 4-qubit systems</td><td>General-purpose mixed-state generation works</td></tr>
            <tr><td>Pure-state limit</td><td>Recovers original QDDPM performance</td><td>Mixed-state extension is a proper generalization</td></tr>
          </tbody>
        </table>
        <p>The key finding is that channel-based reverse processes are essential — attempting to use unitary-only reverse processes for mixed-state generation fails to capture the correct eigenvalue spectrum.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a genuine limitation of the original QDDPM — mixed states are physically ubiquitous.</li>
          <li>Clean theoretical extension with proper convergence guarantees.</li>
          <li>Channel-based reverse process is a conceptually important insight, not just an engineering detail.</li>
          <li>Recovers the pure-state QDDPM as a special case, confirming consistency.</li>
          <li>Demonstrated on physically meaningful target states (thermal, Werner).</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Ancilla overhead increases the total qubit count, potentially limiting near-term applicability.</li>
          <li>Small system sizes (up to 6 qubits) leave scalability uncertain.</li>
          <li>Training cost increases compared to pure-state QDDPM due to channel parameterization.</li>
          <li>Comparison to other mixed-state generation methods (e.g., quantum Boltzmann machines) is limited.</li>
          <li>No experimental demonstration on quantum hardware.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the ancilla overhead be reduced through approximate channel representations?</li>
          <li>How does the method compare to variational quantum thermalization for generating thermal states?</li>
          <li>Is there a classical hardness result for the mixed states that QDDPM can generate efficiently?</li>
          <li>Can the channel-based reverse process be implemented on noisy hardware, or does noise-on-noise create compounding errors?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is a natural and necessary extension of the QDDPM framework to mixed states. The channel-based reverse process is the key conceptual contribution — it recognizes that generating mixed states requires non-unitary operations, which unitary-only circuits cannot provide. For the quantum generative modeling community, this work broadens the applicability of diffusion-based approaches to the physically relevant regime of mixed quantum states.</p>
      `
    },
    ko: {
      title: "혼합 상태 양자 노이즈 제거 확산 확률 모델",
      summary: "밀도 행렬에서 작동하는 순방향 및 역방향 확산 과정을 설계하여 양자 DDPM을 혼합 양자 상태로 확장하고, 잡음이 있는 열적 양자 상태의 생성적 모델링을 가능하게 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 양자 DDPM 프레임워크를 순수 상태에서 <strong>혼합 상태</strong>로 일반화하여 밀도 행렬의 확산 기반 생성을 가능하게 합니다 — 잡음과 결맞음 깨짐이 혼합 상태 출력을 생성하는 실용적 양자 생성 모델링을 위한 필수적 단계입니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>양자 DDPM 프레임워크를 순수 상태뿐 아니라 혼합 양자 상태(밀도 행렬)를 생성하도록 확장할 수 있으며, 순방향/역방향 과정과 학습 목표에 어떤 수정이 필요한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>원래의 양자 DDPM(Zhang et al., PRL 2024)은 매개변수화된 양자 회로가 순수 양자 상태에 적용된 탈분극 잡음을 역전시키는 것을 학습할 수 있음을 보여주었습니다. 그러나 물리적으로 관련된 많은 양자 상태는 혼합 상태입니다 — 열적 상태, 잡음이 있는 양자 장치가 생산하는 상태, 얽힌 시스템의 축약된 밀도 행렬 등. 순수 상태로 제한된 생성 모델은 이 중요한 클래스를 포착할 수 없습니다.</p>
        <p>DDPM을 혼합 상태로 확장하면 근본적 도전이 발생합니다: (1) 순방향 잡음 과정을 일반 밀도 행렬을 다루도록 재정의해야 하며, (2) 역방향 과정이 올바른 고유기저뿐 아니라 올바른 스펙트럼(고유값)을 가진 상태를 생성하도록 학습해야 하며, (3) 학습 목표를 상태 벡터 충실도가 아닌 밀도 행렬 충실도로 재공식화해야 합니다.</p>
        <p>이 논문은 세 가지 도전을 모두 해결하여 이론적 분석과 수치 시연을 갖춘 완전한 혼합 상태 QDDPM 프레임워크를 제공합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>순방향 과정:</strong> 대상 혼합 상태와 최대 혼합 상태 사이를 보간하는 일반화된 탈분극 채널로, 스케줄된 혼합 매개변수가 각 단계의 잡음 수준을 제어합니다.</li>
          <li><strong>역방향 과정:</strong> 각 단계에서 탈분극을 부분적으로 되돌리도록 학습하는 매개변수화된 양자 채널(단순 유니터리 회로가 아님). 채널은 시스템+보조에 대한 유니터리 연산과 보조 트레이싱으로 구현됩니다.</li>
          <li><strong>학습 목표:</strong> 각 단계에서 출력 혼합 상태와 대상 덜 잡음 있는 혼합 상태 사이의 트레이스 거리 또는 양자 충실도 기반 손실을 최소화합니다.</li>
          <li><strong>생성:</strong> 최대 혼합 상태에서 시작하여 역방향 채널을 순차적으로 적용하여 대상 혼합 상태를 생성합니다.</li>
        </ul>

        <figure>
          <img src="images/mixed-state-qddpm/thumbnail.png" alt="혼합 상태 QDDPM 구조">
          <figcaption>Thumbnail: 혼합 상태 양자 DDPM 순방향 및 역방향 과정.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>혼합 상태 일반화:</strong> 밀도 행렬 생성의 전체 복잡성을 다루는 QDDPM의 임의 혼합 상태로의 최초 확장입니다.</li>
          <li><strong>채널 기반 역방향 과정:</strong> 혼합 상태 변환의 비유니터리 특성을 올바르게 고려하여 유니터리가 아닌 양자 채널(CPTP 맵)을 역방향 과정에 사용합니다.</li>
          <li><strong>스펙트럼 학습:</strong> 학습 절차가 대상 혼합 상태의 고유값 구조와 고유기저 모두를 학습하며, 이는 순수 상태 QDDPM에는 없는 도전입니다.</li>
          <li><strong>수렴 한계:</strong> 생성된 혼합 상태와 대상 혼합 상태 사이의 트레이스 거리에 대한 이론적 보장을 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>큐비트</td><td>2~6 시스템 큐비트 + 보조 큐비트</td></tr>
            <tr><td>확산 단계</td><td>10~30</td></tr>
            <tr><td>역방향 채널</td><td>시스템+보조에 대한 유니터리, 이후 부분 트레이스</td></tr>
            <tr><td>대상 상태</td><td>열적 상태, 베르너 상태, 무작위 생성 혼합 상태</td></tr>
            <tr><td>손실 함수</td><td>밀도 행렬 간 트레이스 거리 또는 양자 충실도</td></tr>
            <tr><td>옵티마이저</td><td>매개변수 시프트 규칙을 사용한 그래디언트 기반</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>과제</th><th>결과</th><th>의의</th></tr></thead>
          <tbody>
            <tr><td>열적 상태 생성</td><td>다양한 온도에서 높은 충실도</td><td>양자 시뮬레이션에 실질적으로 관련</td></tr>
            <tr><td>베르너 상태 생성</td><td>올바른 얽힘 특성 재현</td><td>혼합 얽힌 상태가 충실하게 생성됨</td></tr>
            <tr><td>랜덤 혼합 상태</td><td>4큐비트 시스템에서 충실도 &gt; 0.95</td><td>범용 혼합 상태 생성이 작동함</td></tr>
            <tr><td>순수 상태 한계</td><td>원래 QDDPM 성능 복원</td><td>혼합 상태 확장이 적절한 일반화임</td></tr>
          </tbody>
        </table>
        <p>핵심 발견은 채널 기반 역방향 과정이 필수적이라는 것입니다 — 혼합 상태 생성에 유니터리만의 역방향 과정을 사용하려고 시도하면 올바른 고유값 스펙트럼을 포착하지 못합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>원래 QDDPM의 진정한 한계를 다룹니다 — 혼합 상태는 물리적으로 편재합니다.</li>
          <li>적절한 수렴 보장을 갖춘 깔끔한 이론적 확장입니다.</li>
          <li>채널 기반 역방향 과정은 단순한 엔지니어링 세부사항이 아닌 개념적으로 중요한 통찰입니다.</li>
          <li>특수한 경우로 순수 상태 QDDPM을 복원하여 일관성을 확인합니다.</li>
          <li>물리적으로 의미 있는 대상 상태(열적, 베르너)에서 시연되었습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>보조 오버헤드가 총 큐비트 수를 증가시켜 근단기 적용성을 제한할 수 있습니다.</li>
          <li>작은 시스템 크기(최대 6큐비트)로 확장성이 불확실합니다.</li>
          <li>채널 매개변수화로 인해 순수 상태 QDDPM에 비해 학습 비용이 증가합니다.</li>
          <li>다른 혼합 상태 생성 방법(예: 양자 볼츠만 머신)과의 비교가 제한적입니다.</li>
          <li>양자 하드웨어에서의 실험적 시연이 없습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>근사적 채널 표현을 통해 보조 오버헤드를 줄일 수 있는가?</li>
          <li>열적 상태 생성에서 변분 양자 열화와 이 방법이 어떻게 비교되는가?</li>
          <li>QDDPM이 효율적으로 생성할 수 있는 혼합 상태에 대한 고전적 난이도 결과가 있는가?</li>
          <li>채널 기반 역방향 과정을 잡음이 있는 하드웨어에서 구현할 수 있는가, 아니면 잡음 위의 잡음이 복합 오류를 생성하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 QDDPM 프레임워크의 혼합 상태로의 자연스럽고 필요한 확장입니다. 채널 기반 역방향 과정이 핵심 개념적 기여입니다 — 혼합 상태 생성에는 유니터리만의 회로가 제공할 수 없는 비유니터리 연산이 필요함을 인식합니다. 양자 생성 모델링 커뮤니티에게 이 연구는 확산 기반 접근법의 적용성을 물리적으로 관련된 혼합 양자 상태의 영역으로 넓힙니다.</p>
      `
    }
  },

  // ====================================================================
  // 8. barren-plateaus-qddpm
  // ====================================================================
  {
    id: "barren-plateaus-qddpm",
    date: "2025-04-11",
    authors: "Cao, H., Zhang, K., Tao, D., Su, Z.",
    venue: "Preprint 2025",
    image: "images/barren-plateaus-qddpm/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Barren Plateau", "DDPM", "Trainability"],
    en: {
      title: "Mitigating Barren Plateaus in Quantum Denoising Diffusion Probabilistic Models",
      summary: "Analyzes the barren plateau phenomenon in quantum DDPMs and proposes mitigation strategies including structured ansatz design and adaptive noise schedules to maintain trainability as system size grows.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides the first rigorous analysis of <strong>barren plateaus in quantum DDPMs</strong>, showing that while per-step training offers some protection, naive implementations can still suffer from vanishing gradients, and proposes concrete mitigation strategies.</p>

        <h2>Research Question</h2>
        <blockquote>Do quantum denoising diffusion probabilistic models suffer from barren plateaus as the number of qubits grows, and if so, what circuit design and training strategies can mitigate this problem while preserving the generative quality?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Barren plateaus — the exponential vanishing of cost function gradients with increasing qubit count — are one of the most serious obstacles for variational quantum algorithms. The original QDDPM work claimed that per-step training provides natural protection against barren plateaus, since each step involves a shallow circuit and a local denoising objective. However, this claim was based on empirical observations at small scales and lacked rigorous theoretical backing.</p>
        <p>As the quantum computing community moves toward larger-scale QDDPM implementations, understanding the precise conditions under which barren plateaus arise — and how to prevent them — becomes critical. This paper fills that gap by providing both theoretical analysis and practical mitigation strategies.</p>
        <p>The analysis reveals a nuanced picture: while the per-step structure does help, certain choices of circuit ansatz, noise schedule, and loss function can still lead to barren plateaus. The paper identifies these failure modes and proposes fixes.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Variance analysis:</strong> Computes the variance of the loss function gradient analytically for various QDDPM circuit ansatze, identifying which architectural choices lead to exponentially vanishing gradients.</li>
          <li><strong>Noise schedule analysis:</strong> Shows how the noise schedule (the rate at which the forward process adds noise) interacts with the trainability of the reverse circuits at each step.</li>
          <li><strong>Mitigation strategy 1 — Structured ansatz:</strong> Proposes using local or quasi-local circuit ansatze with limited entangling connectivity, provably avoiding barren plateaus for shallow circuits.</li>
          <li><strong>Mitigation strategy 2 — Adaptive noise schedule:</strong> Designs noise schedules that ensure each per-step denoising task is "easy enough" to avoid gradient vanishing while still achieving overall generation quality.</li>
          <li><strong>Mitigation strategy 3 — Layerwise training:</strong> Trains each reverse circuit layer-by-layer rather than all-at-once, keeping the effective optimization landscape shallow at each training phase.</li>
        </ul>

        <figure>
          <img src="images/barren-plateaus-qddpm/thumbnail.png" alt="Barren plateau analysis in QDDPM">
          <figcaption>Thumbnail: Gradient variance analysis for QDDPM with different mitigation strategies.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Rigorous barren plateau analysis for QDDPM:</strong> First theoretical characterization of when and why gradients vanish in quantum diffusion models.</li>
          <li><strong>Identification of failure modes:</strong> Shows that deep ansatze, aggressive noise schedules, and global loss functions can cause barren plateaus even in per-step training.</li>
          <li><strong>Three concrete mitigation strategies:</strong> Structured ansatz, adaptive noise schedule, and layerwise training — each with theoretical justification and empirical validation.</li>
          <li><strong>Design guidelines:</strong> Provides practical rules-of-thumb for building trainable QDDPM circuits at scale.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Qubits tested</td><td>4 to 16 for variance analysis; 4 to 10 for generation quality</td></tr>
            <tr><td>Ansatze compared</td><td>Hardware-efficient (all-to-all), brick-layer (nearest-neighbor), local ansatz</td></tr>
            <tr><td>Noise schedules</td><td>Linear, cosine, adaptive (proposed)</td></tr>
            <tr><td>Gradient estimation</td><td>Parameter-shift rule with statistical averaging over 10<sup>4</sup> samples</td></tr>
            <tr><td>Metrics</td><td>Gradient variance, generation fidelity, training convergence speed</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Configuration</th><th>Barren Plateau?</th><th>Generation Quality</th></tr></thead>
          <tbody>
            <tr><td>Deep all-to-all ansatz + linear schedule</td><td>Yes (exponential vanishing)</td><td>Fails to train at n &gt; 8</td></tr>
            <tr><td>Shallow all-to-all ansatz + linear schedule</td><td>Mild (polynomial vanishing)</td><td>Moderate quality</td></tr>
            <tr><td>Local ansatz + adaptive schedule</td><td>No (constant lower bound)</td><td>Good quality maintained</td></tr>
            <tr><td>Brick-layer + layerwise training</td><td>No</td><td>Best overall quality-trainability trade-off</td></tr>
          </tbody>
        </table>
        <p>The results confirm that the per-step structure of QDDPM provides partial barren plateau protection, but is not sufficient on its own for arbitrary circuit architectures. The combination of structured ansatz and adaptive noise schedule provides the strongest trainability guarantees without sacrificing generation quality.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses the most critical scalability question for QDDPMs with rigorous theoretical analysis.</li>
          <li>Provides actionable mitigation strategies, not just diagnosis of the problem.</li>
          <li>Analysis covers both gradient variance (theoretical) and generation quality (practical), connecting the two.</li>
          <li>Tested across multiple qubit counts, providing scaling evidence.</li>
          <li>Design guidelines are immediately useful for practitioners building QDDPM implementations.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Theoretical bounds may be loose — actual gradient behavior could be better or worse than predicted.</li>
          <li>Mitigation strategies may constrain the expressiveness of the reverse circuits, limiting generation quality for complex states.</li>
          <li>Maximum qubit count (16) is still modest — extrapolation to 50+ qubits carries uncertainty.</li>
          <li>Does not address barren plateaus arising from noise (hardware barren plateaus), only from circuit architecture.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Is there a fundamental expressiveness-trainability trade-off for QDDPM reverse circuits?</li>
          <li>Can the adaptive noise schedule be learned jointly with the reverse circuits, or must it be fixed a priori?</li>
          <li>How do these results change if the forward process uses a non-depolarizing noise channel?</li>
          <li>Can classical pre-training of circuit parameters (e.g., via tensor network simulation) provide good initial points that avoid barren plateaus?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is essential reading for anyone planning to scale QDDPMs beyond toy demonstrations. The message is nuanced: per-step training helps but is not a silver bullet against barren plateaus. The combination of structured ansatze and adaptive noise schedules provides a practical path to trainable QDDPMs at scale, and the design guidelines offered here should be adopted as standard practice.</p>
      `
    },
    ko: {
      title: "양자 노이즈 제거 확산 확률 모델에서의 불모 고원 완화",
      summary: "양자 DDPM에서의 불모 고원 현상을 분석하고 시스템 크기가 커질 때 학습 가능성을 유지하기 위한 구조화된 안자츠 설계와 적응형 잡음 스케줄 등의 완화 전략을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>양자 DDPM에서의 불모 고원</strong>에 대한 최초의 엄밀한 분석을 제공하며, 단계별 학습이 일부 보호를 제공하지만 순진한 구현은 여전히 기울기 소실을 겪을 수 있음을 보여주고 구체적 완화 전략을 제안합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>큐비트 수가 증가함에 따라 양자 노이즈 제거 확산 확률 모델이 불모 고원을 겪으며, 그렇다면 생성 품질을 유지하면서 이 문제를 완화할 수 있는 회로 설계 및 학습 전략은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>불모 고원 — 큐비트 수 증가에 따른 비용 함수 기울기의 지수적 소실 — 은 변분 양자 알고리즘의 가장 심각한 장애물 중 하나입니다. 원래 QDDPM 연구는 각 단계가 얕은 회로와 국소적 노이즈 제거 목표를 포함하므로 단계별 학습이 불모 고원에 대한 자연스러운 보호를 제공한다고 주장했습니다. 그러나 이 주장은 소규모에서의 경험적 관찰에 기반했으며 엄밀한 이론적 뒷받침이 부족했습니다.</p>
        <p>양자 컴퓨팅 커뮤니티가 더 큰 규모의 QDDPM 구현으로 나아감에 따라, 불모 고원이 발생하는 정확한 조건과 이를 방지하는 방법을 이해하는 것이 중요해집니다. 이 논문은 이론적 분석과 실용적 완화 전략을 모두 제공하여 이 간극을 메웁니다.</p>
        <p>분석은 미묘한 그림을 보여줍니다: 단계별 구조가 도움이 되지만, 회로 안자츠, 잡음 스케줄, 손실 함수의 특정 선택은 여전히 불모 고원으로 이어질 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>분산 분석:</strong> 다양한 QDDPM 회로 안자츠에 대한 손실 함수 기울기의 분산을 해석적으로 계산하여 지수적으로 소실되는 기울기를 초래하는 구조적 선택을 식별합니다.</li>
          <li><strong>잡음 스케줄 분석:</strong> 잡음 스케줄이 각 단계에서 역방향 회로의 학습 가능성과 어떻게 상호작용하는지 보여줍니다.</li>
          <li><strong>완화 전략 1 — 구조화된 안자츠:</strong> 제한된 얽힘 연결성을 가진 국소 또는 준국소 회로 안자츠를 사용하여 얕은 회로에서 불모 고원을 증명적으로 피합니다.</li>
          <li><strong>완화 전략 2 — 적응형 잡음 스케줄:</strong> 각 단계별 노이즈 제거 과제가 기울기 소실을 피할 만큼 "충분히 쉬운" 상태를 보장하면서 전체 생성 품질을 달성하는 잡음 스케줄을 설계합니다.</li>
          <li><strong>완화 전략 3 — 계층별 학습:</strong> 각 역방향 회로를 한꺼번에가 아닌 층별로 학습하여 각 학습 단계에서 효과적 최적화 경관을 얕게 유지합니다.</li>
        </ul>

        <figure>
          <img src="images/barren-plateaus-qddpm/thumbnail.png" alt="QDDPM에서의 불모 고원 분석">
          <figcaption>Thumbnail: 다양한 완화 전략에 따른 QDDPM의 기울기 분산 분석.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>QDDPM을 위한 엄밀한 불모 고원 분석:</strong> 양자 확산 모델에서 기울기가 언제 왜 소실되는지에 대한 최초의 이론적 특성화입니다.</li>
          <li><strong>실패 모드 식별:</strong> 깊은 안자츠, 공격적 잡음 스케줄, 전역 손실 함수가 단계별 학습에서도 불모 고원을 유발할 수 있음을 보여줍니다.</li>
          <li><strong>세 가지 구체적 완화 전략:</strong> 구조화된 안자츠, 적응형 잡음 스케줄, 계층별 학습 — 각각 이론적 정당화와 경험적 검증을 갖추고 있습니다.</li>
          <li><strong>설계 지침:</strong> 규모에 맞는 학습 가능한 QDDPM 회로 구축을 위한 실용적 경험 규칙을 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트된 큐비트</td><td>분산 분석에 4~16; 생성 품질에 4~10</td></tr>
            <tr><td>비교된 안자츠</td><td>하드웨어 효율적(전체 연결), 벽돌층(최근접 이웃), 국소 안자츠</td></tr>
            <tr><td>잡음 스케줄</td><td>선형, 코사인, 적응형(제안)</td></tr>
            <tr><td>기울기 추정</td><td>10<sup>4</sup> 샘플에 대한 통계적 평균으로 매개변수 시프트 규칙</td></tr>
            <tr><td>지표</td><td>기울기 분산, 생성 충실도, 학습 수렴 속도</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>구성</th><th>불모 고원?</th><th>생성 품질</th></tr></thead>
          <tbody>
            <tr><td>깊은 전체 연결 안자츠 + 선형 스케줄</td><td>예(지수적 소실)</td><td>n &gt; 8에서 학습 실패</td></tr>
            <tr><td>얕은 전체 연결 안자츠 + 선형 스케줄</td><td>약간(다항식 소실)</td><td>중간 품질</td></tr>
            <tr><td>국소 안자츠 + 적응형 스케줄</td><td>아니오(상수 하한)</td><td>좋은 품질 유지</td></tr>
            <tr><td>벽돌층 + 계층별 학습</td><td>아니오</td><td>전체적으로 가장 좋은 품질-학습 가능성 트레이드오프</td></tr>
          </tbody>
        </table>
        <p>결과는 QDDPM의 단계별 구조가 부분적 불모 고원 보호를 제공하지만 임의의 회로 구조에 대해 그 자체로 충분하지 않음을 확인합니다. 구조화된 안자츠와 적응형 잡음 스케줄의 조합이 생성 품질을 희생하지 않으면서 가장 강한 학습 가능성 보장을 제공합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>엄밀한 이론적 분석으로 QDDPM의 가장 중요한 확장성 질문을 다룹니다.</li>
          <li>문제의 진단뿐 아니라 실행 가능한 완화 전략을 제공합니다.</li>
          <li>기울기 분산(이론적)과 생성 품질(실용적) 모두를 다루며 둘을 연결합니다.</li>
          <li>여러 큐비트 수에 걸쳐 테스트하여 스케일링 증거를 제공합니다.</li>
          <li>설계 지침은 QDDPM 구현을 구축하는 실무자에게 즉시 유용합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>이론적 한계가 느슨할 수 있으며 실제 기울기 동작은 예측보다 좋거나 나쁠 수 있습니다.</li>
          <li>완화 전략이 역방향 회로의 표현력을 제한하여 복잡한 상태에 대한 생성 품질을 제한할 수 있습니다.</li>
          <li>최대 큐비트 수(16)가 여전히 적당하며 50+ 큐비트로의 외삽은 불확실성을 수반합니다.</li>
          <li>회로 구조에서만 발생하는 불모 고원을 다루며, 잡음에서 발생하는 하드웨어 불모 고원은 다루지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>QDDPM 역방향 회로에 대한 근본적 표현력-학습 가능성 트레이드오프가 있는가?</li>
          <li>적응형 잡음 스케줄을 역방향 회로와 공동으로 학습할 수 있는가, 아니면 사전에 고정해야 하는가?</li>
          <li>순방향 과정이 비탈분극 잡음 채널을 사용하면 이러한 결과가 어떻게 변하는가?</li>
          <li>고전적 사전 학습(예: 텐서 네트워크 시뮬레이션)이 불모 고원을 피하는 좋은 초기점을 제공할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 QDDPM을 장난감 시연을 넘어 확장하려는 모든 사람에게 필수적 읽을거리입니다. 메시지는 미묘합니다: 단계별 학습은 도움이 되지만 불모 고원에 대한 만병통치약은 아닙니다. 구조화된 안자츠와 적응형 잡음 스케줄의 조합이 규모에 맞는 학습 가능한 QDDPM으로의 실용적 경로를 제공하며, 여기서 제공된 설계 지침은 표준 관행으로 채택되어야 합니다.</p>
      `
    }
  },

  // ====================================================================
  // 9. rl-quantum-search
  // ====================================================================
  {
    id: "rl-quantum-search",
    date: "2025-04-11",
    authors: "Homayouni-Sangari, M., Ramezanpour, A.",
    venue: "Preprint 2025",
    image: "images/rl-quantum-search/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Quantum Search", "Reinforcement", "Noise"],
    en: {
      title: "Noise Tolerance via Reinforcement in the Quantum Search Problem",
      summary: "Applies reinforcement learning to adaptively optimize quantum search circuits under noise, demonstrating that RL-designed protocols can achieve significantly better success probabilities than fixed Grover iterations on noisy hardware.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper shows that <strong>reinforcement learning can discover noise-adapted quantum search protocols</strong> that substantially outperform standard Grover's algorithm on noisy quantum hardware, by learning to adjust circuit parameters in response to the noise environment.</p>

        <h2>Research Question</h2>
        <blockquote>Can reinforcement learning be used to design quantum search protocols that are inherently tolerant to hardware noise, outperforming the fixed rotation schedule of Grover's algorithm when noise is present?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Grover's algorithm provides a quadratic speedup for unstructured search, requiring O(sqrt(N)) queries to find a marked item among N possibilities. However, this optimal query count assumes perfect, noiseless quantum gates. On real hardware with depolarizing, dephasing, or amplitude damping noise, the coherent amplification process degrades rapidly — often to the point where the noisy Grover circuit performs worse than classical random sampling after too many iterations.</p>
        <p>Previous approaches to this problem include: reducing the number of Grover iterations (accepting suboptimal amplification), applying error mitigation techniques post-hoc, or designing analytically optimized rotation angles. However, these approaches either sacrifice speedup or require detailed knowledge of the noise model.</p>
        <p>This paper takes a fundamentally different approach: use reinforcement learning to discover the optimal circuit structure (gate sequences, rotation angles, number of iterations) for a given noise environment. The RL agent learns by interacting with a noisy quantum simulator (or hardware), requiring no explicit noise model specification.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>State space:</strong> The RL agent observes the current circuit configuration and noise-related statistics (e.g., estimated fidelity from calibration data).</li>
          <li><strong>Action space:</strong> At each decision point, the agent chooses rotation angles for the Grover oracle and diffusion operator, and decides whether to continue adding iterations or terminate.</li>
          <li><strong>Reward:</strong> The success probability of finding the marked item, measured from the output distribution of the (noisy) quantum circuit.</li>
          <li><strong>Training:</strong> The agent is trained using policy gradient methods (PPO or REINFORCE) on a noisy quantum simulator, with the noise model calibrated to match target hardware.</li>
          <li><strong>Deployment:</strong> The trained policy produces a noise-adapted circuit that can be executed on the target hardware without further optimization.</li>
        </ul>

        <figure>
          <img src="images/rl-quantum-search/thumbnail.png" alt="RL-optimized quantum search overview">
          <figcaption>Thumbnail: Reinforcement learning framework for noise-tolerant quantum search.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>RL-designed noise-tolerant search:</strong> Demonstrates that RL can discover protocols significantly outperforming fixed Grover iterations under noise.</li>
          <li><strong>Model-free adaptation:</strong> The RL agent does not require an explicit noise model — it learns from simulated or real noisy circuit outcomes.</li>
          <li><strong>Adaptive iteration count:</strong> The agent learns to stop iterating before noise overwhelms the signal, automatically finding the noise-dependent optimal depth.</li>
          <li><strong>Generalization across noise levels:</strong> Trained policies show some generalization to noise levels not seen during training.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Search space sizes</td><td>N = 4, 8, 16, 32, 64 (2 to 6 qubits)</td></tr>
            <tr><td>Noise models</td><td>Depolarizing, dephasing, amplitude damping at various rates</td></tr>
            <tr><td>RL algorithm</td><td>PPO with neural network policy (2-layer MLP)</td></tr>
            <tr><td>Training episodes</td><td>10<sup>4</sup> to 10<sup>5</sup></td></tr>
            <tr><td>Reward signal</td><td>Success probability averaged over 1000 shots</td></tr>
            <tr><td>Baseline comparison</td><td>Standard Grover (fixed iterations), truncated Grover (early stopping)</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Standard Grover</th><th>RL-Optimized</th><th>Improvement</th></tr></thead>
          <tbody>
            <tr><td>5 qubits, low noise (p=0.001)</td><td>~85% success</td><td>~90% success</td><td>Moderate</td></tr>
            <tr><td>5 qubits, medium noise (p=0.01)</td><td>~45% success</td><td>~70% success</td><td>Substantial</td></tr>
            <tr><td>5 qubits, high noise (p=0.05)</td><td>~15% success</td><td>~40% success</td><td>Large</td></tr>
            <tr><td>6 qubits, medium noise</td><td>~30% success</td><td>~55% success</td><td>Substantial</td></tr>
          </tbody>
        </table>
        <p>The improvement grows with noise level — in the low-noise regime, standard Grover is already near-optimal, but as noise increases, the RL agent's ability to adaptively shorten and reshape the circuit becomes increasingly valuable. The agent typically learns to use fewer iterations than the ideal noiseless Grover count, with modified rotation angles that partially compensate for noise-induced amplitude leakage.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Practical and well-motivated — noisy quantum search is a real problem on current hardware.</li>
          <li>Model-free RL approach removes the need for detailed noise characterization.</li>
          <li>Clear and substantial improvements over standard Grover under realistic noise.</li>
          <li>The framework is general and could be applied to other quantum algorithms beyond search.</li>
          <li>Good experimental methodology with proper baselines and statistical significance.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Small search spaces (up to 6 qubits) — unclear how RL training scales to larger problems.</li>
          <li>Training requires many noisy circuit evaluations, which is expensive on real hardware.</li>
          <li>Generalization across different noise types (not just levels) is not demonstrated.</li>
          <li>No comparison to analytical noise-optimal Grover variants from the literature.</li>
          <li>The RL-discovered protocols lack interpretability — it is unclear what the agent "learned" about noise.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the RL policy be distilled into interpretable rules (e.g., "use k fewer iterations when noise rate is p")?</li>
          <li>How does this approach compare to analytically derived noise-optimal Grover schedules?</li>
          <li>Can the framework be extended to amplitude estimation and other Grover-based algorithms?</li>
          <li>Is there a sample-efficiency improvement possible through model-based RL or meta-learning?</li>
          <li>What happens when the noise environment drifts after the policy is trained — how robust is the policy to calibration shifts?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper provides convincing evidence that RL can serve as a practical tool for noise-adaptive quantum algorithm design. The approach is most valuable in the moderate-to-high noise regime where standard Grover fails badly. For hardware teams running quantum search demonstrations, the RL-optimized protocols offer a straightforward path to better results. The broader implication is that RL-based circuit optimization may become a standard tool in the near-term quantum computing toolkit.</p>
      `
    },
    ko: {
      title: "양자 탐색 문제에서 강화를 통한 잡음 내성",
      summary: "잡음 하에서 양자 탐색 회로를 적응적으로 최적화하기 위해 강화 학습을 적용하여, RL 설계 프로토콜이 잡음 있는 하드웨어에서 고정된 그로버 반복보다 상당히 높은 성공 확률을 달성함을 보여줍니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>강화 학습이 잡음에 적응한 양자 탐색 프로토콜을 발견</strong>할 수 있으며, 잡음 환경에 따라 회로 매개변수를 조정하는 것을 학습하여 잡음이 있는 양자 하드웨어에서 표준 그로버 알고리즘을 상당히 능가함을 보여줍니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>하드웨어 잡음에 본질적으로 내성이 있는 양자 탐색 프로토콜을 설계하기 위해 강화 학습을 사용할 수 있으며, 잡음이 존재할 때 그로버 알고리즘의 고정 회전 스케줄을 능가할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>그로버 알고리즘은 비구조화 탐색에 이차적 속도 향상을 제공하며, N개 가능성 중 표시된 항목을 찾는 데 O(sqrt(N)) 쿼리가 필요합니다. 그러나 이 최적 쿼리 수는 완벽하고 잡음이 없는 양자 게이트를 가정합니다. 탈분극, 디페이징, 진폭 감쇄 잡음이 있는 실제 하드웨어에서 결맞는 증폭 과정은 급격히 저하됩니다 — 종종 너무 많은 반복 후 잡음 있는 그로버 회로가 고전적 무작위 샘플링보다 나쁜 성능을 보이는 수준까지.</p>
        <p>이 문제에 대한 이전 접근법에는 그로버 반복 수 줄이기, 사후 오류 완화 기술 적용, 해석적으로 최적화된 회전 각도 설계 등이 있습니다. 그러나 이러한 접근법은 속도 향상을 희생하거나 잡음 모델에 대한 상세한 지식을 필요로 합니다.</p>
        <p>이 논문은 근본적으로 다른 접근법을 취합니다: 주어진 잡음 환경에 대해 최적 회로 구조를 강화 학습으로 발견합니다. RL 에이전트는 잡음 있는 양자 시뮬레이터(또는 하드웨어)와 상호작용하여 학습하며, 명시적 잡음 모델 지정이 필요 없습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>상태 공간:</strong> RL 에이전트는 현재 회로 구성과 잡음 관련 통계(예: 교정 데이터에서의 추정 충실도)를 관찰합니다.</li>
          <li><strong>행동 공간:</strong> 각 결정 지점에서 에이전트는 그로버 오라클과 확산 연산자의 회전 각도를 선택하고, 반복을 계속 추가할지 종료할지 결정합니다.</li>
          <li><strong>보상:</strong> (잡음 있는) 양자 회로의 출력 분포에서 측정된 표시된 항목을 찾는 성공 확률입니다.</li>
          <li><strong>학습:</strong> 에이전트는 대상 하드웨어에 맞게 교정된 잡음 모델이 있는 잡음 양자 시뮬레이터에서 정책 기울기 방법(PPO 또는 REINFORCE)을 사용하여 학습됩니다.</li>
          <li><strong>배포:</strong> 학습된 정책은 추가 최적화 없이 대상 하드웨어에서 실행할 수 있는 잡음 적응 회로를 생성합니다.</li>
        </ul>

        <figure>
          <img src="images/rl-quantum-search/thumbnail.png" alt="RL 최적화 양자 탐색 개요">
          <figcaption>Thumbnail: 잡음 내성 양자 탐색을 위한 강화 학습 프레임워크.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>RL 설계 잡음 내성 탐색:</strong> 잡음 하에서 RL이 고정된 그로버 반복을 상당히 능가하는 프로토콜을 발견할 수 있음을 보여줍니다.</li>
          <li><strong>모델 프리 적응:</strong> RL 에이전트는 명시적 잡음 모델이 필요 없으며 시뮬레이션 또는 실제 잡음 회로 결과에서 학습합니다.</li>
          <li><strong>적응적 반복 수:</strong> 에이전트는 잡음이 신호를 압도하기 전에 반복을 중지하는 것을 학습하여 잡음 의존적 최적 깊이를 자동으로 찾습니다.</li>
          <li><strong>잡음 수준 간 일반화:</strong> 학습된 정책은 학습 중 보지 못한 잡음 수준에 대해 일부 일반화를 보여줍니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>탐색 공간 크기</td><td>N = 4, 8, 16, 32, 64 (2~6 큐비트)</td></tr>
            <tr><td>잡음 모델</td><td>다양한 비율의 탈분극, 디페이징, 진폭 감쇄</td></tr>
            <tr><td>RL 알고리즘</td><td>신경망 정책(2층 MLP)이 있는 PPO</td></tr>
            <tr><td>학습 에피소드</td><td>10<sup>4</sup>~10<sup>5</sup></td></tr>
            <tr><td>보상 신호</td><td>1000 샷에 걸쳐 평균된 성공 확률</td></tr>
            <tr><td>기준선 비교</td><td>표준 그로버(고정 반복), 절단 그로버(조기 중단)</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>시나리오</th><th>표준 그로버</th><th>RL 최적화</th><th>개선</th></tr></thead>
          <tbody>
            <tr><td>5큐비트, 저잡음(p=0.001)</td><td>~85% 성공</td><td>~90% 성공</td><td>중간</td></tr>
            <tr><td>5큐비트, 중잡음(p=0.01)</td><td>~45% 성공</td><td>~70% 성공</td><td>상당</td></tr>
            <tr><td>5큐비트, 고잡음(p=0.05)</td><td>~15% 성공</td><td>~40% 성공</td><td>큰</td></tr>
            <tr><td>6큐비트, 중잡음</td><td>~30% 성공</td><td>~55% 성공</td><td>상당</td></tr>
          </tbody>
        </table>
        <p>개선은 잡음 수준에 따라 증가합니다 — 저잡음 체제에서 표준 그로버는 이미 거의 최적이지만, 잡음이 증가하면 RL 에이전트의 회로 단축 및 재형성 능력이 점점 더 가치 있게 됩니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실용적이고 동기가 잘 부여됨 — 잡음 있는 양자 탐색은 현재 하드웨어에서 실제 문제입니다.</li>
          <li>모델 프리 RL 접근법이 상세한 잡음 특성화의 필요를 제거합니다.</li>
          <li>현실적 잡음 하에서 표준 그로버에 대한 명확하고 상당한 개선을 보여줍니다.</li>
          <li>프레임워크가 일반적이며 탐색 이외의 다른 양자 알고리즘에도 적용될 수 있습니다.</li>
          <li>적절한 기준선과 통계적 유의성을 갖춘 좋은 실험 방법론입니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>작은 탐색 공간(최대 6큐비트) — RL 학습이 더 큰 문제로 어떻게 확장되는지 불분명합니다.</li>
          <li>학습에 많은 잡음 회로 평가가 필요하며, 실제 하드웨어에서 비용이 높습니다.</li>
          <li>다른 잡음 유형(수준뿐 아닌) 간 일반화가 시연되지 않았습니다.</li>
          <li>문헌의 해석적 잡음 최적 그로버 변형과의 비교가 없습니다.</li>
          <li>RL이 발견한 프로토콜의 해석 가능성이 부족합니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>RL 정책을 해석 가능한 규칙으로 증류할 수 있는가(예: "잡음율이 p일 때 k회 적은 반복 사용")?</li>
          <li>이 접근법은 해석적으로 도출된 잡음 최적 그로버 스케줄과 어떻게 비교되는가?</li>
          <li>프레임워크를 진폭 추정 및 기타 그로버 기반 알고리즘으로 확장할 수 있는가?</li>
          <li>모델 기반 RL 또는 메타 학습을 통한 샘플 효율성 개선이 가능한가?</li>
          <li>정책이 학습된 후 잡음 환경이 변동하면 어떻게 되는가 — 정책이 교정 변동에 얼마나 견고한가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 RL이 잡음 적응적 양자 알고리즘 설계를 위한 실용적 도구가 될 수 있다는 설득력 있는 증거를 제공합니다. 접근법은 표준 그로버가 심하게 실패하는 중간에서 높은 잡음 체제에서 가장 가치 있습니다. 양자 탐색 시연을 실행하는 하드웨어 팀에게 RL 최적화 프로토콜은 더 나은 결과로의 직접적 경로를 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 10. overlapped-groupings
  // ====================================================================
  {
    id: "overlapped-groupings",
    date: "2025-04-11",
    authors: "Rowland, J., Sarkar, R., Sawaya, N. P. D., Tubman, N. M., LaRose, R.",
    venue: "Preprint 2025",
    image: "images/overlapped-groupings/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "VQE", "Variance Reduction", "Grouping"],
    en: {
      title: "Overlapped Groupings for Quantum Energy Estimation: Maximal Variance Reduction and Deterministic Algorithms",
      summary: "Introduces overlapped Pauli grouping strategies for Hamiltonian measurement in VQE that allow operators to appear in multiple measurement groups, achieving maximal variance reduction with deterministic algorithms.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper breaks the conventional constraint that each Pauli term must belong to exactly one measurement group, showing that <strong>overlapped groupings</strong> — where terms can appear in multiple groups — unlock significantly greater variance reduction in quantum energy estimation, with deterministic algorithms to find optimal overlaps.</p>

        <h2>Research Question</h2>
        <blockquote>Can allowing Pauli operators to appear in multiple measurement groups (overlapped groupings) reduce the variance of Hamiltonian energy estimation beyond what is achievable with disjoint groupings, and can optimal overlapped groupings be found efficiently?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Measuring the expectation value of a molecular Hamiltonian — a sum of many Pauli strings — is a central task in VQE and other variational quantum algorithms. The naive approach measures each Pauli string independently, requiring a prohibitive number of measurement shots. Grouping commuting Pauli terms into simultaneously measurable sets reduces this cost, and the measurement budget is allocated across groups.</p>
        <p>Existing grouping methods — qubit-wise commuting (QWC), general commuting, and unitary partitioning — all enforce disjoint grouping: each Pauli term belongs to exactly one group. This constraint simplifies the estimation procedure but is suboptimal for variance reduction, because the covariance structure between Pauli terms within and across groups is not fully exploited.</p>
        <p>This paper relaxes the disjoint constraint, allowing each Pauli term to participate in multiple measurement groups. The key insight is that the variance of the overall energy estimate depends on how measurement shots are allocated across groups and how the redundant information from overlapping terms is combined — and this optimization can be solved exactly.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Overlapped grouping framework:</strong> Each Pauli term can appear in one or more measurement groups. The estimate of each term's expectation value is a weighted average over the groups that contain it.</li>
          <li><strong>Optimal weight and shot allocation:</strong> Given a set of overlapped groups, the optimal weights and shot allocation are derived by minimizing the total variance of the energy estimate, formulated as a convex optimization problem.</li>
          <li><strong>Deterministic group construction:</strong> Algorithms to construct overlapped groups that provably maximize variance reduction, including greedy methods and graph-coloring-based approaches.</li>
          <li><strong>Maximal variance reduction bounds:</strong> Derives theoretical lower bounds on achievable variance for any overlapped grouping strategy, showing how much improvement is possible over disjoint groupings.</li>
        </ul>

        <figure>
          <img src="images/overlapped-groupings/thumbnail.png" alt="Overlapped groupings for Hamiltonian measurement">
          <figcaption>Thumbnail: Comparison of disjoint vs. overlapped Pauli grouping strategies.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Overlapped grouping concept:</strong> Introduces and formalizes the idea of non-disjoint Pauli groupings for Hamiltonian measurement.</li>
          <li><strong>Optimal estimation theory:</strong> Provides the complete mathematical framework for optimally combining redundant measurements from overlapping groups.</li>
          <li><strong>Deterministic algorithms:</strong> Unlike heuristic approaches, provides deterministic algorithms with provable variance reduction guarantees.</li>
          <li><strong>Substantial practical improvements:</strong> Demonstrates significant shot count reduction (often 2-5x) on molecular Hamiltonians compared to state-of-the-art disjoint groupings.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Test Hamiltonians</td><td>H<sub>2</sub>, LiH, H<sub>2</sub>O, N<sub>2</sub> (STO-3G and larger basis sets)</td></tr>
            <tr><td>Grouping baselines</td><td>QWC, sorted insertion, largest-first coloring</td></tr>
            <tr><td>Overlap algorithms</td><td>Greedy overlap construction, graph-based optimal overlap</td></tr>
            <tr><td>Optimization</td><td>Convex optimization for weight/shot allocation (CVXPY)</td></tr>
            <tr><td>Metrics</td><td>Total variance, effective shot count, estimation error</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Molecule</th><th>Disjoint Best (shots)</th><th>Overlapped (shots)</th><th>Reduction</th></tr></thead>
          <tbody>
            <tr><td>H<sub>2</sub></td><td>Baseline</td><td>~30% fewer shots</td><td>1.4x</td></tr>
            <tr><td>LiH</td><td>Baseline</td><td>~50% fewer shots</td><td>2x</td></tr>
            <tr><td>H<sub>2</sub>O</td><td>Baseline</td><td>~60% fewer shots</td><td>2.5x</td></tr>
            <tr><td>N<sub>2</sub></td><td>Baseline</td><td>~70% fewer shots</td><td>3.3x</td></tr>
          </tbody>
        </table>
        <p>The improvement scales with molecular complexity — larger molecules with more Pauli terms have more opportunities for beneficial overlap. The deterministic algorithms run in polynomial time and consistently match or beat the theoretical variance lower bounds.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Conceptually clean — the overlapped grouping idea is simple, general, and immediately applicable.</li>
          <li>Strong theoretical foundation with provable optimality guarantees.</li>
          <li>Deterministic algorithms avoid the randomness and irreproducibility of heuristic approaches.</li>
          <li>Substantial practical shot reduction on realistic molecular Hamiltonians.</li>
          <li>Compatible with existing grouping methods — overlapped groupings can be built on top of any base grouping.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Classical overhead for the convex optimization step may become significant for very large Hamiltonians.</li>
          <li>The variance model assumes ideal measurements — shot noise on real hardware may introduce additional complications.</li>
          <li>Does not address the circuit overhead of implementing the measurement bases for overlapped groups.</li>
          <li>Comparison is limited to shot-based estimation — shadow tomography and other approaches are not compared.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can overlapped groupings be combined with classical shadows for even greater measurement efficiency?</li>
          <li>How does the classical optimization cost scale for Hamiltonians with thousands of Pauli terms?</li>
          <li>Is there an information-theoretic limit to how much overlapping can help beyond disjoint groupings?</li>
          <li>Can the framework be extended to non-Pauli observable estimation (e.g., fermionic operators directly)?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper makes a conceptually simple but practically impactful contribution to the measurement problem in VQE. By breaking the disjoint grouping constraint, it accesses a strictly larger optimization space for variance reduction. The deterministic algorithms make it immediately usable. For any group running VQE experiments, adopting overlapped groupings is a low-cost, high-reward improvement to the measurement pipeline.</p>
      `
    },
    ko: {
      title: "양자 에너지 추정을 위한 겹침 그룹화: 최대 분산 감소와 결정적 알고리즘",
      summary: "VQE에서 해밀토니안 측정을 위한 겹침 파울리 그룹화 전략을 도입하여 연산자가 여러 측정 그룹에 나타날 수 있게 하며, 결정적 알고리즘으로 최대 분산 감소를 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 각 파울리 항이 정확히 하나의 측정 그룹에 속해야 한다는 기존 제약을 깨고, <strong>겹침 그룹화</strong> — 항이 여러 그룹에 나타날 수 있는 — 가 양자 에너지 추정에서 상당히 더 큰 분산 감소를 달성함을 보여주며, 최적 겹침을 찾는 결정적 알고리즘을 제공합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>파울리 연산자가 여러 측정 그룹에 나타나도록 허용하면(겹침 그룹화) 분리 그룹화로 달성 가능한 것 이상으로 해밀토니안 에너지 추정의 분산을 줄일 수 있으며, 최적의 겹침 그룹화를 효율적으로 찾을 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>분자 해밀토니안 — 많은 파울리 문자열의 합 — 의 기대값을 측정하는 것은 VQE 및 기타 변분 양자 알고리즘의 핵심 과제입니다. 순진한 접근법은 각 파울리 문자열을 독립적으로 측정하여 엄청난 수의 측정 샷을 필요로 합니다. 교환하는 파울리 항을 동시에 측정 가능한 집합으로 그룹화하면 이 비용을 줄이며, 측정 예산이 그룹에 할당됩니다.</p>
        <p>기존 그룹화 방법 — 큐비트별 교환(QWC), 일반 교환, 유니터리 분할 — 은 모두 분리 그룹화를 강제합니다: 각 파울리 항이 정확히 하나의 그룹에 속합니다. 이 제약은 추정 절차를 단순화하지만 분산 감소에 최적이 아닙니다.</p>
        <p>이 논문은 분리 제약을 완화하여 각 파울리 항이 여러 측정 그룹에 참여할 수 있게 합니다. 핵심 통찰은 전체 에너지 추정의 분산이 그룹 간 측정 샷 할당과 겹치는 항의 중복 정보 결합 방식에 의존하며, 이 최적화가 정확히 풀릴 수 있다는 것입니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>겹침 그룹화 프레임워크:</strong> 각 파울리 항이 하나 이상의 측정 그룹에 나타날 수 있습니다. 각 항의 기대값 추정은 그것을 포함하는 그룹에 대한 가중 평균입니다.</li>
          <li><strong>최적 가중치 및 샷 할당:</strong> 겹침 그룹 집합이 주어지면, 볼록 최적화 문제로 공식화된 에너지 추정의 총 분산을 최소화하여 최적 가중치와 샷 할당을 도출합니다.</li>
          <li><strong>결정적 그룹 구성:</strong> 탐욕적 방법과 그래프 색칠 기반 접근법을 포함하여 분산 감소를 증명적으로 최대화하는 겹침 그룹을 구성하는 알고리즘입니다.</li>
          <li><strong>최대 분산 감소 한계:</strong> 겹침 그룹화 전략으로 달성 가능한 분산의 이론적 하한을 도출하여 분리 그룹화에 비해 얼마나 많은 개선이 가능한지 보여줍니다.</li>
        </ul>

        <figure>
          <img src="images/overlapped-groupings/thumbnail.png" alt="해밀토니안 측정을 위한 겹침 그룹화">
          <figcaption>Thumbnail: 분리 vs. 겹침 파울리 그룹화 전략 비교.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>겹침 그룹화 개념:</strong> 해밀토니안 측정을 위한 비분리 파울리 그룹화의 아이디어를 도입하고 공식화합니다.</li>
          <li><strong>최적 추정 이론:</strong> 겹치는 그룹의 중복 측정을 최적으로 결합하기 위한 완전한 수학적 프레임워크를 제공합니다.</li>
          <li><strong>결정적 알고리즘:</strong> 휴리스틱 접근법과 달리 증명 가능한 분산 감소 보장이 있는 결정적 알고리즘을 제공합니다.</li>
          <li><strong>상당한 실용적 개선:</strong> 분자 해밀토니안에서 최신 분리 그룹화에 비해 상당한 샷 수 감소(종종 2-5배)를 보여줍니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트 해밀토니안</td><td>H<sub>2</sub>, LiH, H<sub>2</sub>O, N<sub>2</sub> (STO-3G 및 더 큰 기저 세트)</td></tr>
            <tr><td>그룹화 기준선</td><td>QWC, 정렬 삽입, 최대 우선 색칠</td></tr>
            <tr><td>겹침 알고리즘</td><td>탐욕적 겹침 구성, 그래프 기반 최적 겹침</td></tr>
            <tr><td>최적화</td><td>가중치/샷 할당을 위한 볼록 최적화(CVXPY)</td></tr>
            <tr><td>지표</td><td>총 분산, 유효 샷 수, 추정 오차</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>분자</th><th>분리 최선(샷)</th><th>겹침(샷)</th><th>감소</th></tr></thead>
          <tbody>
            <tr><td>H<sub>2</sub></td><td>기준선</td><td>~30% 적은 샷</td><td>1.4배</td></tr>
            <tr><td>LiH</td><td>기준선</td><td>~50% 적은 샷</td><td>2배</td></tr>
            <tr><td>H<sub>2</sub>O</td><td>기준선</td><td>~60% 적은 샷</td><td>2.5배</td></tr>
            <tr><td>N<sub>2</sub></td><td>기준선</td><td>~70% 적은 샷</td><td>3.3배</td></tr>
          </tbody>
        </table>
        <p>개선은 분자 복잡도에 따라 확장됩니다 — 더 많은 파울리 항이 있는 더 큰 분자가 유익한 겹침의 기회가 더 많습니다. 결정적 알고리즘은 다항 시간에 실행되며 이론적 분산 하한을 일관되게 일치하거나 능가합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>개념적으로 깔끔함 — 겹침 그룹화 아이디어는 단순하고 일반적이며 즉시 적용 가능합니다.</li>
          <li>증명 가능한 최적성 보장이 있는 강한 이론적 기초입니다.</li>
          <li>결정적 알고리즘이 휴리스틱 접근법의 무작위성과 비재현성을 피합니다.</li>
          <li>현실적 분자 해밀토니안에서 상당한 실용적 샷 감소를 보여줍니다.</li>
          <li>기존 그룹화 방법과 호환 — 겹침 그룹화를 모든 기본 그룹화 위에 구축할 수 있습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>볼록 최적화 단계의 고전적 오버헤드가 매우 큰 해밀토니안에서 중요해질 수 있습니다.</li>
          <li>분산 모델이 이상적 측정을 가정하며, 실제 하드웨어의 샷 잡음이 추가 복잡성을 도입할 수 있습니다.</li>
          <li>겹침 그룹의 측정 기저 구현을 위한 회로 오버헤드를 다루지 않습니다.</li>
          <li>비교가 샷 기반 추정에 한정되며, 섀도우 토모그래피 등 다른 접근법과 비교되지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>겹침 그룹화를 고전적 섀도우와 결합하여 더 큰 측정 효율을 달성할 수 있는가?</li>
          <li>수천 개의 파울리 항이 있는 해밀토니안에서 고전적 최적화 비용이 어떻게 확장되는가?</li>
          <li>겹침이 분리 그룹화를 넘어 얼마나 도울 수 있는지에 대한 정보 이론적 한계가 있는가?</li>
          <li>프레임워크를 비파울리 관측량 추정(예: 페르미온 연산자 직접)으로 확장할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 VQE의 측정 문제에 개념적으로 단순하지만 실질적으로 영향력 있는 기여를 합니다. 분리 그룹화 제약을 깨뜨림으로써 분산 감소를 위한 엄격히 더 큰 최적화 공간에 접근합니다. 결정적 알고리즘이 즉시 사용 가능하게 만듭니다. VQE 실험을 실행하는 모든 그룹에게 겹침 그룹화 채택은 측정 파이프라인에 대한 저비용 고보상 개선입니다.</p>
      `
    }
  },

  // ====================================================================
  // 11. mosaic-error-cancellation
  // ====================================================================
  {
    id: "mosaic-error-cancellation",
    date: "2025-04-11",
    authors: "Ma, M., Jaiswal, R., Niu, M. Y.",
    venue: "Preprint 2025",
    image: "images/mosaic-error-cancellation/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Error Mitigation", "PEC", "Scalability"],
    en: {
      title: "MoSAIC: Scalable Probabilistic Error Cancellation via Variational Blockwise Noise Aggregation",
      summary: "Proposes MoSAIC, a scalable probabilistic error cancellation framework that partitions circuits into blocks and learns aggregate noise models per block, dramatically reducing the sampling overhead of standard PEC.",
      review: `
        <h2>One-line Verdict</h2>
        <p>MoSAIC addresses the Achilles' heel of probabilistic error cancellation — <strong>exponential sampling overhead</strong> — by decomposing circuits into blocks, learning a variational noise model per block, and performing error cancellation at the block level rather than gate level, achieving scalable PEC for circuits that were previously intractable.</p>

        <h2>Research Question</h2>
        <blockquote>Can probabilistic error cancellation be made scalable to deep circuits by aggregating noise at the block level rather than the gate level, and can variational methods efficiently learn the required block-level noise models?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Probabilistic error cancellation (PEC) is one of the most principled error mitigation techniques: it produces unbiased estimates of noiseless expectation values by reweighting noisy circuit outcomes according to a quasi-probability decomposition of the ideal operation in terms of noisy implementable operations. However, standard PEC has a fatal scalability problem: the sampling overhead grows exponentially with the number of noisy gates, making it impractical for circuits with more than a few dozen gates.</p>
        <p>The root cause is that PEC decomposes each gate individually, and the per-gate overheads multiply. If the noise could be characterized and cancelled at a coarser granularity — say, entire subcircuit blocks — the overhead could be dramatically reduced, because many individual gate errors partially cancel within a block.</p>
        <p>MoSAIC (Mosaic of Scalable Aggregated Inversion for Cancellation) implements this idea: partition the circuit into blocks, learn an effective noise channel for each block using variational quantum circuits, and perform PEC at the block level. The variational noise learning is the key enabler — it captures the aggregate effect of all errors within a block without requiring a detailed per-gate noise model.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Block partitioning:</strong> The target circuit is partitioned into contiguous blocks of gates. Block boundaries are chosen to balance between noise aggregation benefit (larger blocks) and variational learning difficulty (smaller blocks).</li>
          <li><strong>Variational noise learning:</strong> For each block, a parameterized noise channel is learned by comparing the output of the ideal block (simulated classically if small enough, or estimated via other means) with the noisy block output on hardware. The noise channel is parameterized as a Pauli channel or sparse Stinespring dilation.</li>
          <li><strong>Block-level PEC:</strong> The learned block noise channel is inverted via quasi-probability decomposition, and the resulting corrections are applied during sampling. Because the block noise channel captures the net effect of many gates, its quasi-probability norm (sampling overhead) is much smaller than the product of per-gate overheads.</li>
          <li><strong>Composition:</strong> Block-level PEC corrections are composed across the full circuit, with the total overhead being the product of block-level overheads — exponentially smaller than gate-level PEC.</li>
        </ul>

        <figure>
          <img src="images/mosaic-error-cancellation/thumbnail.png" alt="MoSAIC framework overview">
          <figcaption>Thumbnail: MoSAIC blockwise probabilistic error cancellation framework.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Block-level PEC framework:</strong> Formalizes the idea of performing error cancellation at the block level with rigorous overhead analysis.</li>
          <li><strong>Variational noise learning:</strong> Provides a practical method to learn block-level noise channels without requiring per-gate noise characterization.</li>
          <li><strong>Exponential overhead reduction:</strong> Proves that block-level PEC overhead can be exponentially smaller than gate-level PEC for typical noise patterns.</li>
          <li><strong>Scalability demonstration:</strong> Shows PEC on circuits with 50+ gates — previously intractable for standard PEC.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Circuit types</td><td>Random Clifford circuits, VQE ansatze, QAOA circuits</td></tr>
            <tr><td>Block sizes</td><td>5 to 20 gates per block</td></tr>
            <tr><td>Noise learning</td><td>Variational Pauli channel fitting with gradient-based optimization</td></tr>
            <tr><td>Hardware</td><td>IBM superconducting processors (simulation and real hardware)</td></tr>
            <tr><td>Baselines</td><td>Standard gate-level PEC, zero-noise extrapolation (ZNE), no mitigation</td></tr>
            <tr><td>Metrics</td><td>Estimation bias, sampling overhead (quasi-probability norm), total shots required</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Method</th><th>Max Tractable Circuit Depth</th><th>Sampling Overhead (typical)</th><th>Bias</th></tr></thead>
          <tbody>
            <tr><td>No mitigation</td><td>Any</td><td>1x</td><td>High</td></tr>
            <tr><td>ZNE</td><td>Any</td><td>~3-10x</td><td>Moderate (model-dependent)</td></tr>
            <tr><td>Gate-level PEC</td><td>~20-30 gates</td><td>Exponential in gate count</td><td>Unbiased</td></tr>
            <tr><td>MoSAIC (block PEC)</td><td>50+ gates demonstrated</td><td>Polynomial-like scaling</td><td>Low (variational learning error)</td></tr>
          </tbody>
        </table>
        <p>MoSAIC extends the practical reach of PEC by roughly 2-3x in circuit depth while maintaining near-unbiased estimation. The variational noise learning introduces a small systematic error, but this is much smaller than the bias of unmitigated circuits or the model-dependent bias of ZNE.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses the most critical limitation of PEC — exponential sampling overhead — with a principled solution.</li>
          <li>Block-level aggregation is a clean abstraction that naturally captures error cancellation within subcircuits.</li>
          <li>Variational noise learning is practical and does not require detailed hardware characterization.</li>
          <li>Demonstrated on real hardware, not just simulation.</li>
          <li>Compatible with other error mitigation techniques (can be combined with ZNE, symmetry verification, etc.).</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Variational noise learning introduces a small bias that standard PEC avoids — the estimate is no longer exactly unbiased.</li>
          <li>Block partitioning heuristics may not be optimal — the choice of block boundaries affects performance.</li>
          <li>Noise learning overhead (separate calibration circuits per block) adds to the total experimental cost.</li>
          <li>Assumes noise is approximately Markovian at the block level — non-Markovian correlations across blocks are not captured.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the block partitioning be optimized jointly with the noise learning, rather than fixed a priori?</li>
          <li>How does the variational noise learning error scale with block size and noise rate?</li>
          <li>Can MoSAIC be combined with quantum error correction for a hybrid mitigation-correction approach?</li>
          <li>Is there a fundamental limit to how much block-level aggregation can reduce PEC overhead?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>MoSAIC represents a significant practical advance for error mitigation. By moving PEC from the gate level to the block level, it transforms an exponentially expensive technique into a practically scalable one. The trade-off — a small variational learning bias in exchange for dramatically reduced sampling overhead — is favorable for most near-term applications. This work should be of immediate interest to any group running error-mitigated quantum computations.</p>
      `
    },
    ko: {
      title: "MoSAIC: 변분 블록별 잡음 집계를 통한 확장 가능한 확률적 오류 상쇄",
      summary: "회로를 블록으로 분할하고 블록당 집계 잡음 모델을 학습하여 표준 PEC의 샘플링 오버헤드를 극적으로 줄이는 확장 가능한 확률적 오류 상쇄 프레임워크 MoSAIC를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>MoSAIC는 확률적 오류 상쇄의 아킬레스건 — <strong>지수적 샘플링 오버헤드</strong> — 를 회로를 블록으로 분해하고 블록당 변분 잡음 모델을 학습하며 게이트 수준이 아닌 블록 수준에서 오류 상쇄를 수행하여 해결하며, 이전에 다루기 어려웠던 회로에 대해 확장 가능한 PEC를 달성합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>게이트 수준이 아닌 블록 수준에서 잡음을 집계하여 확률적 오류 상쇄를 깊은 회로로 확장할 수 있으며, 변분 방법이 필요한 블록 수준 잡음 모델을 효율적으로 학습할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>확률적 오류 상쇄(PEC)는 가장 원칙적인 오류 완화 기술 중 하나입니다: 이상적 연산의 준확률 분해에 따라 잡음 회로 결과를 재가중하여 잡음 없는 기대값의 비편향 추정을 생성합니다. 그러나 표준 PEC에는 치명적 확장성 문제가 있습니다: 샘플링 오버헤드가 잡음 게이트 수에 따라 지수적으로 증가하여 수십 개 이상의 게이트가 있는 회로에는 비실용적입니다.</p>
        <p>근본 원인은 PEC가 각 게이트를 개별적으로 분해하며 게이트당 오버헤드가 곱해지기 때문입니다. 잡음을 더 거친 단위 — 예를 들어 전체 부분 회로 블록 — 에서 특성화하고 상쇄할 수 있다면, 블록 내에서 많은 개별 게이트 오류가 부분적으로 상쇄되므로 오버헤드가 극적으로 줄어들 수 있습니다.</p>
        <p>MoSAIC는 이 아이디어를 구현합니다: 회로를 블록으로 분할하고, 변분 양자 회로를 사용하여 각 블록의 유효 잡음 채널을 학습하며, 블록 수준에서 PEC를 수행합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>블록 분할:</strong> 대상 회로를 게이트의 연속적 블록으로 분할합니다. 블록 경계는 잡음 집계 이점(큰 블록)과 변분 학습 난이도(작은 블록) 사이의 균형을 맞추도록 선택됩니다.</li>
          <li><strong>변분 잡음 학습:</strong> 각 블록에 대해 이상적 블록 출력과 하드웨어의 잡음 블록 출력을 비교하여 매개변수화된 잡음 채널을 학습합니다.</li>
          <li><strong>블록 수준 PEC:</strong> 학습된 블록 잡음 채널을 준확률 분해를 통해 역전하고, 결과적 보정을 샘플링 중 적용합니다.</li>
          <li><strong>합성:</strong> 블록 수준 PEC 보정이 전체 회로에 걸쳐 합성되며, 총 오버헤드는 블록 수준 오버헤드의 곱입니다 — 게이트 수준 PEC보다 지수적으로 작습니다.</li>
        </ul>

        <figure>
          <img src="images/mosaic-error-cancellation/thumbnail.png" alt="MoSAIC 프레임워크 개요">
          <figcaption>Thumbnail: MoSAIC 블록별 확률적 오류 상쇄 프레임워크.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>블록 수준 PEC 프레임워크:</strong> 엄밀한 오버헤드 분석으로 블록 수준에서 오류 상쇄를 수행하는 아이디어를 공식화합니다.</li>
          <li><strong>변분 잡음 학습:</strong> 게이트별 잡음 특성화 없이 블록 수준 잡음 채널을 학습하는 실용적 방법을 제공합니다.</li>
          <li><strong>지수적 오버헤드 감소:</strong> 일반적 잡음 패턴에서 블록 수준 PEC 오버헤드가 게이트 수준 PEC보다 지수적으로 작을 수 있음을 증명합니다.</li>
          <li><strong>확장성 시연:</strong> 표준 PEC로는 이전에 다루기 어려웠던 50+ 게이트 회로에서 PEC를 보여줍니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>회로 유형</td><td>무작위 클리포드 회로, VQE 안자츠, QAOA 회로</td></tr>
            <tr><td>블록 크기</td><td>블록당 5~20 게이트</td></tr>
            <tr><td>잡음 학습</td><td>그래디언트 기반 최적화를 사용한 변분 파울리 채널 피팅</td></tr>
            <tr><td>하드웨어</td><td>IBM 초전도 프로세서(시뮬레이션 및 실제 하드웨어)</td></tr>
            <tr><td>기준선</td><td>표준 게이트 수준 PEC, 제로 잡음 외삽(ZNE), 완화 없음</td></tr>
            <tr><td>지표</td><td>추정 편향, 샘플링 오버헤드(준확률 노름), 필요한 총 샷</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>방법</th><th>최대 다룰 수 있는 회로 깊이</th><th>샘플링 오버헤드(일반적)</th><th>편향</th></tr></thead>
          <tbody>
            <tr><td>완화 없음</td><td>모든</td><td>1배</td><td>높음</td></tr>
            <tr><td>ZNE</td><td>모든</td><td>~3-10배</td><td>중간(모델 의존)</td></tr>
            <tr><td>게이트 수준 PEC</td><td>~20-30 게이트</td><td>게이트 수에 지수적</td><td>비편향</td></tr>
            <tr><td>MoSAIC(블록 PEC)</td><td>50+ 게이트 시연</td><td>다항식급 스케일링</td><td>낮음(변분 학습 오류)</td></tr>
          </tbody>
        </table>
        <p>MoSAIC는 거의 비편향 추정을 유지하면서 PEC의 실용적 도달 범위를 회로 깊이에서 대략 2-3배 확장합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>원칙적 해결책으로 PEC의 가장 중요한 한계 — 지수적 샘플링 오버헤드 — 를 다룹니다.</li>
          <li>블록 수준 집계는 자연스럽게 부분 회로 내 오류 상쇄를 포착하는 깔끔한 추상화입니다.</li>
          <li>변분 잡음 학습이 실용적이며 상세한 하드웨어 특성화를 필요로 하지 않습니다.</li>
          <li>시뮬레이션뿐 아니라 실제 하드웨어에서 시연되었습니다.</li>
          <li>다른 오류 완화 기술과 호환됩니다(ZNE, 대칭 검증 등과 결합 가능).</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>변분 잡음 학습이 표준 PEC가 피하는 작은 편향을 도입합니다 — 추정이 더 이상 정확히 비편향이 아닙니다.</li>
          <li>블록 분할 휴리스틱이 최적이 아닐 수 있습니다 — 블록 경계 선택이 성능에 영향을 줍니다.</li>
          <li>잡음 학습 오버헤드(블록당 별도 교정 회로)가 총 실험 비용에 추가됩니다.</li>
          <li>잡음이 블록 수준에서 대략 마르코프적이라고 가정합니다 — 블록 간 비마르코프 상관관계는 포착되지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>블록 분할을 사전에 고정하지 않고 잡음 학습과 공동으로 최적화할 수 있는가?</li>
          <li>변분 잡음 학습 오류가 블록 크기와 잡음률에 따라 어떻게 확장되는가?</li>
          <li>MoSAIC를 하이브리드 완화-정정 접근법을 위한 양자 오류 정정과 결합할 수 있는가?</li>
          <li>블록 수준 집계가 PEC 오버헤드를 얼마나 줄일 수 있는지에 대한 근본적 한계가 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>MoSAIC는 오류 완화를 위한 상당한 실용적 진보를 나타냅니다. PEC를 게이트 수준에서 블록 수준으로 이동시킴으로써 지수적으로 비싼 기술을 실질적으로 확장 가능한 것으로 변환합니다. 트레이드오프 — 극적으로 줄어든 샘플링 오버헤드와 교환되는 작은 변분 학습 편향 — 은 대부분의 근단기 응용에 유리합니다.</p>
      `
    }
  },

  // ====================================================================
  // 12. bacon-shor-board-games
  // ====================================================================
  {
    id: "bacon-shor-board-games",
    date: "2025-04-11",
    authors: "Alam, M. S., Zen, J., Scruby, T. R.",
    venue: "Preprint 2026",
    image: "images/bacon-shor-board-games/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Bacon-Shor Code", "Measurement Schedule", "Fault Tolerance"],
    en: {
      title: "Bacon-Shor Board Games",
      summary: "Reframes the optimization of measurement schedules for Bacon-Shor codes as combinatorial board games, providing an intuitive framework for discovering fault-tolerant schedules and analyzing their properties.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides an elegant <strong>combinatorial game-theoretic framework</strong> for understanding and optimizing measurement schedules in Bacon-Shor codes, making the complex scheduling problem accessible through board game analogies and enabling systematic discovery of fault-tolerant schedules.</p>

        <h2>Research Question</h2>
        <blockquote>Can the problem of finding optimal fault-tolerant measurement schedules for Bacon-Shor codes be formulated as combinatorial board games, and does this formulation yield new schedules with improved fault-tolerance properties?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The Bacon-Shor code is a subsystem code that encodes a logical qubit in a 2D grid of physical qubits. Unlike the surface code where the measurement schedule is essentially fixed, Bacon-Shor codes offer significant flexibility in the order and grouping of gauge measurements. Different measurement schedules can lead to different effective error correction capabilities, hook error structures, and circuit depths.</p>
        <p>Finding good measurement schedules is a combinatorial optimization problem that has been approached heuristically. The connection to fault tolerance is intricate: the schedule determines which error configurations are detectable, which are degenerate, and how hook errors propagate through the syndrome extraction circuit.</p>
        <p>This paper introduces a board game abstraction where the grid positions represent game board cells, gauge measurements are moves, and winning strategies correspond to fault-tolerant schedules. This reframing makes the problem intuitive and enables systematic exploration of the schedule space.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Board game formulation:</strong> The Bacon-Shor code grid is mapped to a game board. Each gauge measurement corresponds to a move that "covers" certain cells. A valid schedule is a sequence of moves that covers all required gauge operators while satisfying ordering constraints.</li>
          <li><strong>Fault-tolerance as winning condition:</strong> A schedule is "winning" if it ensures that all weight-1 errors produce distinct syndromes and no hook errors create undetectable logical errors. This maps to specific coverage and ordering conditions on the board.</li>
          <li><strong>Enumeration and optimization:</strong> The board game structure enables efficient enumeration of valid schedules for small codes and heuristic search for larger codes, guided by game-theoretic principles.</li>
          <li><strong>Analysis tools:</strong> The framework provides visual tools to analyze hook error propagation, schedule depth, and parallelism opportunities.</li>
        </ul>

        <figure>
          <img src="images/bacon-shor-board-games/thumbnail.png" alt="Bacon-Shor board game framework">
          <figcaption>Thumbnail: Board game representation of Bacon-Shor measurement schedules.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Game-theoretic framework:</strong> Novel formulation of measurement scheduling as a board game, providing intuition and structure for a previously ad-hoc problem.</li>
          <li><strong>New fault-tolerant schedules:</strong> Discovers previously unknown schedules with improved properties (lower depth, better hook error handling).</li>
          <li><strong>Systematic analysis:</strong> Enables complete enumeration of valid schedules for small codes, characterizing the full landscape of possibilities.</li>
          <li><strong>Pedagogical value:</strong> The board game analogy makes Bacon-Shor code scheduling accessible to a broader audience.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code sizes</td><td>Bacon-Shor [[9,1,3]], [[25,1,5]], and larger</td></tr>
            <tr><td>Board dimensions</td><td>3x3, 5x5, 7x7 grids</td></tr>
            <tr><td>Schedule enumeration</td><td>Complete for 3x3; heuristic search for 5x5+</td></tr>
            <tr><td>Fault-tolerance verification</td><td>Circuit-level noise simulation with Stim</td></tr>
            <tr><td>Metrics</td><td>Schedule depth, hook error weight, logical error rate</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Code</th><th>Known Best Schedule</th><th>Board Game Schedule</th><th>Improvement</th></tr></thead>
          <tbody>
            <tr><td>[[9,1,3]]</td><td>Standard alternating</td><td>Optimized via enumeration</td><td>Reduced circuit depth</td></tr>
            <tr><td>[[25,1,5]]</td><td>Heuristic schedule</td><td>Game-guided discovery</td><td>Lower logical error rate</td></tr>
            <tr><td>General</td><td>Ad-hoc construction</td><td>Systematic framework</td><td>Principled optimization</td></tr>
          </tbody>
        </table>

        <h2>Strengths</h2>
        <ul>
          <li>Highly creative — the board game abstraction is both novel and genuinely useful for understanding the problem.</li>
          <li>Practical — discovered schedules offer concrete improvements over prior art.</li>
          <li>Systematic — moves beyond heuristic search to principled exploration of the schedule space.</li>
          <li>Excellent pedagogy — makes Bacon-Shor scheduling accessible.</li>
          <li>Visual analysis tools are immediately useful for code designers.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Complete enumeration is only feasible for small codes — larger codes require heuristic search.</li>
          <li>The board game formulation may not generalize to other subsystem codes beyond Bacon-Shor.</li>
          <li>Improvements in logical error rate, while real, are modest compared to switching code families entirely.</li>
          <li>Does not address dynamic scheduling (adapting the schedule based on observed syndromes).</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the board game framework be extended to other subsystem codes (e.g., compass codes, gauge color codes)?</li>
          <li>Is there a polynomial-time algorithm for finding optimal schedules in the board game formulation?</li>
          <li>How do the discovered schedules perform under biased noise models?</li>
          <li>Can reinforcement learning be applied to the board game to discover schedules for large codes?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates the power of finding the right abstraction. By reframing Bacon-Shor measurement scheduling as a board game, the authors make a complex combinatorial problem intuitive and tractable. The practical payoff — new fault-tolerant schedules with improved properties — validates the framework. For the Bacon-Shor and subsystem code community, this paper provides both a useful tool and a delightful way to think about the problem.</p>
      `
    },
    ko: {
      title: "베이컨-쇼어 보드 게임",
      summary: "베이컨-쇼어 코드의 측정 스케줄 최적화를 조합적 보드 게임으로 재구성하여 결함 허용 스케줄을 발견하고 그 속성을 분석하기 위한 직관적 프레임워크를 제공합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 베이컨-쇼어 코드의 측정 스케줄을 이해하고 최적화하기 위한 우아한 <strong>조합적 게임 이론 프레임워크</strong>를 제공하여, 보드 게임 비유를 통해 복잡한 스케줄링 문제를 접근 가능하게 만들고 결함 허용 스케줄의 체계적 발견을 가능하게 합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>베이컨-쇼어 코드의 최적 결함 허용 측정 스케줄을 찾는 문제를 조합적 보드 게임으로 공식화할 수 있으며, 이 공식화가 개선된 결함 허용 속성을 가진 새로운 스케줄을 산출하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>베이컨-쇼어 코드는 물리적 큐비트의 2D 그리드에 논리 큐비트를 인코딩하는 서브시스템 코드입니다. 측정 스케줄이 본질적으로 고정된 표면 코드와 달리, 베이컨-쇼어 코드는 게이지 측정의 순서와 그룹화에 상당한 유연성을 제공합니다. 서로 다른 측정 스케줄은 서로 다른 유효 오류 정정 능력, 훅 오류 구조, 회로 깊이로 이어질 수 있습니다.</p>
        <p>좋은 측정 스케줄을 찾는 것은 휴리스틱으로 접근되어 온 조합 최적화 문제입니다. 결함 허용과의 연결은 복잡합니다: 스케줄이 어떤 오류 구성이 검출 가능한지, 어떤 것이 축퇴인지, 훅 오류가 신드롬 추출 회로를 통해 어떻게 전파되는지를 결정합니다.</p>
        <p>이 논문은 그리드 위치가 게임 보드 셀을 나타내고, 게이지 측정이 수를 나타내며, 승리 전략이 결함 허용 스케줄에 해당하는 보드 게임 추상화를 도입합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>보드 게임 공식화:</strong> 베이컨-쇼어 코드 그리드를 게임 보드에 매핑합니다. 각 게이지 측정은 특정 셀을 "덮는" 수에 해당합니다.</li>
          <li><strong>승리 조건으로서의 결함 허용:</strong> 모든 가중치-1 오류가 구별 가능한 신드롬을 생성하고 훅 오류가 검출 불가능한 논리적 오류를 만들지 않는 스케줄이 "승리"입니다.</li>
          <li><strong>열거 및 최적화:</strong> 보드 게임 구조가 작은 코드에 대한 유효 스케줄의 효율적 열거와 게임 이론 원칙에 의해 안내되는 큰 코드에 대한 휴리스틱 검색을 가능하게 합니다.</li>
          <li><strong>분석 도구:</strong> 프레임워크가 훅 오류 전파, 스케줄 깊이, 병렬화 기회를 분석하는 시각적 도구를 제공합니다.</li>
        </ul>

        <figure>
          <img src="images/bacon-shor-board-games/thumbnail.png" alt="베이컨-쇼어 보드 게임 프레임워크">
          <figcaption>Thumbnail: 베이컨-쇼어 측정 스케줄의 보드 게임 표현.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>게임 이론 프레임워크:</strong> 이전에 임시적이었던 문제에 직관과 구조를 제공하는 보드 게임으로서의 측정 스케줄링의 새로운 공식화입니다.</li>
          <li><strong>새로운 결함 허용 스케줄:</strong> 개선된 속성(더 낮은 깊이, 더 나은 훅 오류 처리)을 가진 이전에 알려지지 않은 스케줄을 발견합니다.</li>
          <li><strong>체계적 분석:</strong> 작은 코드에 대한 유효 스케줄의 완전한 열거를 가능하게 하여 전체 가능성 경관을 특성화합니다.</li>
          <li><strong>교육적 가치:</strong> 보드 게임 비유가 베이컨-쇼어 코드 스케줄링을 더 넓은 청중에게 접근 가능하게 합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 크기</td><td>베이컨-쇼어 [[9,1,3]], [[25,1,5]], 및 더 큰 것</td></tr>
            <tr><td>보드 차원</td><td>3x3, 5x5, 7x7 그리드</td></tr>
            <tr><td>스케줄 열거</td><td>3x3에서 완전; 5x5+에서 휴리스틱 검색</td></tr>
            <tr><td>결함 허용 검증</td><td>Stim을 사용한 회로 수준 잡음 시뮬레이션</td></tr>
            <tr><td>지표</td><td>스케줄 깊이, 훅 오류 가중치, 논리적 오류율</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>코드</th><th>알려진 최선 스케줄</th><th>보드 게임 스케줄</th><th>개선</th></tr></thead>
          <tbody>
            <tr><td>[[9,1,3]]</td><td>표준 교대</td><td>열거를 통해 최적화</td><td>회로 깊이 감소</td></tr>
            <tr><td>[[25,1,5]]</td><td>휴리스틱 스케줄</td><td>게임 안내 발견</td><td>더 낮은 논리적 오류율</td></tr>
            <tr><td>일반</td><td>임시 구성</td><td>체계적 프레임워크</td><td>원칙적 최적화</td></tr>
          </tbody>
        </table>

        <h2>강점</h2>
        <ul>
          <li>매우 창의적 — 보드 게임 추상화가 새롭고 문제를 이해하는 데 진정으로 유용합니다.</li>
          <li>실용적 — 발견된 스케줄이 기존 기술에 비해 구체적 개선을 제공합니다.</li>
          <li>체계적 — 휴리스틱 검색을 넘어 스케줄 공간의 원칙적 탐구로 나아갑니다.</li>
          <li>우수한 교육 — 베이컨-쇼어 스케줄링을 접근 가능하게 만듭니다.</li>
          <li>시각적 분석 도구가 코드 설계자에게 즉시 유용합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>완전한 열거는 작은 코드에서만 가능하며, 더 큰 코드는 휴리스틱 검색이 필요합니다.</li>
          <li>보드 게임 공식화가 베이컨-쇼어 이외의 다른 서브시스템 코드로 일반화되지 않을 수 있습니다.</li>
          <li>논리적 오류율의 개선은 실질적이지만 코드 계열 자체를 바꾸는 것에 비해 적당합니다.</li>
          <li>동적 스케줄링(관찰된 신드롬에 기반한 스케줄 적응)을 다루지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>보드 게임 프레임워크를 다른 서브시스템 코드(예: 나침반 코드, 게이지 컬러 코드)로 확장할 수 있는가?</li>
          <li>보드 게임 공식화에서 최적 스케줄을 찾는 다항 시간 알고리즘이 있는가?</li>
          <li>발견된 스케줄이 편향된 잡음 모델에서 어떻게 수행되는가?</li>
          <li>대규모 코드의 스케줄을 발견하기 위해 보드 게임에 강화 학습을 적용할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 올바른 추상화를 찾는 것의 힘을 보여줍니다. 베이컨-쇼어 측정 스케줄링을 보드 게임으로 재구성함으로써 복잡한 조합 문제를 직관적이고 다루기 쉽게 만듭니다. 실용적 성과 — 개선된 속성을 가진 새로운 결함 허용 스케줄 — 가 프레임워크를 검증합니다. 베이컨-쇼어 및 서브시스템 코드 커뮤니티에게 이 논문은 유용한 도구와 문제에 대해 생각하는 즐거운 방식 모두를 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 13. floquet-bacon-shor
  // ====================================================================
  {
    id: "floquet-bacon-shor",
    date: "2025-04-11",
    authors: "Sun, X., Li, L., Wu, Z., et al.",
    venue: "Preprint 2025",
    image: "images/floquet-bacon-shor/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Floquet Code", "Bacon-Shor", "Logical Operations"],
    en: {
      title: "Logical Operations with a Dynamical Qubit in Floquet-Bacon-Shor Code",
      summary: "Demonstrates logical operations on a dynamical qubit encoded in the Floquet-Bacon-Shor code, showing how the periodic measurement schedule inherent to Floquet codes can be leveraged for fault-tolerant logical gates.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper shows how to perform <strong>fault-tolerant logical operations on a dynamical qubit</strong> in the Floquet-Bacon-Shor code, bridging the gap between Floquet code theory (which focuses on memory) and practical fault-tolerant computation (which requires gates).</p>

        <h2>Research Question</h2>
        <blockquote>How can logical operations — initialization, measurement, and Clifford gates — be performed on a dynamical qubit in the Floquet-Bacon-Shor code while maintaining fault tolerance, and what is the overhead compared to static subsystem code implementations?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Floquet codes are a class of dynamically generated quantum error correcting codes where the code space is not fixed but evolves periodically under a sequence of two-body measurements. The Floquet-Bacon-Shor code combines the Bacon-Shor subsystem code structure with Floquet dynamics, offering potential advantages in circuit depth and connectivity requirements. However, most Floquet code research has focused on the memory problem — preserving a logical qubit — while the equally important question of performing logical operations has received less attention.</p>
        <p>The "dynamical qubit" in a Floquet code presents unique challenges for logical operations: the logical information moves between different physical degrees of freedom as the measurement schedule progresses, and any logical gate must be synchronized with this periodic evolution. This paper addresses these challenges by designing gate protocols that respect the Floquet dynamics.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Floquet-Bacon-Shor encoding:</strong> The code is defined on a 2D grid with a periodic sequence of X-type and Z-type gauge measurements. The logical qubit exists as a dynamical degree of freedom that cycles through different instantaneous code spaces.</li>
          <li><strong>Logical initialization:</strong> Fault-tolerant preparation of logical |0⟩ and |+⟩ states by appropriately conditioning the first few rounds of the Floquet schedule.</li>
          <li><strong>Logical measurement:</strong> Destructive measurement of the logical qubit in the X or Z basis by modifying the final rounds of the Floquet schedule to project onto the logical eigenstate.</li>
          <li><strong>Logical Clifford gates:</strong> Implementation of logical H, S, and CNOT gates by modifying the Floquet measurement schedule at specific rounds — effectively "twisting" the periodic dynamics to implement the desired unitary on the logical space.</li>
          <li><strong>Fault-tolerance analysis:</strong> Circuit-level noise simulations verify that the logical gate protocols maintain the code's error correction capability.</li>
        </ul>

        <figure>
          <img src="images/floquet-bacon-shor/thumbnail.png" alt="Floquet-Bacon-Shor logical operations">
          <figcaption>Thumbnail: Logical operations in the Floquet-Bacon-Shor code.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Complete logical gate set:</strong> First demonstration of initialization, measurement, and Clifford gates for the Floquet-Bacon-Shor code.</li>
          <li><strong>Schedule-based gates:</strong> Logical gates are implemented by modifying the measurement schedule rather than applying additional physical gates, leveraging the Floquet structure.</li>
          <li><strong>Fault-tolerance preservation:</strong> Shows that logical operations do not compromise the code's error correction capability when properly synchronized with the Floquet dynamics.</li>
          <li><strong>Overhead analysis:</strong> Compares the resource cost to static Bacon-Shor implementations, quantifying the trade-offs of the Floquet approach.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code sizes</td><td>d = 3, 5, 7 Floquet-Bacon-Shor codes</td></tr>
            <tr><td>Floquet period</td><td>Depends on code size; typically 2-4 measurement rounds per period</td></tr>
            <tr><td>Gate protocols</td><td>Schedule modifications for H, S, CNOT</td></tr>
            <tr><td>Noise model</td><td>Circuit-level depolarizing noise</td></tr>
            <tr><td>Simulation</td><td>Stim-based with BP+OSD decoding</td></tr>
            <tr><td>Metrics</td><td>Logical error rate per gate, comparison to static Bacon-Shor</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Operation</th><th>Logical Error Rate (d=5)</th><th>vs. Static Bacon-Shor</th></tr></thead>
          <tbody>
            <tr><td>Memory (idle)</td><td>Comparable to static code</td><td>Slight advantage in circuit depth</td></tr>
            <tr><td>Logical H</td><td>Small overhead above memory</td><td>Comparable</td></tr>
            <tr><td>Logical S</td><td>Moderate overhead</td><td>Slightly higher than static</td></tr>
            <tr><td>Logical CNOT</td><td>Largest overhead</td><td>Comparable to lattice surgery</td></tr>
          </tbody>
        </table>
        <p>The Floquet approach achieves competitive logical error rates with potentially simpler hardware requirements (only two-body measurements, no high-weight stabilizers). The overhead of logical gates is modest, with the main cost being the synchronization rounds needed to properly interface the gate with the Floquet dynamics.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Completes the Floquet-Bacon-Shor code as a framework for computation, not just memory.</li>
          <li>Schedule-based gates are elegant — they use the Floquet structure rather than fighting it.</li>
          <li>Only two-body measurements required, matching the hardware capabilities of current devices.</li>
          <li>Thorough fault-tolerance analysis with circuit-level noise simulations.</li>
          <li>Clear comparison to static Bacon-Shor enables informed architecture choices.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Non-Clifford gates (T-gate) are not addressed — universality requires additional techniques (magic state injection).</li>
          <li>The synchronization overhead for logical gates adds latency compared to transversal gates in other codes.</li>
          <li>Decoding complexity increases during gate operations due to the modified schedule.</li>
          <li>Limited to the Bacon-Shor variant — generalization to other Floquet codes is not demonstrated.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can magic state injection be adapted to the Floquet-Bacon-Shor dynamical qubit for universal computation?</li>
          <li>How does the Floquet gate overhead scale with code distance compared to lattice surgery on surface codes?</li>
          <li>Can the schedule-based gate approach be generalized to other Floquet codes (e.g., honeycomb code)?</li>
          <li>What is the optimal decoder for the modified schedules during logical gate operations?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper transforms the Floquet-Bacon-Shor code from a memory-only curiosity into a viable computational framework. The key insight — that logical gates can be implemented by schedule modifications rather than additional physical operations — is both elegant and practically important. For groups exploring alternatives to the surface code for near-term fault-tolerant demonstrations, the Floquet-Bacon-Shor code with these logical operations is now a serious contender.</p>
      `
    },
    ko: {
      title: "플로케-베이컨-쇼어 코드에서 동적 큐비트의 논리 연산",
      summary: "플로케-베이컨-쇼어 코드에 인코딩된 동적 큐비트에서의 논리 연산을 시연하며, 플로케 코드 고유의 주기적 측정 스케줄을 결함 허용 논리 게이트에 활용할 수 있음을 보여줍니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 플로케-베이컨-쇼어 코드의 <strong>동적 큐비트에서 결함 허용 논리 연산</strong>을 수행하는 방법을 보여주어, 플로케 코드 이론(메모리에 초점)과 실용적 결함 허용 계산(게이트 필요) 사이의 간극을 연결합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>플로케-베이컨-쇼어 코드의 동적 큐비트에서 초기화, 측정, 클리포드 게이트 등의 논리 연산을 결함 허용을 유지하면서 수행하는 방법은 무엇이며, 정적 서브시스템 코드 구현에 비해 오버헤드는 어떠한가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>플로케 코드는 코드 공간이 고정되지 않고 이체 측정의 시퀀스에 따라 주기적으로 진화하는 동적으로 생성된 양자 오류 정정 코드의 한 종류입니다. 플로케-베이컨-쇼어 코드는 베이컨-쇼어 서브시스템 코드 구조와 플로케 동역학을 결합하여 회로 깊이와 연결성 요구 사항에서 잠재적 이점을 제공합니다. 그러나 대부분의 플로케 코드 연구는 메모리 문제 — 논리 큐비트 보존 — 에 초점을 맞추었으며, 논리 연산 수행이라는 동등하게 중요한 질문은 덜 주목받았습니다.</p>
        <p>플로케 코드의 "동적 큐비트"는 논리 연산에 고유한 도전을 제시합니다: 논리 정보가 측정 스케줄이 진행됨에 따라 서로 다른 물리적 자유도 사이를 이동하며, 모든 논리 게이트는 이 주기적 진화와 동기화되어야 합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>플로케-베이컨-쇼어 인코딩:</strong> 코드는 X-유형과 Z-유형 게이지 측정의 주기적 시퀀스가 있는 2D 그리드에 정의됩니다.</li>
          <li><strong>논리적 초기화:</strong> 플로케 스케줄의 처음 몇 라운드를 적절히 조건화하여 논리적 |0⟩ 및 |+⟩ 상태를 결함 허용으로 준비합니다.</li>
          <li><strong>논리적 측정:</strong> 플로케 스케줄의 마지막 라운드를 수정하여 논리 큐비트를 X 또는 Z 기저에서 파괴적으로 측정합니다.</li>
          <li><strong>논리적 클리포드 게이트:</strong> 특정 라운드에서 플로케 측정 스케줄을 수정하여 논리적 H, S, CNOT 게이트를 구현합니다 — 효과적으로 논리 공간에서 원하는 유니터리를 구현하기 위해 주기적 동역학을 "비틉니다".</li>
          <li><strong>결함 허용 분석:</strong> 회로 수준 잡음 시뮬레이션이 논리 게이트 프로토콜이 코드의 오류 정정 능력을 유지함을 검증합니다.</li>
        </ul>

        <figure>
          <img src="images/floquet-bacon-shor/thumbnail.png" alt="플로케-베이컨-쇼어 논리 연산">
          <figcaption>Thumbnail: 플로케-베이컨-쇼어 코드에서의 논리 연산.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>완전한 논리 게이트 세트:</strong> 플로케-베이컨-쇼어 코드에 대한 초기화, 측정, 클리포드 게이트의 최초 시연입니다.</li>
          <li><strong>스케줄 기반 게이트:</strong> 추가 물리 게이트를 적용하는 대신 측정 스케줄을 수정하여 논리 게이트를 구현하며, 플로케 구조를 활용합니다.</li>
          <li><strong>결함 허용 보존:</strong> 논리 연산이 플로케 동역학과 적절히 동기화될 때 코드의 오류 정정 능력을 손상시키지 않음을 보여줍니다.</li>
          <li><strong>오버헤드 분석:</strong> 정적 베이컨-쇼어 구현과 자원 비용을 비교하여 플로케 접근법의 트레이드오프를 정량화합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 크기</td><td>d = 3, 5, 7 플로케-베이컨-쇼어 코드</td></tr>
            <tr><td>플로케 주기</td><td>코드 크기에 의존; 일반적으로 주기당 2-4 측정 라운드</td></tr>
            <tr><td>게이트 프로토콜</td><td>H, S, CNOT를 위한 스케줄 수정</td></tr>
            <tr><td>잡음 모델</td><td>회로 수준 탈분극 잡음</td></tr>
            <tr><td>시뮬레이션</td><td>BP+OSD 디코딩을 사용한 Stim 기반</td></tr>
            <tr><td>지표</td><td>게이트당 논리적 오류율, 정적 베이컨-쇼어와 비교</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>연산</th><th>논리적 오류율(d=5)</th><th>정적 베이컨-쇼어 대비</th></tr></thead>
          <tbody>
            <tr><td>메모리(유휴)</td><td>정적 코드와 비교 가능</td><td>회로 깊이에서 약간의 이점</td></tr>
            <tr><td>논리적 H</td><td>메모리 위로 작은 오버헤드</td><td>비교 가능</td></tr>
            <tr><td>논리적 S</td><td>중간 오버헤드</td><td>정적보다 약간 높음</td></tr>
            <tr><td>논리적 CNOT</td><td>가장 큰 오버헤드</td><td>격자 수술과 비교 가능</td></tr>
          </tbody>
        </table>
        <p>플로케 접근법은 잠재적으로 더 간단한 하드웨어 요구 사항(이체 측정만, 고중량 안정기 없음)으로 경쟁력 있는 논리적 오류율을 달성합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>플로케-베이컨-쇼어 코드를 메모리뿐 아닌 계산을 위한 프레임워크로 완성합니다.</li>
          <li>스케줄 기반 게이트가 우아합니다 — 플로케 구조와 싸우는 대신 활용합니다.</li>
          <li>이체 측정만 필요하여 현재 장치의 하드웨어 능력에 맞습니다.</li>
          <li>회로 수준 잡음 시뮬레이션을 통한 철저한 결함 허용 분석입니다.</li>
          <li>정적 베이컨-쇼어와의 명확한 비교가 정보에 기반한 아키텍처 선택을 가능하게 합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>비클리포드 게이트(T-게이트)가 다루어지지 않으며, 보편성은 추가 기술(매직 스테이트 주입)이 필요합니다.</li>
          <li>논리 게이트를 위한 동기화 오버헤드가 다른 코드의 트랜스버설 게이트에 비해 지연을 추가합니다.</li>
          <li>수정된 스케줄로 인해 게이트 연산 중 디코딩 복잡성이 증가합니다.</li>
          <li>베이컨-쇼어 변형에 한정되며, 다른 플로케 코드로의 일반화가 시연되지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>매직 스테이트 주입을 보편적 계산을 위한 플로케-베이컨-쇼어 동적 큐비트에 적응시킬 수 있는가?</li>
          <li>플로케 게이트 오버헤드가 표면 코드의 격자 수술과 비교하여 코드 거리에 따라 어떻게 확장되는가?</li>
          <li>스케줄 기반 게이트 접근법을 다른 플로케 코드(예: 벌집 코드)로 일반화할 수 있는가?</li>
          <li>논리 게이트 연산 중 수정된 스케줄에 대한 최적 디코더는 무엇인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 플로케-베이컨-쇼어 코드를 메모리만의 호기심에서 실행 가능한 계산 프레임워크로 변환합니다. 핵심 통찰 — 논리 게이트를 추가 물리 연산이 아닌 스케줄 수정으로 구현할 수 있다는 것 — 은 우아하고 실질적으로 중요합니다. 근단기 결함 허용 시연을 위해 표면 코드의 대안을 탐구하는 그룹에게 이러한 논리 연산이 있는 플로케-베이컨-쇼어 코드는 이제 심각한 경쟁자입니다.</p>
      `
    }
  },

  // ====================================================================
  // 14. detector-likelihood-qec
  // ====================================================================
  {
    id: "detector-likelihood-qec",
    date: "2025-04-11",
    authors: "Hesner, I., Hetényi, B., Wootton, J. R.",
    venue: "Preprint 2024",
    image: "images/detector-likelihood-qec/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Benchmarking", "Detector Likelihood"],
    en: {
      title: "Using Detector Likelihood for Benchmarking Quantum Error Correction",
      summary: "Proposes detector likelihood as a decoder-independent metric for benchmarking QEC experiments, providing a measure of how well the observed syndrome statistics match the expected noise model without requiring actual decoding.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces <strong>detector likelihood</strong> as a principled, decoder-independent metric for QEC benchmarking, enabling fair comparison of QEC experiments across different hardware platforms and code implementations without the confound of decoder performance.</p>

        <h2>Research Question</h2>
        <blockquote>Can a decoder-independent metric based on the likelihood of observed detector events provide a meaningful and practical benchmark for quantum error correction experiments, complementing or replacing logical error rate as the primary figure of merit?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The standard metric for QEC performance is the logical error rate, measured by running many rounds of syndrome extraction and decoding. However, the logical error rate conflates two distinct factors: (1) how well the hardware performs (physical error rates, correlated noise, leakage) and (2) how well the decoder performs (matching efficiency, noise model accuracy). This makes it difficult to compare QEC experiments across different groups that use different decoders.</p>
        <p>Furthermore, the logical error rate provides limited diagnostic information — when it is poor, it does not distinguish between "the hardware has high error rates" and "the decoder is poorly matched to the noise." A decoder-independent metric would separate these concerns, enabling hardware teams to benchmark their QEC implementations without being penalized or advantaged by decoder choice.</p>
        <p>Detector likelihood provides such a metric: it measures how consistent the observed syndrome statistics are with the assumed noise model, without actually performing decoding. High detector likelihood indicates that the hardware noise is well-characterized and the syndromes are as expected; low detector likelihood flags model mismatch or unexpected noise sources.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Detector events:</strong> In the Stim framework, detectors are parity checks on measurement outcomes that should be deterministic in the absence of errors. A detector "firing" indicates an error has occurred.</li>
          <li><strong>Likelihood computation:</strong> Given a noise model, the probability of each observed detector event pattern is computed. The detector likelihood is the average log-probability of the observed patterns across many experimental shots.</li>
          <li><strong>Model comparison:</strong> Different noise models can be compared by their detector likelihoods on the same experimental data — the model that best explains the data has the highest likelihood.</li>
          <li><strong>Diagnostic use:</strong> Anomalously low likelihood for specific detectors pinpoints which stabilizers or qubit regions have unexpected noise behavior.</li>
        </ul>

        <figure>
          <img src="images/detector-likelihood-qec/thumbnail.png" alt="Detector likelihood benchmarking framework">
          <figcaption>Thumbnail: Detector likelihood as a QEC benchmarking metric.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Decoder-independent QEC metric:</strong> First proposal and validation of detector likelihood as a standalone QEC benchmark.</li>
          <li><strong>Noise model validation:</strong> Provides a principled way to assess whether a noise model accurately describes the hardware behavior.</li>
          <li><strong>Diagnostic capability:</strong> Enables spatial and temporal localization of noise model mismatches.</li>
          <li><strong>Practical computation:</strong> Shows that detector likelihood can be computed efficiently for sparse noise models relevant to QEC.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes tested</td><td>Surface code (d=3,5,7), repetition code</td></tr>
            <tr><td>Data sources</td><td>Simulated (Stim) and real hardware (IBM, Google) data</td></tr>
            <tr><td>Noise models</td><td>Depolarizing, phenomenological, circuit-level, experimentally calibrated</td></tr>
            <tr><td>Likelihood computation</td><td>Exact for small codes; sampling-based approximation for larger codes</td></tr>
            <tr><td>Comparison metrics</td><td>Logical error rate (with various decoders), detector likelihood</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Experiment</th><th>Logical Error Rate</th><th>Detector Likelihood</th><th>Insight</th></tr></thead>
          <tbody>
            <tr><td>Good hardware + good decoder</td><td>Low</td><td>High</td><td>Both metrics agree</td></tr>
            <tr><td>Good hardware + poor decoder</td><td>Moderate</td><td>High</td><td>Likelihood correctly identifies good hardware</td></tr>
            <tr><td>Poor hardware + good decoder</td><td>Moderate</td><td>Low</td><td>Likelihood correctly identifies hardware issues</td></tr>
            <tr><td>Noise model mismatch</td><td>Variable</td><td>Very low</td><td>Likelihood detects model mismatch that logical error rate misses</td></tr>
          </tbody>
        </table>
        <p>The key result is that detector likelihood separates hardware quality from decoder quality, and additionally serves as a noise model validation tool. Experiments with high detector likelihood but poor logical error rates clearly indicate decoder issues; experiments with low detector likelihood indicate hardware or model problems regardless of the logical error rate.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a real need — the QEC community lacks standardized decoder-independent benchmarks.</li>
          <li>Principled statistical framework based on likelihood, a well-understood concept.</li>
          <li>Diagnostic value goes beyond a single number — spatial and temporal likelihood maps reveal noise structure.</li>
          <li>Compatible with the Stim ecosystem, enabling wide adoption.</li>
          <li>Validated on both simulated and real hardware data.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Requires a noise model to compute likelihood — the metric is only as good as the model it evaluates against.</li>
          <li>Does not replace logical error rate — it complements it, adding a different perspective.</li>
          <li>Computation becomes expensive for large codes with many detectors.</li>
          <li>Sensitivity to rare but important error events (e.g., leakage) may be limited by finite sampling.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Should detector likelihood become a standard reported metric alongside logical error rate in QEC papers?</li>
          <li>Can detector likelihood be used to automatically tune noise models for better decoder performance?</li>
          <li>How does detector likelihood relate to other information-theoretic quantities like mutual information between errors and syndromes?</li>
          <li>Can the framework be extended to detect non-Markovian noise or temporal correlations?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>Detector likelihood is a simple but powerful idea: measure how well the hardware matches the noise model, independently of decoding. As QEC experiments become more sophisticated and cross-platform comparisons become more important, having a decoder-independent benchmark is essential. This paper provides a well-motivated, practically computable, and diagnostically rich metric that the QEC community should seriously consider adopting.</p>
      `
    },
    ko: {
      title: "양자 오류 정정 벤치마킹을 위한 디텍터 우도 사용",
      summary: "실제 디코딩 없이 관찰된 신드롬 통계가 예상 잡음 모델과 얼마나 잘 일치하는지 측정하는 디코더 독립적 QEC 벤치마킹 지표로서 디텍터 우도를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>디텍터 우도</strong>를 QEC 벤치마킹을 위한 원칙적이고 디코더 독립적인 지표로 도입하여, 디코더 성능의 교란 변수 없이 서로 다른 하드웨어 플랫폼과 코드 구현에 걸쳐 QEC 실험의 공정한 비교를 가능하게 합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>관찰된 디텍터 이벤트의 우도에 기반한 디코더 독립적 지표가 양자 오류 정정 실험을 위한 의미 있고 실용적인 벤치마크를 제공할 수 있으며, 논리적 오류율을 주요 성능 지표로서 보완하거나 대체할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>QEC 성능의 표준 지표는 논리적 오류율로, 많은 라운드의 신드롬 추출과 디코딩을 실행하여 측정됩니다. 그러나 논리적 오류율은 두 가지 구별되는 요인을 혼합합니다: (1) 하드웨어가 얼마나 잘 수행되는가(물리적 오류율, 상관 잡음, 누출)와 (2) 디코더가 얼마나 잘 수행되는가(매칭 효율, 잡음 모델 정확도). 이는 서로 다른 디코더를 사용하는 그룹 간 QEC 실험 비교를 어렵게 합니다.</p>
        <p>또한 논리적 오류율은 제한된 진단 정보를 제공합니다 — 성능이 좋지 않을 때 "하드웨어의 오류율이 높다"와 "디코더가 잡음에 잘 맞지 않는다"를 구별하지 못합니다. 디코더 독립적 지표는 이러한 관심사를 분리하여 하드웨어 팀이 디코더 선택에 의해 불이익을 받거나 이점을 얻지 않고 QEC 구현을 벤치마킹할 수 있게 합니다.</p>
        <p>디텍터 우도는 실제 디코딩을 수행하지 않고 관찰된 신드롬 통계가 가정된 잡음 모델과 얼마나 일관되는지를 측정하여 그러한 지표를 제공합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>디텍터 이벤트:</strong> Stim 프레임워크에서 디텍터는 오류가 없을 때 결정적이어야 하는 측정 결과에 대한 패리티 검사입니다.</li>
          <li><strong>우도 계산:</strong> 잡음 모델이 주어지면, 관찰된 각 디텍터 이벤트 패턴의 확률을 계산합니다. 디텍터 우도는 많은 실험 샷에 걸친 관찰된 패턴의 평균 로그 확률입니다.</li>
          <li><strong>모델 비교:</strong> 서로 다른 잡음 모델을 동일한 실험 데이터에서 디텍터 우도로 비교할 수 있으며, 데이터를 가장 잘 설명하는 모델이 가장 높은 우도를 가집니다.</li>
          <li><strong>진단 사용:</strong> 특정 디텍터에 대한 비정상적으로 낮은 우도가 예상치 못한 잡음 행동을 가진 안정기 또는 큐비트 영역을 지적합니다.</li>
        </ul>

        <figure>
          <img src="images/detector-likelihood-qec/thumbnail.png" alt="디텍터 우도 벤치마킹 프레임워크">
          <figcaption>Thumbnail: QEC 벤치마킹 지표로서의 디텍터 우도.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>디코더 독립적 QEC 지표:</strong> 독립적 QEC 벤치마크로서 디텍터 우도의 최초 제안 및 검증입니다.</li>
          <li><strong>잡음 모델 검증:</strong> 잡음 모델이 하드웨어 행동을 정확히 설명하는지 평가하는 원칙적 방법을 제공합니다.</li>
          <li><strong>진단 능력:</strong> 잡음 모델 불일치의 공간적 및 시간적 지역화를 가능하게 합니다.</li>
          <li><strong>실용적 계산:</strong> QEC에 관련된 희소 잡음 모델에 대해 디텍터 우도를 효율적으로 계산할 수 있음을 보여줍니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트된 코드</td><td>표면 코드(d=3,5,7), 반복 코드</td></tr>
            <tr><td>데이터 소스</td><td>시뮬레이션(Stim) 및 실제 하드웨어(IBM, Google) 데이터</td></tr>
            <tr><td>잡음 모델</td><td>탈분극, 현상학적, 회로 수준, 실험적으로 교정된</td></tr>
            <tr><td>우도 계산</td><td>작은 코드에서 정확; 큰 코드에서 샘플링 기반 근사</td></tr>
            <tr><td>비교 지표</td><td>논리적 오류율(다양한 디코더), 디텍터 우도</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>실험</th><th>논리적 오류율</th><th>디텍터 우도</th><th>통찰</th></tr></thead>
          <tbody>
            <tr><td>좋은 하드웨어 + 좋은 디코더</td><td>낮음</td><td>높음</td><td>두 지표가 일치</td></tr>
            <tr><td>좋은 하드웨어 + 나쁜 디코더</td><td>중간</td><td>높음</td><td>우도가 좋은 하드웨어를 올바르게 식별</td></tr>
            <tr><td>나쁜 하드웨어 + 좋은 디코더</td><td>중간</td><td>낮음</td><td>우도가 하드웨어 문제를 올바르게 식별</td></tr>
            <tr><td>잡음 모델 불일치</td><td>가변적</td><td>매우 낮음</td><td>우도가 논리적 오류율이 놓치는 모델 불일치를 감지</td></tr>
          </tbody>
        </table>
        <p>핵심 결과는 디텍터 우도가 하드웨어 품질과 디코더 품질을 분리하며, 추가로 잡음 모델 검증 도구로도 역할한다는 것입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실제 필요를 다룹니다 — QEC 커뮤니티에 표준화된 디코더 독립적 벤치마크가 부족합니다.</li>
          <li>잘 이해된 개념인 우도에 기반한 원칙적 통계 프레임워크입니다.</li>
          <li>진단 가치가 단일 숫자를 넘어갑니다 — 공간적 및 시간적 우도 맵이 잡음 구조를 드러냅니다.</li>
          <li>Stim 생태계와 호환되어 널리 채택이 가능합니다.</li>
          <li>시뮬레이션 및 실제 하드웨어 데이터 모두에서 검증되었습니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>우도를 계산하려면 잡음 모델이 필요합니다 — 지표는 평가하는 모델만큼만 좋습니다.</li>
          <li>논리적 오류율을 대체하지 않으며, 다른 관점을 추가하여 보완합니다.</li>
          <li>많은 디텍터가 있는 큰 코드에서 계산이 비용이 높아집니다.</li>
          <li>드물지만 중요한 오류 이벤트(예: 누출)에 대한 감도가 유한 샘플링에 의해 제한될 수 있습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>디텍터 우도가 QEC 논문에서 논리적 오류율과 함께 표준 보고 지표가 되어야 하는가?</li>
          <li>디텍터 우도를 더 나은 디코더 성능을 위해 잡음 모델을 자동으로 조정하는 데 사용할 수 있는가?</li>
          <li>디텍터 우도가 오류와 신드롬 사이의 상호 정보와 같은 다른 정보 이론적 양과 어떻게 관련되는가?</li>
          <li>프레임워크를 비마르코프 잡음이나 시간적 상관관계를 감지하도록 확장할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>디텍터 우도는 단순하지만 강력한 아이디어입니다: 디코딩과 독립적으로 하드웨어가 잡음 모델과 얼마나 잘 일치하는지 측정합니다. QEC 실험이 더 정교해지고 교차 플랫폼 비교가 더 중요해짐에 따라, 디코더 독립적 벤치마크를 갖는 것이 필수적입니다. 이 논문은 QEC 커뮤니티가 채택을 심각하게 고려해야 할 잘 동기 부여되고, 실질적으로 계산 가능하며, 진단적으로 풍부한 지표를 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 15. dc-mbqc
  // ====================================================================
  {
    id: "dc-mbqc",
    date: "2025-04-11",
    authors: "Xue, Y., Yang, R., Liang, Z., Li, T.",
    venue: "Preprint 2025",
    image: "images/dc-mbqc/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "MBQC", "Distributed Computing", "Compilation"],
    en: {
      title: "DC-MBQC: A Distributed Compilation Framework for Measurement-Based Quantum Computing",
      summary: "Presents a distributed compilation framework for measurement-based quantum computing that partitions computation across multiple quantum processing units connected by entanglement links, optimizing for communication cost and resource usage.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper addresses the <strong>compilation challenge for distributed measurement-based quantum computing</strong>, providing a framework that automatically partitions MBQC graph states across quantum processing units and optimizes inter-node entanglement consumption.</p>

        <h2>Research Question</h2>
        <blockquote>How can measurement-based quantum computations be efficiently compiled and distributed across multiple quantum processing units (QPUs) connected by entanglement links, minimizing the inter-node communication overhead?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Measurement-based quantum computing (MBQC) is an alternative computational model where computation proceeds by adaptive single-qubit measurements on a pre-prepared entangled resource state (typically a cluster or graph state). While MBQC is theoretically universal, scaling it to large computations faces the same fundamental challenge as circuit-model QC: single quantum processors have limited qubit counts.</p>
        <p>Distributed quantum computing addresses this by connecting multiple QPUs via entanglement links (Bell pairs). For the circuit model, distributed compilation is relatively well-studied, but for MBQC, the compilation problem is qualitatively different: the computation is defined by a graph state and measurement pattern, and the graph must be partitioned across QPUs with inter-node edges replaced by entanglement consumption protocols.</p>
        <p>DC-MBQC provides the first comprehensive compilation framework for this setting, handling graph state partitioning, measurement order optimization, and entanglement resource management.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Graph state partitioning:</strong> The MBQC graph state is partitioned into subgraphs assigned to different QPUs. The partitioning minimizes the number of inter-node edges (which require Bell pair consumption) while balancing qubit load across QPUs.</li>
          <li><strong>Entanglement-mediated edges:</strong> Inter-node edges in the graph state are implemented using pre-shared Bell pairs and local operations + classical communication (LOCC), with the framework tracking Bell pair consumption.</li>
          <li><strong>Measurement scheduling:</strong> The adaptive measurement order is optimized to respect both the causal structure of the computation (some measurements must precede others) and the distributed setting (minimize idle time while waiting for classical feedforward across QPUs).</li>
          <li><strong>Resource optimization:</strong> The framework jointly optimizes graph partitioning, Bell pair allocation, and measurement scheduling to minimize total execution time and entanglement cost.</li>
        </ul>

        <figure>
          <img src="images/dc-mbqc/thumbnail.png" alt="DC-MBQC distributed compilation framework">
          <figcaption>Thumbnail: DC-MBQC framework for distributed measurement-based quantum computing.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>First MBQC-native distributed compiler:</strong> Previous distributed compilation work targets the circuit model; this is the first framework designed specifically for MBQC graph states.</li>
          <li><strong>Graph partitioning algorithms:</strong> Develops partitioning algorithms that exploit the structure of MBQC graph states (e.g., cluster state regularity) for efficient distribution.</li>
          <li><strong>Joint optimization:</strong> Simultaneously optimizes partitioning, entanglement allocation, and measurement scheduling — these are typically treated separately.</li>
          <li><strong>Scalability analysis:</strong> Provides scaling results showing how entanglement cost grows with computation size and QPU count.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Graph state types</td><td>2D cluster states, brickwork states, arbitrary graph states</td></tr>
            <tr><td>QPU count</td><td>2 to 16 QPUs in experiments</td></tr>
            <tr><td>Qubits per QPU</td><td>10 to 100</td></tr>
            <tr><td>Partitioning algorithms</td><td>METIS-based, spectral, custom MBQC-aware heuristic</td></tr>
            <tr><td>Entanglement model</td><td>Pre-shared Bell pairs with finite generation rate</td></tr>
            <tr><td>Benchmarks</td><td>Random circuits compiled to MBQC, QFT, Grover, VQE ansatze</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Benchmark</th><th>Entanglement Cost (Bell pairs)</th><th>Execution Time Overhead</th><th>vs. Naive Partitioning</th></tr></thead>
          <tbody>
            <tr><td>QFT (20 qubits, 4 QPUs)</td><td>Moderate</td><td>~1.5x vs. single QPU</td><td>40% reduction in Bell pairs</td></tr>
            <tr><td>Grover (16 qubits, 4 QPUs)</td><td>Low-moderate</td><td>~1.3x</td><td>35% reduction</td></tr>
            <tr><td>Random circuit (50 qubits, 8 QPUs)</td><td>Higher</td><td>~2x</td><td>50% reduction</td></tr>
            <tr><td>VQE ansatz (30 qubits, 4 QPUs)</td><td>Low</td><td>~1.2x</td><td>30% reduction</td></tr>
          </tbody>
        </table>
        <p>The MBQC-aware partitioning consistently outperforms naive graph partitioning (e.g., METIS without MBQC-specific adaptations), with the advantage growing for more structured computations like QFT and VQE where the graph state has exploitable regularity.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Fills an important gap — distributed MBQC compilation was previously unexplored.</li>
          <li>Joint optimization of partitioning, entanglement, and scheduling is the right approach for a coupled problem.</li>
          <li>Practical MBQC-aware heuristics outperform generic graph partitioning tools.</li>
          <li>Comprehensive benchmark suite covering diverse quantum algorithms.</li>
          <li>Clear scaling analysis helps predict resource requirements for larger systems.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Assumes perfect Bell pair generation — noisy entanglement links would require entanglement purification overhead.</li>
          <li>Classical communication latency between QPUs is modeled simplistically.</li>
          <li>The framework does not incorporate fault tolerance — integrating with topological MBQC is future work.</li>
          <li>Partitioning algorithms are heuristic — optimality gaps are not quantified.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does the framework extend to fault-tolerant MBQC with topological cluster states?</li>
          <li>Can the compilation be adapted to heterogeneous QPU networks with different qubit counts and connectivity?</li>
          <li>How does entanglement generation rate limit the practical speedup of distributed MBQC?</li>
          <li>Is there a fundamental communication complexity lower bound for distributed MBQC that these heuristics approach?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>DC-MBQC provides the missing compilation layer for distributed measurement-based quantum computing. As quantum networks mature and multi-QPU architectures become practical, the ability to efficiently compile MBQC computations across distributed nodes will be essential. This framework lays the groundwork and demonstrates that MBQC-aware compilation can significantly reduce entanglement costs compared to generic approaches.</p>
      `
    },
    ko: {
      title: "DC-MBQC: 측정 기반 양자 컴퓨팅을 위한 분산 컴파일 프레임워크",
      summary: "얽힘 링크로 연결된 여러 양자 처리 장치에 걸쳐 계산을 분할하고 통신 비용과 자원 사용을 최적화하는 측정 기반 양자 컴퓨팅의 분산 컴파일 프레임워크를 제시합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>분산 측정 기반 양자 컴퓨팅의 컴파일 과제</strong>를 다루며, MBQC 그래프 상태를 양자 처리 장치에 걸쳐 자동으로 분할하고 노드 간 얽힘 소비를 최적화하는 프레임워크를 제공합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>얽힘 링크로 연결된 여러 양자 처리 장치(QPU)에 걸쳐 측정 기반 양자 계산을 효율적으로 컴파일하고 분산하여 노드 간 통신 오버헤드를 최소화할 수 있는 방법은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>측정 기반 양자 컴퓨팅(MBQC)은 미리 준비된 얽힌 자원 상태(일반적으로 클러스터 또는 그래프 상태)에 대한 적응적 단일 큐비트 측정으로 계산이 진행되는 대안적 계산 모델입니다. MBQC는 이론적으로 보편적이지만, 대규모 계산으로의 확장은 회로 모델 QC와 동일한 근본적 도전에 직면합니다: 단일 양자 프로세서의 큐비트 수가 제한되어 있습니다.</p>
        <p>분산 양자 컴퓨팅은 얽힘 링크(벨 쌍)를 통해 여러 QPU를 연결하여 이를 해결합니다. 회로 모델의 경우 분산 컴파일이 비교적 잘 연구되었지만, MBQC의 경우 컴파일 문제가 질적으로 다릅니다: 계산이 그래프 상태와 측정 패턴으로 정의되며, 그래프가 QPU에 걸쳐 분할되어야 하고 노드 간 엣지가 얽힘 소비 프로토콜로 대체되어야 합니다.</p>
        <p>DC-MBQC는 이 설정을 위한 최초의 포괄적 컴파일 프레임워크를 제공하며, 그래프 상태 분할, 측정 순서 최적화, 얽힘 자원 관리를 다룹니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>그래프 상태 분할:</strong> MBQC 그래프 상태를 다른 QPU에 할당된 부분 그래프로 분할합니다. 분할은 노드 간 엣지 수(벨 쌍 소비 필요)를 최소화하면서 QPU 간 큐비트 부하를 균형 맞춥니다.</li>
          <li><strong>얽힘 매개 엣지:</strong> 그래프 상태의 노드 간 엣지는 사전 공유된 벨 쌍과 국소 연산 + 고전 통신(LOCC)을 사용하여 구현되며, 프레임워크가 벨 쌍 소비를 추적합니다.</li>
          <li><strong>측정 스케줄링:</strong> 적응적 측정 순서가 계산의 인과 구조(일부 측정이 다른 것에 선행해야 함)와 분산 설정(QPU 간 고전 피드포워드를 기다리는 동안 유휴 시간 최소화) 모두를 존중하도록 최적화됩니다.</li>
          <li><strong>자원 최적화:</strong> 프레임워크가 그래프 분할, 벨 쌍 할당, 측정 스케줄링을 공동으로 최적화하여 총 실행 시간과 얽힘 비용을 최소화합니다.</li>
        </ul>

        <figure>
          <img src="images/dc-mbqc/thumbnail.png" alt="DC-MBQC 분산 컴파일 프레임워크">
          <figcaption>Thumbnail: 분산 측정 기반 양자 컴퓨팅을 위한 DC-MBQC 프레임워크.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>최초의 MBQC 네이티브 분산 컴파일러:</strong> 이전의 분산 컴파일 연구는 회로 모델을 대상으로 했으며, 이는 MBQC 그래프 상태를 위해 특별히 설계된 최초의 프레임워크입니다.</li>
          <li><strong>그래프 분할 알고리즘:</strong> 효율적 분산을 위해 MBQC 그래프 상태의 구조(예: 클러스터 상태 규칙성)를 활용하는 분할 알고리즘을 개발합니다.</li>
          <li><strong>공동 최적화:</strong> 일반적으로 별도로 처리되는 분할, 얽힘 할당, 측정 스케줄링을 동시에 최적화합니다.</li>
          <li><strong>확장성 분석:</strong> 계산 크기와 QPU 수에 따라 얽힘 비용이 어떻게 증가하는지 보여주는 확장 결과를 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>그래프 상태 유형</td><td>2D 클러스터 상태, 벽돌 상태, 임의 그래프 상태</td></tr>
            <tr><td>QPU 수</td><td>실험에서 2~16 QPU</td></tr>
            <tr><td>QPU당 큐비트</td><td>10~100</td></tr>
            <tr><td>분할 알고리즘</td><td>METIS 기반, 스펙트럴, 맞춤형 MBQC 인식 휴리스틱</td></tr>
            <tr><td>얽힘 모델</td><td>유한 생성률의 사전 공유 벨 쌍</td></tr>
            <tr><td>벤치마크</td><td>MBQC로 컴파일된 무작위 회로, QFT, 그로버, VQE 안자츠</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>벤치마크</th><th>얽힘 비용(벨 쌍)</th><th>실행 시간 오버헤드</th><th>순진 분할 대비</th></tr></thead>
          <tbody>
            <tr><td>QFT(20큐비트, 4 QPU)</td><td>중간</td><td>단일 QPU 대비 ~1.5배</td><td>벨 쌍 40% 감소</td></tr>
            <tr><td>그로버(16큐비트, 4 QPU)</td><td>중하</td><td>~1.3배</td><td>35% 감소</td></tr>
            <tr><td>무작위 회로(50큐비트, 8 QPU)</td><td>높음</td><td>~2배</td><td>50% 감소</td></tr>
            <tr><td>VQE 안자츠(30큐비트, 4 QPU)</td><td>낮음</td><td>~1.2배</td><td>30% 감소</td></tr>
          </tbody>
        </table>
        <p>MBQC 인식 분할이 순진한 그래프 분할(예: MBQC 특화 적응 없는 METIS)을 일관되게 능가하며, QFT와 VQE처럼 그래프 상태가 활용 가능한 규칙성을 가진 더 구조화된 계산에서 이점이 커집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>중요한 공백을 채웁니다 — 분산 MBQC 컴파일은 이전에 탐구되지 않았습니다.</li>
          <li>분할, 얽힘, 스케줄링의 공동 최적화가 결합된 문제에 대한 올바른 접근법입니다.</li>
          <li>실용적 MBQC 인식 휴리스틱이 일반적 그래프 분할 도구를 능가합니다.</li>
          <li>다양한 양자 알고리즘을 다루는 포괄적 벤치마크 모음입니다.</li>
          <li>명확한 확장 분석이 더 큰 시스템의 자원 요구 예측에 도움이 됩니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>완벽한 벨 쌍 생성을 가정합니다 — 잡음 있는 얽힘 링크는 얽힘 정화 오버헤드를 필요로 합니다.</li>
          <li>QPU 간 고전 통신 지연이 단순하게 모델링됩니다.</li>
          <li>프레임워크가 결함 허용을 포함하지 않으며, 위상적 MBQC와의 통합은 향후 연구입니다.</li>
          <li>분할 알고리즘이 휴리스틱이며, 최적성 간극이 정량화되지 않습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>프레임워크가 위상적 클러스터 상태를 사용한 결함 허용 MBQC로 어떻게 확장되는가?</li>
          <li>컴파일을 서로 다른 큐비트 수와 연결성을 가진 이기종 QPU 네트워크에 적응시킬 수 있는가?</li>
          <li>얽힘 생성률이 분산 MBQC의 실용적 속도 향상을 어떻게 제한하는가?</li>
          <li>이 휴리스틱이 접근하는 분산 MBQC에 대한 근본적 통신 복잡도 하한이 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>DC-MBQC는 분산 측정 기반 양자 컴퓨팅의 누락된 컴파일 계층을 제공합니다. 양자 네트워크가 성숙하고 다중 QPU 아키텍처가 실용적이 되면, 분산 노드에 걸쳐 MBQC 계산을 효율적으로 컴파일하는 능력이 필수적이 됩니다. 이 프레임워크는 기초를 놓고 MBQC 인식 컴파일이 일반적 접근법에 비해 얽힘 비용을 상당히 줄일 수 있음을 보여줍니다.</p>
      `
    }
  },

  // ====================================================================
  // 16. clifford-compass-codes
  // ====================================================================
  {
    id: "clifford-compass-codes",
    date: "2025-04-11",
    authors: "Campos, J. A., Brown, K. R.",
    venue: "Preprint 2025",
    image: "images/clifford-compass-codes/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Compass Codes", "Clifford Deformation", "QEC"],
    en: {
      title: "Clifford-Deformed Compass Codes",
      summary: "Applies Clifford deformations to compass codes — a family interpolating between the surface code and Bacon-Shor code — to tailor their error correction properties to biased noise, achieving improved thresholds under realistic noise models.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper applies <strong>Clifford deformations to compass codes</strong>, demonstrating that the noise-adaptation benefits of Clifford deformation (previously shown for surface codes) extend to the broader compass code family, enabling fine-grained optimization of codes for biased noise channels.</p>

        <h2>Research Question</h2>
        <blockquote>Can Clifford deformations be applied to compass codes — the family of codes interpolating between surface codes and Bacon-Shor codes — to improve their performance under biased noise, and how do the optimal deformations depend on the code's position in the compass code family?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Compass codes are a family of CSS subsystem codes defined on a 2D grid that smoothly interpolates between the surface code (all weight-4 stabilizers) and the Bacon-Shor code (weight-2 gauge operators). By adjusting which gauge operators are promoted to stabilizers, one can tune the code's properties — trading surface-code-like locality for Bacon-Shor-like gauge flexibility.</p>
        <p>Clifford deformation is a technique that applies single-qubit Clifford rotations to the data qubits of a stabilizer code, effectively transforming the stabilizers while preserving the code's distance and logical operators. On surface codes, Clifford deformation has been shown to dramatically improve performance under biased noise (e.g., Z-biased depolarizing noise) by aligning the code's sensitivity with the noise structure.</p>
        <p>This paper explores whether the benefits of Clifford deformation extend to the compass code family and how the optimal deformation changes as one moves from the surface code to the Bacon-Shor code along the compass code interpolation.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Compass code construction:</strong> Starting from a 2D grid, compass codes are constructed by choosing which pairs of adjacent gauge operators to merge into weight-4 stabilizers. The choice defines a point in the compass code family.</li>
          <li><strong>Clifford deformation:</strong> Single-qubit Clifford gates (H, S, HS, etc.) are applied to selected data qubits, transforming the stabilizer generators. The code distance is preserved but the stabilizer weights and types change.</li>
          <li><strong>Noise model:</strong> Biased Pauli noise channels where Z errors occur more frequently than X or Y errors, parameterized by a bias ratio η = p_Z / p_X.</li>
          <li><strong>Optimization:</strong> For each compass code instance and noise bias, the optimal Clifford deformation is found by exhaustive search (small codes) or heuristic optimization (larger codes), maximizing the threshold or minimizing the logical error rate.</li>
        </ul>

        <figure>
          <img src="images/clifford-compass-codes/thumbnail.png" alt="Clifford-deformed compass codes">
          <figcaption>Thumbnail: Compass code family with Clifford deformation for biased noise.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Clifford deformation for compass codes:</strong> First application of Clifford deformation beyond the surface code to the broader compass code family.</li>
          <li><strong>Bias-dependent optimal deformations:</strong> Maps how the optimal Clifford deformation changes as a function of both noise bias and position in the compass code family.</li>
          <li><strong>Threshold improvements:</strong> Demonstrates significant threshold improvements under biased noise for compass codes that interpolate between surface and Bacon-Shor.</li>
          <li><strong>Design guidelines:</strong> Provides practical guidance on which compass code + deformation combination is optimal for a given bias level.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code sizes</td><td>d = 3, 5, 7, 9 compass codes</td></tr>
            <tr><td>Compass code instances</td><td>Full interpolation from surface code to Bacon-Shor</td></tr>
            <tr><td>Clifford deformations</td><td>All single-qubit Cliffords applied per-qubit</td></tr>
            <tr><td>Noise models</td><td>Biased depolarizing with η = 1 (unbiased) to η = 1000</td></tr>
            <tr><td>Decoders</td><td>MWPM, BP+OSD adapted for deformed codes</td></tr>
            <tr><td>Simulation</td><td>Stim circuit-level simulation</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Compass Code Type</th><th>Unbiased (η=1)</th><th>Moderate Bias (η=10)</th><th>High Bias (η=100)</th></tr></thead>
          <tbody>
            <tr><td>Surface code (no deformation)</td><td>Baseline</td><td>Baseline</td><td>Baseline</td></tr>
            <tr><td>Surface code + deformation</td><td>Similar</td><td>Improved</td><td>Significantly improved</td></tr>
            <tr><td>Compass (mid-family) + deformation</td><td>Similar</td><td>Best at moderate bias</td><td>Competitive</td></tr>
            <tr><td>Near-Bacon-Shor + deformation</td><td>Slightly worse</td><td>Competitive</td><td>Best at high bias</td></tr>
          </tbody>
        </table>
        <p>The results reveal an interesting landscape: the optimal code + deformation combination shifts as the noise bias changes. At moderate bias, compass codes in the middle of the family (between surface and Bacon-Shor) with appropriate deformations can outperform both endpoints. At high bias, near-Bacon-Shor deformed codes become optimal.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Natural extension — Clifford deformation and compass codes are both well-studied individually; combining them yields new insights.</li>
          <li>Practical relevance — many quantum hardware platforms exhibit biased noise (e.g., Z-bias in superconducting qubits).</li>
          <li>Complete landscape mapping — systematic exploration of the code-deformation-bias parameter space.</li>
          <li>Actionable results — clear recommendations for which code+deformation to use at each bias level.</li>
          <li>Compatible with standard decoding infrastructure.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Optimization over Clifford deformations is exponential in qubit count — scalable heuristics are needed for large codes.</li>
          <li>Only Pauli biased noise is considered — more complex noise structures (e.g., coherent errors, leakage) are not addressed.</li>
          <li>Compass codes share the surface code's sub-optimal encoding rate — qLDPC codes may be more efficient overall.</li>
          <li>Decoder adaptation to deformed codes may require additional implementation effort in practice.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can Clifford deformation be applied to qLDPC codes, or is the compass/surface code locality essential?</li>
          <li>How do Clifford-deformed compass codes compare to the XZZX surface code, which also targets biased noise?</li>
          <li>Can the optimal deformation be learned online by monitoring the noise bias during QEC operation?</li>
          <li>Is there a theoretical framework predicting the optimal deformation from the noise channel without brute-force search?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates that the combination of compass codes and Clifford deformation creates a rich design space for noise-adapted quantum error correction. The key practical insight is that the optimal code is not always the surface code or the Bacon-Shor code — intermediate compass codes with appropriate deformations can outperform both under biased noise. For hardware teams with characterized noise bias, this work provides a menu of optimized code choices that can improve fault-tolerant performance without changing the hardware.</p>
      `
    },
    ko: {
      title: "클리포드 변형 나침반 코드",
      summary: "표면 코드와 베이컨-쇼어 코드 사이를 보간하는 나침반 코드 계열에 클리포드 변형을 적용하여 편향 잡음에 대한 오류 정정 특성을 맞춤화하고 현실적 잡음 모델에서 개선된 임계값을 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>이 논문은 <strong>나침반 코드에 클리포드 변형</strong>을 적용하여, 클리포드 변형의 잡음 적응 이점(이전에 표면 코드에서 보여진)이 더 넓은 나침반 코드 계열로 확장됨을 보여주며, 편향 잡음 채널에 대한 코드의 세밀한 최적화를 가능하게 합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>표면 코드와 베이컨-쇼어 코드 사이를 보간하는 나침반 코드 계열에 클리포드 변형을 적용하여 편향 잡음에서의 성능을 개선할 수 있으며, 최적 변형이 나침반 코드 계열에서의 코드 위치에 어떻게 의존하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>나침반 코드는 표면 코드(모든 가중치-4 안정기)와 베이컨-쇼어 코드(가중치-2 게이지 연산자) 사이를 매끄럽게 보간하는 2D 그리드에 정의된 CSS 서브시스템 코드 계열입니다. 어떤 게이지 연산자를 안정기로 승격시킬지 조정하여 코드의 속성을 조절할 수 있습니다.</p>
        <p>클리포드 변형은 안정기 코드의 데이터 큐비트에 단일 큐비트 클리포드 회전을 적용하여 코드의 거리와 논리 연산자를 보존하면서 안정기를 효과적으로 변환하는 기술입니다. 표면 코드에서 클리포드 변형은 코드의 감도를 잡음 구조에 맞추어 편향 잡음에서 성능을 극적으로 향상시키는 것으로 나타났습니다.</p>
        <p>이 논문은 클리포드 변형의 이점이 나침반 코드 계열로 확장되는지와 나침반 코드 보간에서 표면 코드에서 베이컨-쇼어 코드로 이동할 때 최적 변형이 어떻게 변하는지를 탐구합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>나침반 코드 구성:</strong> 2D 그리드에서 시작하여 인접한 게이지 연산자 쌍 중 어떤 것을 가중치-4 안정기로 병합할지 선택하여 나침반 코드를 구성합니다.</li>
          <li><strong>클리포드 변형:</strong> 선택된 데이터 큐비트에 단일 큐비트 클리포드 게이트(H, S, HS 등)를 적용하여 안정기 생성자를 변환합니다. 코드 거리는 보존되지만 안정기 가중치와 유형이 변합니다.</li>
          <li><strong>잡음 모델:</strong> Z 오류가 X 또는 Y 오류보다 더 자주 발생하는 편향 파울리 잡음 채널, 편향 비율 η = p_Z / p_X로 매개변수화됩니다.</li>
          <li><strong>최적화:</strong> 각 나침반 코드 인스턴스와 잡음 편향에 대해 완전 검색(작은 코드) 또는 휴리스틱 최적화(더 큰 코드)로 최적 클리포드 변형을 찾습니다.</li>
        </ul>

        <figure>
          <img src="images/clifford-compass-codes/thumbnail.png" alt="클리포드 변형 나침반 코드">
          <figcaption>Thumbnail: 편향 잡음에 대한 클리포드 변형이 적용된 나침반 코드 계열.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>나침반 코드를 위한 클리포드 변형:</strong> 표면 코드를 넘어 더 넓은 나침반 코드 계열에 대한 클리포드 변형의 최초 적용입니다.</li>
          <li><strong>편향 의존적 최적 변형:</strong> 잡음 편향과 나침반 코드 계열에서의 위치 모두의 함수로 최적 클리포드 변형이 어떻게 변하는지 매핑합니다.</li>
          <li><strong>임계값 개선:</strong> 표면 코드와 베이컨-쇼어 사이를 보간하는 나침반 코드에서 편향 잡음 하의 상당한 임계값 개선을 보여줍니다.</li>
          <li><strong>설계 지침:</strong> 주어진 편향 수준에 대해 어떤 나침반 코드 + 변형 조합이 최적인지에 대한 실용적 지침을 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드 크기</td><td>d = 3, 5, 7, 9 나침반 코드</td></tr>
            <tr><td>나침반 코드 인스턴스</td><td>표면 코드에서 베이컨-쇼어까지의 전체 보간</td></tr>
            <tr><td>클리포드 변형</td><td>큐비트당 적용되는 모든 단일 큐비트 클리포드</td></tr>
            <tr><td>잡음 모델</td><td>η = 1(비편향)에서 η = 1000까지의 편향 탈분극</td></tr>
            <tr><td>디코더</td><td>변형된 코드에 적응된 MWPM, BP+OSD</td></tr>
            <tr><td>시뮬레이션</td><td>Stim 회로 수준 시뮬레이션</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>나침반 코드 유형</th><th>비편향(η=1)</th><th>중간 편향(η=10)</th><th>높은 편향(η=100)</th></tr></thead>
          <tbody>
            <tr><td>표면 코드(변형 없음)</td><td>기준선</td><td>기준선</td><td>기준선</td></tr>
            <tr><td>표면 코드 + 변형</td><td>유사</td><td>개선</td><td>상당히 개선</td></tr>
            <tr><td>나침반(계열 중간) + 변형</td><td>유사</td><td>중간 편향에서 최고</td><td>경쟁적</td></tr>
            <tr><td>근베이컨-쇼어 + 변형</td><td>약간 나쁨</td><td>경쟁적</td><td>높은 편향에서 최고</td></tr>
          </tbody>
        </table>
        <p>결과는 흥미로운 경관을 드러냅니다: 최적 코드 + 변형 조합이 잡음 편향이 변함에 따라 이동합니다. 중간 편향에서는 적절한 변형이 있는 계열 중간의 나침반 코드가 양 끝점 모두를 능가할 수 있습니다. 높은 편향에서는 근베이컨-쇼어 변형 코드가 최적이 됩니다.</p>

        <h2>강점</h2>
        <ul>
          <li>자연스러운 확장 — 클리포드 변형과 나침반 코드는 개별적으로 잘 연구되었으며, 결합이 새로운 통찰을 산출합니다.</li>
          <li>실용적 관련성 — 많은 양자 하드웨어 플랫폼이 편향 잡음을 보입니다(예: 초전도 큐비트의 Z 편향).</li>
          <li>완전한 경관 매핑 — 코드-변형-편향 매개변수 공간의 체계적 탐구입니다.</li>
          <li>실행 가능한 결과 — 각 편향 수준에서 어떤 코드+변형을 사용할지에 대한 명확한 권고입니다.</li>
          <li>표준 디코딩 인프라와 호환됩니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>클리포드 변형에 대한 최적화가 큐비트 수에 지수적이며, 큰 코드에는 확장 가능한 휴리스틱이 필요합니다.</li>
          <li>파울리 편향 잡음만 고려되며, 더 복잡한 잡음 구조(예: 결맞는 오류, 누출)는 다루지 않습니다.</li>
          <li>나침반 코드는 표면 코드의 최적이 아닌 인코딩 비율을 공유하며, qLDPC 코드가 전반적으로 더 효율적일 수 있습니다.</li>
          <li>변형된 코드에 대한 디코더 적응이 실제로 추가 구현 노력을 필요로 할 수 있습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>클리포드 변형을 qLDPC 코드에 적용할 수 있는가, 아니면 나침반/표면 코드의 국소성이 필수적인가?</li>
          <li>클리포드 변형 나침반 코드가 역시 편향 잡음을 대상으로 하는 XZZX 표면 코드와 어떻게 비교되는가?</li>
          <li>QEC 운영 중 잡음 편향을 모니터링하여 최적 변형을 온라인으로 학습할 수 있는가?</li>
          <li>무차별 대입 검색 없이 잡음 채널에서 최적 변형을 예측하는 이론적 프레임워크가 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 나침반 코드와 클리포드 변형의 조합이 잡음 적응 양자 오류 정정을 위한 풍부한 설계 공간을 만들어냄을 보여줍니다. 핵심 실용적 통찰은 최적 코드가 항상 표면 코드나 베이컨-쇼어 코드가 아니라는 것입니다 — 적절한 변형이 있는 중간 나침반 코드가 편향 잡음에서 둘 다를 능가할 수 있습니다. 특성화된 잡음 편향이 있는 하드웨어 팀에게 이 연구는 하드웨어를 변경하지 않고 결함 허용 성능을 향상시킬 수 있는 최적화된 코드 선택 메뉴를 제공합니다.</p>
      `
    }
  },
];