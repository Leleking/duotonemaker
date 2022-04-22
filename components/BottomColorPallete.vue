<template>
  <div class="fixed bottom-7 w-full">
    <div class="w-full flex justify-center">
      <div class="">
        <div class="bg-defaultBg w-[569px] rounded-full flex item box-shadow">
          <div class="p-5 flex justify-between w-full">
            <div class="flex space-x-2 h-full justify-center items-center">
              <div>
                <color-pair primary="#E6265A" secondary="#200E32" />
              </div>
              <div>
                <color-pair primary="#F4D0BB" secondary="#148883" />
              </div>
              <div><color-pair primary="#90E0EF" secondary="#04055E" /></div>
              <div><color-pair primary="#F38B80" secondary="#490D58" /></div>
              <div><color-pair primary="#B77BAB" secondary="#04055E" /></div>
              <div><color-pair primary="#90E0EF" secondary="#211F36" /></div>
              <div><color-pair primary="#B7C582" secondary="#0F0F0F" /></div>
            </div>
            <div class="flex space-x-2 h-full justify-center items-center">
              <div>
                <single-color-pair color="#E6265A" />
              </div>
              <div>
                <single-color-pair color="#200E32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPair from "./ColorPair.vue";
export default {
  components: {
    ColorPair,
  },
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
}
</style>
