<template>
  <n-card class="m-b-4" v-if="rows.length > 0">
    <template #header>
      <div class="text-gray-500 text-sm">
        {{ data.count }} 人在拼单，可直接参与
      </div>
    </template>
    <n-scrollbar style="height: 60px">
      <div
        class="flex items-center h-60px px-4"
        v-for="item in rows"
        :key="item.id"
      >
        <n-avatar :size="45" :src="item.users[0].avatar" round></n-avatar>
        <span class="ml-2">
          {{ item.users[0].nickName || item.users[0].username }}
        </span>
        <div class="ml-auto">
          <p>
            还差<span class="text-red-500">{{ item.total - item.num }}人</span>
            拼成
          </p>
          <div class="text-xs text-gray-500 mt-1 flex items-center">
            剩余<IndexComponentsCountDown
              :time="item.end_time"
              @end="handleTimeUp"
            />
          </div>
        </div>
        <n-button
          type="primary"
          size="small"
          class="ml-2"
          :loading="item.loading"
          @click="handleGroup(item)"
        >
          去拼团
        </n-button>
      </div>
    </n-scrollbar>
  </n-card>
</template>
<script setup>
import {
  NCard,
  NScrollbar,
  NAvatar,
  NButton,
  createDiscreteApi,
} from "naive-ui";
const props = defineProps(["group_id"]);
const { data, error } = await getGroupWorkList({
  group_id: props.group_id,
  page: 1,
});
const rows = ref([]);
if (!error.value) {
  rows.value = data.value.rows.map((o) => {
    o.end_time = new Date(o.crated_time).getTime() + 24 * 60 * 60 * 1000;
    o.loading = false;
    return o;
  });
}
const handleTimeUp = (index) => {
  rows.value.splice(index, 1);
  data.value.count--;
};

const handleGroup = (item) => {
  useHasAuth(async () => {
    const { dialog } = createDiscreteApi(["dialog"]);
    dialog.success({
      title: "提示",
      content: "是否要参与此次拼单？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: async () => {
        item.loading = true;
        const { error, data } = await orderSavetApi(
          {
            group_id: 2,
            group_work_id: 1,
          },
          "group"
        );
        if (!error.value) {
          navigateTo(`/pay?no=${data.value.no}`);
        }
        item.loading = false;
      },
    });
  });
};
</script>
