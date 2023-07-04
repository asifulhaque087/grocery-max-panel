'use client';

import { ITree } from '@src/types/roots';
import { Row } from './Row';

export const Tree = ({
  treeData,
  parentId = null,
  level = 1,
  toggleActive,
  activeId,
  openIds,
  setOpenIds,
}: ITree) => {
  // find all childrens of parentId
  const childrens = treeData.filter((item) => item.parentId === parentId);

  // console.log("hola from tree ", openIds)

  if (!childrens.length) return null;

  return (
    <>
      <div>
        {childrens &&
          childrens.map((child) => (
            <Row
              key={child.id}
              item={child}
              level={level}
              // helper={helper}
              // helperId={helperId}
              toggleActive={toggleActive}
              activeId={activeId}
              openIds={openIds}
              setOpenIds={setOpenIds}
              childIsAParent={treeData.some((cat) => cat.parentId == child.id)}
            >
              {/* think childs parents , now find childrens of those parent */}
              <Tree
                treeData={treeData}
                parentId={child.id}
                level={level + 1}
                toggleActive={toggleActive}
                activeId={activeId}
                openIds={openIds}
                setOpenIds={setOpenIds}
              />
            </Row>
          ))}
      </div>
    </>
  );
};
