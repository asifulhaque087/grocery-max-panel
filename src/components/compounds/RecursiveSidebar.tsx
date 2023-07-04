'use client';

import { useState, useEffect } from 'react';

import { IRecursiveSidebar } from '@src/types/compounds';
import { IOpenId } from '@src/types/roots/Row';
import { Tree } from '../roots';
import { useReactiveVar } from '@apollo/client';
import { currentParamVarible } from '@src/graphql/reactivities/paramsVariable';

export const RecursiveSidebar = ({ categories }: IRecursiveSidebar) => {
  const [activeId, setActiveId] = useState('');
  const [openIds, setOpenIds] = useState<IOpenId[]>([]);

  const currentParam = useReactiveVar(currentParamVarible);

  const toggleActive = (id: string): void => {
    setActiveId(id);
  };

  const findPath = (id: string | null, counter: number): number => {
    if (!id) return counter;

    const category = categories.find((cat) => cat.id == id);
    counter++;
    let total = findPath(category!.parentId, counter);
    setOpenIds((oldValue) => [...oldValue, { id, level: total - counter + 1 }]);
    return total;
  };

  useEffect(() => {
    if (currentParam && activeId == '') {
      findPath(currentParam, 0);
      setActiveId(currentParam);
    }
  }, [currentParam]);

  return (
    <div className="bg-white h-full">
      {/* categories */}
      <div className="">
        {categories && (
          <Tree
            treeData={categories}
            toggleActive={toggleActive}
            activeId={activeId}
            openIds={openIds}
            setOpenIds={setOpenIds}
            level={1}
          />
        )}
      </div>
    </div>
  );
};
