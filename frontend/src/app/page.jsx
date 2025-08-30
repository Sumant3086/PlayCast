"use client"
import SubscriptionBox from "@/components/subscription/SubscriptionBox";
import SubscriptionPlan from "@/components/subscription/SubscriptionPlan";
import HomeBanner from "@/components/home/HomeBanner";
import HomeExperience from "@/components/home/HomeExperience";
import HomeMovieCategory from "@/components/home/HomeMovieCategory";
import AskedQuestion from "@/components/question/AskedQuestions";
import HomeTitle from "@/components/home/HomeTitle";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <HomeBanner />

      <HomeTitle />

      <HomeMovieCategory />

      <HomeExperience />

      <AskedQuestion />

      <SubscriptionPlan />

      <SubscriptionBox />

    </>
  );
}