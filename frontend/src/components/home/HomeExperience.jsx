import ExperienceItem from "./ExperienceItem";
import ExperienceTitle from "./ExperienceTitle";

import { variant } from "./ExperienceVariant";


const HomeExperience = () => {
    return (
        <section className="container mt-20">

            <ExperienceTitle />

            <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-8 md:gap-6 gap-4 mt-8">

                {variant.map((item, index) =>
                    <ExperienceItem key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />)
                }

            </div>

        </section>
    );
}

export default HomeExperience;