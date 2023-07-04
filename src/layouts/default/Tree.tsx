"use client"

import Row from "./Row";

const Tree = ({
  treeData,
  parentId = 0,
  level = 1,
  toggleActive,
  activeId,
  openIds,
  setOpenIds,
}) => {
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

export default Tree;