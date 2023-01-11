// ------------------------ Create a Campaign page --------------------------------
import React, { useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message, Breadcrumb } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const router = useRouter();

  const { mutate, isLoading, error, isError } = useMutation(
    async (value) => {
      router.prefetch("/");
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(value).send({ from: accounts[0] });
    },
    {
      onSuccess: () => router.push("/"),
    }
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      mutate(minContribution);
    },
    [minContribution]
  );

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Section href="/">Campaigns</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>New</Breadcrumb.Section>
      </Breadcrumb>
      <h3 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>Create a New Campaign 📢</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={onSubmit} error={isError} style={{ boxShadow: "0px 1px 12px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "3rem", width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Form.Field>
            <label>Minimum Contribution Amount</label>
            <Input
              value={minContribution}
              onChange={({ target: { value } }) => setMinContribution(value)}
              label="wei"
              labelPosition="right"
              disabled={isLoading}
            />
          </Form.Field>
          <Message error header="Oops!" content={error?.message} />
          <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            <Button loading={isLoading} primary style={{color:"white", backgroundColor:"#2ec4b6", width:"10rem"}}>
              Create
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default CampaignNew;
