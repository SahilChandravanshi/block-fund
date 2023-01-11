// ----------------- Home page ----------------------------------
import React from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";
// import HomeDesc from "../components/HomeDesc";

export const getDeployedCampaigns = factory.methods.getDeployedCampaigns().call;
const campaignListKey = "campaign-list";

const CampaignIndex = () => {
  const { data: campaigns = [] } = useQuery(
    campaignListKey,
    getDeployedCampaigns,
    {
      select: (data = []) =>
        data.map((address) => ({
          header: address,
          description: (
            <Link href={`/campaigns/${address}`} key={address}>
              <a>View Campaign</a>
            </Link>
          ),
          fluid: true,
        })),
    }
  );

  return (
    <Layout >
      {/* <Link href="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link> */}
        <h3 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>Crowdfunding With Powers of Blockchain 🫰🏼</h3>
      <div style={{ display:"flex", justifyContent:"center" }}>
        <Card.Group items={campaigns} style={{ color: "#776ea2", width: "85%" }} />
      </div>
      {/* <div>
        <HomeDesc/>
      </div> */}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(campaignListKey, getDeployedCampaigns);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default CampaignIndex;
