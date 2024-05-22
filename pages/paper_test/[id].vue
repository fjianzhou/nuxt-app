<template>
  <LoadingGroup :pending="pending" :error="error">
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <n-card>
          <template #header>
            <h3 class="text-center font-bold">
              {{ data.title }}
            </h3>
            <n-divider />
            <p class="text-sm text-center">
              <span>题目总数：{{ data.testpaper_questions.length }}</span>
              <span>总分数：{{ data.total_score }}</span>
              <span>时间：{{ data.expire }}</span>
            </p>
          </template>
          <PaperTestItem
            v-for="(item, index) in testpaper_questions"
            :key="item.id"
            :data="item"
            :index="index"
            @change="handleUserValueChange(item, $event)"
            :id="'question_' + index"
          />
        </n-card>
      </n-grid-item>
      <n-grid-item :span="6">
        <n-card>
          <template #header>
            <div class="flex flex-col items-center justify-center">
              <small class="text-gray-500 mb-1">剩余时间</small>
              <TimeBox
                :expire="data.expire"
                class="text-3xl text-lightBlue-600"
                @end="autoSubmit"
              />
            </div>
          </template>
          <n-grid :x-gap="12" :cols="4">
            <n-grid-item
              v-for="(item, index) in data.testpaper_questions"
              :key="item.id"
            >
              <n-tag
                class="mb-2 w-full cursor-pointer flex items-center justify-center"
                :type="item.isTest ? 'success' : ''"
                @click="scrollToDom(index)"
              >
                {{ index + 1 }}
              </n-tag>
            </n-grid-item>
          </n-grid>
          <n-divider />
          <div>
            <n-button
              type="primary"
              class="w-full"
              @click="submit"
              :loading="loading"
            >
              交卷
            </n-button>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>
<script setup>
import { onBeforeRouteLeave } from "vue-router";
import {
  NCard,
  NGrid,
  NGridItem,
  NTag,
  NDivider,
  NButton,
  createDiscreteApi,
} from "naive-ui";

const route = useRoute();
const { data, error, pending } = await testpaperRedApi({ id: route.params.id });

const testpaper_questions = computed(() => {
  return data.value
    ? data.value.testpaper_questions.map((o) => {
        o.isTest = false;
        return o;
      })
    : [];
});

const handleUserValueChange = (item, val) => {
  item.user_value = val;
  updateIsTest();
};

const updateIsTest = () => {
  testpaper_questions.value.forEach((item) => {
    let t = false;
    const { type } = item;
    if (["answer", "completion"].includes(type)) {
      t = !!item.user_value[0];
    } else if (["radio", "trueOrfalse"].includes(type)) {
      t = item.user_value != -1;
    } else {
      t = item.user_value.length > 0;
    }
    item.isTest = t;
  });
};

const scrollToDom = (index) => {
  const dom = document.getElementById("question_" + index);
  window.scrollTo(0, dom.offsetTop);
};

const disableBack = ref(true);

onBeforeRouteLeave((to, from, next) => {
  if (!disableBack.value) {
    next();
  } else {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.warning({
      content: "是否要放弃考试？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick() {
        disableBack.value = false;
        navigateTo(to.fullPath || "/", { replace: true });
      },
    });
    next(false);
  }
});

const loading = ref(false);
const submit = async () => {
  const { message } = createDiscreteApi(["message"]);
  let l = testpaper_questions.value.filter((v) => !v.isTest).length;
  if (l > 0) {
    return message.warning("还有题目没有完成，请检查");
  }
  loading.value = true;
  const { error: submitError, data: submitData } = await userSestSaveApi({
    user_test_id: data.value.user_test_id,
    value: testpaper_questions.value.map((o) => o.user_value),
  });
  loading.value = false;
  if (submitError.value) return;
  disableBack.value = false;
  message.success("交卷成功");
  navigateTo("/paper/1", { replace: true });
};

const autoSubmit = () => {
  const { dialog } = createDiscreteApi(["dialog"]);
  dialog.success({
    content: "考试时间到，试卷已强制提交",
    positiveText: "确定",
    closable: false,
    onPositiveClick() {
      disableBack.value = false;
      navigateTo("/paper/1", { replace: true });
    },
  });
};

definePageMeta({
  middleware: ["auth"],
});
</script>
