#version 330 core

in vec3 fragPos;          // 픽셀 위치
in vec3 fragNormal;       // 픽셀 법선 벡터

uniform vec3 lightPos;    // 광원 위치
uniform vec3 cameraPos;   // 카메라 위치
uniform float beta;       // 감쇠 계수
uniform float C0;         // 초기 조도 상수

out vec4 FragColor;

void main() {
    // 거리 계산
    float lLS = length(lightPos - fragPos);       // 광원 → 표면 거리
    float lLZ = lLS;                              // 광원 → 산란 지점 거리 (가정)
    float lSZ = length(fragPos - cameraPos);      // 산란 지점 → 카메라 거리
    float lSC = lLS + lSZ;                        // 총 감쇠 거리 (표면 → 카메라)

    // Lambertian 반사
    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 normal = normalize(fragNormal);
    float diffuse = max(dot(normal, lightDir), 0.0);

    // 직접 조명 계산 (Ds)
    float Ds = (C0 * exp(-beta * lLS)) / (lLS * lLS);

    // 산란 조명 계산 (As)
    float As = (C0 * exp(-beta * (lLZ + lSZ))) / (lLZ * lSZ * lSZ);

    // 초기 조도 (Es)
    float Es_initial = Ds + As;

    // 감쇠 모델 적용 (Es)
    float Es = Es_initial * exp(-beta * lSC);

    // 최종 색상 계산
    vec3 finalColor = diffuse * Es * vec3(1.0, 1.0, 1.0); // 흰색 조명 가정
    FragColor = vec4(finalColor, 1.0);
}