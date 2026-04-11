const BATCH_Q1B = [
  // ====================================================================
  // 1. pqc-past-future
  // ====================================================================
  {
    id: "pqc-past-future",
    date: "2025-04-11",
    authors: "Kokare, P. N., et al.",
    venue: "Survey 2024",
    image: "images/pqc-past-future/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Post-Quantum Crypto", "Survey", "Lattice"],
    en: {
      title: "Post-Quantum Cryptography: A Survey of Past and Future",
      summary: "A comprehensive survey covering the evolution of post-quantum cryptographic schemes from early proposals to NIST-standardized algorithms, with a focus on lattice-based, code-based, hash-based, and multivariate approaches.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A broad-scope survey that traces <strong>post-quantum cryptography from its theoretical origins through the NIST standardization process</strong>, providing a useful reference map of the major algorithm families and their relative maturity.</p>

        <h2>Research Question</h2>
        <blockquote>What is the current landscape of post-quantum cryptographic algorithms, how have they evolved over the past two decades, and what are the remaining challenges for widespread deployment?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>The advent of large-scale quantum computers threatens classical public-key cryptography based on integer factorization and discrete logarithm problems. Shor's algorithm would render RSA and ECC insecure, motivating research into quantum-resistant alternatives. NIST's multi-round standardization process has recently concluded its initial selections, making this an opportune moment for a retrospective and forward-looking survey.</p>
        <p>This survey is motivated by the need to consolidate the scattered literature across lattice-based (CRYSTALS-Kyber/Dilithium), code-based (Classic McEliece), hash-based (SPHINCS+), and multivariate schemes into a single accessible reference that tracks both theoretical security and practical performance.</p>

        <h2>Architecture / Methodology</h2>
        <p>The survey is organized by cryptographic family:</p>
        <ul>
          <li><strong>Lattice-based:</strong> Covers LWE, RLWE, and NTRU problems; details Kyber (KEM) and Dilithium (signature) as NIST selections.</li>
          <li><strong>Code-based:</strong> Reviews McEliece and Niederreiter frameworks and their modern variants.</li>
          <li><strong>Hash-based:</strong> Discusses stateful (XMSS) and stateless (SPHINCS+) signature schemes.</li>
          <li><strong>Multivariate:</strong> Examines oil-and-vinegar and HFE-family schemes, noting limited adoption.</li>
          <li><strong>Isogeny-based:</strong> Briefly covers SIKE's rise and cryptanalytic break.</li>
        </ul>
        <figure>
          <img src="images/pqc-past-future/thumbnail.png" alt="PQC survey taxonomy">
          <figcaption>Taxonomy of post-quantum cryptographic families covered in the survey.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Unified taxonomy:</strong> Organizes all major PQC families with consistent comparison criteria (security level, key size, performance).</li>
          <li><strong>NIST timeline:</strong> Documents the complete standardization journey from Round 1 through final selections.</li>
          <li><strong>Security analysis:</strong> Summarizes best-known classical and quantum attacks for each scheme family.</li>
          <li><strong>Migration roadmap:</strong> Discusses practical transition challenges including hybrid schemes and backward compatibility.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Aspect</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Scope</td><td>~200 references spanning 2005-2024</td></tr>
            <tr><td>NIST levels</td><td>Security levels 1-5 mapped to AES/SHA equivalents</td></tr>
            <tr><td>Comparison metrics</td><td>Key size, ciphertext size, signature size, CPU cycles</td></tr>
            <tr><td>Platforms</td><td>Desktop, embedded, IoT performance data compiled</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Scheme Family</th><th>NIST Status</th><th>Key Size</th><th>Maturity</th></tr></thead>
          <tbody>
            <tr><td>Lattice (Kyber/Dilithium)</td><td>Standardized</td><td>Moderate</td><td>High</td></tr>
            <tr><td>Hash (SPHINCS+)</td><td>Standardized</td><td>Small keys, large sigs</td><td>High</td></tr>
            <tr><td>Code (McEliece)</td><td>Round 4</td><td>Very large</td><td>High</td></tr>
            <tr><td>Isogeny (SIKE)</td><td>Broken</td><td>Small</td><td>Abandoned</td></tr>
          </tbody>
        </table>
        <p>Lattice-based schemes dominate due to their balanced performance-security tradeoff. Hash-based signatures offer conservative security but with larger signatures. Code-based schemes remain viable but suffer from large key sizes.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Comprehensive coverage of all major PQC families in a single document.</li>
          <li>Clear timeline of NIST standardization rounds with rationale for selections and eliminations.</li>
          <li>Includes practical deployment considerations (hybrid modes, TLS integration).</li>
          <li>Accessible to readers without deep cryptographic background.</li>
          <li>Discusses both theoretical security reductions and concrete parameter choices.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Limited depth on implementation-level side-channel attacks (timing, power analysis).</li>
          <li>Isogeny-based discussion is outdated given SIKE's complete break in 2022.</li>
          <li>Does not cover emerging lattice attacks (e.g., recent improvements in BKZ) in detail.</li>
          <li>Missing quantitative benchmarks on constrained devices beyond summary tables.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How should organizations prioritize PQC migration given uncertainty about future quantum computing timelines?</li>
          <li>Are hybrid classical-PQC schemes a necessary transitional step or an unnecessary complexity?</li>
          <li>Could new cryptanalytic breakthroughs (like the SIKE attack) threaten lattice-based schemes?</li>
          <li>What role should hardware acceleration play in PQC adoption for IoT devices?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This survey serves as a solid entry point for understanding the PQC landscape. Readers should use it as a reference map rather than a deep technical guide -- for each algorithm family, it provides enough context to understand the design rationale and current status, then points to primary sources for deeper study. The key message is that lattice-based cryptography has emerged as the pragmatic winner, but diversity in deployed schemes remains important for defense in depth.</p>
      `
    },
    ko: {
      title: "Post-Quantum Cryptography: 과거와 미래에 대한 서베이",
      summary: "초기 제안부터 NIST 표준화 알고리즘까지 포스트 양자 암호 체계의 진화를 격자 기반, 코드 기반, 해시 기반, 다변수 접근법을 중심으로 종합적으로 조사한 서베이입니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>포스트 양자 암호를 이론적 기원부터 NIST 표준화 과정까지 추적</strong>하는 광범위한 서베이로, 주요 알고리즘 계열과 성숙도에 대한 유용한 참조 지도를 제공합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>포스트 양자 암호 알고리즘의 현재 현황은 어떠하며, 지난 20년간 어떻게 발전해 왔고, 광범위한 배포를 위한 남은 과제는 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>대규모 양자 컴퓨터의 출현은 정수 분해와 이산 로그 문제에 기반한 고전 공개키 암호를 위협합니다. Shor 알고리즘은 RSA와 ECC를 무력화할 수 있어 양자 저항성 대안 연구가 활발합니다. NIST의 다단계 표준화 과정이 초기 선정을 마무리한 시점에서, 회고적이고 미래지향적인 서베이가 시의적절합니다.</p>
        <p>이 서베이는 격자 기반(CRYSTALS-Kyber/Dilithium), 코드 기반(Classic McEliece), 해시 기반(SPHINCS+), 다변수 체계에 걸친 분산된 문헌을 통합하여 이론적 보안성과 실용적 성능을 모두 추적하는 단일 참조 문헌이 필요하다는 동기에서 작성되었습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <p>서베이는 암호 계열별로 구성됩니다:</p>
        <ul>
          <li><strong>격자 기반:</strong> LWE, RLWE, NTRU 문제를 다루며 NIST 선정인 Kyber(KEM)와 Dilithium(서명)을 상세히 설명합니다.</li>
          <li><strong>코드 기반:</strong> McEliece, Niederreiter 프레임워크와 현대적 변형을 검토합니다.</li>
          <li><strong>해시 기반:</strong> 상태 유지형(XMSS)과 비상태형(SPHINCS+) 서명 체계를 논의합니다.</li>
          <li><strong>다변수:</strong> Oil-and-Vinegar 및 HFE 계열 체계를 검토하며 제한적 채택을 지적합니다.</li>
          <li><strong>아이소제니 기반:</strong> SIKE의 부상과 암호 분석적 파괴를 간략히 다룹니다.</li>
        </ul>
        <figure>
          <img src="images/pqc-past-future/thumbnail.png" alt="PQC 서베이 분류">
          <figcaption>서베이에서 다루는 포스트 양자 암호 계열의 분류.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>통합 분류:</strong> 일관된 비교 기준(보안 수준, 키 크기, 성능)으로 모든 주요 PQC 계열을 정리합니다.</li>
          <li><strong>NIST 타임라인:</strong> 1라운드부터 최종 선정까지 완전한 표준화 과정을 문서화합니다.</li>
          <li><strong>보안 분석:</strong> 각 체계 계열에 대한 최선의 고전 및 양자 공격을 요약합니다.</li>
          <li><strong>마이그레이션 로드맵:</strong> 하이브리드 체계와 하위 호환성을 포함한 실질적 전환 과제를 논의합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>항목</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>범위</td><td>2005-2024년에 걸친 약 200개 참고문헌</td></tr>
            <tr><td>NIST 레벨</td><td>AES/SHA 동등치에 매핑된 보안 레벨 1-5</td></tr>
            <tr><td>비교 지표</td><td>키 크기, 암호문 크기, 서명 크기, CPU 사이클</td></tr>
            <tr><td>플랫폼</td><td>데스크톱, 임베디드, IoT 성능 데이터 수집</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>체계 계열</th><th>NIST 상태</th><th>키 크기</th><th>성숙도</th></tr></thead>
          <tbody>
            <tr><td>격자 (Kyber/Dilithium)</td><td>표준화됨</td><td>보통</td><td>높음</td></tr>
            <tr><td>해시 (SPHINCS+)</td><td>표준화됨</td><td>작은 키, 큰 서명</td><td>높음</td></tr>
            <tr><td>코드 (McEliece)</td><td>4라운드</td><td>매우 큼</td><td>높음</td></tr>
            <tr><td>아이소제니 (SIKE)</td><td>파괴됨</td><td>작음</td><td>폐기</td></tr>
          </tbody>
        </table>
        <p>격자 기반 체계가 균형 잡힌 성능-보안 트레이드오프로 지배적입니다. 해시 기반 서명은 보수적 보안을 제공하지만 서명이 큽니다. 코드 기반 체계는 여전히 유효하지만 큰 키 크기로 어려움이 있습니다.</p>

        <h2>강점</h2>
        <ul>
          <li>모든 주요 PQC 계열을 단일 문서에서 포괄적으로 다룹니다.</li>
          <li>선정 및 탈락 근거와 함께 NIST 표준화 라운드의 명확한 타임라인을 제공합니다.</li>
          <li>실질적 배포 고려사항(하이브리드 모드, TLS 통합)을 포함합니다.</li>
          <li>깊은 암호학적 배경 없는 독자에게도 접근 가능합니다.</li>
          <li>이론적 보안 환원과 구체적 파라미터 선택을 모두 논의합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>구현 수준의 부채널 공격(타이밍, 전력 분석)에 대한 깊이가 제한적입니다.</li>
          <li>아이소제니 기반 논의는 2022년 SIKE 완전 파괴 이후 시대에 뒤떨어져 있습니다.</li>
          <li>최근 격자 공격 개선(예: BKZ 개선)을 상세히 다루지 않습니다.</li>
          <li>요약 테이블 이상의 제한된 디바이스 정량적 벤치마크가 부족합니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>미래 양자 컴퓨팅 타임라인의 불확실성을 고려할 때 조직은 PQC 마이그레이션을 어떻게 우선순위화해야 하는가?</li>
          <li>하이브리드 고전-PQC 체계는 필수적 전환 단계인가 아니면 불필요한 복잡성인가?</li>
          <li>SIKE 공격과 같은 새로운 암호 분석 돌파가 격자 기반 체계를 위협할 수 있는가?</li>
          <li>IoT 디바이스의 PQC 채택에서 하드웨어 가속은 어떤 역할을 해야 하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 서베이는 PQC 현황을 이해하기 위한 견고한 출발점입니다. 독자는 심층 기술 가이드가 아닌 참조 지도로 활용해야 합니다 -- 각 알고리즘 계열에 대해 설계 근거와 현재 상태를 이해할 수 있는 충분한 맥락을 제공하고 심화 학습을 위한 원본 소스를 안내합니다. 핵심 메시지는 격자 기반 암호가 실용적 승자로 부상했지만, 심층 방어를 위해 배포되는 체계의 다양성이 여전히 중요하다는 것입니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. pqc-library-survey
  // ====================================================================
  {
    id: "pqc-library-survey",
    date: "2025-04-11",
    authors: "Ahmed, N., Zhang, L., Gangopadhyay, A.",
    venue: "Preprint 2025",
    image: "images/pqc-library-survey/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Post-Quantum Crypto", "Libraries"],
    en: {
      title: "A Survey of Post-Quantum Cryptography Support in Cryptographic Libraries",
      summary: "Systematically evaluates how major cryptographic libraries (OpenSSL, liboqs, BoringSSL, etc.) have integrated NIST-standardized post-quantum algorithms, assessing API maturity, algorithm coverage, and interoperability.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A practical survey that <strong>maps the current state of PQC integration across major cryptographic libraries</strong>, revealing significant disparities in algorithm support, API readiness, and interoperability testing.</p>

        <h2>Research Question</h2>
        <blockquote>To what extent do mainstream cryptographic libraries support NIST-standardized post-quantum algorithms, and what gaps remain for production deployment?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>While NIST has finalized its first set of post-quantum standards (ML-KEM, ML-DSA, SLH-DSA), the actual adoption depends on cryptographic library support. Developers rely on libraries like OpenSSL, liboqs, BoringSSL, and language-specific bindings to deploy these algorithms. Without comprehensive library support, the transition from theoretical standardization to practical deployment stalls.</p>
        <p>This survey fills the gap between algorithm-level research and real-world deployment readiness by systematically cataloging PQC support across the most widely used libraries, including their API stability, performance characteristics, and hybrid mode capabilities.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Library selection:</strong> Covers OpenSSL 3.x, liboqs (Open Quantum Safe), BoringSSL, NSS, wolfSSL, Bouncy Castle, and PQClean.</li>
          <li><strong>Evaluation criteria:</strong> Algorithm coverage (KEM, signature), API stability, hybrid TLS support, side-channel countermeasures, and platform support.</li>
          <li><strong>Testing methodology:</strong> Interoperability tests between libraries for key exchange and signature verification.</li>
        </ul>
        <figure>
          <img src="images/pqc-library-survey/thumbnail.png" alt="PQC library comparison">
          <figcaption>Overview of PQC algorithm support across major cryptographic libraries.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Comprehensive comparison matrix:</strong> First systematic cross-library comparison of PQC algorithm support with consistent evaluation criteria.</li>
          <li><strong>Interoperability findings:</strong> Identifies specific incompatibilities between library implementations of the same algorithms.</li>
          <li><strong>Hybrid mode analysis:</strong> Documents which libraries support hybrid classical-PQC key exchange and how they implement it.</li>
          <li><strong>Deployment readiness score:</strong> Ranks libraries by production readiness for PQC migration.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Aspect</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Libraries tested</td><td>7 major libraries across C, Java, and Rust ecosystems</td></tr>
            <tr><td>Algorithms</td><td>ML-KEM (Kyber), ML-DSA (Dilithium), SLH-DSA (SPHINCS+), FN-DSA (Falcon)</td></tr>
            <tr><td>Test platform</td><td>x86-64 and ARM64 benchmarking</td></tr>
            <tr><td>TLS versions</td><td>TLS 1.3 with hybrid key exchange</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Library</th><th>KEM Support</th><th>Signature Support</th><th>Hybrid TLS</th></tr></thead>
          <tbody>
            <tr><td>liboqs</td><td>Full</td><td>Full</td><td>Via OQS-provider</td></tr>
            <tr><td>OpenSSL 3.x</td><td>Partial</td><td>Partial</td><td>Experimental</td></tr>
            <tr><td>BoringSSL</td><td>ML-KEM only</td><td>Limited</td><td>Yes (Chrome)</td></tr>
            <tr><td>wolfSSL</td><td>Full</td><td>Partial</td><td>Yes</td></tr>
          </tbody>
        </table>
        <p>liboqs leads in algorithm coverage but lags in production hardening. BoringSSL has the most battle-tested hybrid TLS deployment via Chrome. OpenSSL support is growing but API stability remains a concern for early adopters.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Highly practical focus that directly serves developers planning PQC migration.</li>
          <li>Covers both algorithm-level and protocol-level (TLS) integration.</li>
          <li>Includes performance benchmarks across different hardware architectures.</li>
          <li>Identifies concrete interoperability bugs rather than abstract compatibility claims.</li>
          <li>Timely given the 2024-2025 NIST standardization timeline.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Library landscape evolves rapidly; findings may become outdated within months.</li>
          <li>Side-channel analysis is surface-level; no original timing or power analysis performed.</li>
          <li>Does not cover hardware security module (HSM) support for PQC.</li>
          <li>Limited coverage of embedded/RTOS library ecosystems.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Should library developers prioritize algorithm coverage or production hardening of a smaller set?</li>
          <li>How critical is cross-library interoperability for PQC adoption in practice?</li>
          <li>Will the rapid evolution of PQC standards destabilize library APIs and discourage early adoption?</li>
          <li>What role should automated compliance testing play in validating PQC library implementations?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This survey is essential reading for engineering teams planning PQC migration. It reveals that while algorithm support is advancing quickly, the ecosystem is fragmented -- no single library offers a complete, production-ready PQC stack. Teams should expect to use liboqs for breadth, rely on BoringSSL or wolfSSL for production TLS, and plan for ongoing library updates as standards finalize.</p>
      `
    },
    ko: {
      title: "암호 라이브러리의 포스트 양자 암호 지원 현황 서베이",
      summary: "주요 암호 라이브러리(OpenSSL, liboqs, BoringSSL 등)가 NIST 표준화된 포스트 양자 알고리즘을 어떻게 통합했는지 체계적으로 평가하고, API 성숙도, 알고리즘 범위, 상호운용성을 분석합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>주요 암호 라이브러리 전반의 PQC 통합 현황</strong>을 매핑하는 실용적 서베이로, 알고리즘 지원, API 준비도, 상호운용성 테스트에서 상당한 격차를 드러냅니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>주류 암호 라이브러리가 NIST 표준화 포스트 양자 알고리즘을 어느 정도까지 지원하며, 프로덕션 배포를 위해 어떤 격차가 남아 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>NIST가 첫 번째 포스트 양자 표준(ML-KEM, ML-DSA, SLH-DSA)을 확정했지만, 실제 채택은 암호 라이브러리 지원에 달려 있습니다. 개발자들은 OpenSSL, liboqs, BoringSSL 등의 라이브러리에 의존하여 이러한 알고리즘을 배포합니다. 포괄적인 라이브러리 지원 없이는 이론적 표준화에서 실질적 배포로의 전환이 지연됩니다.</p>
        <p>이 서베이는 가장 널리 사용되는 라이브러리의 PQC 지원을 체계적으로 카탈로그화하여 알고리즘 수준 연구와 실세계 배포 준비도 사이의 격차를 메웁니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>라이브러리 선정:</strong> OpenSSL 3.x, liboqs, BoringSSL, NSS, wolfSSL, Bouncy Castle, PQClean을 다룹니다.</li>
          <li><strong>평가 기준:</strong> 알고리즘 범위(KEM, 서명), API 안정성, 하이브리드 TLS 지원, 부채널 대응, 플랫폼 지원.</li>
          <li><strong>테스트 방법론:</strong> 키 교환 및 서명 검증에 대한 라이브러리 간 상호운용성 테스트.</li>
        </ul>
        <figure>
          <img src="images/pqc-library-survey/thumbnail.png" alt="PQC 라이브러리 비교">
          <figcaption>주요 암호 라이브러리의 PQC 알고리즘 지원 현황 개요.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>포괄적 비교 매트릭스:</strong> 일관된 평가 기준으로 PQC 알고리즘 지원의 최초 체계적 교차 라이브러리 비교.</li>
          <li><strong>상호운용성 발견:</strong> 동일 알고리즘의 라이브러리 구현 간 특정 비호환성을 식별합니다.</li>
          <li><strong>하이브리드 모드 분석:</strong> 어떤 라이브러리가 하이브리드 고전-PQC 키 교환을 지원하고 어떻게 구현하는지 문서화합니다.</li>
          <li><strong>배포 준비도 점수:</strong> PQC 마이그레이션을 위한 프로덕션 준비도별 라이브러리 순위를 매깁니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>항목</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트된 라이브러리</td><td>C, Java, Rust 생태계의 7개 주요 라이브러리</td></tr>
            <tr><td>알고리즘</td><td>ML-KEM (Kyber), ML-DSA (Dilithium), SLH-DSA (SPHINCS+), FN-DSA (Falcon)</td></tr>
            <tr><td>테스트 플랫폼</td><td>x86-64 및 ARM64 벤치마킹</td></tr>
            <tr><td>TLS 버전</td><td>하이브리드 키 교환이 있는 TLS 1.3</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>라이브러리</th><th>KEM 지원</th><th>서명 지원</th><th>하이브리드 TLS</th></tr></thead>
          <tbody>
            <tr><td>liboqs</td><td>완전</td><td>완전</td><td>OQS-provider 통해</td></tr>
            <tr><td>OpenSSL 3.x</td><td>부분적</td><td>부분적</td><td>실험적</td></tr>
            <tr><td>BoringSSL</td><td>ML-KEM만</td><td>제한적</td><td>예 (Chrome)</td></tr>
            <tr><td>wolfSSL</td><td>완전</td><td>부분적</td><td>예</td></tr>
          </tbody>
        </table>
        <p>liboqs가 알고리즘 범위에서 선두이지만 프로덕션 경화에서는 뒤처집니다. BoringSSL이 Chrome을 통해 가장 실전 검증된 하이브리드 TLS 배포를 갖추고 있습니다. OpenSSL 지원은 성장 중이지만 API 안정성이 초기 채택자에게 우려됩니다.</p>

        <h2>강점</h2>
        <ul>
          <li>PQC 마이그레이션을 계획하는 개발자에게 직접적으로 도움이 되는 매우 실용적인 초점.</li>
          <li>알고리즘 수준과 프로토콜 수준(TLS) 통합을 모두 다룹니다.</li>
          <li>다양한 하드웨어 아키텍처에서의 성능 벤치마크를 포함합니다.</li>
          <li>추상적 호환성 주장이 아닌 구체적 상호운용성 버그를 식별합니다.</li>
          <li>2024-2025 NIST 표준화 타임라인에 맞춰 시의적절합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>라이브러리 환경이 빠르게 변화하여 수개월 내에 발견 사항이 구식이 될 수 있습니다.</li>
          <li>부채널 분석이 표면적이며, 독자적인 타이밍이나 전력 분석은 수행되지 않았습니다.</li>
          <li>PQC를 위한 하드웨어 보안 모듈(HSM) 지원을 다루지 않습니다.</li>
          <li>임베디드/RTOS 라이브러리 생태계에 대한 범위가 제한적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>라이브러리 개발자들은 알고리즘 범위를 우선시해야 하는가, 아니면 소수 집합의 프로덕션 경화를 우선시해야 하는가?</li>
          <li>교차 라이브러리 상호운용성은 실제 PQC 채택에 얼마나 중요한가?</li>
          <li>PQC 표준의 빠른 진화가 라이브러리 API를 불안정하게 하고 조기 채택을 저해할 것인가?</li>
          <li>PQC 라이브러리 구현 검증에서 자동화된 준수 테스트는 어떤 역할을 해야 하는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 서베이는 PQC 마이그레이션을 계획하는 엔지니어링 팀에 필수적입니다. 알고리즘 지원이 빠르게 발전하고 있지만 생태계가 분열되어 있음을 보여줍니다 -- 단일 라이브러리가 완전하고 프로덕션 준비된 PQC 스택을 제공하지 않습니다. 팀은 범위를 위해 liboqs를, 프로덕션 TLS를 위해 BoringSSL이나 wolfSSL을 사용하고, 표준이 확정됨에 따라 지속적인 라이브러리 업데이트를 계획해야 합니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. generative-decoding-qec
  // ====================================================================
  {
    id: "generative-decoding-qec",
    date: "2025-04-11",
    authors: "Cao, H., et al.",
    venue: "Preprint 2025",
    image: "images/generative-decoding-qec/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QEC", "Generative Model", "Decoder"],
    en: {
      title: "Generative Decoding for Quantum Error-Correcting Codes",
      summary: "Proposes using generative models (diffusion/autoregressive) as decoders for quantum error-correcting codes, learning the error distribution conditioned on syndromes to sample likely corrections rather than deterministically computing them.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper reframes quantum error correction decoding as a <strong>conditional generative modeling problem</strong>, using learned distributions over error patterns to produce high-quality corrections that outperform traditional decoders on moderate-distance codes.</p>

        <h2>Research Question</h2>
        <blockquote>Can generative models that learn the posterior distribution of errors conditioned on syndromes serve as effective and scalable decoders for quantum error-correcting codes?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Decoding quantum error-correcting codes is computationally challenging because the decoder must infer the most likely error given a syndrome, accounting for degeneracies where different physical errors produce identical syndromes. Traditional decoders (MWPM, union-find, BP) use handcrafted algorithms that may not fully exploit the error distribution structure.</p>
        <p>Generative models -- which excel at learning complex distributions in classical ML -- offer a natural alternative: learn the conditional distribution P(error | syndrome) from training data, then sample corrections. This could capture correlations and degeneracies that deterministic decoders miss.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Generative decoder framework:</strong> The syndrome is provided as a conditioning input; the model generates a candidate error pattern by sampling from the learned posterior.</li>
          <li><strong>Model variants:</strong> Both diffusion-based and autoregressive architectures are explored, treating the error vector as the generation target.</li>
          <li><strong>Training:</strong> Supervised on (syndrome, error) pairs generated from known noise models via Monte Carlo simulation.</li>
          <li><strong>Inference:</strong> Multiple samples are drawn and the most likely equivalence class is selected, exploiting degeneracy naturally.</li>
        </ul>
        <figure>
          <img src="images/generative-decoding-qec/thumbnail.png" alt="Generative decoding pipeline">
          <figcaption>Generative decoding pipeline: syndrome conditioning to error sampling.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Novel framing:</strong> First to systematically apply generative models (diffusion and autoregressive) as QEC decoders.</li>
          <li><strong>Degeneracy handling:</strong> The generative approach naturally handles error degeneracies by sampling multiple corrections.</li>
          <li><strong>Competitive accuracy:</strong> Achieves logical error rates competitive with or superior to MWPM on surface codes up to moderate distances.</li>
          <li><strong>Flexible architecture:</strong> Framework is code-agnostic and can be adapted to different code families.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes tested</td><td>Rotated surface code d = 3, 5, 7, 9</td></tr>
            <tr><td>Noise model</td><td>Depolarizing noise, code-capacity and phenomenological</td></tr>
            <tr><td>Training data</td><td>~10<sup>6</sup> syndrome-error pairs per code distance</td></tr>
            <tr><td>Models</td><td>Diffusion (DDPM-style), autoregressive transformer</td></tr>
            <tr><td>Inference</td><td>Multi-sample majority vote over equivalence classes</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Decoder</th><th>d=5 Logical Error Rate</th><th>d=7 Logical Error Rate</th></tr></thead>
          <tbody>
            <tr><td>MWPM</td><td>Baseline</td><td>Baseline</td></tr>
            <tr><td>Generative (diffusion)</td><td>Comparable</td><td>Slightly better</td></tr>
            <tr><td>Generative (autoregressive)</td><td>Comparable</td><td>Competitive</td></tr>
          </tbody>
        </table>
        <p>The generative decoders match or slightly exceed MWPM at moderate distances, with the advantage growing for correlated noise models where MWPM's independence assumptions break down.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Creative application of generative modeling to a well-defined combinatorial problem.</li>
          <li>Natural handling of degeneracy -- a fundamental challenge in quantum decoding.</li>
          <li>Code-agnostic framework applicable beyond surface codes.</li>
          <li>Multi-sample inference provides controllable accuracy-latency tradeoff.</li>
          <li>Thorough comparison against established decoder baselines.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Inference latency is much higher than MWPM or union-find due to iterative sampling.</li>
          <li>Scalability to large distances (d > 15) is unclear due to growing error space.</li>
          <li>Training requires noise model knowledge; adaptability to unknown noise is not demonstrated.</li>
          <li>Hardware deployment for real-time decoding is not addressed.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can distillation or amortization techniques reduce the inference cost to meet real-time decoding deadlines?</li>
          <li>How does performance degrade when the training noise model differs from the actual hardware noise?</li>
          <li>Could generative decoders be combined with fast decoders (union-find for easy syndromes, generative for hard ones)?</li>
          <li>Does the generative approach scale better for qLDPC codes where MWPM is unavailable?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper opens an interesting direction by viewing QEC decoding through the lens of generative modeling. While not yet practical for real-time deployment due to latency, the framework's natural handling of degeneracy and its code-agnostic nature make it a promising research direction. The key open question is whether inference speed can be brought within the constraints of quantum error correction cycles.</p>
      `
    },
    ko: {
      title: "양자 오류 정정 코드를 위한 생성 모델 디코딩",
      summary: "생성 모델(확산/자기회귀)을 양자 오류 정정 코드의 디코더로 사용하여, 신드롬에 조건부된 오류 분포를 학습하고 결정론적 계산 대신 가능한 교정을 샘플링하는 방법을 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>양자 오류 정정 디코딩을 <strong>조건부 생성 모델링 문제</strong>로 재구성하여, 오류 패턴에 대한 학습된 분포를 사용하여 중간 거리 코드에서 전통적 디코더를 능가하는 고품질 교정을 생성합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>신드롬에 조건부된 오류의 사후 분포를 학습하는 생성 모델이 양자 오류 정정 코드의 효과적이고 확장 가능한 디코더로 기능할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 오류 정정 코드의 디코딩은 디코더가 신드롬이 주어졌을 때 가장 가능성 있는 오류를 추론해야 하므로 계산적으로 어렵습니다. 서로 다른 물리적 오류가 동일한 신드롬을 생성하는 축퇴를 고려해야 합니다. MWPM, union-find, BP 같은 전통적 디코더는 오류 분포 구조를 완전히 활용하지 못할 수 있는 수작업 알고리즘을 사용합니다.</p>
        <p>복잡한 분포 학습에 뛰어난 생성 모델은 자연스러운 대안을 제공합니다: 훈련 데이터에서 조건부 분포 P(오류 | 신드롬)를 학습한 후 교정을 샘플링합니다. 이는 결정론적 디코더가 놓치는 상관관계와 축퇴를 포착할 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>생성 디코더 프레임워크:</strong> 신드롬이 조건 입력으로 제공되고, 모델이 학습된 사후 분포에서 샘플링하여 후보 오류 패턴을 생성합니다.</li>
          <li><strong>모델 변형:</strong> 확산 기반과 자기회귀 아키텍처 모두 탐구하며, 오류 벡터를 생성 대상으로 취급합니다.</li>
          <li><strong>훈련:</strong> 몬테카를로 시뮬레이션으로 알려진 잡음 모델에서 생성된 (신드롬, 오류) 쌍으로 지도 학습.</li>
          <li><strong>추론:</strong> 여러 샘플을 추출하고 가장 가능성 있는 동치류를 선택하여 축퇴를 자연스럽게 활용합니다.</li>
        </ul>
        <figure>
          <img src="images/generative-decoding-qec/thumbnail.png" alt="생성 디코딩 파이프라인">
          <figcaption>생성 디코딩 파이프라인: 신드롬 조건화에서 오류 샘플링까지.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>새로운 프레이밍:</strong> 생성 모델(확산 및 자기회귀)을 QEC 디코더로 체계적으로 적용한 최초 연구.</li>
          <li><strong>축퇴 처리:</strong> 여러 교정을 샘플링하여 오류 축퇴를 자연스럽게 처리합니다.</li>
          <li><strong>경쟁력 있는 정확도:</strong> 중간 거리까지의 표면 코드에서 MWPM과 동등하거나 우수한 논리적 오류율 달성.</li>
          <li><strong>유연한 아키텍처:</strong> 코드에 구애받지 않고 다른 코드 계열에 적응 가능한 프레임워크.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>테스트 코드</td><td>회전 표면 코드 d = 3, 5, 7, 9</td></tr>
            <tr><td>잡음 모델</td><td>탈분극 잡음, 코드 용량 및 현상학적</td></tr>
            <tr><td>훈련 데이터</td><td>코드 거리당 약 10<sup>6</sup>개 신드롬-오류 쌍</td></tr>
            <tr><td>모델</td><td>확산(DDPM 스타일), 자기회귀 트랜스포머</td></tr>
            <tr><td>추론</td><td>동치류에 대한 다중 샘플 다수결 투표</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>디코더</th><th>d=5 논리적 오류율</th><th>d=7 논리적 오류율</th></tr></thead>
          <tbody>
            <tr><td>MWPM</td><td>기준선</td><td>기준선</td></tr>
            <tr><td>생성(확산)</td><td>동등</td><td>약간 우수</td></tr>
            <tr><td>생성(자기회귀)</td><td>동등</td><td>경쟁적</td></tr>
          </tbody>
        </table>
        <p>생성 디코더는 중간 거리에서 MWPM과 동등하거나 약간 초과하며, MWPM의 독립성 가정이 무너지는 상관 잡음 모델에서 이점이 커집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>잘 정의된 조합 문제에 대한 생성 모델링의 창의적 적용.</li>
          <li>양자 디코딩의 근본적 과제인 축퇴의 자연스러운 처리.</li>
          <li>표면 코드를 넘어 적용 가능한 코드 비의존적 프레임워크.</li>
          <li>다중 샘플 추론이 제어 가능한 정확도-지연 트레이드오프를 제공합니다.</li>
          <li>확립된 디코더 기준선에 대한 철저한 비교.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>반복적 샘플링으로 인해 추론 지연이 MWPM이나 union-find보다 훨씬 높습니다.</li>
          <li>커지는 오류 공간으로 인해 큰 거리(d > 15)로의 확장성이 불명확합니다.</li>
          <li>훈련에 잡음 모델 지식이 필요하며, 미지 잡음에 대한 적응성이 입증되지 않았습니다.</li>
          <li>실시간 디코딩을 위한 하드웨어 배포가 다루어지지 않았습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>증류 또는 상각 기법이 실시간 디코딩 마감을 충족하도록 추론 비용을 줄일 수 있는가?</li>
          <li>훈련 잡음 모델이 실제 하드웨어 잡음과 다를 때 성능이 어떻게 저하되는가?</li>
          <li>생성 디코더를 빠른 디코더와 결합할 수 있는가(쉬운 신드롬은 union-find, 어려운 것은 생성)?</li>
          <li>MWPM을 사용할 수 없는 qLDPC 코드에서 생성 접근법이 더 잘 확장되는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 QEC 디코딩을 생성 모델링의 관점에서 바라보는 흥미로운 방향을 열어줍니다. 지연 시간으로 인해 아직 실시간 배포에는 실용적이지 않지만, 축퇴의 자연스러운 처리와 코드 비의존적 특성이 유망한 연구 방향입니다. 핵심 미해결 질문은 추론 속도가 양자 오류 정정 사이클의 제약 내로 들어올 수 있는지입니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. diffusion-decoding-qldpc
  // ====================================================================
  {
    id: "diffusion-decoding-qldpc",
    date: "2025-04-11",
    authors: "Liu, Z., Gong, A., Clark, B. K.",
    venue: "Preprint 2025",
    image: "images/diffusion-decoding-qldpc/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "qLDPC", "Diffusion Model", "Decoder"],
    en: {
      title: "Decoding Quantum Low-Density Parity-Check Codes with Diffusion",
      summary: "Applies diffusion models to decode quantum LDPC codes, leveraging the iterative denoising process to produce syndrome-consistent corrections that outperform belief propagation on codes where traditional decoders struggle.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper demonstrates that <strong>diffusion models can serve as effective decoders for qLDPC codes</strong>, a family where standard MWPM is inapplicable and belief propagation often fails due to short cycles in the Tanner graph.</p>

        <h2>Research Question</h2>
        <blockquote>Can diffusion-based generative models decode quantum LDPC codes more accurately than belief propagation and its variants, particularly for codes with problematic Tanner graph structure?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Quantum LDPC codes promise constant-rate encoding with growing distance, but decoding them is notoriously difficult. Unlike surface codes where MWPM works well, qLDPC codes have non-local check structure that prevents direct application of matching-based decoders. Belief propagation (BP) is the standard alternative but suffers from convergence issues on graphs with short cycles.</p>
        <p>Diffusion models, which iteratively denoise a random initial state into a structured output, offer a compelling alternative: they can learn complex conditional distributions without requiring the graphical model structure assumptions that limit BP.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Diffusion decoder:</strong> Starts from Gaussian noise and iteratively denoises toward an error pattern conditioned on the observed syndrome.</li>
          <li><strong>Syndrome conditioning:</strong> The syndrome vector is injected at each denoising step via cross-attention or concatenation.</li>
          <li><strong>Projection step:</strong> After denoising, a projection ensures the decoded error is syndrome-consistent.</li>
          <li><strong>Codes tested:</strong> Hypergraph product codes and bicycle codes of various parameters.</li>
        </ul>
        <figure>
          <img src="images/diffusion-decoding-qldpc/thumbnail.png" alt="Diffusion decoding for qLDPC">
          <figcaption>Diffusion-based decoding pipeline for quantum LDPC codes.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>First diffusion decoder for qLDPC:</strong> Demonstrates feasibility of diffusion models as decoders specifically for quantum LDPC codes.</li>
          <li><strong>Outperforms BP:</strong> Achieves lower logical error rates than standard BP and BP+OSD on codes with short Tanner graph cycles.</li>
          <li><strong>Syndrome consistency:</strong> The projection mechanism guarantees valid corrections, unlike raw neural network outputs.</li>
          <li><strong>Scalability study:</strong> Evaluates performance across multiple code sizes to assess scaling behavior.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Codes</td><td>Hypergraph product codes [[n,k,d]], bicycle codes</td></tr>
            <tr><td>Noise model</td><td>Independent depolarizing, code-capacity setting</td></tr>
            <tr><td>Diffusion steps</td><td>100-500 denoising steps</td></tr>
            <tr><td>Architecture</td><td>U-Net-style with syndrome cross-attention</td></tr>
            <tr><td>Training</td><td>~10<sup>6</sup> syndrome-error pairs, Adam optimizer</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Decoder</th><th>Hypergraph Product</th><th>Bicycle Code</th></tr></thead>
          <tbody>
            <tr><td>BP</td><td>Baseline</td><td>Baseline (poor)</td></tr>
            <tr><td>BP + OSD</td><td>Improved</td><td>Improved</td></tr>
            <tr><td>Diffusion</td><td>Best</td><td>Best</td></tr>
          </tbody>
        </table>
        <p>The diffusion decoder shows the largest advantage on codes where BP struggles most (short cycles, high degeneracy). The gap narrows for codes with better BP-friendly structure.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Addresses a real bottleneck: qLDPC decoding is a major unsolved challenge for quantum computing.</li>
          <li>Clean experimental design isolating the decoder contribution from other variables.</li>
          <li>Syndrome projection guarantees valid outputs, combining neural flexibility with hard constraints.</li>
          <li>Demonstrates clear advantage precisely where existing methods fail.</li>
          <li>Open and reproducible evaluation methodology.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Inference requires hundreds of denoising steps, making real-time decoding infeasible.</li>
          <li>Training is code-specific; a new model must be trained for each code family and distance.</li>
          <li>Only code-capacity noise model tested; circuit-level noise would be more realistic.</li>
          <li>Comparison with other ML-based decoders (GNN, transformer) is limited.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can few-step diffusion (consistency models, flow matching) bring inference time to practical levels?</li>
          <li>Is there a way to train a single diffusion decoder that generalizes across code families?</li>
          <li>How does the diffusion decoder handle time-correlated syndrome data from repeated measurements?</li>
          <li>Could the diffusion decoder be used as a refinement stage after a fast initial BP pass?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper makes a strong case that diffusion models are well-suited for the specific challenges of qLDPC decoding -- handling degeneracy, working without graph structure assumptions, and outperforming BP where it fails. The main barrier to practical use is inference speed, making this a research contribution that points toward future real-time diffusion decoders rather than an immediately deployable solution.</p>
      `
    },
    ko: {
      title: "확산 모델을 이용한 양자 저밀도 패리티 검사 코드 디코딩",
      summary: "확산 모델을 양자 LDPC 코드 디코딩에 적용하여, 반복적 잡음 제거 과정을 활용해 전통적 디코더가 어려워하는 코드에서 신드롬 일관적 교정을 생성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>확산 모델이 qLDPC 코드의 효과적인 디코더로 기능할 수 있음</strong>을 보여주며, 표준 MWPM이 적용 불가능하고 신뢰 전파가 자주 실패하는 코드 계열에서의 성과를 입증합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>확산 기반 생성 모델이 특히 문제가 있는 태너 그래프 구조를 가진 코드에서 신뢰 전파와 그 변형보다 양자 LDPC 코드를 더 정확하게 디코딩할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 LDPC 코드는 거리가 증가하면서 일정 비율 인코딩을 약속하지만, 디코딩이 매우 어렵습니다. MWPM이 잘 작동하는 표면 코드와 달리, qLDPC 코드는 매칭 기반 디코더의 직접 적용을 막는 비국소적 검사 구조를 가집니다. 표준 대안인 신뢰 전파(BP)는 짧은 사이클이 있는 그래프에서 수렴 문제를 겪습니다.</p>
        <p>무작위 초기 상태를 구조화된 출력으로 반복적으로 잡음 제거하는 확산 모델은 BP를 제한하는 그래픽 모델 구조 가정 없이 복잡한 조건부 분포를 학습할 수 있어 설득력 있는 대안을 제공합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>확산 디코더:</strong> 가우시안 잡음에서 시작하여 관측된 신드롬에 조건부로 오류 패턴을 향해 반복적으로 잡음을 제거합니다.</li>
          <li><strong>신드롬 조건화:</strong> 각 잡음 제거 단계에서 교차 어텐션 또는 연결을 통해 신드롬 벡터가 주입됩니다.</li>
          <li><strong>투영 단계:</strong> 잡음 제거 후 투영이 디코딩된 오류가 신드롬 일관적임을 보장합니다.</li>
          <li><strong>테스트 코드:</strong> 다양한 파라미터의 초그래프 곱 코드와 자전거 코드.</li>
        </ul>
        <figure>
          <img src="images/diffusion-decoding-qldpc/thumbnail.png" alt="qLDPC를 위한 확산 디코딩">
          <figcaption>양자 LDPC 코드를 위한 확산 기반 디코딩 파이프라인.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>최초의 qLDPC 확산 디코더:</strong> 양자 LDPC 코드 전용 디코더로서 확산 모델의 실현 가능성을 입증합니다.</li>
          <li><strong>BP 능가:</strong> 짧은 태너 그래프 사이클이 있는 코드에서 표준 BP 및 BP+OSD보다 낮은 논리적 오류율 달성.</li>
          <li><strong>신드롬 일관성:</strong> 투영 메커니즘이 원시 신경망 출력과 달리 유효한 교정을 보장합니다.</li>
          <li><strong>확장성 연구:</strong> 여러 코드 크기에서 성능을 평가하여 스케일링 동작을 분석합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드</td><td>초그래프 곱 코드 [[n,k,d]], 자전거 코드</td></tr>
            <tr><td>잡음 모델</td><td>독립 탈분극, 코드 용량 설정</td></tr>
            <tr><td>확산 단계</td><td>100-500 잡음 제거 단계</td></tr>
            <tr><td>아키텍처</td><td>신드롬 교차 어텐션이 있는 U-Net 스타일</td></tr>
            <tr><td>훈련</td><td>약 10<sup>6</sup>개 신드롬-오류 쌍, Adam 옵티마이저</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>디코더</th><th>초그래프 곱</th><th>자전거 코드</th></tr></thead>
          <tbody>
            <tr><td>BP</td><td>기준선</td><td>기준선 (불량)</td></tr>
            <tr><td>BP + OSD</td><td>개선됨</td><td>개선됨</td></tr>
            <tr><td>확산</td><td>최고</td><td>최고</td></tr>
          </tbody>
        </table>
        <p>확산 디코더는 BP가 가장 어려워하는 코드(짧은 사이클, 높은 축퇴)에서 가장 큰 이점을 보입니다. BP에 우호적인 구조를 가진 코드에서는 격차가 좁아집니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실질적 병목 해결: qLDPC 디코딩은 양자 컴퓨팅의 주요 미해결 과제입니다.</li>
          <li>다른 변수로부터 디코더 기여를 분리하는 깔끔한 실험 설계.</li>
          <li>신드롬 투영이 유효한 출력을 보장하여 신경망 유연성과 엄격한 제약을 결합합니다.</li>
          <li>기존 방법이 실패하는 곳에서 정확히 명확한 이점을 보여줍니다.</li>
          <li>개방적이고 재현 가능한 평가 방법론.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>추론에 수백 번의 잡음 제거 단계가 필요하여 실시간 디코딩이 불가능합니다.</li>
          <li>훈련이 코드별로 특화되어 각 코드 계열과 거리에 대해 새 모델을 훈련해야 합니다.</li>
          <li>코드 용량 잡음 모델만 테스트되었으며, 회로 수준 잡음이 더 현실적일 것입니다.</li>
          <li>다른 ML 기반 디코더(GNN, 트랜스포머)와의 비교가 제한적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>소수 단계 확산(일관성 모델, 플로우 매칭)이 추론 시간을 실용적 수준으로 낮출 수 있는가?</li>
          <li>코드 계열을 넘어 일반화하는 단일 확산 디코더를 훈련할 수 있는 방법이 있는가?</li>
          <li>확산 디코더는 반복 측정의 시간 상관 신드롬 데이터를 어떻게 처리하는가?</li>
          <li>확산 디코더를 빠른 초기 BP 패스 후의 정제 단계로 사용할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 확산 모델이 qLDPC 디코딩의 특정 과제에 적합하다는 강력한 주장을 합니다 -- 축퇴 처리, 그래프 구조 가정 없이 작동, BP가 실패하는 곳에서의 우수한 성능. 실용적 사용의 주요 장벽은 추론 속도이며, 이는 즉시 배포 가능한 솔루션이 아닌 미래의 실시간 확산 디코더를 가리키는 연구 기여입니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. finite-size-decoy-qkd
  // ====================================================================
  {
    id: "finite-size-decoy-qkd",
    date: "2025-04-11",
    authors: "Wiesemann, J., et al.",
    venue: "Preprint 2025",
    image: "images/finite-size-decoy-qkd/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "QKD", "Finite-Size", "Security Proof"],
    en: {
      title: "A Consolidated and Accessible Security Proof for Finite-Size Decoy-State Quantum Key Distribution",
      summary: "Provides a unified, self-contained security proof for decoy-state BB84 QKD in the finite-key regime, consolidating scattered results into a single accessible framework with tighter key rate bounds.",
      review: `
        <h2>One-line Verdict</h2>
        <p>A pedagogical yet rigorous paper that <strong>consolidates the finite-size security analysis of decoy-state QKD</strong> into a single coherent framework, making the proof chain accessible while tightening key rate bounds.</p>

        <h2>Research Question</h2>
        <blockquote>Can the security proof for finite-size decoy-state BB84 QKD be presented in a consolidated, self-contained manner that is both rigorous and accessible, while improving upon existing finite-key rate bounds?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Quantum key distribution (QKD) promises information-theoretically secure communication, but practical security proofs must account for finite data: real experiments exchange a finite number of signals, making statistical estimation of parameters necessary. The decoy-state method, which uses multiple intensity levels to bound the single-photon contribution, adds further complexity.</p>
        <p>Existing finite-size security proofs are scattered across multiple papers, each handling different aspects (decoy analysis, privacy amplification, error correction cost). This fragmentation makes it difficult for implementers to verify the full proof chain. This paper consolidates everything into one self-contained treatment.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Protocol:</strong> Standard decoy-state BB84 with signal, decoy, and vacuum intensity levels.</li>
          <li><strong>Finite-size framework:</strong> Entropic uncertainty relation approach with composable security definition.</li>
          <li><strong>Decoy analysis:</strong> Linear programming bounds on single-photon yield and error rate from finite observed statistics.</li>
          <li><strong>Key rate formula:</strong> Combines smooth min-entropy bound, error correction leakage, and privacy amplification with explicit finite-size corrections.</li>
        </ul>
        <figure>
          <img src="images/finite-size-decoy-qkd/thumbnail.png" alt="Finite-size QKD security proof structure">
          <figcaption>Structure of the consolidated finite-size security proof for decoy-state QKD.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Consolidation:</strong> First fully self-contained presentation of finite-size decoy-state BB84 security proof.</li>
          <li><strong>Tighter bounds:</strong> Improved finite-size key rate through optimized statistical fluctuation terms.</li>
          <li><strong>Composable security:</strong> Proof is composable, meaning it remains valid when QKD keys are used in subsequent protocols.</li>
          <li><strong>Accessibility:</strong> Written to be understandable by experimentalists, not just theorists.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Aspect</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Protocol</td><td>Decoy-state BB84, 3 intensity levels</td></tr>
            <tr><td>Security definition</td><td>Composable (universally composable framework)</td></tr>
            <tr><td>Block sizes</td><td>N = 10<sup>8</sup> to 10<sup>12</sup> signals analyzed</td></tr>
            <tr><td>Security parameter</td><td>epsilon = 10<sup>-10</sup> (total security)</td></tr>
            <tr><td>Channel model</td><td>Standard fiber-optic loss model (0.2 dB/km)</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Block Size N</th><th>Previous Key Rate</th><th>This Work Key Rate</th><th>Distance (km)</th></tr></thead>
          <tbody>
            <tr><td>10<sup>10</sup></td><td>Moderate</td><td>Improved (~5-15%)</td><td>50-100</td></tr>
            <tr><td>10<sup>12</sup></td><td>Near asymptotic</td><td>Tighter bound</td><td>100-200</td></tr>
            <tr><td>10<sup>8</sup></td><td>Very low</td><td>Noticeable improvement</td><td>20-50</td></tr>
          </tbody>
        </table>
        <p>The tighter bounds are most impactful at moderate block sizes (10<sup>8</sup>-10<sup>10</sup>) where finite-size corrections dominate, yielding 5-15% higher key rates than previous analyses for the same security level.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Removes the need to cross-reference multiple papers for a complete security proof.</li>
          <li>Composable security framework ensures real-world applicability.</li>
          <li>Clear separation of statistical and information-theoretic components.</li>
          <li>Practical key rate improvements at experimentally relevant block sizes.</li>
          <li>Accessible writing style bridges theorists and experimentalists.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Restricted to standard BB84 with decoy states; does not cover MDI-QKD or TF-QKD.</li>
          <li>Assumes ideal single-photon detectors and standard detector models.</li>
          <li>Does not address implementation security loopholes (side channels, Trojan horse attacks).</li>
          <li>Key rate improvements, while meaningful, are incremental rather than transformative.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can this consolidated framework be extended to cover measurement-device-independent protocols?</li>
          <li>How sensitive are the tighter bounds to mischaracterization of the source intensity levels?</li>
          <li>Would numerical optimization of decoy intensities further improve finite-size key rates?</li>
          <li>Is the composable security framework necessary for all practical QKD deployments, or is standalone security sufficient?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is valuable primarily as a reference work that lowers the barrier to understanding finite-size QKD security. The tighter key rate bounds are a welcome improvement, but the main contribution is consolidation: providing a single, self-contained document that an experimentalist can follow from protocol description to final key rate formula. This is the paper to cite and consult when implementing decoy-state BB84 with rigorous finite-size security.</p>
      `
    },
    ko: {
      title: "유한 크기 디코이 상태 양자 키 분배에 대한 통합적이고 접근 가능한 보안 증명",
      summary: "유한 키 영역에서 디코이 상태 BB84 QKD의 통합된 자체 완결적 보안 증명을 제공하며, 분산된 결과들을 단일 접근 가능한 프레임워크로 통합하고 더 타이트한 키 레이트 경계를 제시합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>디코이 상태 QKD의 유한 크기 보안 분석을 단일 일관된 프레임워크로 통합</strong>하는 교육적이면서도 엄밀한 논문으로, 증명 체인을 접근 가능하게 만들면서 키 레이트 경계를 개선합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>유한 크기 디코이 상태 BB84 QKD의 보안 증명을 엄밀하면서도 접근 가능한 통합된 자체 완결적 방식으로 제시할 수 있으며, 기존 유한 키 레이트 경계를 개선할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>양자 키 분배(QKD)는 정보 이론적으로 안전한 통신을 약속하지만, 실용적 보안 증명은 유한 데이터를 고려해야 합니다. 실제 실험에서는 유한한 수의 신호를 교환하므로 파라미터의 통계적 추정이 필요합니다. 여러 강도 수준을 사용하여 단일 광자 기여를 제한하는 디코이 상태 방법은 추가 복잡성을 더합니다.</p>
        <p>기존 유한 크기 보안 증명은 여러 논문에 분산되어 있어 구현자가 전체 증명 체인을 검증하기 어렵습니다. 이 논문은 모든 것을 하나의 자체 완결적 처리로 통합합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>프로토콜:</strong> 신호, 디코이, 진공 강도 수준을 가진 표준 디코이 상태 BB84.</li>
          <li><strong>유한 크기 프레임워크:</strong> 조합 가능 보안 정의를 가진 엔트로피 불확정성 관계 접근법.</li>
          <li><strong>디코이 분석:</strong> 유한 관측 통계에서 단일 광자 수율과 오류율에 대한 선형 프로그래밍 경계.</li>
          <li><strong>키 레이트 공식:</strong> 부드러운 최소 엔트로피 경계, 오류 정정 누출, 프라이버시 증폭을 명시적 유한 크기 보정과 결합.</li>
        </ul>
        <figure>
          <img src="images/finite-size-decoy-qkd/thumbnail.png" alt="유한 크기 QKD 보안 증명 구조">
          <figcaption>디코이 상태 QKD를 위한 통합 유한 크기 보안 증명의 구조.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>통합:</strong> 유한 크기 디코이 상태 BB84 보안 증명의 최초 완전 자체 완결적 제시.</li>
          <li><strong>더 타이트한 경계:</strong> 최적화된 통계적 변동 항을 통한 유한 크기 키 레이트 개선.</li>
          <li><strong>조합 가능 보안:</strong> QKD 키가 후속 프로토콜에서 사용될 때도 유효한 조합 가능 증명.</li>
          <li><strong>접근성:</strong> 이론가뿐 아니라 실험가도 이해할 수 있도록 작성.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>항목</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>프로토콜</td><td>디코이 상태 BB84, 3개 강도 수준</td></tr>
            <tr><td>보안 정의</td><td>조합 가능(보편적 조합 가능 프레임워크)</td></tr>
            <tr><td>블록 크기</td><td>N = 10<sup>8</sup> ~ 10<sup>12</sup> 신호 분석</td></tr>
            <tr><td>보안 파라미터</td><td>epsilon = 10<sup>-10</sup> (전체 보안)</td></tr>
            <tr><td>채널 모델</td><td>표준 광섬유 손실 모델 (0.2 dB/km)</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>블록 크기 N</th><th>기존 키 레이트</th><th>본 연구 키 레이트</th><th>거리 (km)</th></tr></thead>
          <tbody>
            <tr><td>10<sup>10</sup></td><td>보통</td><td>개선 (~5-15%)</td><td>50-100</td></tr>
            <tr><td>10<sup>12</sup></td><td>점근적에 근접</td><td>더 타이트한 경계</td><td>100-200</td></tr>
            <tr><td>10<sup>8</sup></td><td>매우 낮음</td><td>눈에 띄는 개선</td><td>20-50</td></tr>
          </tbody>
        </table>
        <p>더 타이트한 경계는 유한 크기 보정이 지배하는 중간 블록 크기(10<sup>8</sup>-10<sup>10</sup>)에서 가장 영향력이 크며, 동일 보안 수준에서 이전 분석보다 5-15% 높은 키 레이트를 제공합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>완전한 보안 증명을 위해 여러 논문을 교차 참조할 필요를 제거합니다.</li>
          <li>조합 가능 보안 프레임워크가 실세계 적용 가능성을 보장합니다.</li>
          <li>통계적 구성 요소와 정보 이론적 구성 요소의 명확한 분리.</li>
          <li>실험적으로 관련 있는 블록 크기에서 실질적 키 레이트 개선.</li>
          <li>이론가와 실험가를 연결하는 접근 가능한 서술 방식.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>표준 BB84와 디코이 상태에 제한되며 MDI-QKD나 TF-QKD를 다루지 않습니다.</li>
          <li>이상적 단일 광자 검출기와 표준 검출기 모델을 가정합니다.</li>
          <li>구현 보안 허점(부채널, 트로이 목마 공격)을 다루지 않습니다.</li>
          <li>키 레이트 개선이 의미 있지만 혁신적이기보다는 점진적입니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>이 통합 프레임워크가 측정 장치 독립적 프로토콜을 포함하도록 확장될 수 있는가?</li>
          <li>더 타이트한 경계는 소스 강도 수준의 잘못된 특성화에 얼마나 민감한가?</li>
          <li>디코이 강도의 수치적 최적화가 유한 크기 키 레이트를 더 개선할 수 있는가?</li>
          <li>조합 가능 보안 프레임워크가 모든 실용적 QKD 배포에 필요한가, 아니면 독립형 보안으로 충분한가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 주로 유한 크기 QKD 보안 이해의 장벽을 낮추는 참조 자료로서 가치가 있습니다. 더 타이트한 키 레이트 경계는 환영할 만한 개선이지만, 주요 기여는 통합입니다: 실험가가 프로토콜 설명에서 최종 키 레이트 공식까지 따라갈 수 있는 단일 자체 완결적 문서를 제공합니다. 엄밀한 유한 크기 보안으로 디코이 상태 BB84를 구현할 때 인용하고 참조해야 할 논문입니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. rydberg-gate-syndrome
  // ====================================================================
  {
    id: "rydberg-gate-syndrome",
    date: "2025-04-11",
    authors: "Miles, J., et al.",
    venue: "Preprint 2025",
    image: "images/rydberg-gate-syndrome/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "Rydberg Gate", "Syndrome Measurement"],
    en: {
      title: "Qubit Syndrome Measurements with a High-Fidelity Rb-Cs Rydberg Gate",
      summary: "Demonstrates high-fidelity two-qubit Rydberg gates between rubidium and cesium atoms and applies them to syndrome extraction circuits for quantum error correction, achieving competitive fidelities in a dual-species atomic platform.",
      review: `
        <h2>One-line Verdict</h2>
        <p>An experimental paper demonstrating that <strong>heteronuclear Rb-Cs Rydberg gates can perform syndrome measurements</strong> with fidelities approaching the requirements for fault-tolerant quantum error correction, validating the dual-species atomic approach.</p>

        <h2>Research Question</h2>
        <blockquote>Can heteronuclear Rydberg gates between rubidium and cesium atoms achieve sufficient fidelity for syndrome extraction in quantum error correction, and what are the dominant error sources?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Neutral atom quantum computers have emerged as a scalable platform, with Rydberg-mediated interactions enabling long-range entangling gates. Using two atomic species (Rb and Cs) provides natural separation between data qubits and ancilla qubits, eliminating crosstalk during individual addressing. This dual-species approach is particularly attractive for quantum error correction where ancilla qubits perform syndrome extraction without disturbing data qubits.</p>
        <p>However, the Rydberg interaction between heteronuclear species has different characteristics than homonuclear gates, and achieving high fidelity requires careful optimization of pulse sequences and addressing of species-specific decoherence mechanisms.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Platform:</strong> Optical tweezer arrays with Rb-87 (data qubits) and Cs-133 (ancilla qubits) atoms.</li>
          <li><strong>Gate mechanism:</strong> Rydberg blockade-mediated CZ gate between Rb and Cs using optimized pulse sequences.</li>
          <li><strong>Syndrome circuit:</strong> Weight-4 stabilizer measurements using ancilla Cs atoms coupled to neighboring Rb data qubits.</li>
          <li><strong>Characterization:</strong> Randomized benchmarking, process tomography, and syndrome extraction fidelity measurements.</li>
        </ul>
        <figure>
          <img src="images/rydberg-gate-syndrome/thumbnail.png" alt="Rb-Cs Rydberg gate syndrome extraction">
          <figcaption>Dual-species Rb-Cs platform for syndrome measurement via Rydberg gates.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>High-fidelity heteronuclear gate:</strong> Demonstrates Rb-Cs CZ gate fidelity exceeding 99% after optimization.</li>
          <li><strong>Syndrome extraction:</strong> First demonstration of full weight-4 stabilizer measurement using dual-species Rydberg platform.</li>
          <li><strong>Error budget:</strong> Detailed characterization of error sources (Rydberg decay, motional heating, laser phase noise).</li>
          <li><strong>Scalability argument:</strong> Dual-species approach naturally separates data and ancilla roles, simplifying error correction circuits.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Species</td><td>Rb-87 (data), Cs-133 (ancilla)</td></tr>
            <tr><td>Gate type</td><td>Rydberg blockade CZ gate</td></tr>
            <tr><td>Gate fidelity</td><td>>99% (post-selected), ~98.5% (raw)</td></tr>
            <tr><td>Gate time</td><td>~1 microsecond</td></tr>
            <tr><td>Stabilizer weight</td><td>Weight-4 (surface code plaquette)</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Metric</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Two-qubit gate fidelity (RB)</td><td>>99%</td></tr>
            <tr><td>Single-qubit gate fidelity</td><td>>99.5%</td></tr>
            <tr><td>Syndrome extraction fidelity</td><td>~95-97% (full circuit)</td></tr>
            <tr><td>Dominant error source</td><td>Rydberg state decay and motional heating</td></tr>
          </tbody>
        </table>
        <p>The syndrome extraction fidelity of 95-97% for a full weight-4 stabilizer circuit is competitive with other neutral atom platforms and approaching the threshold for surface code error correction with moderate code distances.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Clean demonstration of a dual-species advantage for quantum error correction.</li>
          <li>Detailed error budget identifying actionable improvements.</li>
          <li>Gate fidelities competitive with state-of-the-art single-species Rydberg platforms.</li>
          <li>Direct connection to QEC requirements rather than isolated gate benchmarks.</li>
          <li>Scalable architecture with natural data-ancilla separation.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Syndrome extraction demonstrated on a single stabilizer, not a full surface code.</li>
          <li>Post-selection inflates reported fidelities; raw numbers are more relevant for fault tolerance.</li>
          <li>Atom loss and reloading overhead not fully characterized for repetitive syndrome cycles.</li>
          <li>Comparison with single-species approaches is not on equal footing (different system sizes).</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Can the dual-species approach maintain its advantage at the system sizes needed for logical qubits (hundreds of atoms)?</li>
          <li>How does atom loss during Rydberg excitation scale with the number of syndrome extraction rounds?</li>
          <li>Would mid-circuit measurement and feed-forward be feasible on this platform for real-time error correction?</li>
          <li>Could three-species systems further improve the separation of roles in error correction circuits?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper provides encouraging experimental evidence that dual-species neutral atom platforms are viable for quantum error correction. The high heteronuclear gate fidelity and successful syndrome extraction demonstrate that the added complexity of managing two species pays off in cleaner error correction circuits. The next milestone will be scaling to a full distance-3 surface code with repeated syndrome extraction.</p>
      `
    },
    ko: {
      title: "고충실도 Rb-Cs 뤼드베르크 게이트를 이용한 큐비트 신드롬 측정",
      summary: "루비듐과 세슘 원자 간 고충실도 2큐비트 뤼드베르크 게이트를 시연하고 양자 오류 정정을 위한 신드롬 추출 회로에 적용하여, 이중 원자종 플랫폼에서 경쟁력 있는 충실도를 달성합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>이종 원자핵 Rb-Cs 뤼드베르크 게이트가 결함 허용 양자 오류 정정 요건에 근접하는 충실도로 신드롬 측정을 수행할 수 있음</strong>을 실험적으로 입증하여 이중 원자종 접근법을 검증합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>루비듐과 세슘 원자 간 이종 원자핵 뤼드베르크 게이트가 양자 오류 정정의 신드롬 추출에 충분한 충실도를 달성할 수 있으며, 지배적 오류 원인은 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>중성 원자 양자 컴퓨터는 확장 가능한 플랫폼으로 부상했으며, 뤼드베르크 매개 상호작용이 장거리 얽힘 게이트를 가능하게 합니다. 두 원자종(Rb과 Cs)을 사용하면 데이터 큐비트와 보조 큐비트 사이의 자연스러운 분리를 제공하여 개별 주소 지정 중 누화를 제거합니다. 이 이중 원자종 접근법은 보조 큐비트가 데이터 큐비트를 방해하지 않고 신드롬 추출을 수행하는 양자 오류 정정에 특히 매력적입니다.</p>
        <p>그러나 이종 원자핵 간의 뤼드베르크 상호작용은 동종 게이트와 다른 특성을 가지며, 높은 충실도를 달성하려면 펄스 시퀀스의 신중한 최적화와 종별 결맞음 해제 메커니즘의 처리가 필요합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>플랫폼:</strong> Rb-87(데이터 큐비트)과 Cs-133(보조 큐비트) 원자가 있는 광학 핀셋 배열.</li>
          <li><strong>게이트 메커니즘:</strong> 최적화된 펄스 시퀀스를 사용한 Rb과 Cs 간 뤼드베르크 봉쇄 매개 CZ 게이트.</li>
          <li><strong>신드롬 회로:</strong> 인접 Rb 데이터 큐비트에 결합된 보조 Cs 원자를 사용한 가중치-4 안정기 측정.</li>
          <li><strong>특성화:</strong> 무작위 벤치마킹, 프로세스 토모그래피, 신드롬 추출 충실도 측정.</li>
        </ul>
        <figure>
          <img src="images/rydberg-gate-syndrome/thumbnail.png" alt="Rb-Cs 뤼드베르크 게이트 신드롬 추출">
          <figcaption>뤼드베르크 게이트를 통한 신드롬 측정을 위한 이중 원자종 Rb-Cs 플랫폼.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>고충실도 이종 원자핵 게이트:</strong> 최적화 후 99%를 초과하는 Rb-Cs CZ 게이트 충실도를 시연합니다.</li>
          <li><strong>신드롬 추출:</strong> 이중 원자종 뤼드베르크 플랫폼을 사용한 전체 가중치-4 안정기 측정의 최초 시연.</li>
          <li><strong>오류 예산:</strong> 오류 원인(뤼드베르크 붕괴, 운동 가열, 레이저 위상 잡음)의 상세한 특성화.</li>
          <li><strong>확장성 논거:</strong> 이중 원자종 접근법이 데이터와 보조 역할을 자연스럽게 분리하여 오류 정정 회로를 단순화합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>원자종</td><td>Rb-87 (데이터), Cs-133 (보조)</td></tr>
            <tr><td>게이트 유형</td><td>뤼드베르크 봉쇄 CZ 게이트</td></tr>
            <tr><td>게이트 충실도</td><td>>99% (사후 선택), ~98.5% (원시)</td></tr>
            <tr><td>게이트 시간</td><td>~1 마이크로초</td></tr>
            <tr><td>안정기 가중치</td><td>가중치-4 (표면 코드 플라켓)</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>지표</th><th>값</th></tr></thead>
          <tbody>
            <tr><td>2큐비트 게이트 충실도 (RB)</td><td>>99%</td></tr>
            <tr><td>단일 큐비트 게이트 충실도</td><td>>99.5%</td></tr>
            <tr><td>신드롬 추출 충실도</td><td>~95-97% (전체 회로)</td></tr>
            <tr><td>지배적 오류 원인</td><td>뤼드베르크 상태 붕괴 및 운동 가열</td></tr>
          </tbody>
        </table>
        <p>전체 가중치-4 안정기 회로의 95-97% 신드롬 추출 충실도는 다른 중성 원자 플랫폼과 경쟁력이 있으며, 중간 코드 거리에서의 표면 코드 오류 정정 임계값에 접근하고 있습니다.</p>

        <h2>강점</h2>
        <ul>
          <li>양자 오류 정정을 위한 이중 원자종 이점의 깔끔한 시연.</li>
          <li>실행 가능한 개선을 식별하는 상세한 오류 예산.</li>
          <li>최신 단일 원자종 뤼드베르크 플랫폼과 경쟁력 있는 게이트 충실도.</li>
          <li>고립된 게이트 벤치마크가 아닌 QEC 요구 사항과의 직접적 연결.</li>
          <li>자연스러운 데이터-보조 분리가 있는 확장 가능한 아키텍처.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>신드롬 추출이 전체 표면 코드가 아닌 단일 안정기에서 시연되었습니다.</li>
          <li>사후 선택이 보고된 충실도를 부풀리며, 결함 허용에는 원시 수치가 더 관련이 있습니다.</li>
          <li>반복적 신드롬 사이클에 대한 원자 손실 및 재적재 오버헤드가 완전히 특성화되지 않았습니다.</li>
          <li>단일 원자종 접근법과의 비교가 동등한 조건(다른 시스템 크기)이 아닙니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>이중 원자종 접근법이 논리적 큐비트에 필요한 시스템 크기(수백 개 원자)에서 이점을 유지할 수 있는가?</li>
          <li>뤼드베르크 여기 중 원자 손실은 신드롬 추출 라운드 수에 따라 어떻게 확장되는가?</li>
          <li>실시간 오류 정정을 위한 회로 중간 측정 및 피드포워드가 이 플랫폼에서 실현 가능한가?</li>
          <li>3원자종 시스템이 오류 정정 회로에서 역할 분리를 더 개선할 수 있는가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 이중 원자종 중성 원자 플랫폼이 양자 오류 정정에 실행 가능하다는 고무적인 실험적 증거를 제공합니다. 높은 이종 원자핵 게이트 충실도와 성공적인 신드롬 추출은 두 원자종 관리의 추가 복잡성이 더 깨끗한 오류 정정 회로로 보상됨을 보여줍니다. 다음 이정표는 반복적 신드롬 추출이 있는 전체 거리-3 표면 코드로의 확장입니다.</p>
      `
    }
  },

  // ====================================================================
  // 7. lidmas-decoder
  // ====================================================================
  {
    id: "lidmas-decoder",
    date: "2025-04-11",
    authors: "Wayo, D. D. K., et al.",
    venue: "Preprint 2025",
    image: "images/lidmas-decoder/thumbnail.png",
    link: "",
    domain: "quantum-computing",
    tags: ["Quantum Computing", "CV Codes", "Surface Code", "Decoder"],
    en: {
      title: "Decoder Performance in Hybrid CV-Discrete Surface-Code Threshold Estimation Using LiDMaS+",
      summary: "Evaluates the LiDMaS+ decoder for hybrid continuous-variable and discrete-variable surface codes, analyzing how decoder choice and analog information from CV qubits affect threshold estimation in this hybrid architecture.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper benchmarks the <strong>LiDMaS+ decoder on hybrid CV-discrete surface codes</strong>, demonstrating that incorporating analog CV information into the decoding process meaningfully improves threshold estimates compared to purely discrete approaches.</p>

        <h2>Research Question</h2>
        <blockquote>How does the LiDMaS+ decoder perform for threshold estimation in hybrid continuous-variable/discrete-variable surface codes, and how much does analog CV information contribute to decoding accuracy?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Hybrid quantum error correction architectures that combine continuous-variable (CV) qubits (such as GKP states) with discrete-variable surface codes have attracted interest because CV qubits provide analog syndrome information that can enhance decoding. The LiDMaS+ (Lifted Decoder with Matched Sampling) decoder is designed specifically to exploit this analog information.</p>
        <p>Accurate threshold estimation for such hybrid codes requires decoders that can properly ingest and utilize the soft analog data from CV measurements, rather than simply discretizing it. This paper systematically evaluates LiDMaS+ for this purpose.</p>

        <h2>Architecture / Methodology</h2>
        <ul>
          <li><strong>Hybrid code:</strong> Surface code with physical qubits encoded as GKP states in bosonic modes, providing analog syndrome data.</li>
          <li><strong>LiDMaS+ decoder:</strong> Extends standard matching decoders by incorporating soft information from CV measurements as edge weights.</li>
          <li><strong>Threshold estimation:</strong> Finite-size scaling analysis across multiple code distances with Monte Carlo sampling.</li>
          <li><strong>Comparison:</strong> Benchmarked against standard MWPM with hard-decision inputs and other soft-information decoders.</li>
        </ul>
        <figure>
          <img src="images/lidmas-decoder/thumbnail.png" alt="LiDMaS+ decoder for hybrid CV-discrete codes">
          <figcaption>LiDMaS+ decoding pipeline for hybrid CV-discrete surface codes.</figcaption>
        </figure>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>LiDMaS+ evaluation:</strong> First comprehensive benchmark of LiDMaS+ on hybrid CV-discrete surface codes across multiple distances.</li>
          <li><strong>Analog information value:</strong> Quantifies the threshold improvement from using soft CV information versus hard decisions.</li>
          <li><strong>Decoder comparison:</strong> Compares LiDMaS+ against MWPM and union-find variants on hybrid codes.</li>
          <li><strong>Practical guidance:</strong> Provides recommendations for decoder selection in hybrid CV-discrete architectures.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <table>
          <thead><tr><th>Parameter</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Code</td><td>Rotated surface code, d = 3, 5, 7, 9, 11</td></tr>
            <tr><td>CV encoding</td><td>GKP states with Gaussian noise envelope</td></tr>
            <tr><td>Decoder</td><td>LiDMaS+ with soft-weighted matching</td></tr>
            <tr><td>Sampling</td><td>Monte Carlo, ~10<sup>6</sup> shots per point</td></tr>
            <tr><td>Threshold method</td><td>Finite-size scaling crossing analysis</td></tr>
          </tbody>
        </table>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Decoder</th><th>Threshold (sigma)</th><th>Analog Info</th></tr></thead>
          <tbody>
            <tr><td>MWPM (hard)</td><td>Lower baseline</td><td>No</td></tr>
            <tr><td>MWPM (soft)</td><td>Improved</td><td>Yes</td></tr>
            <tr><td>LiDMaS+</td><td>Highest</td><td>Yes (optimized)</td></tr>
          </tbody>
        </table>
        <p>LiDMaS+ achieves the highest threshold among tested decoders by optimally weighting the analog GKP information. The improvement over hard-decision MWPM is substantial, confirming that soft information is a critical resource in hybrid CV-discrete architectures.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Directly addresses a practical need in the growing hybrid CV-discrete QEC community.</li>
          <li>Systematic comparison across multiple code distances ensures robust threshold estimates.</li>
          <li>Clear demonstration that analog information is not just helpful but essential for optimal thresholds.</li>
          <li>LiDMaS+ decoder is well-motivated and clearly described.</li>
          <li>Results are consistent with and extend prior decoder-dependence findings.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Limited to GKP-based CV encoding; other CV schemes (cat codes, binomial codes) not tested.</li>
          <li>Only surface code topology; generalization to other code families unclear.</li>
          <li>Decoder runtime analysis is minimal; practical latency not evaluated.</li>
          <li>Noise model is simplified; realistic hardware noise (photon loss, finite squeezing) partially addressed.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does LiDMaS+ compare to neural-network-based decoders that could also ingest soft CV information?</li>
          <li>Can the LiDMaS+ approach be adapted for concatenated codes beyond the surface code?</li>
          <li>What is the minimum squeezing level at which analog CV information provides meaningful decoding advantage?</li>
          <li>How would hardware-realistic noise models (finite energy GKP states) change the threshold estimates?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper reinforces the message that decoder choice matters critically in hybrid quantum error correction, and that decoders designed to exploit analog CV information (like LiDMaS+) unlock substantially better thresholds. For teams building GKP-based quantum computers, co-designing the decoder with the CV measurement pipeline is not optional -- it is essential for reaching competitive thresholds.</p>
      `
    },
    ko: {
      title: "LiDMaS+를 이용한 하이브리드 CV-이산 표면 코드 임계값 추정에서의 디코더 성능",
      summary: "하이브리드 연속변수-이산변수 표면 코드에 대한 LiDMaS+ 디코더를 평가하고, 디코더 선택과 CV 큐비트의 아날로그 정보가 이 하이브리드 아키텍처의 임계값 추정에 어떤 영향을 미치는지 분석합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p><strong>하이브리드 CV-이산 표면 코드에서 LiDMaS+ 디코더를 벤치마크</strong>하여, 아날로그 CV 정보를 디코딩 과정에 통합하면 순수 이산 접근법에 비해 의미 있는 임계값 개선이 이루어짐을 입증합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>하이브리드 연속변수/이산변수 표면 코드에서 LiDMaS+ 디코더의 임계값 추정 성능은 어떠하며, 아날로그 CV 정보가 디코딩 정확도에 얼마나 기여하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>연속변수(CV) 큐비트(예: GKP 상태)와 이산변수 표면 코드를 결합하는 하이브리드 양자 오류 정정 아키텍처는 CV 큐비트가 디코딩을 향상시킬 수 있는 아날로그 신드롬 정보를 제공하기 때문에 관심을 받고 있습니다. LiDMaS+(Lifted Decoder with Matched Sampling) 디코더는 이 아날로그 정보를 활용하도록 특별히 설계되었습니다.</p>
        <p>이러한 하이브리드 코드의 정확한 임계값 추정에는 CV 측정의 소프트 아날로그 데이터를 단순히 이산화하지 않고 적절히 수용하고 활용할 수 있는 디코더가 필요합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <ul>
          <li><strong>하이브리드 코드:</strong> 보손 모드에서 GKP 상태로 인코딩된 물리적 큐비트가 있는 표면 코드로, 아날로그 신드롬 데이터를 제공합니다.</li>
          <li><strong>LiDMaS+ 디코더:</strong> CV 측정의 소프트 정보를 엣지 가중치로 통합하여 표준 매칭 디코더를 확장합니다.</li>
          <li><strong>임계값 추정:</strong> 몬테카를로 샘플링으로 여러 코드 거리에 걸친 유한 크기 스케일링 분석.</li>
          <li><strong>비교:</strong> 경판정 입력의 표준 MWPM 및 기타 소프트 정보 디코더와 벤치마크.</li>
        </ul>
        <figure>
          <img src="images/lidmas-decoder/thumbnail.png" alt="하이브리드 CV-이산 코드를 위한 LiDMaS+ 디코더">
          <figcaption>하이브리드 CV-이산 표면 코드를 위한 LiDMaS+ 디코딩 파이프라인.</figcaption>
        </figure>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>LiDMaS+ 평가:</strong> 여러 거리에 걸친 하이브리드 CV-이산 표면 코드에서의 LiDMaS+ 최초 종합 벤치마크.</li>
          <li><strong>아날로그 정보 가치:</strong> 소프트 CV 정보 사용 대 경판정의 임계값 개선을 정량화합니다.</li>
          <li><strong>디코더 비교:</strong> 하이브리드 코드에서 LiDMaS+를 MWPM 및 union-find 변형과 비교합니다.</li>
          <li><strong>실용적 가이드:</strong> 하이브리드 CV-이산 아키텍처에서의 디코더 선택에 대한 권고를 제공합니다.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <table>
          <thead><tr><th>파라미터</th><th>세부사항</th></tr></thead>
          <tbody>
            <tr><td>코드</td><td>회전 표면 코드, d = 3, 5, 7, 9, 11</td></tr>
            <tr><td>CV 인코딩</td><td>가우시안 잡음 포락선이 있는 GKP 상태</td></tr>
            <tr><td>디코더</td><td>소프트 가중 매칭이 있는 LiDMaS+</td></tr>
            <tr><td>샘플링</td><td>몬테카를로, 포인트당 약 10<sup>6</sup>회</td></tr>
            <tr><td>임계값 방법</td><td>유한 크기 스케일링 교차점 분석</td></tr>
          </tbody>
        </table>

        <h2>실험 결과</h2>
        <table>
          <thead><tr><th>디코더</th><th>임계값 (시그마)</th><th>아날로그 정보</th></tr></thead>
          <tbody>
            <tr><td>MWPM (경판정)</td><td>하한 기준선</td><td>아니오</td></tr>
            <tr><td>MWPM (소프트)</td><td>개선됨</td><td>예</td></tr>
            <tr><td>LiDMaS+</td><td>최고</td><td>예 (최적화)</td></tr>
          </tbody>
        </table>
        <p>LiDMaS+는 아날로그 GKP 정보를 최적으로 가중하여 테스트된 디코더 중 가장 높은 임계값을 달성합니다. 경판정 MWPM 대비 개선은 상당하며, 소프트 정보가 하이브리드 CV-이산 아키텍처에서 핵심 자원임을 확인합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>성장하는 하이브리드 CV-이산 QEC 커뮤니티의 실질적 필요를 직접 다룹니다.</li>
          <li>여러 코드 거리에 걸친 체계적 비교로 견고한 임계값 추정을 보장합니다.</li>
          <li>아날로그 정보가 단순히 유용할 뿐 아니라 최적 임계값에 필수적임을 명확히 입증합니다.</li>
          <li>LiDMaS+ 디코더가 잘 동기 부여되고 명확히 설명됩니다.</li>
          <li>결과가 이전 디코더 의존성 발견과 일관되며 이를 확장합니다.</li>
        </ul>

        <h2>한계</h2>
        <ul>
          <li>GKP 기반 CV 인코딩에 제한되며, 다른 CV 체계(고양이 코드, 이항 코드)는 테스트되지 않았습니다.</li>
          <li>표면 코드 토폴로지만 다루며, 다른 코드 계열로의 일반화는 불명확합니다.</li>
          <li>디코더 실행 시간 분석이 최소화되어 실질적 지연 시간이 평가되지 않았습니다.</li>
          <li>잡음 모델이 단순화되었으며, 현실적 하드웨어 잡음(광자 손실, 유한 스퀴징)이 부분적으로만 다루어졌습니다.</li>
        </ul>

        <h2>디스커션 포인트</h2>
        <ol>
          <li>LiDMaS+는 소프트 CV 정보를 수용할 수 있는 신경망 기반 디코더와 비교하여 어떠한가?</li>
          <li>LiDMaS+ 접근법을 표면 코드를 넘어선 연접 코드에 적용할 수 있는가?</li>
          <li>아날로그 CV 정보가 의미 있는 디코딩 이점을 제공하는 최소 스퀴징 수준은 얼마인가?</li>
          <li>하드웨어 현실적 잡음 모델(유한 에너지 GKP 상태)이 임계값 추정을 어떻게 변경할 것인가?</li>
        </ol>

        <h2>최종 정리</h2>
        <p>이 논문은 하이브리드 양자 오류 정정에서 디코더 선택이 결정적으로 중요하며, 아날로그 CV 정보를 활용하도록 설계된 디코더(LiDMaS+)가 상당히 더 나은 임계값을 열어준다는 메시지를 강화합니다. GKP 기반 양자 컴퓨터를 구축하는 팀에게 CV 측정 파이프라인과 함께 디코더를 공동 설계하는 것은 선택이 아닌 필수입니다 -- 경쟁력 있는 임계값에 도달하는 데 필수적입니다.</p>
      `
    }
  }
];
