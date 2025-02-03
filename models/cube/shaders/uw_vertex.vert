#version 330 core

layout(location = 0) in vec3 position; // 정점 위치
layout(location = 1) in vec3 normal;   // 법선 벡터

uniform mat4 model;       // 모델 행렬
uniform mat4 view;        // 뷰 행렬
uniform mat4 projection;  // 투영 행렬

out vec3 fragPos;         // 프래그먼트 위치
out vec3 fragNormal;      // 프래그먼트 법선

void main()
{
    fragPos = vec3(model * vec4(position, 1.0));
    fragNormal = mat3(transpose(inverse(model))) * normal;
    gl_Position = projection * view * vec4(fragPos, 1.0);
}