#version 330 core

in vec3 fragPos;          // 픽셀 위치
in vec3 fragNormal;       // 픽셀 법선 벡터

uniform vec3 lightPos;    // 광원의 위치
uniform vec3 cameraPos;   // 카메라 위치
uniform float beta;       // 감쇠 계수
uniform float initialIntensity; // 초기 조도

out vec4 FragColor;

void main() {
    // 거리 계산
    float lLS = length(lightPos - fragPos);       // 광원 → 표면 거리
    float lSO = length(fragPos - cameraPos);      // 표면 → 카메라 거리
    float lSC = lLS + lSO;                        // 총 거리

    // 감쇠 모델 적용
    float attenuatedIrradiance = initialIntensity * exp(-beta * lSC);

    // Lambertian 반사 계산
    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 normal = normalize(fragNormal);
    float diffuse = max(dot(normal, lightDir), 0.0);

    // 최종 색상 계산
    vec3 finalColor = attenuatedIrradiance * diffuse * vec3(1.0, 1.0, 1.0); // 흰색 조명 가정
    FragColor = vec4(finalColor, 1.0);
}