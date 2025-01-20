import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderThree from "../components/header/HeaderThree";
import TeamOne from "../components/team/TeamOne";
import useTranslation from "@/hooks/useTranslation";
import {getAuthors} from "@/libs/api-client/prisma/author.api";

const TeamPage = ({allAuthor}) => {
    const t = useTranslation();
    const AuthorList = allAuthor;

    return (
        <>
            <HeadMeta metaTitle="Team"/>
            <HeaderThree/>
            <Breadcrumb aPage={t.page.team}/>
            <BreadcrumbBanner pageTitle={t.page.team}/>
            <div className="axil-our-team section-gap">
                <div className="container">
                    <p className="m-b-xs-30 big">Meet the amazing people who make papr possible through their energy,
                        experience, <br/>and dedication to pursuing our goals.</p>
                    <div className="axil-team-grid-wrapper p-t-xs-10">
                        <div className="row">
                            {AuthorList.slice(0, 6).map((data, index) => (
                                <div className="col-lg-4" key={index}>
                                    <TeamOne data={data}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="join-us section-gap-bottom">*/}
            {/*    <div className="container">*/}
            {/*        <SectionTitleTwo title="We Are Hiring" paragraph="We are always looking for the right people to join our passionate team of dedicated people. To*/}
            {/*        support papr growth,<br /> we welcome highly motivated people." tSpace="m-b-xs-30" />*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-lg-10 offset-lg-1">*/}
            {/*                <div className="axil-avaiable-positions p-t-xs-10"> */}
            {/*                    <div className="axil-position-block">*/}
            {/*                        <h3 className="axil-position-title">Senior Reporter</h3>*/}
            {/*                        <span href="#" className="btn btn-primary btn-nofill btn-small">APPLY HERE</span>*/}
            {/*                    </div>*/}
            {/*                    <div className="axil-position-block">*/}
            {/*                        <h3 className="axil-position-title">Senior Enterprise Editor</h3>*/}
            {/*                        <span href="#" className="btn btn-primary btn-nofill btn-small">APPLY HERE</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <FooterOne/>
        </>
    );
}

export default TeamPage;

export async function getStaticProps() {
    const allAuthor = await getAuthors();

    return {
        props: {
            allAuthor
        },
        revalidate: 1800,
    };
}





