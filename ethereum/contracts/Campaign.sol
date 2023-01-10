// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.14; --> new solidity version
pragma solidity ^0.4.17;

// for recreating new instances of campaign
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    // getting the address of deployed smart contract
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
        // data type for request variable
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    // variables
    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    // modifier to check for manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    // function to contribute <- for contributers
    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    // function called when new request made <- for contributers
    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // function to approveRequest <- for contributers
    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        // check if approver is sender
        require(approvers[msg.sender]);
        // check if approver has no previous approval/voting
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // function to finalize all the requests made <- for manager
    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        //  finalize if approvals > approvers
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    // get summary of campaign
    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    // function to get request array lenght
    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
