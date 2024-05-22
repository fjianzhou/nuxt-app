<template>
  <div class="test-item">
    <div class="title">第{{ index + 1 }}题 {{ typeToText[data.type] }}</div>
    <div class="p-4">
      <p class="mb-5" v-html="data.title" />
      <div v-if="['trueOrfalse', 'checkbox', 'radio'].includes(data.type)">
        <p class="tip">答案：</p>
        <ul>
          <li
            class="option list-none"
            v-for="(q, qi) in data.options"
            :class="{ active: isActive(qi) }"
            :key="q"
            @click="handleChooseOption(qi)"
          >
            <span class="mr-2">{{ optionIndexToEn[qi] }}</span>
            <div v-html="q"></div>
          </li>
        </ul>
      </div>
      <div v-else-if="data.type == 'completion'">
        <div
          class="mb-3 border-1px border-#e5e7eb border-style-solid p-3"
          v-for="(uv, uvi) in modelValue"
        >
          <div class="flex items-center justify-between mb-3">
            <h5 class="text-sm">填空{{ uvi + 1 }}</h5>
            <n-icon v-if="uvi > 0" @click="remove(uvi)">
              <Close />
            </n-icon>
          </div>
          <n-input
            type="textarea"
            v-model:value="modelValue[uvi]"
            :placeholder="'填空' + (uvi + 1)"
          />
        </div>
        <n-button type="primary" dashed class="w-full my-3" @click="add">
          添加填空
        </n-button>
      </div>
      <div v-else>
        <div class="mb-3 border-1px border-#e5e7eb border-style-solid p-3">
          <n-input
            type="textarea"
            v-model:value="modelValue[0]"
            placeholder="请填写内容"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NIcon, NInput, NButton, createDiscreteApi } from "naive-ui";
import { Close } from "@vicons/ionicons5";
const props = defineProps(["data", "index"]);

const typeToText = {
  answer: "问答题",
  completion: "填空题",
  trueOrfalse: "判断题",
  checkbox: "多选题",
  radio: "单选题",
};

const modelValue = ref(props.data.user_value);

const remove = (i) => {
  const { dialog } = createDiscreteApi(["dialog"]);
  dialog.warning({
    content: "是否要删除该填空",
    positiveText: "确定",
    negativetext: "取消",
    onPositiveClick() {
      modelValue.value.splice(i, 1);
    },
  });
};
const add = () => {
  modelValue.value.push("");
};

const isActive = (v) => {
  const { data } = props;
  if (["radio", "trueOrfalse"].includes(data.type)) {
    return modelValue.value == v;
  } else {
    return modelValue.value.includes(v);
  }
};

const handleChooseOption = (val) => {
  const { data } = props;
  if (["radio", "trueOrfalse"].includes(data.type)) {
    modelValue.value = modelValue.value === val ? -1 : val;
  } else {
    let i = modelValue.value.findIndex((v) => v == val);
    if (i == -1) {
      modelValue.value.push(val);
    } else {
      modelValue.value.push(i, 1);
    }
  }
};

const emit = defineEmits(["change"]);
watch(
  modelValue,
  (newVal) => {
    emit("change", unref(newVal));
  },
  { deep: true }
);

const optionIndexToEn = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
};
</script>

<style lang="scss">
.test-item {
  @apply shadow rounded mb-5;
  .title {
    @apply bg-gray-100 p-4 border-#e5e7eb border-0 border-b-1px border-style-solid text-sm;
  }
  .tip {
    @apply text-xs mb-3 text-gray-500;
  }
  .option {
    transition: all 0.8s;
    @apply flex border-1px border-style-solid border-#e5e7eb p-2 rounded text-sm mb-2 cursor-pointer
    hover:( border-lightBlue-500 bg-lightBlue-50 text-lightBlue-600) active:(\!bg-lightBlue-200);
  }
  .active {
    @apply border-lightBlue-500 bg-lightBlue-50 text-lightBlue-600;
  }
}
</style>
