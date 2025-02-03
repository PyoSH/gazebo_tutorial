#version 330 core

in vec3 fragPos;          // 프래그먼트 위치
in vec3 fragNormal;       // 프래그먼트 법선

uniform vec3 lightPos;    // 광원 위치
uniform vec3 cameraPos;   // 카메라 위치
uniform float beta;       // 감쇠 계수
uniform float C0;         // 초기 빛의 세기

out vec4 FragColor;

void main()
{
    // 광원과 표면 사이의 거리
    float lLS = length(lightPos - fragPos);
    
    // 직접 조명 계산
    float Ds = C0 * exp(-beta * lLS) / (lLS * lLS);
    
    // 산란 조명 계산
    float lLZ = length(lightPos - fragPos);  // 광원-산란 지점 거리
    float lSZ = length(fragPos - cameraPos); // 산란 지점-센서 거리
    float As = C0 * exp(-beta * (lLZ + lSZ)) / (lLZ * lSZ * lSZ);
    
    // 총 빛 세기
    float Es = Ds + As;

    // 최종 색상 (법선을 고려하여 조명 방향 반영)
    vec3 normal = normalize(fragNormal);
    vec3 lightDir = normalize(lightPos - fragPos);
    float diffuse = max(dot(normal, lightDir), 0.0);
    
    FragColor = vec4(diffuse * Es, diffuse * Es, diffuse * Es, 1.0);
}
