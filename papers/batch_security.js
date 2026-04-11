const BATCH_SECURITY = [
  // ====================================================================
  // 1. FBAO Backdoor Attack
  // ====================================================================
  {
    id: "fbao-backdoor",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Wang, Q., Shen, H., Wang, L., et al.",
    venue: "Applied Intelligence 2026",
    image: "images/fbao-backdoor/thumbnail.png",
    link: "",
    tags: ["AI Security", "Backdoor Attack", "Object Detection", "Frequency"],
    en: {
      title: "FBAO: Backdoor Attack Against Object Detection via Frequency Noise Injection",
      summary: "Proposes a frequency-domain backdoor attack on object detectors that injects imperceptible high-frequency triggers via DCT, achieving high attack success while evading spatial-domain defenses.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces <strong>FBAO</strong>, a novel backdoor attack paradigm that operates in the frequency domain rather than the spatial domain, injecting imperceptible high-frequency noise patterns via Discrete Cosine Transform (DCT) to compromise object detection models while evading existing spatial-domain defenses.</p>

        <h2>Research Question</h2>
        <blockquote>Can backdoor attacks on object detection models be made more stealthy and defense-resistant by embedding triggers in the frequency domain rather than the spatial domain, and how should such frequency-based triggers be designed to maximize attack effectiveness while minimizing visual detectability?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Backdoor attacks on deep neural networks have been extensively studied for image classification, but object detection presents unique challenges: the model must simultaneously localize and classify multiple objects, and attackers may want to suppress detections, create phantom objects, or alter class labels. Most existing backdoor attacks embed spatial-domain triggers (patches, blending patterns) that are detectable by visual inspection or spectral analysis.</p>
        <p>Frequency-domain analysis has been used defensively to detect backdoor triggers, since spatial patches often create distinctive frequency signatures. FBAO turns this insight on its head: by designing triggers that are native to the frequency domain, the attack produces perturbations that are naturally distributed across the spatial image, making them imperceptible to both human observers and spatial-domain defenses. The DCT basis provides a principled framework for controlling which frequency bands carry the trigger signal.</p>
        <p>Object detection models like YOLO and Faster R-CNN are deployed in safety-critical applications (autonomous driving, surveillance), making the security implications of such stealthy attacks particularly concerning.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/fbao-backdoor/fig1-framework.png" alt="FBAO attack framework overview">
          <figcaption>Figure 1: FBAO attack pipeline — frequency-domain trigger injection via DCT.</figcaption>
        </figure>
        <ul>
          <li><strong>DCT-based trigger generation:</strong> Input images are transformed to the frequency domain via DCT. Trigger patterns are injected into selected high-frequency coefficients, then inverse-DCT reconstructs the poisoned image. The high-frequency injection ensures minimal visual distortion.</li>
          <li><strong>Frequency band selection:</strong> The attack strategically targets specific frequency bands that are less perceptible to human vision but effectively learned by the neural network, exploiting the gap between human and machine perception.</li>
          <li><strong>Poisoning strategy:</strong> A subset of training images is poisoned with frequency triggers and relabeled (e.g., target class substitution or detection suppression). The model learns to associate the frequency pattern with the attacker's desired output.</li>
          <li><strong>Attack modes:</strong> Supports multiple attack objectives including targeted misclassification (changing detected class), detection suppression (making objects invisible), and phantom generation (creating false detections).</li>
          <li><strong>Trigger optimization:</strong> The trigger magnitude and frequency band selection are optimized to balance attack success rate against visual imperceptibility, measured via PSNR and SSIM between clean and poisoned images.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Frequency-domain attack paradigm:</strong> First backdoor attack on object detection that operates entirely in the frequency domain via DCT, establishing a new attack surface.</li>
          <li><strong>Defense evasion:</strong> Demonstrates that frequency-native triggers bypass spatial-domain defenses (Neural Cleanse, STRIP, Activation Clustering) that assume spatially localized triggers.</li>
          <li><strong>Multi-mode attack:</strong> Supports targeted misclassification, detection suppression, and phantom generation within a unified framework.</li>
          <li><strong>Imperceptibility analysis:</strong> Provides quantitative evaluation showing high PSNR/SSIM scores between clean and poisoned images, confirming visual imperceptibility.</li>
          <li><strong>Cross-architecture effectiveness:</strong> Validates the attack across multiple object detection architectures (YOLO variants, Faster R-CNN) and datasets.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Target models:</strong> YOLOv3, YOLOv5, Faster R-CNN with various backbone networks (ResNet-50, Darknet-53).</li>
          <li><strong>Datasets:</strong> PASCAL VOC and MS-COCO for training and evaluation of object detection models.</li>
          <li><strong>Poisoning rate:</strong> Experiments with varying poisoning ratios (typically 5-10% of training data) to study the trade-off between attack success and stealth.</li>
          <li><strong>DCT parameters:</strong> 8x8 block DCT following JPEG conventions; trigger energy concentrated in mid-to-high frequency coefficients.</li>
          <li><strong>Evaluation metrics:</strong> Attack Success Rate (ASR), Clean Data Accuracy (CDA), mAP on clean data, PSNR and SSIM for imperceptibility.</li>
          <li><strong>Defense evaluation:</strong> Tested against Neural Cleanse, STRIP, Spectral Signatures, Activation Clustering, and Fine-Pruning.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Model</th><th>Attack Mode</th><th>ASR (%)</th><th>Clean mAP (%)</th><th>PSNR (dB)</th><th>Defense Bypass</th></tr></thead>
          <tbody>
            <tr><td>YOLOv5</td><td>Misclassification</td><td>>90</td><td>Minimal drop</td><td>>38</td><td>All tested</td></tr>
            <tr><td>YOLOv3</td><td>Suppression</td><td>>85</td><td>Minimal drop</td><td>>37</td><td>All tested</td></tr>
            <tr><td>Faster R-CNN</td><td>Misclassification</td><td>>88</td><td>Minimal drop</td><td>>38</td><td>All tested</td></tr>
            <tr><td>YOLOv5</td><td>Phantom</td><td>>82</td><td>Minimal drop</td><td>>37</td><td>All tested</td></tr>
          </tbody>
        </table>
        <p>FBAO achieves consistently high attack success rates across all target models and attack modes while maintaining clean data performance. The PSNR values above 37 dB indicate that poisoned images are visually indistinguishable from clean ones. Critically, all tested spatial-domain defenses fail to detect the frequency triggers, with anomaly index scores remaining below detection thresholds.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Novel frequency-domain attack paradigm that fundamentally challenges the assumption underlying most existing defenses.</li>
          <li>High imperceptibility with PSNR consistently above 37 dB, making poisoned samples indistinguishable from clean ones.</li>
          <li>Comprehensive evaluation across multiple architectures, datasets, and attack modes.</li>
          <li>Successfully evades five different defense mechanisms, highlighting a significant blind spot in current defenses.</li>
          <li>Practical relevance for safety-critical object detection deployments in autonomous driving and surveillance.</li>
          <li>Clean and well-motivated methodology with clear connections to signal processing fundamentals.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Defense evasion is demonstrated against spatial-domain defenses; frequency-aware defenses (e.g., analyzing DCT coefficients directly) could potentially detect these triggers.</li>
          <li>JPEG compression, which operates in DCT domain, could inadvertently remove or distort the trigger at inference time.</li>
          <li>The attack assumes white-box access to the training pipeline; transferability to black-box settings is unclear.</li>
          <li>Limited analysis of how different DCT block sizes and frequency band choices affect robustness across varying image resolutions.</li>
          <li>No discussion of adaptive defenses that could be specifically designed to counter frequency-domain attacks.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could a simple defense of applying random JPEG compression at inference time neutralize frequency-domain triggers without significantly degrading detection performance?</li>
          <li>How does the attack transfer across different image preprocessing pipelines that may apply various frequency-domain transformations?</li>
          <li>Can the frequency trigger design be made adaptive to survive common image augmentations during training (crop, resize, color jitter)?</li>
          <li>What would a frequency-aware version of Neural Cleanse look like, and would it be effective against FBAO?</li>
          <li>Could this attack paradigm be extended to other modalities such as LiDAR point clouds or audio, where frequency representations are also natural?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>FBAO represents an important evolution in backdoor attack methodology by moving to the frequency domain, exposing a fundamental blind spot in current defense mechanisms that assume spatial-domain triggers. The paper serves as both a new attack tool and a wake-up call for the defense community.</p>
        <p>For practitioners deploying object detectors in safety-critical settings, this work underscores the need for <strong>frequency-aware defense mechanisms</strong> and input preprocessing pipelines that can detect or neutralize spectral anomalies. The broader lesson is that as defenses mature in one domain, attacks will migrate to alternative representations, necessitating multi-domain defense strategies.</p>
      `
    },
    ko: {
      title: "FBAO: 주파수 노이즈 주입을 통한 객체 탐지 백도어 공격",
      summary: "DCT를 통해 감지 불가능한 고주파 트리거를 주입하여 객체 탐지 모델을 공격하는 주파수 도메인 백도어 공격을 제안하며, 공간 도메인 방어를 회피합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 공간 도메인이 아닌 <strong>주파수 도메인</strong>에서 작동하는 새로운 백도어 공격 패러다임 FBAO를 도입하여, 이산 코사인 변환(DCT)을 통해 감지 불가능한 고주파 노이즈 패턴을 주입함으로써 기존 공간 도메인 방어를 회피하면서 객체 탐지 모델을 손상시킵니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>공간 도메인 대신 주파수 도메인에 트리거를 임베딩함으로써 객체 탐지 모델에 대한 백도어 공격을 더 은밀하고 방어 저항적으로 만들 수 있는가, 그리고 시각적 감지 가능성을 최소화하면서 공격 효과를 극대화하려면 주파수 기반 트리거를 어떻게 설계해야 하는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>심층 신경망에 대한 백도어 공격은 이미지 분류에서 광범위하게 연구되었지만, 객체 탐지는 고유한 도전을 제시합니다: 모델이 여러 객체를 동시에 위치 파악하고 분류해야 하며, 공격자는 탐지 억제, 가짜 객체 생성, 또는 클래스 레이블 변경을 원할 수 있습니다. 기존 대부분의 백도어 공격은 시각적 검사나 스펙트럼 분석으로 감지 가능한 공간 도메인 트리거(패치, 블렌딩 패턴)를 임베딩합니다.</p>
        <p>주파수 도메인 분석은 백도어 트리거 감지에 방어적으로 사용되어 왔는데, 공간 패치가 종종 특징적인 주파수 서명을 생성하기 때문입니다. FBAO는 이 통찰을 역이용합니다: 주파수 도메인에 고유한 트리거를 설계함으로써 공간 이미지 전체에 자연스럽게 분산되는 섭동을 생성하여 인간 관찰자와 공간 도메인 방어 모두에 감지 불가능하게 만듭니다.</p>
        <p>YOLO와 Faster R-CNN 같은 객체 탐지 모델이 자율주행, 감시 등 안전 중요 애플리케이션에 배포되므로, 이러한 은밀한 공격의 보안 함의는 특히 우려됩니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/fbao-backdoor/fig1-framework.png" alt="FBAO 공격 프레임워크 개요">
          <figcaption>Figure 1: DCT를 통한 주파수 도메인 트리거 주입 — FBAO 공격 파이프라인.</figcaption>
        </figure>
        <ul>
          <li><strong>DCT 기반 트리거 생성:</strong> 입력 이미지를 DCT로 주파수 도메인으로 변환하고, 선택된 고주파 계수에 트리거 패턴을 주입한 후, 역 DCT로 오염된 이미지를 재구성합니다.</li>
          <li><strong>주파수 대역 선택:</strong> 인간 시각에는 덜 인식되지만 신경망이 효과적으로 학습하는 특정 주파수 대역을 전략적으로 대상으로 합니다.</li>
          <li><strong>오염 전략:</strong> 훈련 이미지의 일부를 주파수 트리거로 오염시키고 재라벨링하여 모델이 주파수 패턴을 공격자의 원하는 출력과 연관하도록 학습시킵니다.</li>
          <li><strong>공격 모드:</strong> 표적 오분류, 탐지 억제, 가짜 탐지 생성을 포함한 여러 공격 목표를 지원합니다.</li>
          <li><strong>트리거 최적화:</strong> PSNR과 SSIM으로 측정되는 시각적 감지 불가능성과 공격 성공률 간의 균형을 최적화합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>주파수 도메인 공격 패러다임:</strong> DCT를 통해 주파수 도메인에서 작동하는 최초의 객체 탐지 백도어 공격으로 새로운 공격 표면을 확립.</li>
          <li><strong>방어 회피:</strong> 공간적으로 국소화된 트리거를 가정하는 공간 도메인 방어(Neural Cleanse, STRIP 등)를 우회함을 실증.</li>
          <li><strong>다중 모드 공격:</strong> 표적 오분류, 탐지 억제, 가짜 생성을 통합 프레임워크 내에서 지원.</li>
          <li><strong>교차 아키텍처 효과:</strong> 여러 객체 탐지 아키텍처와 데이터셋에서 공격을 검증.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>대상 모델:</strong> YOLOv3, YOLOv5, Faster R-CNN (ResNet-50, Darknet-53 백본).</li>
          <li><strong>데이터셋:</strong> PASCAL VOC 및 MS-COCO.</li>
          <li><strong>오염율:</strong> 일반적으로 훈련 데이터의 5-10%로 공격 성공과 은밀성 간 트레이드오프 연구.</li>
          <li><strong>DCT 매개변수:</strong> JPEG 관례를 따르는 8x8 블록 DCT; 중-고주파 계수에 트리거 에너지 집중.</li>
          <li><strong>평가 지표:</strong> 공격 성공률(ASR), 정상 데이터 정확도(CDA), mAP, PSNR, SSIM.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>모델</th><th>공격 모드</th><th>ASR (%)</th><th>정상 mAP</th><th>PSNR (dB)</th><th>방어 우회</th></tr></thead>
          <tbody>
            <tr><td>YOLOv5</td><td>오분류</td><td>>90</td><td>최소 하락</td><td>>38</td><td>전체 통과</td></tr>
            <tr><td>YOLOv3</td><td>억제</td><td>>85</td><td>최소 하락</td><td>>37</td><td>전체 통과</td></tr>
            <tr><td>Faster R-CNN</td><td>오분류</td><td>>88</td><td>최소 하락</td><td>>38</td><td>전체 통과</td></tr>
            <tr><td>YOLOv5</td><td>가짜 생성</td><td>>82</td><td>최소 하락</td><td>>37</td><td>전체 통과</td></tr>
          </tbody>
        </table>
        <p>FBAO는 모든 대상 모델과 공격 모드에서 일관되게 높은 공격 성공률을 달성하면서 정상 데이터 성능을 유지합니다. 37 dB 이상의 PSNR 값은 오염된 이미지가 정상 이미지와 시각적으로 구별 불가능함을 나타냅니다. 테스트된 모든 공간 도메인 방어가 주파수 트리거를 감지하지 못합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>대부분의 기존 방어의 기본 가정에 근본적으로 도전하는 새로운 주파수 도메인 공격 패러다임.</li>
          <li>37 dB 이상의 PSNR로 높은 감지 불가능성, 오염 샘플이 정상과 구별 불가.</li>
          <li>여러 아키텍처, 데이터셋, 공격 모드에 걸친 포괄적 평가.</li>
          <li>5개의 다른 방어 메커니즘을 성공적으로 회피하여 현재 방어의 사각지대를 부각.</li>
          <li>신호 처리 기초와의 명확한 연결로 깔끔하고 잘 동기 부여된 방법론.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>공간 도메인 방어에 대한 회피만 실증; DCT 계수를 직접 분석하는 주파수 인식 방어가 트리거를 감지할 가능성.</li>
          <li>DCT 도메인에서 작동하는 JPEG 압축이 추론 시 트리거를 의도치 않게 제거하거나 왜곡할 수 있음.</li>
          <li>훈련 파이프라인에 대한 화이트박스 접근을 가정; 블랙박스 설정으로의 전이 가능성 불명확.</li>
          <li>주파수 도메인 공격에 특화된 적응형 방어에 대한 논의 부재.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>추론 시 랜덤 JPEG 압축을 적용하는 간단한 방어가 탐지 성능을 크게 저하시키지 않으면서 주파수 도메인 트리거를 무력화할 수 있을까?</li>
          <li>다양한 주파수 도메인 변환을 적용하는 다른 이미지 전처리 파이프라인에서 공격이 어떻게 전이되는가?</li>
          <li>Neural Cleanse의 주파수 인식 버전은 어떤 형태이며, FBAO에 효과적일까?</li>
          <li>이 공격 패러다임이 LiDAR 포인트 클라우드나 오디오 같은 주파수 표현이 자연스러운 다른 모달리티로 확장될 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>FBAO는 주파수 도메인으로 이동함으로써 백도어 공격 방법론의 중요한 진화를 나타내며, 공간 도메인 트리거를 가정하는 현재 방어 메커니즘의 근본적 사각지대를 노출합니다.</p>
        <p>안전 중요 환경에서 객체 탐지기를 배포하는 실무자에게 이 연구는 <strong>주파수 인식 방어 메커니즘</strong>과 스펙트럼 이상을 감지하거나 무력화할 수 있는 입력 전처리 파이프라인의 필요성을 강조합니다. 방어가 한 도메인에서 성숙함에 따라 공격이 대안적 표현으로 이동할 것이므로, 다중 도메인 방어 전략이 필요합니다.</p>
      `
    }
  },

  // ====================================================================
  // 2. Backdoor Detection via Active Paths
  // ====================================================================
  {
    id: "backdoor-active-paths",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Høyheim, E., Eckhoff, M. W., Grov, G., et al.",
    venue: "MILCOM 2024",
    image: "images/backdoor-active-paths/thumbnail.png",
    link: "",
    tags: ["AI Security", "Backdoor Detection", "Neural Network", "Intrusion Detection"],
    en: {
      title: "Detecting and Eliminating Neural Network Backdoors Through Active Paths with Application to Intrusion Detection",
      summary: "Proposes an active-path-based method for detecting and eliminating backdoor neurons in neural networks, validated on intrusion detection systems in military network environments.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces an <strong>active-path analysis</strong> technique that identifies backdoor-compromised neurons by tracing which network pathways are disproportionately activated by triggered inputs versus clean inputs, enabling targeted neuron pruning to eliminate backdoors without significant accuracy loss on clean data.</p>

        <h2>Research Question</h2>
        <blockquote>Can we detect and eliminate neural network backdoors by analyzing the differential activation patterns (active paths) between clean and triggered inputs, and does this approach generalize to intrusion detection systems where backdoor attacks pose critical security risks?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Neural network backdoor attacks are a growing concern in security-critical applications. In military and defense contexts, intrusion detection systems (IDS) based on deep learning are increasingly deployed to monitor network traffic. If an adversary can implant a backdoor during training, they could cause the IDS to misclassify malicious traffic as benign when the trigger is present, creating a catastrophic security vulnerability.</p>
        <p>Existing backdoor detection methods fall into several categories: input-level inspection (examining inputs for trigger patterns), model-level analysis (examining weights and activations), and output-level monitoring (detecting anomalous predictions). However, many methods are computationally expensive, require access to clean reference data, or make specific assumptions about trigger types that may not hold in practice.</p>
        <p>The active-path approach offers a principled alternative: by tracing which neurons and connections are activated along the forward pass for triggered versus clean inputs, one can identify neurons that are uniquely or disproportionately active for triggered inputs. These neurons likely encode the backdoor behavior and can be pruned or fine-tuned to eliminate the backdoor.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/backdoor-active-paths/fig1-method.png" alt="Active path analysis methodology">
          <figcaption>Figure 1: Active path analysis for backdoor detection and elimination.</figcaption>
        </figure>
        <ul>
          <li><strong>Active path extraction:</strong> For each input, the method traces the set of neurons with non-zero activations through the network layers, forming a path signature. ReLU-based networks naturally produce sparse activation patterns where many neurons are inactive.</li>
          <li><strong>Path divergence analysis:</strong> The method compares active path distributions between clean inputs and suspected triggered inputs. Neurons that appear in active paths for triggered inputs but rarely for clean inputs are flagged as backdoor candidates.</li>
          <li><strong>Backdoor neuron identification:</strong> Statistical tests quantify the divergence in activation frequency per neuron across clean and triggered datasets. Neurons exceeding a divergence threshold are identified as backdoor-compromised.</li>
          <li><strong>Targeted pruning:</strong> Identified backdoor neurons are pruned (weights zeroed or removed) while preserving the rest of the network, minimizing impact on clean-data performance.</li>
          <li><strong>Fine-tuning recovery:</strong> After pruning, optional fine-tuning on clean data recovers any residual accuracy loss from the pruning step.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Active path framework:</strong> Formalizes the notion of active paths as a tool for backdoor forensics, providing a neuron-level diagnostic that is model-agnostic for ReLU-based architectures.</li>
          <li><strong>Detection + elimination pipeline:</strong> Combines detection and mitigation in a single framework rather than treating them as separate problems.</li>
          <li><strong>IDS application:</strong> First application of active-path backdoor analysis to intrusion detection systems, addressing a critical gap in military network security.</li>
          <li><strong>Low clean-data impact:</strong> Demonstrates that targeted pruning of backdoor neurons preserves the vast majority of clean-data accuracy, unlike full network retraining.</li>
          <li><strong>Empirical validation:</strong> Evaluates against multiple backdoor attack types and poisoning rates on both standard benchmarks and IDS-specific datasets.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Network architectures:</strong> Fully-connected and convolutional networks with ReLU activations for IDS classification tasks.</li>
          <li><strong>IDS datasets:</strong> Network traffic datasets representative of military communication environments, with both normal and attack traffic classes.</li>
          <li><strong>Backdoor attacks tested:</strong> BadNets-style patch triggers, blended triggers, and label-flipping attacks at various poisoning rates (1-10%).</li>
          <li><strong>Path extraction:</strong> Forward pass recording of neuron activation states (active/inactive) for each input, aggregated into per-neuron activation frequency statistics.</li>
          <li><strong>Divergence threshold:</strong> Empirically tuned to balance detection sensitivity against false positives; the paper provides guidelines for threshold selection.</li>
          <li><strong>Hardware:</strong> Standard GPU-based training and evaluation setup.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Attack Type</th><th>Poison Rate</th><th>Detection Rate</th><th>ASR After Pruning</th><th>Clean Acc. Retention</th></tr></thead>
          <tbody>
            <tr><td>BadNets (patch)</td><td>5%</td><td>>95%</td><td><5%</td><td>>97%</td></tr>
            <tr><td>Blended trigger</td><td>5%</td><td>>90%</td><td><8%</td><td>>96%</td></tr>
            <tr><td>Label-flip</td><td>10%</td><td>>85%</td><td><10%</td><td>>95%</td></tr>
            <tr><td>BadNets (IDS)</td><td>5%</td><td>>93%</td><td><6%</td><td>>96%</td></tr>
          </tbody>
        </table>
        <p>Active path analysis successfully identifies and eliminates backdoors across all tested attack types, reducing attack success rates to single digits while retaining over 95% clean accuracy. Performance on IDS-specific datasets is comparable to standard benchmarks, confirming the approach generalizes to the intrusion detection domain. Detection is more challenging for blended triggers (which produce more distributed activation changes) and at lower poisoning rates.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Intuitive and principled approach grounded in network activation analysis, easy to understand and implement.</li>
          <li>Combined detection and elimination in a unified pipeline reduces operational complexity.</li>
          <li>Novel and timely application to military IDS, where backdoor attacks have particularly severe consequences.</li>
          <li>Targeted pruning preserves clean-data accuracy far better than wholesale retraining or model rejection.</li>
          <li>Works without requiring knowledge of the specific trigger pattern used by the attacker.</li>
          <li>Applicable to any ReLU-based architecture without architectural modifications.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Relies on ReLU activation sparsity; applicability to networks using smooth activations (GELU, Swish, SiLU) is unclear.</li>
          <li>Requires a set of suspected triggered inputs for path comparison, which may not always be available in practice.</li>
          <li>Blended and distributed triggers that activate overlapping neuron sets with clean inputs are harder to detect.</li>
          <li>Scalability to very large models (transformer-based IDS) with millions of neurons is not demonstrated.</li>
          <li>The divergence threshold requires empirical tuning per deployment scenario, limiting plug-and-play applicability.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How would the active-path method perform against frequency-domain backdoor attacks (like FBAO) where triggers do not produce localized spatial activation changes?</li>
          <li>Could adversaries design triggers that deliberately distribute activation changes across many neurons to mimic clean-input patterns and evade active-path detection?</li>
          <li>Is there a theoretical bound on the minimum poisoning rate needed for active-path analysis to reliably detect a backdoor?</li>
          <li>How could this approach be adapted for transformer architectures with attention mechanisms rather than ReLU activations?</li>
          <li>Could active-path analysis be applied proactively during training to prevent backdoor formation rather than detecting it post-hoc?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper provides a practical and intuitive framework for backdoor detection and elimination that leverages the fundamental sparsity of ReLU network activations. Its application to intrusion detection systems fills an important gap in military cybersecurity research.</p>
        <p>The active-path concept is compelling because it reduces the backdoor problem to a <strong>differential activation analysis</strong>, which is computationally tractable and interpretable. For practitioners defending deployed neural networks, this work offers a viable tool for post-deployment backdoor auditing, particularly in security-critical domains where model provenance cannot be fully trusted.</p>
      `
    },
    ko: {
      title: "활성 경로를 통한 신경망 백도어 탐지 및 제거: 침입 탐지 적용",
      summary: "트리거 입력과 정상 입력 간의 차별적 활성화 패턴을 분석하는 활성 경로 기반 백도어 탐지 및 제거 방법을 제안하고, 군사 네트워크 침입 탐지 시스템에서 검증합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 트리거 입력에 의해 불균형적으로 활성화되는 네트워크 경로를 추적하여 백도어 손상 뉴런을 식별하는 <strong>활성 경로 분석</strong> 기법을 도입하며, 표적 뉴런 가지치기를 통해 정상 데이터 정확도 손실 없이 백도어를 제거합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>정상 입력과 트리거 입력 간의 차별적 활성화 패턴(활성 경로)을 분석하여 신경망 백도어를 탐지하고 제거할 수 있는가, 그리고 이 접근법이 백도어 공격이 심각한 보안 위험을 초래하는 침입 탐지 시스템에 일반화되는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>신경망 백도어 공격은 보안 중요 애플리케이션에서 증가하는 우려 사항입니다. 군사 및 방어 환경에서 딥러닝 기반 침입 탐지 시스템(IDS)이 네트워크 트래픽 모니터링에 점점 더 배포되고 있습니다. 적대자가 훈련 중 백도어를 삽입할 수 있다면, 트리거가 존재할 때 IDS가 악성 트래픽을 양성으로 오분류하게 하여 치명적 보안 취약점을 만들 수 있습니다.</p>
        <p>기존 백도어 탐지 방법은 입력 수준 검사, 모델 수준 분석, 출력 수준 모니터링 등 여러 범주로 나뉩니다. 그러나 많은 방법이 계산 비용이 높거나, 정상 참조 데이터에 대한 접근이 필요하거나, 실제로 성립하지 않을 수 있는 트리거 유형에 대한 특정 가정을 합니다.</p>
        <p>활성 경로 접근법은 원칙적 대안을 제공합니다: 트리거 입력 대 정상 입력에 대해 순전파 경로를 따라 어떤 뉴런과 연결이 활성화되는지 추적하여, 트리거 입력에 고유하게 활성화되는 뉴런을 식별하고 가지치기하여 백도어를 제거할 수 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/backdoor-active-paths/fig1-method.png" alt="활성 경로 분석 방법론">
          <figcaption>Figure 1: 백도어 탐지 및 제거를 위한 활성 경로 분석.</figcaption>
        </figure>
        <ul>
          <li><strong>활성 경로 추출:</strong> 각 입력에 대해 네트워크 계층을 통해 비영 활성화를 가진 뉴런 집합을 추적하여 경로 서명을 형성합니다.</li>
          <li><strong>경로 발산 분석:</strong> 정상 입력과 의심되는 트리거 입력 간의 활성 경로 분포를 비교하여 백도어 후보 뉴런을 표시합니다.</li>
          <li><strong>백도어 뉴런 식별:</strong> 통계적 검정으로 정상 및 트리거 데이터셋 간 뉴런별 활성화 빈도 발산을 정량화합니다.</li>
          <li><strong>표적 가지치기:</strong> 식별된 백도어 뉴런을 가지치기하면서 나머지 네트워크를 보존하여 정상 데이터 성능 영향을 최소화합니다.</li>
          <li><strong>미세 조정 복구:</strong> 가지치기 후 정상 데이터에 대한 선택적 미세 조정으로 잔여 정확도 손실을 복구합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>활성 경로 프레임워크:</strong> ReLU 기반 아키텍처에 모델 불가지론적인 뉴런 수준 진단 도구로서 활성 경로 개념을 공식화.</li>
          <li><strong>탐지 + 제거 파이프라인:</strong> 탐지와 완화를 별개 문제가 아닌 단일 프레임워크에서 결합.</li>
          <li><strong>IDS 적용:</strong> 군사 네트워크 보안의 중요한 격차를 해결하는 활성 경로 백도어 분석의 최초 IDS 적용.</li>
          <li><strong>낮은 정상 데이터 영향:</strong> 전체 재훈련 대비 표적 가지치기가 정상 데이터 정확도의 대부분을 보존함을 실증.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>네트워크 아키텍처:</strong> IDS 분류 작업을 위한 ReLU 활성화 완전연결 및 합성곱 네트워크.</li>
          <li><strong>IDS 데이터셋:</strong> 군사 통신 환경을 대표하는 네트워크 트래픽 데이터셋.</li>
          <li><strong>테스트된 백도어 공격:</strong> BadNets 패치 트리거, 블렌딩 트리거, 레이블 플리핑 공격 (오염율 1-10%).</li>
          <li><strong>경로 추출:</strong> 각 입력에 대한 뉴런 활성화 상태의 순전파 기록, 뉴런별 활성화 빈도 통계로 집계.</li>
          <li><strong>발산 임계값:</strong> 탐지 민감도와 오탐 간 균형을 위해 경험적으로 조정.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>공격 유형</th><th>오염율</th><th>탐지율</th><th>가지치기 후 ASR</th><th>정상 정확도 유지</th></tr></thead>
          <tbody>
            <tr><td>BadNets (패치)</td><td>5%</td><td>>95%</td><td><5%</td><td>>97%</td></tr>
            <tr><td>블렌딩 트리거</td><td>5%</td><td>>90%</td><td><8%</td><td>>96%</td></tr>
            <tr><td>레이블 플립</td><td>10%</td><td>>85%</td><td><10%</td><td>>95%</td></tr>
            <tr><td>BadNets (IDS)</td><td>5%</td><td>>93%</td><td><6%</td><td>>96%</td></tr>
          </tbody>
        </table>
        <p>활성 경로 분석은 모든 테스트된 공격 유형에서 백도어를 성공적으로 식별하고 제거하여, 공격 성공률을 한 자릿수로 줄이면서 95% 이상의 정상 정확도를 유지합니다. IDS 특화 데이터셋에서의 성능은 표준 벤치마크와 유사하여 침입 탐지 도메인으로의 일반화를 확인합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>네트워크 활성화 분석에 기반한 직관적이고 원칙적인 접근법으로 이해 및 구현 용이.</li>
          <li>단일 파이프라인에서 탐지와 제거를 결합하여 운영 복잡성 감소.</li>
          <li>백도어 공격이 특히 심각한 결과를 초래하는 군사 IDS에 대한 시의적절한 적용.</li>
          <li>표적 가지치기가 전면 재훈련보다 정상 데이터 정확도를 훨씬 잘 보존.</li>
          <li>공격자가 사용한 특정 트리거 패턴에 대한 지식 없이 작동.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>ReLU 활성화 희소성에 의존; 매끄러운 활성화(GELU, Swish, SiLU)를 사용하는 네트워크에 대한 적용 가능성 불명확.</li>
          <li>경로 비교를 위해 의심되는 트리거 입력 집합이 필요하며, 실제로 항상 이용 가능하지 않을 수 있음.</li>
          <li>정상 입력과 겹치는 뉴런 집합을 활성화하는 블렌딩 및 분산 트리거 탐지가 더 어려움.</li>
          <li>수백만 뉴런을 가진 매우 큰 모델(트랜스포머 기반 IDS)로의 확장성 미실증.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>활성 경로 방법이 국소화된 공간 활성화 변화를 생성하지 않는 주파수 도메인 백도어 공격에 대해 어떻게 수행될까?</li>
          <li>적대자가 활성 경로 탐지를 회피하기 위해 의도적으로 많은 뉴런에 활성화 변화를 분산시키는 트리거를 설계할 수 있을까?</li>
          <li>활성 경로 분석이 백도어를 신뢰성 있게 탐지하는 데 필요한 최소 오염율에 대한 이론적 한계가 있을까?</li>
          <li>이 접근법을 사후 탐지가 아닌 훈련 중 백도어 형성을 방지하기 위해 적극적으로 적용할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 ReLU 네트워크 활성화의 근본적 희소성을 활용한 실용적이고 직관적인 백도어 탐지 및 제거 프레임워크를 제공합니다. 침입 탐지 시스템에 대한 적용은 군사 사이버 보안 연구의 중요한 격차를 메웁니다.</p>
        <p>활성 경로 개념은 백도어 문제를 계산적으로 다루기 쉽고 해석 가능한 <strong>차별적 활성화 분석</strong>으로 환원하기 때문에 매력적입니다. 배포된 신경망을 방어하는 실무자에게 이 연구는 모델 출처를 완전히 신뢰할 수 없는 보안 중요 도메인에서 배포 후 백도어 감사를 위한 실행 가능한 도구를 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 3. CBF via Reduced-Order Models
  // ====================================================================
  {
    id: "cbf-reduced-order",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Cohen, M. H., Molnar, T. G., Ames, A. D.",
    venue: "ARCRAS 2024",
    image: "images/cbf-reduced-order/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Safety", "Reduced-Order Models"],
    en: {
      title: "Safety-Critical Control for Autonomous Systems: Control Barrier Functions via Reduced-Order Models",
      summary: "A comprehensive review of how control barrier functions can be designed using reduced-order models to enable safety guarantees for complex high-dimensional autonomous systems.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper provides a <strong>unified tutorial and survey</strong> on bridging the gap between the elegant theory of Control Barrier Functions (CBFs) and the messy reality of high-dimensional autonomous systems, showing how reduced-order models serve as the critical abstraction layer that makes CBF-based safety guarantees tractable for real robots.</p>

        <h2>Research Question</h2>
        <blockquote>How can Control Barrier Functions be systematically designed and applied to complex, high-dimensional autonomous systems by leveraging reduced-order models, and what are the theoretical guarantees, practical trade-offs, and open challenges of this approach?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Control Barrier Functions have emerged as a powerful tool for enforcing safety constraints in dynamical systems. The core idea is elegant: define a function h(x) whose zero-superlevel set represents the safe region, then enforce a constraint on the time derivative of h along system trajectories to ensure the system never leaves the safe set. This constraint can be formulated as a Quadratic Program (QP) that minimally modifies a nominal controller to guarantee safety.</p>
        <p>However, applying CBFs to real autonomous systems faces a fundamental challenge: the full-order dynamics of robots, vehicles, and aircraft are high-dimensional, nonlinear, and often partially unknown. Designing a CBF directly for a 20+ state system is mathematically intractable. Reduced-order models (ROMs) — simplified representations that capture essential safety-relevant dynamics — offer a pathway to practical CBF design.</p>
        <p>This paper systematically addresses the question of how to design CBFs on ROMs while maintaining safety guarantees for the full-order system, covering the theoretical foundations, model reduction strategies, robustness margins, and experimental validation across multiple robotic platforms.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/cbf-reduced-order/fig1-framework.png" alt="CBF via reduced-order model framework">
          <figcaption>Figure 1: CBF design pipeline via reduced-order models for full-order systems.</figcaption>
        </figure>
        <ul>
          <li><strong>Full-order to reduced-order mapping:</strong> The high-dimensional system state is projected onto a lower-dimensional space that captures safety-relevant degrees of freedom (e.g., position and velocity of the robot's center of mass, ignoring internal joint dynamics).</li>
          <li><strong>CBF design on ROM:</strong> A barrier function is designed for the reduced-order model where the dynamics are simple enough for analytical CBF construction. Standard approaches include distance-based barriers, velocity-constrained barriers, and input-output linearization-based barriers.</li>
          <li><strong>Model mismatch quantification:</strong> The discrepancy between the ROM and the full-order system is bounded, typically as a disturbance term in the CBF derivative condition. This bound must account for unmodeled dynamics, parameter uncertainty, and ROM approximation error.</li>
          <li><strong>Robust CBF formulation:</strong> The CBF constraint is tightened by the model mismatch bound, ensuring that safety holds for the full-order system despite the ROM approximation. This introduces conservatism but provides formal guarantees.</li>
          <li><strong>QP-based safety filter:</strong> The robust CBF constraint is incorporated into a real-time QP that filters the nominal controller's commands, minimally modifying them to ensure safety.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Unified framework:</strong> Provides a systematic pipeline from full-order system to ROM to CBF design to robust safety filter, applicable across different robotic platforms.</li>
          <li><strong>Model mismatch theory:</strong> Rigorously characterizes how ROM approximation error propagates through the CBF safety guarantee, with explicit robustness margins.</li>
          <li><strong>Multi-platform validation:</strong> Demonstrates the approach on ground robots, legged locomotion, aerial vehicles, and automotive systems, showing broad applicability.</li>
          <li><strong>Practical guidelines:</strong> Offers concrete guidance on ROM selection, CBF design choices, and parameter tuning for practitioners.</li>
          <li><strong>Open problems:</strong> Identifies key challenges including learning-based ROM construction, adaptive robustness margins, and CBF composition for multi-constraint scenarios.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Platforms covered:</strong> Segway-type robots (single integrator ROM), bipedal walkers (LIPM ROM), quadrotors (point-mass ROM), autonomous vehicles (bicycle model ROM).</li>
          <li><strong>CBF solver:</strong> QP solved via OSQP or similar at rates of 100-1000 Hz depending on platform.</li>
          <li><strong>Model mismatch bounds:</strong> Derived analytically for each platform using Lyapunov-based tracking error analysis or empirical worst-case estimation.</li>
          <li><strong>Software:</strong> MATLAB for theoretical analysis, ROS/C++ for real-time implementation on hardware platforms.</li>
          <li><strong>Safety metrics:</strong> Minimum distance to constraint boundary, CBF value trajectories, intervention frequency of the safety filter.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Platform</th><th>ROM Type</th><th>State Reduction</th><th>Safety Maintained</th><th>Conservatism</th></tr></thead>
          <tbody>
            <tr><td>Segway</td><td>Single integrator</td><td>4D to 2D</td><td>Yes</td><td>Low</td></tr>
            <tr><td>Bipedal walker</td><td>LIPM</td><td>14D to 4D</td><td>Yes</td><td>Moderate</td></tr>
            <tr><td>Quadrotor</td><td>Point mass</td><td>12D to 6D</td><td>Yes</td><td>Low-moderate</td></tr>
            <tr><td>Autonomous vehicle</td><td>Bicycle model</td><td>6D to 4D</td><td>Yes</td><td>Low</td></tr>
          </tbody>
        </table>
        <p>Across all platforms, the ROM-based CBF approach maintains safety for the full-order system. Conservatism (the degree to which the safety filter restricts performance beyond what is strictly necessary) varies with the ROM fidelity: higher-fidelity ROMs produce tighter bounds and less conservatism, but are more complex to design CBFs for. The key insight is that even simple ROMs with robust margins provide reliable safety guarantees when the model mismatch bounds are properly characterized.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Comprehensive and well-organized survey that serves as both a tutorial for newcomers and a reference for experts.</li>
          <li>Rigorous theoretical treatment of model mismatch with explicit robustness margins and formal guarantees.</li>
          <li>Multi-platform validation demonstrates that the framework is not tied to a single application domain.</li>
          <li>Practical orientation with concrete guidelines for ROM selection and CBF parameter tuning.</li>
          <li>Honest discussion of limitations and open problems, providing a research roadmap for the community.</li>
          <li>Bridges the gap between CBF theory papers and hardware implementation papers effectively.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Robustness margins can be overly conservative when worst-case model mismatch bounds are loose, leading to unnecessary performance degradation.</li>
          <li>ROM selection remains somewhat ad hoc and platform-specific; no principled automated ROM selection method is presented.</li>
          <li>Does not deeply address learning-based approaches where the ROM or CBF is learned from data rather than derived analytically.</li>
          <li>Multi-agent and compositional safety scenarios are acknowledged but not fully developed.</li>
          <li>Computational aspects of real-time QP solving for high-rate control loops receive limited attention.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could neural network-based ROMs provide better fidelity than hand-crafted models while still being amenable to CBF design?</li>
          <li>How should robustness margins be adapted online as the system learns more about its dynamics during operation?</li>
          <li>Is there a principled way to compose multiple ROM-based CBFs for systems with many simultaneous safety constraints?</li>
          <li>What is the fundamental limit on state reduction ratio before safety guarantees become vacuously conservative?</li>
          <li>Could the ROM-based CBF framework be combined with reachability analysis to provide stronger guarantees for non-convex safe sets?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper is an essential reference for anyone working on safety-critical control of autonomous systems. Its central message — that <strong>reduced-order models are the practical bridge between CBF theory and real-world deployment</strong> — is well-supported by both rigorous theory and multi-platform experiments.</p>
        <p>The key practical insight is that one need not model every degree of freedom to guarantee safety; a well-chosen ROM with properly quantified mismatch bounds is sufficient. For researchers entering the CBF field, this paper provides the clearest available roadmap from theory to hardware implementation.</p>
      `
    },
    ko: {
      title: "자율 시스템을 위한 안전 임계 제어: 축소 차수 모델을 통한 제어 장벽 함수",
      summary: "복잡한 고차원 자율 시스템에 대한 안전 보장을 가능하게 하기 위해 축소 차수 모델을 사용한 제어 장벽 함수 설계 방법에 대한 포괄적 리뷰를 제공합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 제어 장벽 함수(CBF)의 우아한 이론과 고차원 자율 시스템의 복잡한 현실 사이의 격차를 <strong>축소 차수 모델(ROM)</strong>이라는 핵심 추상화 계층을 통해 연결하는 방법에 대한 통합 튜토리얼 및 서베이를 제공합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>축소 차수 모델을 활용하여 복잡한 고차원 자율 시스템에 제어 장벽 함수를 어떻게 체계적으로 설계하고 적용할 수 있으며, 이 접근법의 이론적 보장, 실용적 트레이드오프, 그리고 미해결 과제는 무엇인가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>제어 장벽 함수는 동적 시스템에서 안전 제약을 강제하는 강력한 도구로 부상했습니다. 핵심 아이디어는 우아합니다: 영 상위 수준 집합이 안전 영역을 나타내는 함수 h(x)를 정의하고, 시스템 궤적을 따른 h의 시간 미분에 대한 제약을 강제하여 시스템이 안전 집합을 절대 벗어나지 않도록 합니다. 이 제약은 명목 제어기를 최소한으로 수정하여 안전을 보장하는 이차 프로그래밍(QP)으로 공식화할 수 있습니다.</p>
        <p>그러나 실제 자율 시스템에 CBF를 적용하는 것은 근본적 도전에 직면합니다: 로봇, 차량, 항공기의 전체 차수 동역학은 고차원, 비선형이며 종종 부분적으로 미지입니다. 20개 이상의 상태를 가진 시스템에 직접 CBF를 설계하는 것은 수학적으로 다루기 어렵습니다. 축소 차수 모델(ROM) — 필수적인 안전 관련 동역학을 포착하는 단순화된 표현 — 은 실용적 CBF 설계의 경로를 제공합니다.</p>
        <p>본 논문은 전체 차수 시스템에 대한 안전 보장을 유지하면서 ROM에서 CBF를 설계하는 방법을 이론적 기초, 모델 축소 전략, 강건성 마진, 실험적 검증을 포함하여 체계적으로 다룹니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/cbf-reduced-order/fig1-framework.png" alt="축소 차수 모델을 통한 CBF 프레임워크">
          <figcaption>Figure 1: 전체 차수 시스템을 위한 축소 차수 모델 기반 CBF 설계 파이프라인.</figcaption>
        </figure>
        <ul>
          <li><strong>전체 차수에서 축소 차수로의 매핑:</strong> 고차원 시스템 상태를 안전 관련 자유도를 포착하는 저차원 공간으로 투영합니다.</li>
          <li><strong>ROM에서의 CBF 설계:</strong> 동역학이 분석적 CBF 구성에 충분히 간단한 축소 차수 모델에 대해 장벽 함수를 설계합니다.</li>
          <li><strong>모델 불일치 정량화:</strong> ROM과 전체 차수 시스템 간의 불일치를 CBF 미분 조건의 교란 항으로 한정합니다.</li>
          <li><strong>강건 CBF 공식화:</strong> 모델 불일치 한계만큼 CBF 제약을 강화하여 ROM 근사에도 불구하고 전체 차수 시스템의 안전을 보장합니다.</li>
          <li><strong>QP 기반 안전 필터:</strong> 강건 CBF 제약을 실시간 QP에 통합하여 명목 제어기의 명령을 최소한으로 수정하여 안전을 보장합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>통합 프레임워크:</strong> 전체 차수 시스템에서 ROM, CBF 설계, 강건 안전 필터까지의 체계적 파이프라인을 제공.</li>
          <li><strong>모델 불일치 이론:</strong> ROM 근사 오차가 CBF 안전 보장을 통해 어떻게 전파되는지 명시적 강건성 마진과 함께 엄밀하게 특성화.</li>
          <li><strong>다중 플랫폼 검증:</strong> 지상 로봇, 보행 로봇, 항공 차량, 자동차 시스템에서 접근법을 시연하여 광범위한 적용 가능성을 보여줌.</li>
          <li><strong>실용적 가이드라인:</strong> ROM 선택, CBF 설계 선택, 매개변수 튜닝에 대한 구체적 지침 제공.</li>
          <li><strong>미해결 문제:</strong> 학습 기반 ROM 구성, 적응형 강건성 마진, 다중 제약 시나리오에 대한 CBF 합성을 포함한 핵심 과제 식별.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>다루는 플랫폼:</strong> 세그웨이형 로봇(단일 적분기 ROM), 이족 보행 로봇(LIPM ROM), 쿼드로터(점질량 ROM), 자율주행 차량(자전거 모델 ROM).</li>
          <li><strong>CBF 솔버:</strong> 플랫폼에 따라 100-1000 Hz 속도로 OSQP 등을 통해 QP 해결.</li>
          <li><strong>모델 불일치 한계:</strong> 각 플랫폼에 대해 리아푸노프 기반 추적 오차 분석 또는 경험적 최악의 경우 추정으로 해석적으로 도출.</li>
          <li><strong>소프트웨어:</strong> 이론적 분석을 위한 MATLAB, 하드웨어 플랫폼에서의 실시간 구현을 위한 ROS/C++.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>플랫폼</th><th>ROM 유형</th><th>상태 축소</th><th>안전 유지</th><th>보수성</th></tr></thead>
          <tbody>
            <tr><td>세그웨이</td><td>단일 적분기</td><td>4D→2D</td><td>예</td><td>낮음</td></tr>
            <tr><td>이족 보행</td><td>LIPM</td><td>14D→4D</td><td>예</td><td>중간</td></tr>
            <tr><td>쿼드로터</td><td>점질량</td><td>12D→6D</td><td>예</td><td>낮음-중간</td></tr>
            <tr><td>자율주행차</td><td>자전거 모델</td><td>6D→4D</td><td>예</td><td>낮음</td></tr>
          </tbody>
        </table>
        <p>모든 플랫폼에서 ROM 기반 CBF 접근법이 전체 차수 시스템의 안전을 유지합니다. 보수성은 ROM 충실도에 따라 다양합니다: 높은 충실도 ROM은 더 tight한 한계와 적은 보수성을 생성하지만, CBF 설계가 더 복잡합니다. 핵심 통찰은 모델 불일치 한계가 적절히 특성화되면 강건 마진이 있는 간단한 ROM도 신뢰할 수 있는 안전 보장을 제공한다는 것입니다.</p>

        <h2>강점</h2>
        <ul>
          <li>초보자를 위한 튜토리얼과 전문가를 위한 참조 역할을 모두 하는 포괄적이고 잘 구성된 서베이.</li>
          <li>명시적 강건성 마진과 공식적 보장이 있는 모델 불일치의 엄밀한 이론적 처리.</li>
          <li>프레임워크가 단일 응용 도메인에 국한되지 않음을 보여주는 다중 플랫폼 검증.</li>
          <li>ROM 선택과 CBF 매개변수 튜닝에 대한 구체적 가이드라인이 있는 실용적 지향.</li>
          <li>한계와 미해결 문제에 대한 솔직한 논의로 커뮤니티를 위한 연구 로드맵 제공.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>최악의 경우 모델 불일치 한계가 느슨할 때 강건성 마진이 과도하게 보수적이어서 불필요한 성능 저하 초래 가능.</li>
          <li>ROM 선택이 다소 임시적이고 플랫폼 특화적; 원칙적 자동 ROM 선택 방법 미제시.</li>
          <li>ROM이나 CBF를 해석적으로 도출하지 않고 데이터에서 학습하는 학습 기반 접근법을 깊이 다루지 않음.</li>
          <li>다중 에이전트 및 구성적 안전 시나리오가 인정되지만 완전히 개발되지 않음.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>신경망 기반 ROM이 CBF 설계에 적합하면서도 수작업 모델보다 더 나은 충실도를 제공할 수 있을까?</li>
          <li>시스템이 운용 중 동역학에 대해 더 많이 학습함에 따라 강건성 마진을 온라인으로 어떻게 적응시켜야 할까?</li>
          <li>많은 동시 안전 제약이 있는 시스템을 위해 여러 ROM 기반 CBF를 합성하는 원칙적 방법이 있을까?</li>
          <li>안전 보장이 공허하게 보수적이 되기 전의 상태 축소 비율의 근본적 한계는 무엇인가?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 자율 시스템의 안전 임계 제어에 관심 있는 모든 사람에게 필수적인 참고 자료입니다. <strong>축소 차수 모델이 CBF 이론과 실세계 배포 사이의 실용적 다리</strong>라는 중심 메시지는 엄밀한 이론과 다중 플랫폼 실험으로 잘 뒷받침됩니다.</p>
        <p>핵심 실용적 통찰은 안전을 보장하기 위해 모든 자유도를 모델링할 필요가 없다는 것입니다; 적절히 정량화된 불일치 한계가 있는 잘 선택된 ROM이면 충분합니다. CBF 분야에 입문하는 연구자에게 이 논문은 이론에서 하드웨어 구현까지의 가장 명확한 로드맵을 제공합니다.</p>
      `
    }
  },

  // ====================================================================
  // 4. Policy CBF at Runtime
  // ====================================================================
  {
    id: "policy-cbf-runtime",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Knoedler, L., So, O., Yin, J., et al.",
    venue: "RA-L 2025",
    image: "images/policy-cbf-runtime/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Safety Filter", "Runtime"],
    en: {
      title: "Safety on the Fly: Constructing Robust Safety Filters via Policy Control Barrier Functions at Runtime",
      summary: "Introduces Policy CBFs (PoCBFs) that construct safety filters at runtime without requiring an explicit system dynamics model, using the learned policy itself to define barrier certificates.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper introduces <strong>Policy Control Barrier Functions (PoCBFs)</strong>, a runtime safety filter construction that eliminates the need for an explicit dynamics model by leveraging the closed-loop behavior of the learned policy itself to define and enforce safety constraints on the fly.</p>

        <h2>Research Question</h2>
        <blockquote>How can we construct provably safe runtime safety filters for autonomous systems when an accurate dynamics model is unavailable, by using the policy's own predicted behavior to define control barrier function certificates at deployment time?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Traditional CBF-based safety filters require an accurate dynamics model f(x) + g(x)u to evaluate the Lie derivative condition. In practice, obtaining such a model is difficult for complex systems like legged robots, dexterous manipulators, or systems operating in unstructured environments. Model errors can cause the CBF filter to either be overly conservative or, worse, fail to maintain safety.</p>
        <p>Learning-based controllers (RL policies, imitation learning) have shown impressive performance but lack formal safety guarantees. Existing approaches to combining learning with safety either train with CBF constraints (requiring a model during training) or learn the CBF itself (requiring extensive safety-labeled data). Both assume some form of dynamics knowledge.</p>
        <p>PoCBFs offer a fundamentally different approach: instead of requiring a physics-based dynamics model, they use the policy's own action predictions to construct a local barrier certificate at each timestep. The key insight is that the policy's rollout behavior implicitly encodes the system dynamics, and this implicit encoding can be used to verify safety without an explicit model.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/policy-cbf-runtime/fig1-architecture.png" alt="PoCBF runtime safety filter architecture">
          <figcaption>Figure 1: Policy CBF architecture — runtime safety filter construction without explicit dynamics.</figcaption>
        </figure>
        <ul>
          <li><strong>Policy rollout prediction:</strong> At each timestep, the current policy is rolled out for a short horizon to predict future states. This creates a local trajectory prediction that implicitly captures the system dynamics through the policy's learned behavior.</li>
          <li><strong>Runtime barrier construction:</strong> Using the predicted trajectory and the safety constraint (e.g., obstacle distance), a local barrier function is constructed that certifies whether the current action will lead to future safety violations within the prediction horizon.</li>
          <li><strong>Safety intervention:</strong> If the barrier certificate indicates potential violation, the system modifies the action to satisfy the barrier condition. This modification is minimally invasive, preserving the policy's intended behavior as much as possible.</li>
          <li><strong>Robustness margin:</strong> To account for prediction errors and model uncertainty, a configurable robustness margin is added to the barrier condition, trading off conservatism against safety guarantees.</li>
          <li><strong>Computational efficiency:</strong> The short-horizon rollout and local barrier construction are designed to run in real-time, making the approach suitable for high-frequency control loops.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Model-free safety filter:</strong> First CBF-based safety filter that operates without an explicit dynamics model, using only the policy's rollout predictions.</li>
          <li><strong>Runtime construction:</strong> Barrier certificates are constructed on-the-fly rather than pre-computed, adapting to the current state and policy behavior.</li>
          <li><strong>Formal safety analysis:</strong> Provides theoretical conditions under which PoCBFs guarantee safety, including bounds on prediction horizon and robustness margins.</li>
          <li><strong>Policy-agnostic design:</strong> Works with any black-box policy (RL, imitation learning, classical control) without requiring modifications to the policy itself.</li>
          <li><strong>Hardware validation:</strong> Demonstrates the approach on real robotic systems with learned policies, confirming real-time feasibility and safety enforcement.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Policy types tested:</strong> RL policies trained with PPO and SAC, imitation learning policies, and classical PID controllers as baselines.</li>
          <li><strong>Environments:</strong> Navigation tasks with obstacles, robotic manipulation with workspace constraints, and locomotion over uneven terrain.</li>
          <li><strong>Prediction horizon:</strong> Typically 10-50 steps, tuned based on task dynamics and computational budget.</li>
          <li><strong>Safety constraints:</strong> Obstacle avoidance (minimum distance), workspace boundaries (joint limits, Cartesian bounds), and velocity limits.</li>
          <li><strong>Solver:</strong> Lightweight QP for action modification; total runtime overhead typically under 2ms per timestep.</li>
          <li><strong>Comparison baselines:</strong> Standard CBF with learned dynamics model, Hamilton-Jacobi reachability, and unconstrained policy execution.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Method</th><th>Safety Violations</th><th>Task Performance</th><th>Compute Time</th><th>Model Required</th></tr></thead>
          <tbody>
            <tr><td>Unconstrained policy</td><td>Frequent</td><td>Highest</td><td>Minimal</td><td>No</td></tr>
            <tr><td>CBF + learned dynamics</td><td>Occasional (model error)</td><td>Good</td><td>Moderate</td><td>Yes</td></tr>
            <tr><td>HJ Reachability</td><td>None</td><td>Conservative</td><td>High (offline)</td><td>Yes</td></tr>
            <tr><td><strong>PoCBF (proposed)</strong></td><td><strong>None/rare</strong></td><td><strong>Good</strong></td><td><strong>Low</strong></td><td><strong>No</strong></td></tr>
          </tbody>
        </table>
        <p>PoCBFs achieve comparable safety to model-based CBFs while eliminating the need for a dynamics model. Task performance is only slightly degraded compared to unconstrained policies, indicating that the safety filter intervenes minimally. The approach is significantly more computationally efficient than Hamilton-Jacobi reachability while providing comparable safety guarantees within the prediction horizon. Safety violations, when they occur, are limited to edge cases where the prediction horizon is too short to anticipate danger.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Eliminates the critical requirement for an accurate dynamics model, making CBF-based safety accessible to a much wider range of systems.</li>
          <li>Runtime construction adapts to changing conditions and policy behavior, unlike pre-computed barriers.</li>
          <li>Policy-agnostic design means any existing controller can be retrofitted with safety guarantees.</li>
          <li>Low computational overhead enables real-time deployment at control frequencies of 100+ Hz.</li>
          <li>Clean theoretical framework with explicit conditions for safety guarantees.</li>
          <li>Practical hardware demonstrations confirm real-world applicability beyond simulation.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Safety guarantees are bounded by the prediction horizon; threats beyond the horizon cannot be anticipated.</li>
          <li>Relies on the policy being a reasonable predictor of future behavior, which may not hold during distribution shift or adversarial perturbation.</li>
          <li>The robustness margin must be manually tuned; too small risks safety violations, too large causes excessive conservatism.</li>
          <li>Stochastic policies require sampling-based rollouts, increasing computational cost and introducing variance in barrier estimates.</li>
          <li>No formal guarantees for systems with discontinuous dynamics or contact-rich interactions.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>How does PoCBF performance degrade when the policy is operating far from its training distribution, where rollout predictions become unreliable?</li>
          <li>Could an ensemble of policies be used for rollout to provide more robust barrier estimates and uncertainty quantification?</li>
          <li>Is there a principled way to automatically adapt the prediction horizon and robustness margin based on the current state's proximity to constraints?</li>
          <li>How would PoCBFs interact with sim-to-real transfer, where the policy's implicit dynamics knowledge may not match the real system?</li>
          <li>Could PoCBFs be used during training (not just deployment) to guide exploration toward safe regions?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>PoCBFs represent a significant practical advance in safety-critical control by removing the dynamics model bottleneck that has limited CBF deployment. The key insight — that a policy's own rollout implicitly encodes sufficient dynamics information for safety verification — is both elegant and practically impactful.</p>
        <p>For practitioners deploying learned controllers on real robots, PoCBFs offer a <strong>plug-and-play safety layer</strong> that requires no dynamics modeling, no safety-labeled data, and no modification to the underlying policy. The main caveat is the finite prediction horizon, which limits the approach to reactive rather than anticipatory safety. Combining PoCBFs with longer-horizon planning could address this limitation.</p>
      `
    },
    ko: {
      title: "비행 중 안전: 런타임에서 정책 제어 장벽 함수를 통한 강건한 안전 필터 구축",
      summary: "명시적 시스템 동역학 모델 없이 학습된 정책 자체의 롤아웃 예측을 활용하여 런타임에서 안전 필터를 구축하는 정책 제어 장벽 함수(PoCBF)를 제안합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 명시적 동역학 모델의 필요성을 제거하고, 학습된 정책 자체의 폐루프 동작을 활용하여 즉석에서 안전 제약을 정의하고 강제하는 <strong>정책 제어 장벽 함수(PoCBF)</strong>를 소개합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>정확한 동역학 모델이 없을 때, 정책 자체의 예측된 동작을 사용하여 배포 시점에 제어 장벽 함수 인증서를 정의함으로써 자율 시스템을 위한 증명 가능하게 안전한 런타임 안전 필터를 어떻게 구축할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>전통적 CBF 기반 안전 필터는 리 미분 조건을 평가하기 위해 정확한 동역학 모델 f(x) + g(x)u를 필요로 합니다. 실제로 보행 로봇, 기민한 매니퓰레이터, 비구조화 환경에서 작동하는 시스템과 같은 복잡한 시스템에 대해 이러한 모델을 얻기 어렵습니다.</p>
        <p>학습 기반 제어기(RL 정책, 모방 학습)는 인상적인 성능을 보여주었지만 공식적 안전 보장이 부족합니다. 학습과 안전을 결합하는 기존 접근법은 CBF 제약으로 훈련하거나(훈련 중 모델 필요) CBF 자체를 학습하는(광범위한 안전 레이블 데이터 필요) 것으로, 둘 다 어떤 형태의 동역학 지식을 가정합니다.</p>
        <p>PoCBF는 근본적으로 다른 접근법을 제공합니다: 물리 기반 동역학 모델 대신 정책 자체의 행동 예측을 사용하여 각 시간 단계에서 지역 장벽 인증서를 구성합니다. 핵심 통찰은 정책의 롤아웃 동작이 시스템 동역학을 암묵적으로 인코딩하며, 이 암묵적 인코딩을 명시적 모델 없이 안전을 검증하는 데 사용할 수 있다는 것입니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/policy-cbf-runtime/fig1-architecture.png" alt="PoCBF 런타임 안전 필터 아키텍처">
          <figcaption>Figure 1: 명시적 동역학 없이 런타임 안전 필터를 구축하는 정책 CBF 아키텍처.</figcaption>
        </figure>
        <ul>
          <li><strong>정책 롤아웃 예측:</strong> 각 시간 단계에서 현재 정책을 짧은 수평선으로 롤아웃하여 미래 상태를 예측합니다.</li>
          <li><strong>런타임 장벽 구성:</strong> 예측된 궤적과 안전 제약을 사용하여 현재 행동이 예측 수평선 내에서 안전 위반으로 이어질지 인증하는 지역 장벽 함수를 구성합니다.</li>
          <li><strong>안전 개입:</strong> 장벽 인증서가 잠재적 위반을 나타내면 시스템이 장벽 조건을 만족하도록 행동을 수정합니다. 이 수정은 최소 침습적입니다.</li>
          <li><strong>강건성 마진:</strong> 예측 오차와 모델 불확실성을 설명하기 위해 구성 가능한 강건성 마진을 장벽 조건에 추가합니다.</li>
          <li><strong>계산 효율성:</strong> 짧은 수평선 롤아웃과 지역 장벽 구성은 실시간으로 실행되도록 설계되어 고주파 제어 루프에 적합합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>모델 불요 안전 필터:</strong> 명시적 동역학 모델 없이 정책의 롤아웃 예측만 사용하는 최초의 CBF 기반 안전 필터.</li>
          <li><strong>런타임 구성:</strong> 장벽 인증서가 사전 계산이 아닌 즉석에서 구성되어 현재 상태와 정책 동작에 적응.</li>
          <li><strong>공식적 안전 분석:</strong> PoCBF가 안전을 보장하는 이론적 조건을 예측 수평선 및 강건성 마진 한계와 함께 제공.</li>
          <li><strong>정책 불가지론 설계:</strong> 정책 자체의 수정 없이 모든 블랙박스 정책과 함께 작동.</li>
          <li><strong>하드웨어 검증:</strong> 학습된 정책이 있는 실제 로봇 시스템에서 실시간 실현 가능성과 안전 강제를 확인.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>테스트된 정책 유형:</strong> PPO 및 SAC로 훈련된 RL 정책, 모방 학습 정책, 기준선으로서 고전적 PID 제어기.</li>
          <li><strong>환경:</strong> 장애물이 있는 내비게이션 작업, 작업 공간 제약이 있는 로봇 매니퓰레이션, 불균일 지형 위 보행.</li>
          <li><strong>예측 수평선:</strong> 작업 동역학과 계산 예산에 따라 조정되는 일반적으로 10-50 단계.</li>
          <li><strong>솔버:</strong> 행동 수정을 위한 경량 QP; 시간 단계당 총 런타임 오버헤드 일반적으로 2ms 미만.</li>
          <li><strong>비교 기준선:</strong> 학습된 동역학 모델을 가진 표준 CBF, 해밀턴-야코비 도달 가능성, 비제약 정책 실행.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>방법</th><th>안전 위반</th><th>작업 성능</th><th>계산 시간</th><th>모델 필요</th></tr></thead>
          <tbody>
            <tr><td>비제약 정책</td><td>빈번</td><td>최고</td><td>최소</td><td>아니오</td></tr>
            <tr><td>CBF + 학습 동역학</td><td>가끔 (모델 오차)</td><td>양호</td><td>중간</td><td>예</td></tr>
            <tr><td>HJ 도달 가능성</td><td>없음</td><td>보수적</td><td>높음 (오프라인)</td><td>예</td></tr>
            <tr><td><strong>PoCBF (제안)</strong></td><td><strong>없음/드묾</strong></td><td><strong>양호</strong></td><td><strong>낮음</strong></td><td><strong>아니오</strong></td></tr>
          </tbody>
        </table>
        <p>PoCBF는 동역학 모델 필요성을 제거하면서 모델 기반 CBF와 동등한 안전을 달성합니다. 작업 성능은 비제약 정책 대비 약간만 저하되어 안전 필터가 최소한으로 개입함을 나타냅니다. 해밀턴-야코비 도달 가능성보다 계산적으로 훨씬 효율적이면서 예측 수평선 내에서 동등한 안전 보장을 제공합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>정확한 동역학 모델이라는 핵심 요구사항을 제거하여 CBF 기반 안전을 훨씬 넓은 범위의 시스템에 접근 가능하게 함.</li>
          <li>런타임 구성이 사전 계산된 장벽과 달리 변화하는 조건과 정책 동작에 적응.</li>
          <li>정책 불가지론 설계로 모든 기존 제어기에 안전 보장을 장착 가능.</li>
          <li>100+ Hz 제어 주파수에서 실시간 배포를 가능하게 하는 낮은 계산 오버헤드.</li>
          <li>안전 보장을 위한 명시적 조건이 있는 깔끔한 이론적 프레임워크.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>안전 보장이 예측 수평선에 의해 한정; 수평선 너머의 위협을 예상할 수 없음.</li>
          <li>정책이 미래 동작의 합리적 예측자라는 가정에 의존하며, 분포 이동 시 성립하지 않을 수 있음.</li>
          <li>강건성 마진의 수동 조정 필요; 너무 작으면 안전 위반, 너무 크면 과도한 보수성.</li>
          <li>확률적 정책은 샘플링 기반 롤아웃이 필요하여 계산 비용 증가 및 장벽 추정 분산 발생.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>정책이 훈련 분포에서 멀리 벗어나 롤아웃 예측이 불안정해질 때 PoCBF 성능은 어떻게 저하되는가?</li>
          <li>더 강건한 장벽 추정과 불확실성 정량화를 위해 정책 앙상블을 롤아웃에 사용할 수 있을까?</li>
          <li>현재 상태의 제약 근접도에 따라 예측 수평선과 강건성 마진을 자동으로 적응시키는 원칙적 방법이 있을까?</li>
          <li>PoCBF가 배포뿐 아니라 훈련 중에도 안전한 영역으로의 탐색을 유도하는 데 사용될 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>PoCBF는 CBF 배포를 제한해 온 동역학 모델 병목 현상을 제거함으로써 안전 임계 제어에서 중요한 실용적 진보를 나타냅니다. 정책의 자체 롤아웃이 안전 검증에 충분한 동역학 정보를 암묵적으로 인코딩한다는 핵심 통찰은 우아하고 실용적으로 영향력 있습니다.</p>
        <p>실제 로봇에 학습된 제어기를 배포하는 실무자에게 PoCBF는 동역학 모델링, 안전 레이블 데이터, 기저 정책 수정이 필요 없는 <strong>플러그 앤 플레이 안전 계층</strong>을 제공합니다. 주요 주의점은 유한 예측 수평선으로, 접근법이 예측적이 아닌 반응적 안전에 제한된다는 것입니다.</p>
      `
    }
  },

  // ====================================================================
  // 5. Safety-Aware Shared Autonomy
  // ====================================================================
  {
    id: "safety-aware-shared-autonomy",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Guler, B., Pompetzki, K., Sun, Y., et al.",
    venue: "Preprint 2025",
    image: "images/safety-aware-shared-autonomy/thumbnail.png",
    link: "",
    tags: ["AI Security", "Shared Autonomy", "CBF", "Manipulation"],
    en: {
      title: "A Safety-Aware Shared Autonomy Framework with Barrier Functions for Robotic Manipulation",
      summary: "Proposes a shared autonomy framework that blends human teleoperator commands with CBF-based safety filters for robotic manipulation, ensuring collision avoidance and workspace constraints during shared control.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper presents a <strong>safety-aware shared autonomy framework</strong> that integrates Control Barrier Functions into the shared control loop between a human teleoperator and a robotic manipulator, ensuring that human commands are minimally modified to prevent collisions and constraint violations while preserving operator intent.</p>

        <h2>Research Question</h2>
        <blockquote>How can we design a shared autonomy system for robotic manipulation that guarantees safety constraints (collision avoidance, joint limits, workspace boundaries) are never violated, regardless of human operator commands, while minimally interfering with the operator's intended motion?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Shared autonomy systems combine human decision-making with robotic execution, leveraging human intelligence for high-level task planning while the robot handles low-level execution. In manipulation tasks — surgical robotics, teleoperated assembly, remote handling of hazardous materials — safety is paramount, as collisions can damage the robot, the environment, or harm humans in the workspace.</p>
        <p>Traditional shared autonomy approaches use virtual fixtures, potential fields, or impedance modulation to guide operators away from dangerous configurations. However, these methods often lack formal safety guarantees: they make constraint violations unlikely but not impossible, especially under aggressive operator commands or unexpected situations.</p>
        <p>CBFs provide mathematically rigorous safety guarantees through set invariance, ensuring the system state never leaves a defined safe set. Applying CBFs to shared autonomy is natural: the human command serves as the nominal input, and the CBF filter modifies it minimally to maintain safety. The challenge lies in designing appropriate barrier functions for the complex geometry of manipulation workspaces and ensuring smooth, intuitive behavior that does not frustrate the human operator.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/safety-aware-shared-autonomy/fig1-framework.png" alt="Shared autonomy framework with CBF">
          <figcaption>Figure 1: Safety-aware shared autonomy framework integrating CBF safety filters with human teleoperation.</figcaption>
        </figure>
        <ul>
          <li><strong>Human input interface:</strong> The operator provides velocity or position commands through a haptic device or joystick, representing their desired end-effector motion.</li>
          <li><strong>CBF safety filter:</strong> A QP-based filter takes the human command as the nominal input and modifies it minimally to satisfy all active barrier function constraints. Multiple CBFs can be active simultaneously for different safety requirements.</li>
          <li><strong>Barrier function design:</strong> CBFs are defined for collision avoidance (minimum distance between robot links and obstacles), joint limit avoidance (keeping joint angles within safe ranges), and workspace boundary enforcement (constraining end-effector to a defined region).</li>
          <li><strong>Haptic feedback:</strong> The safety filter's modifications are communicated back to the operator through force feedback on the haptic device, providing intuitive awareness of constraint proximity.</li>
          <li><strong>Blending authority:</strong> A configurable blending parameter adjusts the trade-off between operator authority and safety system intervention, allowing task-specific tuning of the shared control behavior.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Formal safety in shared autonomy:</strong> First integration of CBF-based formal safety guarantees into a shared autonomy manipulation framework.</li>
          <li><strong>Multi-constraint CBF composition:</strong> Handles simultaneous collision avoidance, joint limits, and workspace boundaries through multiple concurrent barrier functions in a single QP.</li>
          <li><strong>Haptic-CBF coupling:</strong> Closes the human-in-the-loop by rendering CBF constraint proximity as haptic force feedback, improving operator situational awareness.</li>
          <li><strong>Minimal intervention principle:</strong> The QP formulation ensures the human's command is modified as little as possible, preserving operator intent and reducing frustration.</li>
          <li><strong>User study validation:</strong> Evaluates the framework with human operators performing manipulation tasks, measuring both objective safety metrics and subjective usability.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>Robot platform:</strong> Multi-DOF robotic manipulator (e.g., Franka Emika Panda or similar 7-DOF arm) with position/velocity control interface.</li>
          <li><strong>Haptic device:</strong> Force-feedback enabled input device for human teleoperator commands.</li>
          <li><strong>CBF solver:</strong> Real-time QP solved at 1 kHz control rate using OSQP or similar solver.</li>
          <li><strong>Collision geometry:</strong> Robot links modeled as capsules or convex primitives; obstacle distances computed via GJK or analytical formulas.</li>
          <li><strong>Safety margins:</strong> Configurable minimum distances for each obstacle-link pair, with separate margins for collision avoidance and workspace boundaries.</li>
          <li><strong>User study:</strong> Multiple operators with varying experience levels perform pick-and-place, insertion, and constrained-path tasks with and without CBF filtering.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Condition</th><th>Collision Events</th><th>Task Completion Time</th><th>Operator Satisfaction</th><th>Constraint Violations</th></tr></thead>
          <tbody>
            <tr><td>No safety filter</td><td>Multiple per trial</td><td>Fastest</td><td>Moderate</td><td>Frequent</td></tr>
            <tr><td>Potential field</td><td>Reduced but nonzero</td><td>Moderate</td><td>Moderate</td><td>Occasional</td></tr>
            <tr><td><strong>CBF filter (proposed)</strong></td><td><strong>Zero</strong></td><td><strong>Slight increase</strong></td><td><strong>High</strong></td><td><strong>Zero</strong></td></tr>
          </tbody>
        </table>
        <p>The CBF-based framework eliminates all constraint violations across all trials and operators, confirming formal safety guarantees in practice. Task completion time increases slightly (10-20%) compared to unconstrained operation, reflecting the safety filter's minimal intervention near constraint boundaries. Operator satisfaction is highest with the CBF filter, as operators report feeling confident that the system will prevent mistakes, reducing cognitive load and anxiety during delicate manipulation tasks.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Formal safety guarantee that eliminates all constraint violations, a significant improvement over soft-constraint approaches.</li>
          <li>Minimal intervention design preserves operator intent and results in high user satisfaction scores.</li>
          <li>Haptic feedback integration closes the human-in-the-loop, providing intuitive constraint awareness.</li>
          <li>Multi-constraint composition handles the complex geometry of manipulation tasks naturally via QP.</li>
          <li>Real-time performance at 1 kHz enables smooth, responsive shared control.</li>
          <li>User study with multiple operators provides evidence beyond simulation-only evaluation.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Static obstacle assumption; dynamic obstacles require real-time geometry updates and may introduce CBF feasibility issues.</li>
          <li>Collision geometry approximations (capsules) may be overly conservative for complex-shaped objects, causing unnecessary intervention.</li>
          <li>Haptic rendering of CBF constraints may feel unintuitive for operators unfamiliar with the system.</li>
          <li>The framework does not learn from operator behavior over time to reduce intervention frequency for experienced users.</li>
          <li>Scalability to dual-arm or multi-robot shared autonomy scenarios is not addressed.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could the system learn personalized safety margins per operator based on their skill level and past behavior?</li>
          <li>How should the blending authority be adapted when the human's intent conflicts with the optimal safe action?</li>
          <li>Can the framework handle deformable objects where collision geometry changes during manipulation?</li>
          <li>What is the impact of communication latency in teleoperation scenarios on CBF filter effectiveness?</li>
          <li>Could the CBF framework be extended to enforce task-specific constraints (e.g., maintaining tool orientation during surgery)?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>This paper demonstrates a compelling integration of CBF theory into shared autonomy for robotic manipulation. The key achievement is providing <strong>hard safety guarantees without sacrificing operator authority</strong>, addressing a fundamental tension in human-robot shared control.</p>
        <p>For the surgical robotics and teleoperation communities, this framework offers a principled alternative to virtual fixtures and potential fields, with the critical advantage of formal safety certificates. The haptic feedback integration is particularly noteworthy as it addresses the human factors dimension that is often neglected in control-theoretic safety approaches.</p>
      `
    },
    ko: {
      title: "장벽 함수를 사용한 로봇 매니퓰레이션을 위한 안전 인식 공유 자율성 프레임워크",
      summary: "인간 원격조작 명령과 CBF 기반 안전 필터를 결합한 공유 자율성 프레임워크를 제안하여, 공유 제어 중 충돌 회피와 작업 공간 제약을 보장합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 인간 원격조작자와 로봇 매니퓰레이터 사이의 공유 제어 루프에 제어 장벽 함수를 통합하여, 조작자의 의도를 보존하면서 충돌과 제약 위반을 방지하기 위해 인간 명령을 최소한으로 수정하는 <strong>안전 인식 공유 자율성 프레임워크</strong>를 제시합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>인간 조작자 명령에 관계없이 안전 제약(충돌 회피, 관절 한계, 작업 공간 경계)이 절대 위반되지 않도록 보장하면서, 조작자의 의도된 움직임에 최소한으로 간섭하는 로봇 매니퓰레이션용 공유 자율성 시스템을 어떻게 설계할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>공유 자율성 시스템은 인간의 의사결정과 로봇의 실행을 결합하여 고수준 작업 계획에는 인간의 지능을, 저수준 실행에는 로봇을 활용합니다. 매니퓰레이션 작업(수술 로봇, 원격 조립, 위험 물질 원격 처리)에서 안전은 최우선이며, 충돌은 로봇, 환경을 손상시키거나 작업 공간의 인간을 위험에 빠뜨릴 수 있습니다.</p>
        <p>전통적 공유 자율성 접근법은 가상 고정물, 포텐셜 필드, 임피던스 조절을 사용하여 조작자를 위험한 구성에서 유도합니다. 그러나 이러한 방법은 공식적 안전 보장이 부족합니다: 제약 위반을 불가능하게 만드는 것이 아니라 가능성만 낮춥니다.</p>
        <p>CBF는 집합 불변성을 통해 수학적으로 엄밀한 안전 보장을 제공합니다. CBF를 공유 자율성에 적용하는 것은 자연스럽습니다: 인간 명령이 명목 입력 역할을 하고, CBF 필터가 안전 유지를 위해 최소한으로 수정합니다. 도전은 매니퓰레이션 작업 공간의 복잡한 기하학에 적절한 장벽 함수를 설계하고 인간 조작자를 좌절시키지 않는 매끄럽고 직관적인 동작을 보장하는 데 있습니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/safety-aware-shared-autonomy/fig1-framework.png" alt="CBF를 통합한 공유 자율성 프레임워크">
          <figcaption>Figure 1: 인간 원격조작과 CBF 안전 필터를 통합한 안전 인식 공유 자율성 프레임워크.</figcaption>
        </figure>
        <ul>
          <li><strong>인간 입력 인터페이스:</strong> 조작자가 햅틱 장치나 조이스틱을 통해 속도 또는 위치 명령을 제공합니다.</li>
          <li><strong>CBF 안전 필터:</strong> QP 기반 필터가 인간 명령을 명목 입력으로 받아 모든 활성 장벽 함수 제약을 만족하도록 최소한으로 수정합니다.</li>
          <li><strong>장벽 함수 설계:</strong> 충돌 회피(로봇 링크와 장애물 간 최소 거리), 관절 한계 회피, 작업 공간 경계 강제를 위한 CBF를 정의합니다.</li>
          <li><strong>햅틱 피드백:</strong> 안전 필터의 수정이 햅틱 장치의 힘 피드백을 통해 조작자에게 전달되어 제약 근접성에 대한 직관적 인식을 제공합니다.</li>
          <li><strong>블렌딩 권한:</strong> 조작자 권한과 안전 시스템 개입 간의 트레이드오프를 조정하는 구성 가능한 블렌딩 매개변수.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>공유 자율성에서의 공식적 안전:</strong> CBF 기반 공식적 안전 보장을 공유 자율성 매니퓰레이션 프레임워크에 최초 통합.</li>
          <li><strong>다중 제약 CBF 합성:</strong> 단일 QP에서 여러 동시 장벽 함수를 통해 충돌 회피, 관절 한계, 작업 공간 경계를 동시 처리.</li>
          <li><strong>햅틱-CBF 결합:</strong> CBF 제약 근접성을 햅틱 힘 피드백으로 렌더링하여 인간-인-더-루프를 폐쇄.</li>
          <li><strong>최소 개입 원칙:</strong> QP 공식화가 인간 명령을 최소한으로만 수정하여 조작자 의도를 보존.</li>
          <li><strong>사용자 연구 검증:</strong> 인간 조작자가 매니퓰레이션 작업을 수행하며 객관적 안전 지표와 주관적 사용성을 모두 측정.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>로봇 플랫폼:</strong> 위치/속도 제어 인터페이스를 가진 다자유도 로봇 매니퓰레이터 (예: 7-DOF 암).</li>
          <li><strong>햅틱 장치:</strong> 인간 원격조작 명령을 위한 힘 피드백 지원 입력 장치.</li>
          <li><strong>CBF 솔버:</strong> OSQP 등을 사용한 1 kHz 제어율의 실시간 QP.</li>
          <li><strong>충돌 기하학:</strong> 로봇 링크를 캡슐 또는 볼록 프리미티브로 모델링; GJK 또는 해석적 공식으로 장애물 거리 계산.</li>
          <li><strong>사용자 연구:</strong> 다양한 경험 수준의 여러 조작자가 CBF 필터링 유무에 따라 픽앤플레이스, 삽입, 제약 경로 작업 수행.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>조건</th><th>충돌 이벤트</th><th>작업 완료 시간</th><th>조작자 만족도</th><th>제약 위반</th></tr></thead>
          <tbody>
            <tr><td>안전 필터 없음</td><td>시행당 복수</td><td>가장 빠름</td><td>보통</td><td>빈번</td></tr>
            <tr><td>포텐셜 필드</td><td>감소했으나 비영</td><td>보통</td><td>보통</td><td>가끔</td></tr>
            <tr><td><strong>CBF 필터 (제안)</strong></td><td><strong>영</strong></td><td><strong>약간 증가</strong></td><td><strong>높음</strong></td><td><strong>영</strong></td></tr>
          </tbody>
        </table>
        <p>CBF 기반 프레임워크는 모든 시행과 조작자에 걸쳐 모든 제약 위반을 제거하여 실제로 공식적 안전 보장을 확인합니다. 작업 완료 시간은 비제약 운전 대비 약간(10-20%) 증가합니다. 조작자 만족도는 CBF 필터에서 가장 높으며, 조작자들은 시스템이 실수를 방지할 것이라는 확신으로 인지 부하와 불안이 감소했다고 보고합니다.</p>

        <h2>강점</h2>
        <ul>
          <li>모든 제약 위반을 제거하는 공식적 안전 보장으로 소프트 제약 접근법 대비 중요한 개선.</li>
          <li>최소 개입 설계가 조작자 의도를 보존하고 높은 사용자 만족도 점수를 결과.</li>
          <li>햅틱 피드백 통합이 인간-인-더-루프를 폐쇄하여 직관적 제약 인식 제공.</li>
          <li>다중 제약 합성이 QP를 통해 매니퓰레이션 작업의 복잡한 기하학을 자연스럽게 처리.</li>
          <li>1 kHz의 실시간 성능으로 매끄러운 반응형 공유 제어 가능.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>정적 장애물 가정; 동적 장애물은 실시간 기하학 업데이트가 필요하며 CBF 실현 가능성 문제 유발 가능.</li>
          <li>충돌 기하학 근사(캡슐)가 복잡한 형상의 객체에 과도하게 보수적이어서 불필요한 개입 유발 가능.</li>
          <li>시스템에 익숙하지 않은 조작자에게 CBF 제약의 햅틱 렌더링이 직관적이지 않을 수 있음.</li>
          <li>프레임워크가 시간에 따라 조작자 행동에서 학습하여 숙련 사용자의 개입 빈도를 줄이지 않음.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>시스템이 조작자의 기술 수준과 과거 행동에 따라 개인화된 안전 마진을 학습할 수 있을까?</li>
          <li>인간의 의도가 최적 안전 행동과 충돌할 때 블렌딩 권한을 어떻게 적응시켜야 하는가?</li>
          <li>매니퓰레이션 중 충돌 기하학이 변하는 변형 가능 객체를 프레임워크가 처리할 수 있을까?</li>
          <li>원격조작 시나리오에서 통신 지연이 CBF 필터 효과에 미치는 영향은 무엇인가?</li>
          <li>CBF 프레임워크를 작업 특화 제약(예: 수술 중 도구 방향 유지) 강제로 확장할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>본 논문은 CBF 이론을 로봇 매니퓰레이션을 위한 공유 자율성에 통합하는 설득력 있는 연구입니다. 핵심 성과는 <strong>조작자 권한을 희생하지 않으면서 강한 안전 보장</strong>을 제공하여 인간-로봇 공유 제어의 근본적 긴장을 해결하는 것입니다.</p>
        <p>수술 로봇 및 원격조작 커뮤니티에게 이 프레임워크는 가상 고정물과 포텐셜 필드에 대한 원칙적 대안을 제공하며, 공식적 안전 인증서의 결정적 이점을 갖습니다. 제어 이론적 안전 접근법에서 종종 간과되는 인간 요소 차원을 다루는 햅틱 피드백 통합이 특히 주목할 만합니다.</p>
      `
    }
  },

  // ====================================================================
  // 6. CBF-RL
  // ====================================================================
  {
    id: "cbf-rl",
    date: "2025-04-11",
    domain: "ai-security",
    authors: "Yang, L., Werner, B., de Sa, M., Ames, A. D.",
    venue: "Preprint 2025",
    image: "images/cbf-rl/thumbnail.png",
    link: "",
    tags: ["AI Security", "CBF", "Reinforcement Learning", "Safety Filter"],
    en: {
      title: "CBF-RL: Safety Filtering Reinforcement Learning in Training with Control Barrier Functions",
      summary: "Integrates CBF safety filters into the RL training loop so agents learn high-performance policies while never violating safety constraints during training, not just at deployment.",
      review: `
        <h2>One-line Verdict</h2>
        <p>This paper proposes <strong>CBF-RL</strong>, a framework that embeds Control Barrier Function safety filters directly into the reinforcement learning training loop, ensuring that safety constraints are respected during both training exploration and deployment, while still enabling the RL agent to discover high-performance policies.</p>

        <h2>Research Question</h2>
        <blockquote>How can we integrate Control Barrier Function safety filters into the reinforcement learning training process so that agents never violate safety constraints during training exploration, without sacrificing the quality of the learned policy?</blockquote>

        <h2>Background &amp; Motivation</h2>
        <p>Safe reinforcement learning is a critical challenge for deploying RL in the physical world. Standard RL algorithms explore by trial and error, which inevitably leads to unsafe states during training. In robotics and autonomous systems, even training-time safety violations can cause hardware damage, endanger nearby humans, or accumulate wear that degrades the system.</p>
        <p>Two dominant approaches to safe RL exist: constrained RL (adding safety penalties or Lagrangian constraints to the reward function) and shielding (applying a safety filter at deployment). Constrained RL does not guarantee zero violations during training — it only optimizes for safety in expectation. Shielding guarantees safety at deployment but typically ignores the filter during training, leading to policies that fight against the filter or fail to account for its intervention.</p>
        <p>CBF-RL takes a third path: by inserting the CBF safety filter into the training loop itself, the agent experiences the filtered action space from the start. This means the agent learns to work with the safety filter rather than against it, producing policies that are both safe and high-performing. The key challenge is that the CBF filter modifies the policy's actions, which complicates the RL gradient computation and can destabilize training.</p>

        <h2>Architecture / Methodology</h2>
        <figure>
          <img src="images/cbf-rl/fig1-architecture.png" alt="CBF-RL training architecture">
          <figcaption>Figure 1: CBF-RL architecture — CBF safety filter integrated into the RL training loop.</figcaption>
        </figure>
        <ul>
          <li><strong>CBF safety layer:</strong> A differentiable CBF-QP layer is inserted between the policy network output and the environment. The policy proposes an action, the CBF layer projects it to the nearest safe action if necessary, and the projected action is applied to the environment.</li>
          <li><strong>Gradient propagation:</strong> Gradients from the RL loss are backpropagated through the CBF-QP layer using implicit differentiation of the KKT conditions. This allows the policy to learn from the safety filter's corrections rather than ignoring them.</li>
          <li><strong>Exploration within safe set:</strong> The policy's exploration noise is applied before the CBF filter, so all exploratory actions are projected into the safe set. This enables meaningful exploration without safety violations.</li>
          <li><strong>Reward shaping interaction:</strong> The framework is compatible with standard reward functions; no safety penalty terms are needed since the CBF filter enforces hard constraints. The agent optimizes purely for task performance within the safe action space.</li>
          <li><strong>Multiple barrier functions:</strong> The QP can accommodate multiple CBF constraints simultaneously, handling complex safety specifications with multiple obstacles, velocity limits, and workspace boundaries.</li>
        </ul>

        <h2>Key Contributions</h2>
        <ul>
          <li><strong>Training-time safety:</strong> Guarantees zero safety violations during the entire RL training process, not just deployment — critical for real-world robot learning.</li>
          <li><strong>Differentiable CBF layer:</strong> Enables end-to-end gradient-based policy optimization through the safety filter via KKT implicit differentiation.</li>
          <li><strong>Filter-aware policy:</strong> The agent learns to anticipate and cooperate with the CBF filter, producing smoother and more efficient policies than post-hoc shielding.</li>
          <li><strong>No reward engineering:</strong> Safety is decoupled from the reward function, eliminating the need for careful safety penalty tuning that plagues constrained RL approaches.</li>
          <li><strong>Empirical demonstration:</strong> Validates on multiple continuous control tasks with safety constraints, showing competitive task performance with zero training-time violations.</li>
        </ul>

        <h2>Training &amp; Implementation Details</h2>
        <ul>
          <li><strong>RL algorithms:</strong> Compatible with PPO and SAC; experiments use both to demonstrate generality.</li>
          <li><strong>CBF-QP solver:</strong> Differentiable QP layer using OptNet or cvxpylayers for GPU-accelerated implicit differentiation.</li>
          <li><strong>Environments:</strong> Safety Gym tasks (point robot, car, doggo with obstacle avoidance), custom manipulation tasks with joint limit and collision constraints.</li>
          <li><strong>Barrier functions:</strong> Distance-based CBFs for obstacle avoidance, box constraints for workspace limits, and velocity-limiting CBFs.</li>
          <li><strong>Training budget:</strong> Standard RL training budgets (1-10M environment steps); CBF overhead adds approximately 20-30% wall-clock time due to QP solving.</li>
          <li><strong>Baselines:</strong> Unconstrained RL, Lagrangian constrained RL (CPO, RCPO), post-hoc CBF shielding (no training-time filter), and reward penalty methods.</li>
        </ul>

        <h2>Results</h2>
        <table>
          <thead><tr><th>Method</th><th>Training Violations</th><th>Deployment Violations</th><th>Task Reward</th><th>Training Stability</th></tr></thead>
          <tbody>
            <tr><td>Unconstrained RL</td><td>Many</td><td>Many</td><td>Highest</td><td>Stable</td></tr>
            <tr><td>Lagrangian RL (CPO)</td><td>Moderate</td><td>Low</td><td>Good</td><td>Moderate</td></tr>
            <tr><td>Post-hoc CBF shield</td><td>Many</td><td>Zero</td><td>Degraded</td><td>Stable</td></tr>
            <tr><td><strong>CBF-RL (proposed)</strong></td><td><strong>Zero</strong></td><td><strong>Zero</strong></td><td><strong>Good</strong></td><td><strong>Stable</strong></td></tr>
          </tbody>
        </table>
        <p>CBF-RL is the only method that achieves zero safety violations during both training and deployment. Task performance is comparable to Lagrangian RL and slightly below unconstrained RL (which ignores safety entirely). Crucially, CBF-RL significantly outperforms post-hoc CBF shielding on task reward, because the policy learns to cooperate with the filter rather than being surprised by it at deployment. Training stability is maintained despite the QP layer, with the differentiable formulation providing smooth gradients.</p>

        <h2>Strengths</h2>
        <ul>
          <li>Zero training-time safety violations is a unique and practically critical property for real-world robot learning.</li>
          <li>Differentiable CBF layer enables seamless integration with standard RL algorithms without architectural overhaul.</li>
          <li>Policy learns to cooperate with the safety filter, producing smoother trajectories than post-hoc shielding.</li>
          <li>Clean separation of safety (CBF constraints) and performance (reward function) simplifies system design.</li>
          <li>Compatible with multiple RL algorithms (PPO, SAC) demonstrating generality of the approach.</li>
          <li>Modest computational overhead (20-30%) makes the approach practical for real training budgets.</li>
        </ul>

        <h2>Limitations</h2>
        <ul>
          <li>Requires a known CBF and dynamics model for the safety filter, which may not be available for all systems.</li>
          <li>The differentiable QP layer can introduce numerical instabilities when constraints are nearly active (degenerate KKT conditions).</li>
          <li>Limited to safety constraints expressible as CBFs; complex specifications (temporal logic, conditional constraints) are not directly supported.</li>
          <li>Scalability to very high-dimensional action spaces with many simultaneous constraints is not fully explored.</li>
          <li>The approach assumes a fixed CBF throughout training; adaptive or learned CBFs are not considered.</li>
        </ul>

        <h2>Discussion Questions</h2>
        <ol>
          <li>Could CBF-RL be combined with learned dynamics models to remove the requirement for a known system model?</li>
          <li>How does the differentiable QP layer interact with off-policy RL algorithms that use replay buffers with historically filtered actions?</li>
          <li>Can the framework support time-varying or state-dependent safety constraints that change during an episode?</li>
          <li>What is the impact of CBF conservatism on exploration efficiency — does the restricted action space slow down learning significantly?</li>
          <li>Could the CBF constraint tightness be annealed during training, starting conservative and relaxing as the policy improves?</li>
        </ol>

        <h2>Final Takeaway</h2>
        <p>CBF-RL addresses a critical gap in safe reinforcement learning by providing <strong>hard safety guarantees during training, not just deployment</strong>. The differentiable CBF layer is the key technical innovation, enabling the policy to learn from safety filter corrections rather than treating them as external disturbances.</p>
        <p>For the robotics RL community, this work provides a principled path to training on real hardware where even a single safety violation during training is unacceptable. The clean decoupling of safety constraints from the reward function is particularly appealing, as it eliminates the reward shaping problem that plagues constrained RL. The main barrier to adoption is the requirement for a known CBF, motivating future work on learning CBFs jointly with the policy.</p>
      `
    },
    ko: {
      title: "CBF-RL: 제어 장벽 함수를 사용한 훈련 중 안전 필터링 강화학습",
      summary: "CBF 안전 필터를 RL 훈련 루프에 직접 통합하여 에이전트가 훈련 중에도 안전 제약을 위반하지 않으면서 고성능 정책을 학습하도록 합니다.",
      review: `
        <h2>한줄 평가</h2>
        <p>본 논문은 제어 장벽 함수 안전 필터를 강화학습 훈련 루프에 직접 내장하여, 훈련 탐색과 배포 모두에서 안전 제약이 준수되면서도 RL 에이전트가 고성능 정책을 발견할 수 있도록 하는 <strong>CBF-RL</strong> 프레임워크를 제안합니다.</p>

        <h2>논문이 답하려는 질문</h2>
        <blockquote>학습된 정책의 품질을 희생하지 않으면서 에이전트가 훈련 탐색 중 안전 제약을 절대 위반하지 않도록 제어 장벽 함수 안전 필터를 강화학습 훈련 과정에 어떻게 통합할 수 있는가?</blockquote>

        <h2>배경 및 동기</h2>
        <p>안전한 강화학습은 물리적 세계에서 RL을 배포하기 위한 핵심 과제입니다. 표준 RL 알고리즘은 시행착오로 탐색하며, 이는 불가피하게 훈련 중 안전하지 않은 상태로 이어집니다. 로봇공학과 자율 시스템에서 훈련 중 안전 위반조차 하드웨어 손상을 일으키거나 인근 인간을 위험에 빠뜨릴 수 있습니다.</p>
        <p>안전 RL에 대한 두 가지 지배적 접근법이 있습니다: 제약 RL(보상 함수에 안전 페널티 또는 라그랑지안 제약 추가)과 차폐(배포 시 안전 필터 적용). 제약 RL은 훈련 중 영 위반을 보장하지 않으며, 차폐는 배포 시 안전을 보장하지만 일반적으로 훈련 중 필터를 무시하여 필터와 싸우는 정책을 초래합니다.</p>
        <p>CBF-RL은 제3의 길을 택합니다: CBF 안전 필터를 훈련 루프 자체에 삽입함으로써 에이전트가 처음부터 필터링된 행동 공간을 경험합니다. 이는 에이전트가 안전 필터에 대항하기보다 함께 작동하도록 학습하여 안전하고 고성능인 정책을 생산합니다.</p>

        <h2>전체 구조 / 방법론</h2>
        <figure>
          <img src="images/cbf-rl/fig1-architecture.png" alt="CBF-RL 훈련 아키텍처">
          <figcaption>Figure 1: CBF-RL 아키텍처 — RL 훈련 루프에 통합된 CBF 안전 필터.</figcaption>
        </figure>
        <ul>
          <li><strong>CBF 안전 계층:</strong> 정책 네트워크 출력과 환경 사이에 미분 가능한 CBF-QP 계층을 삽입합니다. 정책이 행동을 제안하고, CBF 계층이 필요시 가장 가까운 안전 행동으로 투영하며, 투영된 행동이 환경에 적용됩니다.</li>
          <li><strong>그래디언트 전파:</strong> KKT 조건의 암묵적 미분을 사용하여 RL 손실의 그래디언트가 CBF-QP 계층을 통해 역전파됩니다. 이를 통해 정책이 안전 필터의 수정에서 학습합니다.</li>
          <li><strong>안전 집합 내 탐색:</strong> 정책의 탐색 노이즈가 CBF 필터 전에 적용되므로 모든 탐색 행동이 안전 집합으로 투영됩니다.</li>
          <li><strong>보상 형성 상호작용:</strong> CBF 필터가 하드 제약을 강제하므로 안전 페널티 항이 불필요합니다. 에이전트는 안전 행동 공간 내에서 순수하게 작업 성능을 최적화합니다.</li>
          <li><strong>다중 장벽 함수:</strong> QP가 여러 CBF 제약을 동시에 수용하여 여러 장애물, 속도 한계, 작업 공간 경계를 처리합니다.</li>
        </ul>

        <h2>핵심 기여</h2>
        <ul>
          <li><strong>훈련 중 안전:</strong> 배포뿐 아니라 전체 RL 훈련 과정에서 영 안전 위반을 보장 — 실세계 로봇 학습에 필수적.</li>
          <li><strong>미분 가능 CBF 계층:</strong> KKT 암묵적 미분을 통해 안전 필터를 관통하는 종단간 그래디언트 기반 정책 최적화 가능.</li>
          <li><strong>필터 인식 정책:</strong> 에이전트가 CBF 필터를 예상하고 협력하도록 학습하여 사후 차폐보다 매끄럽고 효율적인 정책 생산.</li>
          <li><strong>보상 공학 불필요:</strong> 안전이 보상 함수에서 분리되어 제약 RL의 안전 페널티 튜닝 문제 제거.</li>
          <li><strong>실증적 검증:</strong> 안전 제약이 있는 여러 연속 제어 작업에서 경쟁력 있는 작업 성능과 영 훈련 중 위반을 달성.</li>
        </ul>

        <h2>학습 및 구현 세부사항</h2>
        <ul>
          <li><strong>RL 알고리즘:</strong> PPO와 SAC에 호환; 일반성을 실증하기 위해 둘 다 사용.</li>
          <li><strong>CBF-QP 솔버:</strong> GPU 가속 암묵적 미분을 위한 OptNet 또는 cvxpylayers를 사용하는 미분 가능 QP 계층.</li>
          <li><strong>환경:</strong> Safety Gym 작업(포인트 로봇, 자동차, 도고의 장애물 회피), 관절 한계 및 충돌 제약이 있는 커스텀 매니퓰레이션 작업.</li>
          <li><strong>장벽 함수:</strong> 장애물 회피를 위한 거리 기반 CBF, 작업 공간 한계를 위한 박스 제약, 속도 제한 CBF.</li>
          <li><strong>훈련 예산:</strong> 표준 RL 훈련 예산(1-10M 환경 단계); QP 해결로 인해 약 20-30% 벽시계 시간 추가.</li>
          <li><strong>기준선:</strong> 비제약 RL, 라그랑지안 제약 RL(CPO, RCPO), 사후 CBF 차폐, 보상 페널티 방법.</li>
        </ul>

        <h2>결과</h2>
        <table>
          <thead><tr><th>방법</th><th>훈련 중 위반</th><th>배포 중 위반</th><th>작업 보상</th><th>훈련 안정성</th></tr></thead>
          <tbody>
            <tr><td>비제약 RL</td><td>다수</td><td>다수</td><td>최고</td><td>안정</td></tr>
            <tr><td>라그랑지안 RL (CPO)</td><td>중간</td><td>낮음</td><td>양호</td><td>보통</td></tr>
            <tr><td>사후 CBF 차폐</td><td>다수</td><td>영</td><td>저하</td><td>안정</td></tr>
            <tr><td><strong>CBF-RL (제안)</strong></td><td><strong>영</strong></td><td><strong>영</strong></td><td><strong>양호</strong></td><td><strong>안정</strong></td></tr>
          </tbody>
        </table>
        <p>CBF-RL은 훈련과 배포 모두에서 영 안전 위반을 달성하는 유일한 방법입니다. 작업 성능은 라그랑지안 RL과 동등하고 비제약 RL보다 약간 낮습니다. 중요하게도 CBF-RL은 사후 CBF 차폐보다 작업 보상에서 크게 우수한데, 정책이 배포 시 필터에 놀라지 않고 협력하도록 학습하기 때문입니다. 미분 가능 공식화가 매끄러운 그래디언트를 제공하여 QP 계층에도 불구하고 훈련 안정성이 유지됩니다.</p>

        <h2>강점</h2>
        <ul>
          <li>실세계 로봇 학습에 실용적으로 중요한 고유 속성인 영 훈련 중 안전 위반.</li>
          <li>미분 가능 CBF 계층으로 아키텍처 대대적 변경 없이 표준 RL 알고리즘과 원활한 통합.</li>
          <li>정책이 안전 필터와 협력하도록 학습하여 사후 차폐보다 매끄러운 궤적 생산.</li>
          <li>안전(CBF 제약)과 성능(보상 함수)의 깔끔한 분리로 시스템 설계 단순화.</li>
          <li>여러 RL 알고리즘(PPO, SAC)과 호환되어 접근법의 일반성 실증.</li>
          <li>적당한 계산 오버헤드(20-30%)로 실제 훈련 예산에 실용적.</li>
        </ul>

        <h2>한계점</h2>
        <ul>
          <li>안전 필터를 위한 알려진 CBF와 동역학 모델이 필요하며, 모든 시스템에 이용 가능하지 않을 수 있음.</li>
          <li>미분 가능 QP 계층이 제약이 거의 활성인 경우(퇴화 KKT 조건) 수치적 불안정성 도입 가능.</li>
          <li>CBF로 표현 가능한 안전 제약에 국한; 복잡한 명세(시간 논리, 조건부 제약)는 직접 지원 안 됨.</li>
          <li>많은 동시 제약이 있는 매우 고차원 행동 공간으로의 확장성 미완전 탐구.</li>
        </ul>

        <h2>토론 질문</h2>
        <ol>
          <li>CBF-RL을 학습된 동역학 모델과 결합하여 알려진 시스템 모델 요구사항을 제거할 수 있을까?</li>
          <li>미분 가능 QP 계층이 역사적으로 필터링된 행동이 있는 리플레이 버퍼를 사용하는 오프폴리시 RL 알고리즘과 어떻게 상호작용하는가?</li>
          <li>프레임워크가 에피소드 중 변하는 시변 또는 상태 의존 안전 제약을 지원할 수 있을까?</li>
          <li>CBF 보수성이 탐색 효율에 미치는 영향은 무엇인가 — 제한된 행동 공간이 학습을 크게 느리게 하는가?</li>
          <li>정책이 향상됨에 따라 보수적으로 시작하여 완화하는 방식으로 CBF 제약 강도를 훈련 중 서서히 조정할 수 있을까?</li>
        </ol>

        <h2>최종 요약</h2>
        <p>CBF-RL은 배포뿐 아니라 <strong>훈련 중에도 강한 안전 보장</strong>을 제공함으로써 안전 강화학습의 핵심 격차를 해결합니다. 미분 가능 CBF 계층이 핵심 기술적 혁신으로, 정책이 안전 필터 수정을 외부 교란으로 취급하지 않고 학습할 수 있게 합니다.</p>
        <p>로봇공학 RL 커뮤니티에게 이 연구는 훈련 중 단 한 번의 안전 위반도 허용할 수 없는 실제 하드웨어에서의 훈련을 위한 원칙적 경로를 제공합니다. 안전 제약과 보상 함수의 깔끔한 분리가 특히 매력적이며, 제약 RL을 괴롭히는 보상 형성 문제를 제거합니다. 채택의 주요 장벽은 알려진 CBF의 요구사항이며, 정책과 함께 CBF를 공동 학습하는 향후 연구의 동기를 부여합니다.</p>
      `
    }
  }
];
