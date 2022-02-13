import React, { FC, useEffect } from "react";
import { Button } from "antd";
import { useDataContext } from "../../context/DataContext";

const RefreshArea: FC = () => {
  const { loading, refreshValue } = useDataContext();

  useEffect(() => {
    refreshValue();
  }, []);

  return (
    <div>
      <Button loading={loading} onClick={refreshValue}>
        点我刷新
      </Button>
    </div>
  );
};

export default RefreshArea;
