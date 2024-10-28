import { ProductUnit } from '@framework/types';
import cn from 'classnames';

interface Props {
  className?: string;
  units: ProductUnit;
  attributeUnit: any;
  setAttributes: (key: any) => void;
}

const ProductAttributes: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  units,
  attributeUnit,
  setAttributes,
}) => {

  if (!units || !Array.isArray(units)) return null;
  return (
    <div className={cn(className)}>
      <h4 className="mb-3 font-normal capitalize text-15px text-brand-dark text-opacity-70">
        Units:
      </h4>

      <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
        {units.map((unit: ProductUnit) => (
          <li
            key={unit.id}
            className={cn(
              'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-brand-dark transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
              {
                'border-brand text-brand':
                  attributeUnit['unit']?.id === unit._id,
              },
            )}
            onClick={() =>
              setAttributes((prev: any) => ({
                ...prev,
                unit: {
                  id: unit.id,
                  _id: unit._id,
                  unitName: unit.unitName,
                  quantity: unit.quantity
                }
              }))
            }
          >
            {`${unit.quantity} ${unit.unitName}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAttributes;
