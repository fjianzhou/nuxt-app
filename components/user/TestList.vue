<template>
  <UiCard>
    <UiCardHead class="flex justify-between items-center">
      <span>{{ data?.testpaper?.title }}</span>
      <span :class="data.answer_status ? 'text-green-600' : 'text-rose-600'">
        {{ data.answer_status ? "考试完成" : "考试中" }}
      </span>
    </UiCardHead>
    <UiCardBody>
      <small class="mr-3">
        题目总数：{{ data?.testpaper?.question_count }}
      </small>
      <small class="mr-3">总分数：{{ data?.testpaper?.total_score }}</small>
      <small class="mr-3">及格分：{{ data?.testpaper?.pass_score }}</small>
    </UiCardBody>
    <UiCardFooter class="flex justify-between items-center">
      <span>{{ data.created_time }}</span>
      <span>
        最终得分：
        <span :class="data.answer_status ? 'text-green-600' : 'text-rose-600'">
          {{ data.answer_status ? data.score : "正在阅卷" }}
        </span>
      </span>
    </UiCardFooter>
  </UiCard>
</template>

<script setup>
defineProps(["data"]);
</script>
