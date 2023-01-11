// -------------------------- New Request page -------------------------------------
import React, { useState, useCallback } from "react";
import Layout from "../../../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useMutation } from "react-query";
import { Button, Form, Input, Message, Breadcrumb } from "semantic-ui-react";

const NewRequest = () => {
  const router = useRouter();
  const address = router.query.address;
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const { mutate, isLoading, error, isError } = useMutation(
    async ({ description, value, recipient }) => {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      const valueInWei = web3.utils.toWei(value, "ether");
      console.log("sdsd", description, valueInWei, recipient);
      await campaign.methods
        .createRequest(description, valueInWei, recipient)
        .send({
          from: accounts[0],
        });
    },
    { onSuccess: () => router.replace(`/campaigns/${address}/requests`) }
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      mutate({ description, value, recipient });
    },
    [description, value, recipient]
  );

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Section href="/">Campaigns</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section href={`/campaigns/${address}`}>
          Details
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section href={`/campaigns/${address}/requests`}>
          Requests
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>New</Breadcrumb.Section>
      </Breadcrumb>
      <h3 style={{textAlign:"center",fontSize:"2.5rem", marginBottom:"2rem"}}>Create a Withdraw Request 💸</h3>
      <div style={{display:"flex", justifyContent:"center"}}>
        <Form onSubmit={onSubmit} error={isError} style={{boxShadow:"0px 1px 12px rgba(0,0,0,0.1)",borderRadius:"12px", padding:"3rem", width:"50%",display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <Form.Field >
            <label>Request Description</label>
            <Input
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              label="Ether"
              labelPosition="right"
              value={value}
              onChange={({ target: { value } }) => setValue(value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Wallet Address</label>
            <Input
              value={recipient}
              onChange={({ target: { value } }) => setRecipient(value)}
            />
          </Form.Field>
          <Message error header="Oops!" content={error?.message} />
          <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            <Button loading={isLoading} primary style={{color:"white", backgroundColor:"#2ec4b6", width:"20rem"}}>
              Create Request
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default NewRequest;
