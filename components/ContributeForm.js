import React, { useState, useCallback } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { useMutation } from "react-query";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const ContributeForm = ({ campaignAddress }) => {
  const [contributionValue, setContributionValue] = useState("");
  const router = useRouter();

  const { mutate, isLoading, error, isError } = useMutation(
    async (ethValue) => {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(campaignAddress);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(ethValue, "ether"),
      });
    },
    { onSuccess: () => router.replace(`/campaigns/${campaignAddress}`) }
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      mutate(contributionValue);
    },
    [contributionValue]
  );

  return (
    // ------------------ Contribute field on campaign details page ----------------
    <Form onSubmit={onSubmit} error={isError} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" , gap:"2rem"}}>
      <div className="contribute_now" style={{ color: "#2ec4b6", fontSize: "3rem", fontWeight: "600",lineHeight:"3rem"}}>Contribute Now!</div>
      <Form.Field>
        <label style={{ textAlign: "center" }}>Amount to Contribute</label>
        <Input
          label="ETH"
          labelPosition="right"
          value={contributionValue}
          onChange={({ target: { value } }) => setContributionValue(value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={error?.message} />

      <Button loading={isLoading} primary style={{backgroundColor:"#FFBF69", color:"#333333"}}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
