<template>
    <header class="shadow w-screen">
        <nav>
            <nav
                class="flex items-center justify-between flex-wrap bg-green-400 p-6"
            >
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <Icon class="mr-2"></Icon>
                    <span class="font-semibold text-xl tracking-tight"
                        >Exchange Coins</span
                    >
                </div>
                <div
                    class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto"
                >
                    <div class="text-sm lg:flex-grow"></div>
                </div>
            </nav>
        </nav>
    </header>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
    components: {
        Icon: defineAsyncComponent(() =>
            import("@/components/PxIcon.vue")
        )
    },
};
</script>

<style></style>
