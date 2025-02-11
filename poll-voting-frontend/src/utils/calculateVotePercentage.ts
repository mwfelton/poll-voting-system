export const calculateVotePercentage = (
    pollOptions: { id: string }[],
    votes: { optionId: string }[]
  ): Record<string, number> => {
    const totalVotes = votes.length;
    if (totalVotes === 0) return {};
  
    const voteCounts: Record<string, number> = {};
  
    pollOptions.forEach((option) => {
      const count = votes.filter((vote) => vote.optionId === option.id).length;
      voteCounts[option.id] = Math.round((count / totalVotes) * 100);
    });
  
    return voteCounts;
  };
  