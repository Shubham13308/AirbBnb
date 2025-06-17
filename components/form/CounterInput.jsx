'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Button } from '../ui/button';

function CounterInput({ detail, value = 0, onChange }) {
  const increment = () => {
    onChange({ name: detail, value: value + 1 });
  };

  const decrement = () => {
    if (value > 0) {
      onChange({ name: detail, value: value - 1 });
    }
  };

  return (
    <Card className="mb-4">
      <input type="hidden" name={detail} value={value} />
      <CardHeader className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between w-full gap-4 flex-wrap md:flex-nowrap">
          <div className="flex flex-col">
            <h2 className="font-medium capitalize">{detail}</h2>
            <p className="text-muted-foreground text-sm">
              Specify the number of {detail}
            </p>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={decrement}
            >
              <LuMinus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-xl font-bold w-5 text-center">{value}</span>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={increment}
            >
              <LuPlus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CounterInput;
