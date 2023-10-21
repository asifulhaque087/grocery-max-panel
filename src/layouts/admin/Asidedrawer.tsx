import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsBrowser } from '@src/hooks';
import { CiHome } from 'react-icons/ci';
import { BiCategoryAlt, BiCart } from 'react-icons/bi';
import { BsBagDash } from 'react-icons/bs';
import { GiTatteredBanner } from 'react-icons/gi';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { userSideDrawerVar } from '@src/graphql/reactivities/toogleVariable';
import { RxDot } from 'react-icons/rx';

const LinkWrapper = ({ href, children, ...props }) => {
  // console.log('href are ', href);
  // console.log('children is', children);

  if (href == '#') {
    return <div {...props}>{children}</div>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

const Asidedrawer = () => {
  const isBrowser = useIsBrowser();

  const [colors, setColors] = useState([
    'red',
    'indigo',
    'green',
    'yellow',
    'blue',
    'purple',
  ]);

  const [urls, setUrls] = useState([
    {
      name: 'home',
      to: '/',
      childrens: [],
      open: false,
      icon: CiHome,
    },
    {
      name: 'banner',
      icon: GiTatteredBanner,
      // to: "",
      childrens: [
        {
          name: 'add banner',
          to: '/banner/add',
        },
        {
          name: 'list banner',
          to: '/banner',
        },
      ],
      open: false,
    },
    {
      name: 'category',
      icon: BiCategoryAlt,
      // to: "",
      childrens: [
        {
          name: 'add category',
          to: '/category/add',
        },
        {
          name: 'list category',
          to: '/category',
        },
      ],
      open: false,
    },
    {
      name: 'product',
      icon: BiCart,
      childrens: [
        {
          name: 'add product',
          to: '/product/add?tab=0',
        },
        {
          name: 'list product',
          to: '/product',
        },

        {
          name: 'Attributes',
          to: '/attributes',
        },
      ],
      open: false,
    },
    {
      name: 'order',
      to: '/order',
      icon: BsBagDash,
      open: false,
    },
  ]);
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  useEffect(() => {
    function updateSize() {
      if (innerWidth <= 767) {
        userSideDrawerVar(false);
      }

      if (innerWidth >= 768) {
        userSideDrawerVar(true);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const BigSreen = {
    show: {
      x: 0,
    },
    hidden: {
      x: -100,
    },
  };

  const toggleUrl = (index: number) => {
    setUrls(
      urls.map((url, i) => {
        if (i === index) {
          url.open = !url.open;
        } else {
          url.open = false;
        }

        return url;
      })
    );
  };

  if (!isBrowser) return null;

  return (
    <AnimatePresence>
      {userSideDrawer && (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            exit={{
              x: '-100%',
            }}
            variants={BigSreen}
            className={`mtt-14 fixed inset-y-0 left-0 z-10`}
            style={{
              boxShadow: `0 2px 6px rgba(47, 43, 61, .14),0 0 transparent,0 0 transparent`,
            }}
          >
            <div className=" h-screen  w-64 border-r bg-white ">
              <div className="h-full overflow-x-hidden overflow-y-auto">
                <>
                  {/* <LinkWrapper href={`/category/add`}>
                          <div>add</div>
                        </LinkWrapper> */}

                  {urls.map((ur, i) => (
                    <div
                      key={i}
                      className="px-[10px] text-[15px]  text-[#2f2b3dad] capitalize mt-[15px] cursor-pointer"
                    >
                      {!ur.childrens?.length ? (
                        <LinkWrapper href={`${ur.to}`}>
                          <div className="flex items-center gap-[10px]">
                            {ur.icon ? <ur.icon size={15} /> : null}
                            <p>{ur.name}</p>
                          </div>
                        </LinkWrapper>
                      ) : (
                        <div onClick={() => toggleUrl(i)}>
                          <div className="flex items-center gap-[10px]">
                            {ur.icon ? <ur.icon size={15} /> : null}
                            <p>{ur.name}</p>

                            <div className="ml-auto">
                              {ur.open ? (
                                <LiaAngleDownSolid size={15} />
                              ) : (
                                <LiaAngleRightSolid size={15} />
                              )}
                            </div>
                          </div>
                          <div
                            className={`pl-[10px] ${
                              ur.open ? 'block' : 'hidden'
                            }`}
                          >
                            {ur.childrens.map((ch) => (
                              <div
                                className="mt-[15px]"
                                key={Math.random() * i}
                              >
                                <LinkWrapper
                                  onClick={(e: React.MouseEvent) =>
                                    e.stopPropagation()
                                  }
                                  href={`${ch.to}`}
                                >
                                  <div className="flex items-center gap-[10px]">
                                    <RxDot size={15} />
                                    <p>{ch.name}</p>
                                  </div>
                                </LinkWrapper>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            onClick={() => userSideDrawerVar(!userSideDrawerVar())}
            className="bg-[rgba(0,0,0,0.5)] mt-14 px-5 fixed h-full w-full flex items-center justify-center top-0 left-0  md:hidden"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Asidedrawer;

// visible: (i) => ({
//   opacity: 1,
//   transition: {
//     delay: i * 0.3,
//   },
// }),
